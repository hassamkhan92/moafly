<template>
  <div class="swiper-container" :class="className">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <!-- Add Pagination -->
    <!-- <div class="swiper-pagination"></div> -->
    <!-- <div @mousemove="handlerMove" class="swiper-button-next  swiper-button-white"></div>
    <div @mousemove="handlerMove" class="swiper-button-prev swiper-button-white"></div> -->
  </div>
</template>

<script>
import 'swiper/dist/js/swiper';
import 'swiper/dist/css/swiper.css';
import Swiper from 'swiper';
export default {
  name: 'Swiper',
  props: {
    limit: {
      type: Number,
      default: 4
    },
    spaceBetween: {
      type: Number,
      default: 30
    },
    className: {
      type: String,
      default: 'swiper-container'
    },
    paginationClickable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      swiper: null,
      autoplay: 0
    };
  },
  mounted() {
    this.initSwiper();
    this.swiper.stopAutoplay();
  },
  methods: {
    initSwiper() {
      this.swiper = new Swiper('.' + this.className, {
        slidesPerView: this.limit,
        paginationClickable: this.paginationClickable,
        spaceBetween: this.spaceBetween,
        autoplay: 2500
      });
    },
    start() {
      this.swiper.startAutoplay();
    },
    stop() {
      this.swiper.stopAutoplay();
    }
  }
};
</script>
<style lang="less" scoped>
.swiper-container {
  width: 100%;
}
.swiper-button-white {
  z-index: 15;
  left: 0;
  top: 0;
  width: 50px;
  height: 100%;
  margin: 0;
  background: none;
}
.swiper-button-next {
  left: auto;
  right: 0;
}
</style>
