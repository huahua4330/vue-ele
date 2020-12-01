// common js规范 node js规范
const path=require("path")
console.log("项目的绝对路径",__dirname)
console.log('项目中某个路径的绝对路径' ,path.resolve(__dirname, './src/components'))
module.exports  = {
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
	// 配置目录的别名
	configureWebpack: (config) => {
        config.resolve = {
             // 引入文件的时候不写后缀，默认加载的文件类型
            extensions: ['.js', '.json', '.vue'],
            alias: {
                // 获取绝对路径
                "@c": path.resolve(__dirname, './src/components'),
                "@a": path.resolve(__dirname, './src/assets'),
                "@p": path.resolve(__dirname, './public'),
                // 以vue结尾的
                vue$: "vue/dist/vue.esm.js"
            }
           
        }
    }
}