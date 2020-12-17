 <template>
  <div id="main-warp">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  
};
</script>
<style lang="scss" scoped>
    #main-warp{
        position: fixed;
        left: $NavWidth;
        top: $LayHeader;
        right: 0;
        bottom: 0;
        padding-right:10px;
        padding-left:10px;
        border:20px solid #f7f7f7;
        border-bottom: none; 
        @include webkit ('transition',all .3s ease 0s) 
    }
    .open{
        #main-warp{
          left: $NavWidth;
        }
    }
    .close{
        #main-warp{
          left:$NavMinWidth;
        }
    }
</style>