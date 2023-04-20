<template>
  <div v-if="listData1.length === 0 && !loading" class="my-offers-empty">
    <Empty title="You haven't listed any property" text="Sell Your Home Now" to="/sell/Address"></Empty>
  </div>
  <div v-else v-infinite-scroll="infineLoad" infinite-scroll-disabled="loading" class="my-offers-container">
    <el-row :gutter="20">
      <Item v-for="(offer, index) in listData1" :item="offer" :key="index"></Item>
    </el-row>
    <QInnerLoading :visible="loading"></QInnerLoading>
  </div>
</template>
<script>
import Empty from '../components/empty.vue';
import Item from './components/item.vue';
import * as api from '@/api';
import QInnerLoading from '@/components/QInnerLoading/index';
export default {
  components: { Empty, Item, QInnerLoading },
  data() {
    return {
      listData: [],
      listData1: [
        {
          imgUrl: 'https://moaflytest.s3.us-east-2.amazonaws.com/moafly/20220428/1651146742430.jpg',
          listPrice: 111,
          bedRoomsTotal: '111',
          bathRoomsTotal: '1111',
          livingArea: 111,
          houseAddress: '1111'
        },
        {
          imgUrl: 'https://moaflytest.s3.us-east-2.amazonaws.com/moafly/20220428/1651146742430.jpg',
          listPrice: 111,
          bedRoomsTotal: '111',
          bathRoomsTotal: '1111',
          livingArea: 111,
          houseAddress: '1111'
        },
        {
          imgUrl: 'https://moaflytest.s3.us-east-2.amazonaws.com/moafly/20220428/1651146742430.jpg',
          listPrice: 111,
          bedRoomsTotal: '111',
          bathRoomsTotal: '1111',
          livingArea: 111,
          houseAddress: '1111'
        },
        {
          imgUrl: 'https://moaflytest.s3.us-east-2.amazonaws.com/moafly/20220428/1651146742430.jpg',
          listPrice: 111,
          bedRoomsTotal: '111',
          bathRoomsTotal: '1111',
          livingArea: 111,
          houseAddress: '1111'
        },
        {
          imgUrl: 'https://moaflytest.s3.us-east-2.amazonaws.com/moafly/20220428/1651146742430.jpg',
          listPrice: 111,
          bedRoomsTotal: '111',
          bathRoomsTotal: '1111',
          livingArea: 111,
          houseAddress: '1111'
        },
        {
          imgUrl: 'https://moaflytest.s3.us-east-2.amazonaws.com/moafly/20220428/1651146742430.jpg',
          listPrice: 111,
          bedRoomsTotal: '111',
          bathRoomsTotal: '1111',
          livingArea: 111,
          houseAddress: '1111'
        },
        {
          imgUrl: 'https://moaflytest.s3.us-east-2.amazonaws.com/moafly/20220428/1651146742430.jpg',
          listPrice: 111,
          bedRoomsTotal: '111',
          bathRoomsTotal: '1111',
          livingArea: 111,
          houseAddress: '1111'
        },
        {
          imgUrl: 'https://moaflytest.s3.us-east-2.amazonaws.com/moafly/20220428/1651146742430.jpg',
          listPrice: 111,
          bedRoomsTotal: '111',
          bathRoomsTotal: '1111',
          livingArea: 111,
          houseAddress: '1111'
        },
        {
          imgUrl: 'https://moaflytest.s3.us-east-2.amazonaws.com/moafly/20220428/1651146742430.jpg',
          listPrice: 111,
          bedRoomsTotal: '111',
          bathRoomsTotal: '1111',
          livingArea: 111,
          houseAddress: '1111'
        }
      ],
      queryParams: {
        pageNum: 1,
        pageSize: 3
      },
      loading: false
    };
  },
  mounted() {
    this.getDate();
  },
  methods: {
    //无限滚动
    infineLoad() {
      this.loading = true;
      this.queryParams.pageNum += 1;
      this.getDate();
    },
    getDate() {
      this.loading = true;
      api.offer.getOfferList(this.queryParams).then(res => {
        if (res.code !== 'K-000000') throw 'load invite record list failed';
        this.listData = this.listData.concat(res.context.dataContent);
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped lang="less">
@import './index';
</style>
