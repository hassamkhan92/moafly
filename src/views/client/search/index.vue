<!--
 * @Author: zulezhe
 * @Date: 2022-02-25 00:22:21
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-30 00:11:30
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="search-container">
    <!-- 内容区域 -->
    <div class="search-content">
      <div class="search-content-left">
        <!-- 地址查询 -->
        <el-input id="auto-search-address" v-model="params.address" placeholder="City, Address, Zip Code" class="address-input"> <i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
        <div id="pop-content" v-show="pop.isShow">{{ pop.content }}</div>
        <Map el="map" @complete="mapComplete"></Map>
      </div>
      <div class="search-content-right">
        <div class="handle-container">
          <div class="title">
            <p>Home for sale in Los Angeles</p>
            <p class="count">{{ params.total }} listings found homes</p>
          </div>
          <div class="search-header-box">
            <section class="search-header">
              <!-- 价格 -->
              <Popover popper-class="price-pop" placeholder="Price" :isShow="priceVisible" text="">
                <PricePopover slot="content" @confirmPrice="confirmPrice"></PricePopover>
              </Popover>
              <!-- 卧室 -->
              <Popover :isShow="bathRoomsVisible" popper-class="bathrooms-pop pox-box" placeholder="Bedroom" text="">
                <PopoverContent slot="content" :list="bedList" @select="handleBedroomSelect"></PopoverContent>
              </Popover>
              <!-- 浴室 -->
              <Popover :isShow="restRoomsVisible" popper-class="restroom-pop pox-box" placeholder="Restroom" text="">
                <PopoverContent slot="content" @select="handleBathroomSelect"></PopoverContent>
              </Popover>
              <!-- homes -->
              <Popover :isShow="homesRoomsVisible" popper-class="homes-pop pox-box" placeholder="Listing Type" text="">
                <PopoverContent slot="content" :list="homesList" @select="handleHomeSelect"></PopoverContent>
              </Popover>
            </section>
          </div>
        </div>
        <div v-infinite-scroll="load" class="content-container" v-loading="loading">
          <Empty v-if="isEmpty" text="Find Your Homes" to="/search"></Empty>
          <Item
            v-else
            v-for="item in homeList"
            :key="item.listingKey"
            :item="item"
            @handleViewDetail="handleViewDetail"
            @handleCheckShare="handleCheckShare"
            @handleCheckFavorite="handleCheckFavorite"
          ></Item>
          <div v-if="loading" v-loading="loading" class="item-mask"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { autoSearch, deleteMarker } from '@/Gmap/core/index.js';
import Item from './components/item.vue';
import PricePopover from './components/price-popover.vue';
import PopoverContent from './components/popover-content.vue';
import Map from '@/Gmap/ui/Map';
import Empty from '@/components/Empty/index.vue';
import Popover from '@/components/Popover/index.vue';
import * as api from '@/api';
import { formatNumber, numberFormat } from '@/util/index.js';
let markerList = [];
export default {
  components: { Item, Map, Empty, Popover, PricePopover, PopoverContent },
  data() {
    return {
      pop: {
        isShow: true,
        content: ''
      },
      isEmpty: false,
      loading: false,
      position: null,
      priceVisible: false,
      restRoomsVisible: false,
      bathRoomsVisible: false,
      homesRoomsVisible: false,
      bedNums: 0,
      bedActive: 'no limit',
      restNums: 0,
      restActive: 'no limit',
      bedList: ['no limit', '1', '2', '3', '4', '5', '6', '7', '8+'],
      homesList: ['For sale', 'For rental'],
      homesActive: '',
      params: {
        sort: '',
        address: '',
        postalCode: '',
        maxPrice: '',
        minPrice: '',
        total: 0,
        bathrooms: '',
        bedrooms: ''
      },
      searchParams: {
        maxLatitude: '',
        maxLongitude: '',
        maxPrice: '',
        minLatitude: '',
        minLongitude: '',
        minPrice: 0,
        bathroomsFull: '',
        bedroomsTotal: '',
        stateOrProvince: '',
        unparsedAddress: '',
        city: '',
        postalCity: '',
        postalCode: '',
        pageNum: 1,
        pageSize: 10
      },
      rectangle: null, // 查询范围
      homeList: [],
      priceRange: [100000, 1000000],
      minPrice: true, //最小价格是否显示
      minPriceList: [100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000],
      maxPrice: false, //最高价格是否显示
      maxPriceList: [],
      minLenght: null,
      maxLenght: null
    };
  },
  mounted() {},
  methods: {
    handleBedroomSelect(item) {
      console.log('选中卧室==>', item);
      this.searchParams.bedroomsTotal = item === 'no limit' ? '' : item;
      this.searchParams.pageNum = 1;
      this.homeList = [];
      this.getHomeList();
    },
    handleBathroomSelect(item) {
      console.log('选中浴室==>', item);
      this.searchParams.bathroomsFull === 'no limit' ? '' : item;
      this.searchParams.pageNum = 1;
      this.homeList = [];
      this.getHomeList();
    },
    handleHomeSelect(item) {
      console.log('选中卖房类型==>', item);
      // this.searchParams.bathroomsFull = item;
      // this.searchParams.pageNum = 1;
      // this.homeList=[]
      // this.getHomeList()
    },
    handleChange(val) {
      if (val === 'listPrice2') {
        this.homeList.sort((a, b) => a.listPrice - b.listPrice);
      } else {
        this.homeList.sort((a, b) => b[val] - a[val]);
      }
      console.log('排序结果', this.homeList);
    },
    // 价格确定后回调
    confirmPrice(val) {
      this.searchParams.maxPrice = val.maxPrice;
      this.searchParams.minPrice = val.minPrice;
      this.handleSearch();
    },
    numberFormat(val) {
      return numberFormat(val);
    },
    formatNumber(val) {
      return formatNumber(val);
    },
    //无限滚动
    load() {
      this.searchParams.pageNum += 1;
      this.getHomeList();
    },
    handleSaveSearch() {
      this.handleSearch();
    },
    /**
     * 搜索方法
     */
    handleSearch() {
      this.searchParams.minLongitude = '';
      this.searchParams.minLatitude = '';
      this.searchParams.maxLongitude = '';
      this.searchParams.maxLatitude = '';
      this.homeList = [];
      this.getHomeList();
    },
    getBounds() {
      this.searchParams.minPrice = this.priceRange[0];
      this.searchParams.maxPrice = this.priceRange[1] == 'Any' ? '' : this.priceRange[1];
      let bounds = this.map.getBounds().toJSON();
      this.searchParams.minLongitude = bounds.west;
      this.searchParams.minLatitude = bounds.south;
      this.searchParams.maxLongitude = bounds.east;
      this.searchParams.maxLatitude = bounds.north;
      this.rectangle && this.rectangle.setMap(null);
      this.rectangle = new google.maps.Rectangle({
        strokeColor: '#353f62',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.05,
        map: this.map,
        bounds: bounds
      });
      this.rectangle.setMap(this.map);
      this.getHomeList();
    },
    //自定义修改数字
    handlerNumChange(type, activeName, valueName, step) {
      step = step ? step : 1;
      if (type === 0) {
        if (this[valueName] == 0) {
          this[valueName] = 0;
          return;
        }
        this[valueName] = this[valueName] - step;
      } else {
        this[valueName] = this[valueName] + step;
      }
      this[activeName] = this[valueName];
    },
    /**
     * 查看详情
     */
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
    },
    /**
     * 查询房屋数据
     */
    getHomeList() {
      this.loading = true;

      api.search
        .getHomeList(this.searchParams)
        .then(res => {
          if (res.code === 'K-000000' && res.context) {
            if (res.context.dataContent && Array.isArray(res.context.dataContent)) {
              if (res.context.dataContent.length > 0) {
                this.homeList = this.homeList.concat(res.context.dataContent);
                this.params.total = res.context.totalNum;
                this.isEmpty = false;
                this.loading = false;
                // console.log('this.homeList===>', this.homeList);
                this.addMarker(this.homeList);
              } else {
                this.params.total = 0;
                this.setEmpty();
              }
            } else {
              this.params.total = 0;
              this.setEmpty();
            }
          } else {
            this.params.total = 0;
            this.setEmpty();
          }
        })
        .catch(err => {
          console.log('搜索房屋失败', err);
          this.isEmpty = false;
          this.loading = false;
          this.params.total = 0;
        });
    },
    setEmpty() {
      this.isEmpty = true;
      this.loading = false;
    },
    /**
     * 地图加载完成
     */
    mapComplete(map) {
      console.log('地图加载完成==>', map);
      this.map = map;
      let el = document.getElementById('auto-search-address');
      // map.addListener('bounds_changed', throttle(this.getBounds, 1000));
      map.addListener('dragend', () => {
        console.log('拖拽');
      });
      map.addListener('zoom_changed', () => {
        console.log('zoom_changed');
      });
      autoSearch(el, map, (res, place) => {
        this.searchParams.unparsedAddress = res.address;
        this.searchParams.city = res.locality;
        this.searchParams.stateOrProvince = res.state;
        this.searchParams.postalCode = res.postcode.split('-')[0];
        this.rectangle && this.rectangle.setMap(null);
        this.rectangle = new google.maps.Rectangle({
          strokeColor: '#353f62',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.05,
          map: this.map,
          bounds: res.bounds.toJSON()
        });
        this.rectangle.setMap(this.map);
        this.handleSearch();
      });
    },
    addMarker(data) {
      let popContent = document.getElementById('pop-content');
      markerList &&
        markerList.map(item => {
          deleteMarker(item);
        });
      data.map(item => {
        let url = item.imgUrl[0];
        const contentString = `<div id="content" style="display:flex">
                                  <div class="left-con">
                                    <a href="#/roomDetails/${item.listingKey}">
                                       <img style="width:40px;height:50px" src="${url}"/>
                                    </a>
                                  </div>
                                  <div class="right-con" style="margin-left:10px">
                                    <div>${'$' + formatNumber(item.listPrice)}</div>
                                    <div>${item.bedroomsTotal || '-'} bd, ${item.bathroomsHalf + item.bathroomsFull} ba</div>
                                    <div>${numberFormat(item.lotSizeArea)}sqft</div>
                                  </div>
                                </div>`;
        const infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        const marker = new google.maps.Marker({
          icon: {
            url: require('@/assets/images/circle.png'),
            size: new google.maps.Size(24, 24),
            scaledSize: new google.maps.Size(24, 24)
          },
          label: {
            text: '$' + formatNumber(item.listPrice),
            className: 'map-custom-label',
            fontFamily: 'custom-label'
          },
          position: { lng: Number(item.longitude), lat: Number(item.latitude) },
          map: this.map
        });
        markerList.push(marker);
        marker.addListener('mouseover', () => {
          infowindow.open(this.map, marker);
        });
        marker.addListener('mouseout', () => {
          // infowindow.close();
          infowindow.setPosition(null);
        });
      });
    }
  }
};
</script>
<style scoped lang="less">
@import url('./index.less');
</style>
<style lang="less">
.el-popover__reference {
  height: 36px;
  box-shadow: 0px 4px 12px rgba(55, 64, 95, 0.2);
  border-radius: 6px;
  .el-button {
    height: 36px;
  }
  span {
    width: 100%;
    .flex();
    justify-content: space-between;
  }
  &:hover {
    color: #0f1b43;
    border-color: #dc5674;
    background-color: #ffffff;
  }
}
.el-popover {
  .center-con {
    .item-list {
      .title-con {
        margin-bottom: 20px;
        font-size: 16px;
        font-family: LibreFranklin-Medium, LibreFranklin;
        font-weight: 500;
        color: #333333;
      }
      &:nth-child(2) {
        margin-top: 20px;
      }
    }
    .handle-con {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
    }
  }
}
// 地址输入框
.address-input {
  height: 36px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #dddddd;
  .el-input__prefix {
    width: 20px;
    left: auto;
    right: 15px;
  }
}
.pox-box {
  background: #ffffff;
  border: 1px solid #dc5674;
  box-shadow: 0px 4px 12px rgba(15, 27, 67, 0.2);
  border-radius: 6px;
  padding: 0;
}
// 价格弹窗
.price-pop {
  height: 232px;
  padding: 28px 30px 16px;
  box-sizing: border-box;
  .border();
  .bedrooom-content {
    .opera-box {
      padding-top: 0;
    }
  }
}
// 卧室和浴室
.bathrooms-pop {
  min-height: 300px;
}
.homes-pop {
  height: 80px;
  .bedrooom-content {
    .opera-box {
      padding-top: 0;
    }
  }
}
.restroom-pop {
  height: 300px;
}
.map-custom-label {
  background: #fff;
  border-radius: 10px;
  padding: 0px 4px;
  font-size: 12px;
  margin-top: 30px;
  transform: scale(0.9);
}
</style>
