<template>
  <div class="house-detail-container" id="detailContaier">
    <div class="house-detail-center">
      <div class="detail-title-box">
        <p class="left-title">{{ homeDetailsData.unparsedAddress }}</p>
        <p class="right-title">
          <span class="text"><img class="header_icon_img" :src="favoriteIcon" alt="" /> Favorite</span>
          <span class="text"><img class="header_icon_img" :src="shareIcon" alt="" />Share</span>
        </p>
      </div>
      <div class="detail-images" id="overview">
        <div class="detail-images-master">
          <template>
            <el-image class="img" :src="homeImgList[0]"> </el-image>
          </template>
        </div>
        <div class="detail-images-other">
          <template>
            <el-image class="img" :src="homeImgList[1]"></el-image>
          </template>
          <div class="other-item">
            <WMask v-if="homeImgList && homeImgList.length" @handlerOpenHomeImages="handlerOpenHomeImages"></WMask>
            <template>
              <el-image class="img img2" :src="homeImgList[2]"></el-image>
            </template>
          </div>
        </div>
      </div>
      <!-- 房屋详情 -->
      <div class="home_detail_info">
        <!-- 基础信息 -->
        <div class="basic_content">
          <div class="basic_content_left">
            <!-- 基本配置 -->
            <Basis :homeDetailsData="homeDetailsData" />
            <!-- 简介Introduction -->
            <Introduction :homeDetailsData="homeDetailsData" />
            <!-- MLS -->
            <Mlstitle :homeDetailsData="homeDetailsData" />
          </div>
          <div class="basic_content_right">
            <div class="moafly_price_card" :class="isAffix ? 'affix' : ''">
              <div class="price_box">
                <div class="price_box_left">
                  <p class="price_title">List price</p>
                  <p class="price_text">${{ numberFormat() }}</p>
                </div>
                <div class="price_box_right">
                  <p class="price_title">Save with moafly</p>
                  <p class="price_text mofly_color price_text_2">${{ handleGetNumber() }}</p>
                </div>
              </div>
              <div class="buttons-wrap">
                <WButton class="button message" text="Message" @handleClick="showMessageModal"></WButton>
                <WButton class="button price" text="Start an offer" @handleClick="showOfferModal"></WButton>
              </div>
            </div>
          </div>
        </div>
        <!-- agentDisplay -->
        <Agentdisplay :homeDetailsData="homeDetailsData" />
        <!-- Features -->
        <Features :homeDetailsData="homeDetailsData" />
        <!-- Map -->
        <Map @complete="complete" />
      </div>
      <!-- Most Popular Moafly Agents -->
      <div class="home_detail_Mostagents">
        <Mostagents />
      </div>
      <!-- Similar listings -->
      <div class="home_detail_Similar">
        <Similar />
      </div>
    </div>
    <allhome-images v-if="homeImagesDialog" :homeImagesDialog="homeImagesDialog" :homeImgList="homeImgList" @handlerHide="homeImagesDialog = false"></allhome-images>
    <OfferDialog :showModal="visible" @handlerClose="visible = false" />
    <MessageDialog :showModal="showMessage" @handlerClose="showMessage = false" :homeId="this.homeDetailsData.houseId" />
    <Footer></Footer>
  </div>
</template>
<script>
import WMask from './components/mask';
import allhomeImages from './components/allhomeImages.vue';
import Basis from './components/Basis.vue';
import Introduction from './components/Introduction.vue';
import Mlstitle from './components/Mlstitle.vue';
import Agentdisplay from './components/Agentdisplay.vue';
import Features from './components/Features.vue';
import Map from './components/Map.vue';
import Similar from './components/Similar.vue';
import Mostagents from './components/Mostagents.vue';
import WButton from '@/components/Button';
import OfferDialog from './components/OfferDialog.vue';
import MessageDialog from './components/MessageDialog.vue';

import * as api from '@/api';
import { numberFormat } from '@/util/index.js';
import { addMarker, goToMarker } from '@/Gmap/core/index.js';
export default {
  components: { WMask, WButton, Basis, Introduction, Mlstitle, Agentdisplay, Features, Map, Similar, Mostagents, allhomeImages, OfferDialog, MessageDialog },
  data() {
    return {
      visible: false,
      showMessage: false,
      map: null,
      isAffix: false,
      activeName: '#overview',
      homeImagesDialog: false,
      homeDetailsData: {}, //房屋详情存储地址
      homeImgList: [], //房屋图片地址
      favoriteIcon: require('@/assets/images/detail/favorite.png'),
      shareIcon: require('@/assets/images/detail/share.png')
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    complete(map) {
      const hoseId = this.$route.params.houseId;
      this.map = map;
      this.getHomeDetails(hoseId);
    },
    handleGetNumber() {
      return numberFormat((this.homeDetailsData.listPrice * (100 - this.homeDetailsData.buyerAgencyCompensation)) / 100);
    },
    numberFormat() {
      let val = Number(this.homeDetailsData.listPrice).toFixed(0);
      return numberFormat(val);
    },
    //打开图片列表弹窗
    handlerOpenHomeImages() {
      this.homeImagesDialog = true;
    },
    goAnchor(selector) {
      this.activeName = selector;
      //参数selector是id选择器（#anchor14）
      document.querySelector(selector).scrollIntoView({
        behavior: 'smooth'
      });
    },
    //获取房屋详情
    getHomeDetails(listingKey) {
      api.search.getHomeDetails(listingKey).then(res => {
        if (res.code === 'K-000000') {
          this.homeDetailsData = res.context;
          this.homeImgList = res.context.imgList;
          addMarker(this.map, { lat: Number(this.homeDetailsData.latitude), lng: Number(this.homeDetailsData.longitude) });
          goToMarker(this.map, { lat: Number(this.homeDetailsData.latitude), lng: Number(this.homeDetailsData.longitude) });
        }
      });
    },
    showOfferModal() {
      this.visible = true;
    },
    showMessageModal() {
      this.showMessage = true;
    },
    /**
     * 获取滚动条位置
     */
    getScrollTop() {
      var scrollPos;
      if (window.pageYOffset) {
        scrollPos = window.pageYOffset;
      } else if (document.compatMode && document.compatMode != 'BackCompat') {
        scrollPos = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollPos = document.body.scrollTop;
      }
      return scrollPos;
    }
  }
};
</script>
<style scoped lang="less">
@import url('./index.less');
.house-detail-container {
  background: #ffffff;
}
.home_big_img {
  width: 793px;
  height: 470px;
}
p {
  margin: 0;
}
.house-detail-center {
  .detail-title-box {
    .flex();
    justify-content: space-between;
    margin-bottom: 16px;
    .left-title {
      font-family: 'Libre Franklin';
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      color: #0f1b43;
    }
    .right-title {
      font-size: 16px;
      font-family: LibreFranklin-Regular, LibreFranklin;
      font-weight: 400;
      color: #666666;
      line-height: 19px;
      .text {
        margin-left: 32px;
        font-family: 'Libre Franklin';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: rgba(15, 27, 67, 0.8);
      }
      .header_icon_img {
        width: 18px;
        height: 15px;
        margin-right: 5px;
        transform: translateY(2px);
      }
      .icon {
        font-size: 24px;
        margin-right: 8px;
        color: #000000;
      }
    }
  }
  .home_detail_info {
    width: 100%;
    .basic_content {
      .flex();
      flex-wrap: wrap;
      justify-content: space-between;
      margin: 0 -15px;
      .basic_content_left {
        width: calc(100% - 30px);
        padding: 0 15px;
        margin-bottom: 30px;
        @media (min-width: 992px) {
          width: calc(65% - 30px);
          margin-bottom: 0;
        }
      }
      .basic_content_right {
        width: calc(100% - 30px);
        padding: 0 15px;
        @media (min-width: 992px) {
          width: calc(35% - 30px);
        }
        .moafly_price_card {
          background: #ffffff;
          box-shadow: 0 2px 12px rgba(53, 63, 98, 0.18);
          border-radius: 16px;
          border-color: #eef4fa;
          padding: 24px 28px;
          .price_box {
            .flex();
            justify-content: space-between;
            .price_title {
              font-size: 12px;
              font-family: LibreFranklin-SemiBold, LibreFranklin;
              font-weight: 600;
              color: #666666;
              line-height: 15px;
            }
            .price_text {
              font-size: 20px;
              font-family: LibreFranklin-SemiBold, LibreFranklin;
              font-weight: 600;
              color: #333333;
              line-height: 24px;
              margin-top: 12px;
            }
            .price_text_2 {
              color: #dc5674;
            }
          }
          .buttons-wrap {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            margin-top: 30px;
            gap: 8px;
            .button {
              border-radius: 6px !important;
              border: 1px solid #dc5674 !important;
              width: calc(50% - 6px) !important;
              /deep/ .button-text {
                font-weight: 500;
                font-size: 18px;
                line-height: 22px;
              }
              &.message {
                background-color: #fff !important;
                /deep/ .button-text {
                  color: #dc5674 !important;
                }
              }
              &.offer {
              }
            }
          }
        }
      }
    }
  }
  .home_detail_Similar {
    width: 1200px;
  }
}
.mofly_color {
  color: #dc5674;
}
</style>
