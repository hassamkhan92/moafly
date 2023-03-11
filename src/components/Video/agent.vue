<!--
 * @Author: zulezhe
 * @Date: 2022-03-27 15:09:57
 * @LastEditors: zulezhe
 * @LastEditTime: 2023-02-09 22:29:11
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
      :src="url"
      :poster="poster"
    ></video>
    <div v-show="!isPlay" class="about_mask">
      <div class="agent-video-play-box">
        <i class="el-icon-caret-right icon-video" @click="handlePlay"></i>
      </div>
    </div>
    <!-- <i v-show="isPlay" class="el-icon-video-pause icon-video" @click="handlePause"></i> -->
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    url: {
      type: String,
      default: 'https://moaflytest.s3.us-east-2.amazonaws.com/Agent-video.mp4'
    },
    controls: {
      type: Boolean,
      default: true
    },
    poster: {
      type: String || Number,
      default: 'https://moaflytest.s3.us-east-2.amazonaws.com/Agent-video.mp4?vframe/jpg/offset/3/w/1920/h/800'
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
    background: #000000;
    opacity: 0.4;
    border-radius: 5px;
  }
  .agent-video-play-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 70px;
    height: 70px;
    background: #ffffff;
    border-radius: 50%;
    z-index: 12;
    .flex();
    .icon-video {
      font-size: 40px;
      color: #09153e;
    }
  }
}
</style>
