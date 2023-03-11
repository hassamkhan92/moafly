<!--
 * @Author: zulezhe
 * @Date: 2022-05-05 20:28:28
 * @LastEditors: zulezhe
 * @LastEditTime: 2023-01-31 23:47:41
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="home-item-container hvr-grow" @click="handleViewDetail(item)">
    <div class="item-top">
      <el-carousel trigger="click" height="100%" :autoplay="false">
        <el-carousel-item v-for="(img, index) in item.imgUrl" :key="index">
          <el-image class="el-carousel-item-img" :src="img" fit="fit" :data-src="img">
            <div slot="error" class="image-slot">
              <img style="width:100%;object-fit: fill;" :src="require('@/assets/images/error.png')" alt="" />
            </div>
          </el-image>
        </el-carousel-item>
      </el-carousel>
      <Tag class="tag" height="28px" width="143px" text="Listed by moafly"></Tag>
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
        <span> {{ item.livingArea ? numberFormat(item.livingArea) : '-' }} sq.ft </span>
      </div>
      <div class="home-address">{{ item.unparsedAddress }}, {{ item.city }}, {{ item.stateOrProvince }} {{ item.postalCode }}</div>
      <div class="footer-btn">
        <WButton text="Read More" bgColor="#EA4671" radius="4px" width="190px" height="57px" :iconShow="false" @handleClick="handleClick(item)"> </WButton>
      </div>
    </div>
  </div>
</template>
<script>
import { numberFormat } from '@/util/index.js';
import WButton from '@/components/Button/index.vue';
import { agentStatusByText } from '@/shared/home/index.js';
import Tag from './tag.vue';
export default {
  components: { WButton, Tag },
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
  mounted() {
    console.log('item===>', this.item);
  },
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
    handleClick(item) {
      this.$router.push({
        path: `/roomDetails/${item.listingKey}`
      });
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
.home-item-container {
  width: 337px;
  height: 457px;
  background: #f3f9ff;
  border-radius: 10px;
  margin-top: 24px;
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  .item-top {
    width: 100%;
    height: 246px;
    position: relative;
    .tag {
      position: absolute;
      background: rgba(15, 27, 67, 0.6) !important;
      left: 15px;
      top: 20px;
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
        font-size: 20px;
        margin-left: 5px;
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
      color: #666666;
    }
    .footer-btn {
      margin-top: 16px;
      .flex();
    }
  }
}
</style>
