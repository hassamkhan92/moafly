<!--
 * @Author: zulezhe
 * @Date: 2022-05-05 20:28:28
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-09-26 19:35:32
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="item-container" @click="handleViewDetail(item)">
    <div class="item-content">
      <div class="item-top">
        <el-carousel trigger="click" height="100%" :autoplay="false">
          <el-carousel-item v-for="(item, index) in item.imgUrl" :key="index">
            <el-image class="el-carousel-item-img" :src="item" fit="fill"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="item-bottom">
        <div class="home-price">
          <span class="homecard-price">$ {{ numberFormat(item.listPrice) }}</span>
          <i class="iconfont icon-xihuan favorite-icon" @click.stop="handleCheckFavorite(item)"></i>
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
.item-container {
  width: 100%;
  padding: 0 15px;
  @media (min-width: 768px) {
    width: calc(50% - 30px);
  }
  @media (min-width: 992px) {
    width: calc(33.3333% - 30px);
  }
  min-height: 360px;
  .item-content {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 4px 12px rgba(55, 64, 95, 0.2);
    border-radius: 16px;
    margin-top: 20px;
    border-radius: 6px;
    cursor: pointer;
    .item-top {
      width: 100%;
      height: 246px;
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
    .item-bottom {
      width: 100%;
      height: 123px;
      padding: 20px 30px;
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
        margin-top: 12px;
        font-family: 'Libre Franklin';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: rgba(15, 27, 67, 0.8);
      }
      .home-address {
        margin-top: 10px;
        font-family: 'Libre Franklin';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: rgba(15, 27, 67, 0.6);
      }
    }
  }
}
</style>
