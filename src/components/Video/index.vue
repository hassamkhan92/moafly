<!--
 * @Author: zulezhe
 * @Date: 2022-03-27 15:09:57
 * @LastEditors: zulezhe
 * @LastEditTime: 2023-02-09 22:29:44
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="w-video-container">
    <video
      ref="media"
      @loadeddata="createPreImg($event)"
      class="about_video"
      type="video/mp4"
      :controls="isPlay"
      src="https://moaflytest.s3.us-east-2.amazonaws.com/moafly/20230201/1675264836100.mp4"
      poster="https://moaflytest.s3.us-east-2.amazonaws.com/moafly/20230201/1675264836100.mp4?vframe/jpg/offset/3/w/1920/h/800"
    ></video>
    <div v-show="!isPlay" class="about_mask">
      <p class="know_about_title">Know more about us</p>
      <p class="know_about_text">A brief video introducing our mechanism</p>
      <i class="el-icon-video-play icon-video" @click="handlePlay"></i>
    </div>
    <i v-show="isPlay" class="el-icon-video-pause icon-video" @click="handlePause"></i>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    url: {
      type: String,
      default: 'https://moaflytest.s3.us-east-2.amazonaws.com/moafly/20230201/1675264836100.mp4'
    },
    controls: {
      type: Boolean,
      default: true
    },
    poster: {
      type: String || Number,
      default: 'https://moaflytest.s3.us-east-2.amazonaws.com/moafly/20230201/1675264836100.mp4?vframe/jpg/offset/3/w/1920/h/800'
    }
  },
  data() {
    return {
      isPlay: false //是否播放
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.$refs.media.addEventListener('play', this.handlePlay);
    this.$refs.media.addEventListener('pause', this.handlePause);
  },
  methods: {
    //视频播放
    handlePlay() {
      this.$refs.media.play();
      this.isPlay = true;
    },
    //暂停播放
    handlePause() {
      this.$refs.media.pause();
      this.isPlay = false;
    },
    createPreImg(event) {
      // event js原生事件

      const videoEle = event.target; // 当前video dom节点

      videoEle.currentTime = 3; // 设置视频开始播放时间（因为有些手机第一帧显示黑屏，所以这里选取视频的第3秒作为封面）

      videoEle.addEventListener('canplay', function() {
        // 监听video的canplay事件

        // 创建canvas元素 并设置canvas大小等于video节点的大小
        const canvas = document.createElement('canvas');
        const scale = 0.8; // 压缩系数
        canvas.width = videoEle.videoWidth * scale;
        canvas.height = videoEle.videoHeight * scale;

        // canvas画图
        canvas.getContext('2d').drawImage(videoEle, 0, 0, canvas.width, canvas.height);

        // 把canvas转成base64编码格式
        // const imgSrc = canvas.toDataURL('image/png');
        // 创建img元素 插入到文档中
        // const img = document.createElement('img');
        // img.src = imgSrc;
        // img.style.position = 'absolute';
        // img.style.left = '0';
        // img.style.top = '0';
        // img.style.objectFit = 'cover';
        // videoEle.parentNode && videoEle.parentNode.appendChild(img);
      });
    }
  }
};
</script>
<style scoped lang="less">
.w-video-container {
  width: 100%;
  height: 100%;
  position: relative;
  .about_video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .about_mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 11;
    // background: rgba(96, 72, 254, 0.9);
    opacity: 0.7;
    background: #353f62;
    padding-top: 120px;
    .know_about_title {
      text-align: center;
      font-size: 48px;
      font-family: LibreFranklin-SemiBold, LibreFranklin;
      font-weight: 600;
      color: #ffffff;
      line-height: 58px;
      z-index: 15;
      margin-bottom: 24px;
    }
    .know_about_text {
      text-align: center;
      font-size: 20px;
      font-family: LibreFranklin-Regular, LibreFranklin;
      font-weight: 400;
      color: #ffffff;
      z-index: 15;
    }
  }
  .icon-video {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 80px;
    color: #ffffff;
    margin-top: 144px;
    transition: all ease 1s;
    &:hover {
      transform: scale(1.2) translateX(-50%);
      transition: all ease 1s;
    }
  }
}
</style>
