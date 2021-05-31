 <template>
  <div id="nav-warp">
    <!-- logo -->
    <h1 class="logo">
      <img src="../../../assets/logo.png" alt="">
    </h1>
    <!-- 菜单列表开始 -->
    <div class="content">
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="transparent"  text-color="#fff" active-text-color="#fff" router>
          <template v-for="(item,index) in routes" >
            <el-submenu :index="index+``" :key="index" v-if="!item.hidden">
              <!-- 一级路由 -->
              <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <svg-icon :iconName="item.mate.icon" />
                <span slot="title">{{item.mate.name}}</span>
              </template>
              <!-- 二级路由 -->
              <el-menu-item :index="itemChild.path" v-for="(itemChild,index) in item.children" :key="index">{{itemChild.mate.name}}</el-menu-item>
            </el-submenu>
          </template>
      </el-menu>
    </div>
  </div>
</template>
<script>
import {computed, reactive, ref} from '@vue/composition-api'
import SvgIcon from '../../../icons/components/SvgIcon.vue'
export default {
  components:{SvgIcon},
  name:'Main',
  setup(props,{refs,root}){
    // 获取vuex中的state
    const isCollapse=computed(()=>{//需要组件传参 vuex
      // return root.$store.state.app.isCollapse   //state
      return root.$store.getters['app/isCollapse'] //getters
    })
    // 获取路由信息
    const routes=reactive(root.$router.options.routes)
    return{
      isCollapse,
      routes,
    }
  }
};
</script>
<style lang="scss" scoped>
  #nav-warp{
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh; 
      width: $NavWidth;
      background:#344a5f;
      @include webkit('transition',all 1s ease 0s)
  }
  .logo{
    text-align: center;
    img{
      margin: 28px auto 28px;
      width: 70px;
    }
  }
  .open{
    #nav-warp{
      width: $NavWidth;
    }
  }
  .close{
    #nav-warp{
      width: $NavMinWidth;
      .logo img{
        width: 50%;
      }
    }
  }
</style>