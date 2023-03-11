<!--
 * @Author: zulezhe
 * @Date: 2022-05-05 20:28:28
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-24 22:49:33
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="search-item-container" @click="handleViewDetail(item)">
    <div class="item-left">
      <el-carousel trigger="click" height="100%" :autoplay="false">
        <el-carousel-item v-for="(item, index) in item.imgUrl" :key="index">
          <el-image class="el-carousel-item-img" :src="item" fit="fill"></el-image>
        </el-carousel-item>
      </el-carousel>
      <!-- 收藏 -->
      <div class="icon-xihuan-box">
        <i class="iconfont icon-xihuan favorite-icon" @click.stop="handleCheckFavorite(item)"></i>
      </div>
    </div>
    <div class="item-right">
      <div class="home-price">
        <span class="homecard-price">$ {{ numberFormat(item.listPrice) }}</span>
        <i class="iconfont icon-fenxiang share-icon" @click.stop="handleCheckShare(item)"></i>
      </div>
      <div class="home-stats">
        <span> {{ item.bedroomsTotal || '-' }} beds </span>
        <span> {{ formatBath(item.bathroomsFull, item.bathroomsHalf) }} baths </span>
        <span> {{ item.lotSizeArea ? numberFormat(item.lotSizeArea) : '-' }} sq.ft </span>
      </div>
      <div class="home-address">{{ item.unparsedAddress }}, {{ item.city }}, {{ item.stateOrProvince }} {{ item.postalCode }}</div>
    </div>
  </div>
</template>
<script>
import { numberFormat } from '@/util/index.js';
export default {
  components: {},
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          price: '$2,225,000',
          address: '1226 s kern ave,east los angeles,ca 00022'
        };
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    getImg(item) {
      return require(`@/assets/images/search/${item}.jpg`);
    },
    numberFormat(item) {
      return numberFormat(item);
    },
    formatBath(bed, bath) {
      if (bed) {
        if (bath) {
          return bed + bath;
        } else {
          return bed;
        }
      } else {
        if (bath) {
          return bath;
        } else {
          return '-';
        }
      }
    },
    /**
     * 收藏
     */
    handleCheckFavorite(item) {
      this.$emit('handleCheckFavorite', item);
    },
    /**
     * 分享
     */
    handleCheckShare(item) {
      this.$emit('handleCheckShare', item);
    },
    /**
     * 查看详情
     */
    handleViewDetail(item) {
      this.$emit('handleViewDetail', item);
    }
  }
};
</script>
<style scoped lang="less">
.search-item-container {
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
  background: #ffffff;
  box-shadow: 0px 1px 10px rgba(55, 64, 95, 0.12);
  border-radius: 16px;
  cursor: pointer;
  .flex();
  justify-content: space-between;
  .item-left {
    position: relative;
    width: 282px;
    height: 100%;
    .icon-xihuan-box {
      position: absolute;
      top: 24px;
      left: 24px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #ffffff;
      z-index: 99;
      .flex();
    }
    /deep/ .el-carousel {
      width: 100%;
      height: 100%;
      border-radius: 6px 6px 0 0;
      .el-carousel__item {
        background-size: cover;
        background-position: 0 0;
        background-repeat: no-repeat;
        .el-carousel-item-img {
          width: 100%;
          height: 100%;
        }
      }
      .el-carousel__arrow {
        background-color: #fff;
        color: #aaa;
      }
      .el-carousel__indicators {
        display: none;
      }
    }
  }
  .item-right {
    width: calc(100% - 282px);
    height: 100%;
    padding: 55px 24px 0;
    box-sizing: border-box;
    .home-price {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .homecard-price {
        font-size: 16px;
        font-weight: bold;
        color: #333333;
        width: 80%;
      }
      .favorite-icon,
      .share-icon {
        font-size: 24px;
      }
    }
    .home-stats {
      margin-top: 20px;
      font-size: 18px;
      font-weight: 400;
      color: #666666;
    }
    .home-address {
      margin-top: 10px;
      font-size: 12px;
      font-family: LibreFranklin-Regular, LibreFranklin;
      font-weight: 400;
      color: #666666;
    }
  }
}
</style>
