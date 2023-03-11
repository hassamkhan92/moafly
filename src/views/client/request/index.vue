<template>
  <div class="request">
    <!-- post内容 -->
    <router-view class="request-content"></router-view>
    <div class="request-bg">
      <img class="request-com request-left" :src="routerImgList[$route.path]" alt="" />
      <div class="request-com request-right"></div>
    </div>
  </div>
</template>

<script>
import post_bg1 from '@/assets/\images/view_proposals/post_bg1.png';
import post_bg2 from '@/assets/\images/view_proposals/post_bg2.png';
import post_bg3 from '@/assets/\images/view_proposals/post_bg3.png';
import post_bg4 from '@/assets/\images/view_proposals/post_bg4.png';
export default {
  name: 'request',
  data() {
    return {
      post_img: post_bg1,
      routerImgList: {
        '/request/1': post_bg1,
        '/request/2': post_bg2,
        '/request/3': post_bg3,
        '/request/4': post_bg4
      }
    };
  },
  created() {
    console.log(this.$route);
  },
  methods: {}
};
</script>

<style lang="less" scoped>
::v-deep.request {
  width: 100%;
  height: 100%;
  padding-top: 80px;
  position: relative;
  .request-content {
    @media (max-width: 767.99px) {
      margin-top: 200px;
    }
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    max-width: 1000px;
    width: 100%;
    height: 640px;
    background: radial-gradient(112.73% 273.44% at 0.55% 0%, rgba(253, 252, 252, 0.1) 0%, rgba(223, 155, 169, 0.15) 100%);
    backdrop-filter: blur(11px);
    border-radius: 16px;
  }
  .request-bg {
    z-index: 9;
    width: 100%;
    height: 100%;
    .flex();
    .request-com {
      width: 50%;
      height: 100%;
    }
  }
  .el-input .el-input__inner:focus {
    border: 1px solid #dc5674;
  }
  .el-textarea__inner:focus {
    border: 1px solid #dc5674;
  }
  .el-button:active {
    border: none;
  }
  .el-button:hover {
    border: none;
  }
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
