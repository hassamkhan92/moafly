<template>
  <div class="detail_info-Similar">
    <HeaderTitle title="Similar listings" />
    <!-- <div class="swiper_code">
      <div class="code_left code">
        <i class="el-icon-arrow-left icon" @click="handlePlaySwiper(1)"></i>
      </div>
      <div class="code_right code">
        <i class="el-icon-arrow-right icon" @click="handlePlaySwiper(-1)"></i>
      </div>
    </div> -->
    <div class="Similar_homeList_box">
      <!-- <Swipers v-if="homeList.length" ref="Similar_homeList" :limit="3" className="Similar_homeList" :spaceBetween="19" :paginationClickable="false">
        <Item
          class="swiper-slide"
          v-for="item in homeList"
          :key="item.listingKey"
          :item="item"
          @handleViewDetail="handleViewDetail"
          @handleCheckShare="handleCheckShare"
          @handleCheckFavorite="handleCheckFavorite"
        ></Item>
      </Swipers> -->
      <div class="Similar_homeList" ref="Similar_homeList">
        <Item v-for="item in homeList" :key="item.listingKey" :item="item" @handleViewDetail="handleViewDetail" @handleCheckShare="handleCheckShare" @handleCheckFavorite="handleCheckFavorite"></Item>
      </div>
    </div>
  </div>
</template>

<script>
import Item from './item.vue';
import * as api from '@/api';
import HeaderTitle from './HeaderTitle.vue';
// import Swipers from '@/components/Swiper';
export default {
  components: {
    HeaderTitle,
    Item
    // Swipers
  },
  data() {
    return {
      favoriteIcon: require('@/assets/images/detail/favorite.svg'),
      shareIcon: require('@/assets/images/detail/share.svg'),
      num: 0,
      searchParams: {
        bathroomsFull: '',
        bedroomsTotal: '',
        city: '',
        maxLatitude: 34.497926735503206,
        maxLongitude: -117.38782348632813,
        maxPrice: 1000000,
        minLatitude: 33.57958750325641,
        minLongitude: -118.91217651367188,
        minPrice: 0,
        pageNum: 1,
        pageSize: 10,
        postalCity: '',
        postalCode: '',
        stateOrProvince: '',
        unparsedAddress: ''
      },
      homeList: []
    };
  },
  created() {
    this.getHomeList();
  },
  methods: {
    /**
     * 查询房屋数据
     */
    getHomeList() {
      api.search
        .getHomeList(this.searchParams)
        .then(res => {
          if (res.code === 'K-000000' && res.context) {
            if (res.context.dataContent && Array.isArray(res.context.dataContent)) {
              if (res.context.dataContent.length > 0) {
                this.homeList = res.context.dataContent.slice(0, 3);
              }
            }
          }
        })
        .catch(err => {
          console.log('搜索房屋失败', err);
          this.isEmpty = false;
          this.loading = false;
        });
    },
    handlePlaySwiper(dire) {
      if (this.homeList.length === 4) {
        return;
      }
      if (dire > 0) {
        if (this.num === 0) {
          return;
        }
        this.num--;
      } else {
        if (this.num === this.homeList.length - 4) {
          return;
        }
        this.num++;
      }
      let agentSwiper = this.$refs.Similar_homeList; //父盒子
      let distance = -417 * this.num;
      agentSwiper.style.left = `${distance}px`;
    },
    handleViewDetail(item) {
      this.$router.push({
        path: `/roomDetails/${item.listingKey}`
      });
    },
    handleCheckShare(item) {
      console.log('分享===>', item);
    },
    handleCheckFavorite(item) {
      console.log('收藏===>', item);
    }
  }
};
</script>

<style lang="less" scoped>
.detail_info-Similar {
  width: 100%;
  padding-top: 24px;
  padding-bottom: 60px;
  position: relative;
  .swiper_code {
    position: absolute;
    top: 32px;
    right: 10px;
    width: 100px;
    height: 40px;
    .flex();
    justify-content: space-between;
    .code {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      box-shadow: 8px 8px 42px 0px #dddddd;
      .flex();
      transition: all ease 0.5s;
      .icon {
        font-size: 24px;
        color: #666666;
        opacity: 0.8;
      }
      &:hover {
        transition: all ease 0.5s;
        transform: scale(1.1);
        .icon {
          opacity: 1;
        }
      }
    }
  }
  .Similar_homeList_box {
    width: 100%;
    min-height: 406px;
    position: relative;
    .Similar_homeList {
      width: 100%;
      .flex();
      justify-content: space-between;
      margin: 0 -15px;
    }
    .swiper-container {
      overflow: visible;
    }
  }
  .home_info_item {
    width: 385px;
    margin-right: 19px;
    justify-content: space-between;
    margin-right: 52px;
    box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    border: 1px solid red;
    .info_img_box {
      width: 100%;
      height: 236px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        border-top-right-radius: 8px;
      }
      .time {
        position: absolute;
        left: 10px;
        top: 10px;
        width: 50px;
        height: 16px;
        background: #000000;
        border-radius: 12px;
        opacity: 0.5;
        font-size: 12px;
        font-family: LibreFranklin-Regular, LibreFranklin;
        font-weight: 400;
        color: #ffffff;
        line-height: 15px;
        text-align: center;
      }
    }
    .home-stats {
      margin-top: 12px;
    }
    .info_item_box {
      height: 100%;
      .flex();
      justify-content: space-between;
      padding: 18px 16px 32px 16px;
      .info_item_left {
        height: 100%;
        .price {
          font-size: 16px;
          font-family: LibreFranklin-SemiBold, LibreFranklin;
          font-weight: 600;
          color: #333333;
          line-height: 19px;
        }
        .adress {
          font-size: 14px;
          font-family: LibreFranklin-Medium, LibreFranklin;
          font-weight: 500;
          color: #333333;
          line-height: 17px;
          margin-bottom: 5px;
        }
        .title {
          font-size: 12px;
          font-family: LibreFranklin-Regular, LibreFranklin;
          font-weight: 400;
          color: #666666;
          line-height: 15px;
        }
      }
      .info_item_right {
        height: 100%;
        .icon_img {
          width: 24px;
          height: 20px;
          transform: translateY(3px);
        }
      }
    }
  }
}
</style>
