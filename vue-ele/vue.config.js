// common js规范 node js规范
const path=require("path")
const { config } = require("process")
// console.log("项目的绝对路径",__dirname)
// console.log('项目中某个路径的绝对路径' ,path.resolve(__dirname, './src/components'))
module.exports  = {
	// 基本路径
	publicPath:process.env.NODE_ENV==='production' ? "":"/",
	lintOnSave:false,//是否开启语法检测
	css: {
		// 是否使用css分离插件 ExtractTextPlugin
		extract: true, 
		// 开启 CSS source maps?
		sourceMap: true,
		// css预设器配置项
		loaderOptions: {
			scss: {
				prependData: `@import "./src/styles/main.scss";`
			}
		}
	},
	// 配置解析svg的loader
	chainWebpack:(config)=>{
		const svgRule = config.module.rule("svg");     
		svgRule.uses.clear();     
		svgRule       
	 	.use("svg-sprite-loader")       
	 	.loader("svg-sprite-loader")       
	  	.options({         
	   		symbolId: "icon-[name]",         
	    	include: ["./src/icons"]       
	  	});
	}, 
	  

	// 配置目录的别名
	configureWebpack: (config) => {
        config.resolve = {
             // 引入文件的时候不写后缀，默认加载的文件类型
            extensions: ['.js', '.json', '.vue'],
            alias: {
				// 获取绝对路径 
				"@":path.resolve(__dirname,"./src"),
                "@c": path.resolve(__dirname, './src/components'),
                "@a": path.resolve(__dirname, './src/assets'),
                "@p": path.resolve(__dirname, './public'),
                // 以vue结尾的
                vue$: "vue/dist/vue.esm.js"
            }
           
        }
	},
	// 代理
	devServer:{
		port:8080,
		open:"true",//启动项目自动打开浏览器
		// 代理
		// bugLevel:"debug",//打印代理日志
		proxy:{
			// http://localhost:8010/api/getSms/ 
			// http://www.web-jshtml.cn/productapi/api/getSms/ 
			// http://www.web-jshtml.cn/productapi//getSms/ 没有token业务的接口
			// http://www.web-jshtml.cn/productapi/token/getSms/ 有token业务的接口

			"/api":{
				target:"http://www.web-jshtml.cn/productapi/token/",//目标接口
				changeOrigin: true,  //是否跨域 生成一个node服务器 localhost:8010域名下的node服务器，帮你做代理
				// 重写url
				pathRewrite:{
					'^/api':''
				}
			}
		}
	}
}