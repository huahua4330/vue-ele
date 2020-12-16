 <template>
    <div id="header-warp">
      <div class="pull-left header-icon" @click="toggleMenu">
          <svg-icon iconName="menu"/>
      </div>
      <div class="pull-right">
          <div class="pull-left userinfo">
                <img src="../../../assets/00.jpg" alt="">
          </div>
          <div class="pull-right header-icon" @click="exit">
                <svg-icon iconName="exit"/>
          </div>
      </div>
     </div>
</template>
<script>
export default {
  name:'Head',
  setup(props,{root}){
    //   触发vuex mutations
        const toggleMenu=(()=>{
            root.$store.commit("app/SET_COLLAPSE")//先执行
        })
        const exit=(()=>{
            root.$store.dispatch("app/exit").then(res=>{
                root.$router.push({
                    name:'Login'
                })
            });//执行设置
        })
        return{
            toggleMenu,
            exit
        }
    }
} 
</script>
<style lang="scss" scoped>
    #header-warp{
        position: fixed;
        top: 0;
        left: $NavWidth;
        right: 0px;
        height: $LayHeader;
        background: white; 
        .header-icon{
            padding: 22px 30px;
            svg{
                font-size: 25px;
            }
        }
    }
    .userinfo{
        height:$LayHeader;
        padding: 0 32px;
        border-right:1px solid #ccc ;
        img{
            width: 35px;
            height: 35px;
            margin-top: 20px;
            margin-right: 20px;
            display: inline-block;
            border-radius: 50%;
        }
    }
    .open{
        #header-warp{
            left: $NavWidth;
        }
    }
    .close{
        #header-warp{
            left: $NavMinWidth;
        }
    }
</style>