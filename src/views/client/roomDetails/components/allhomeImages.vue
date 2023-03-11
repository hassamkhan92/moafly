<template>
  <div v-if="homeImagesDialog" class="home_images_contain">
    <i @click="handlerHide" class="el-icon-circle-close"></i>
    <div class="home_images_box">
      <div class="home_images home_images_left">
        <div v-for="(item, idx) in initImagesList" :key="idx" class="images_box">
          <div :class="{ isActive: item.img1 == focusImg }" class="img_top bottom">
            <img @click="handlerFocus(item.img1)" class="images" :src="item.img1" alt="" />
            <div class="mask"></div>
          </div>
          <div v-show="item.img2 || item.img3" class="img_bottom bottom">
            <div :class="{ isActive: item.img2 == focusImg }" v-if="item.img2" class="img_box">
              <div class="mask"></div>
              <img class="images" @click="handlerFocus(item.img2)" :src="item.img2" alt="" />
            </div>
            <div :class="{ isActive: item.img3 == focusImg }" v-if="item.img3" class="img_box">
              <div class="mask"></div>
              <img class="images" @click="handlerFocus(item.img3)" :src="item.img3" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="home_images home_images_right">
        <img class="images" :src="focusImg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home_images_contain',
  props: {
    homeImgList: {
      typeof: Array,
      default: () => []
    },
    homeImagesDialog: {
      typeof: Boolean,
      default: false
    }
  },
  data() {
    return {
      focusImg: '',
      initImagesList: []
    };
  },
  created() {
    // console.log('this.homeImgList===>', this.homeImgList);
    this.focusImg = this.homeImgList[0];
    this.initImagesList = this.initHomeImagesList(this.homeImgList);
    // console.log('this.initHomeImagesList===>', this.initHomeImagesList(this.homeImgList));
  },
  methods: {
    handlerHide() {
      this.$emit('handlerHide');
    },
    //聚焦图片
    handlerFocus(img) {
      this.focusImg = img;
    },
    //格式化图片文件
    initHomeImagesList(homeImgList) {
      let tempImgList = [];
      homeImgList.forEach((item, itemIdx) => {
        // let idx = itemIdx + 1;
        let imgObj = {
          img1: '',
          img2: '',
          img3: ''
        };
        if (itemIdx % 3 === 0) {
          imgObj.img1 = this.homeImgList[itemIdx];
          imgObj.img2 = this.homeImgList[itemIdx + 1];
          imgObj.img3 = this.homeImgList[itemIdx + 2];
          tempImgList.push(imgObj);
        }
      });
      return tempImgList;
    }
  }
};
</script>

<style lang="less" scoped>
.home_images_contain {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #ffffff;
  z-index: 10;
  padding-top: 135px;
  .el-icon-circle-close {
    position: absolute;
    right: 10px;
    top: 90px;
    font-size: 30px;
    transition: all ease 0.5s;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
  .home_images_box {
    width: 100%;
    height: 100%;
    padding: 0 50px 0 15px;
    .flex();
    justify-content: space-between;
    .images {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      position: relative;
      cursor: pointer;
      &:hover::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.5);
        z-index: 11;
      }
    }
    .home_images {
      height: 100%;
    }
    .home_images_left {
      width: 25%;
      overflow-y: auto;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      &::-webkit-scrollbar {
        width: 10px;
      }
    }
    .home_images_right {
      width: 70%;
    }
    .images_box {
      width: 100%;
      position: relative;
      .bottom {
        margin-bottom: 10px;
      }
      .img_top {
        width: 100%;
        height: 289px;
      }
      .img_bottom {
        height: 142px;
        .flex();
        justify-content: space-between;
        .img_box {
          width: 48%;
          height: 100%;
        }
      }
      .isActive {
        position: relative;
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 11;
          border-radius: 8px;
        }
      }
    }
  }
}
</style>
