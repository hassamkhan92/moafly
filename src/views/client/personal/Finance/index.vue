<template>
  <div v-loading="loading" class="person-billing-unpaid-container">
    <div class="hire_header">
      <div class="hire_header_select_box">
        <el-input class="search-input" suffix-icon="el-icon-search" v-model="queryParams.nameOrEmail" placeholder="Name or Email" @keyup.enter.native="handleSearch"></el-input>
      </div>
    </div>
    <div v-infinite-scroll="infineLoad" infinite-scroll-disabled="autoLoading" infinite-scroll-distance="10" class="scroll-box">
      <Item v-for="item in listData" :item="item" :key="item.id" @handlerPay="handlerPay" @addConflict="addConflict"></Item>
      <!-- 滚动内容 -->
      <template v-if="listData.length">
        <div
          v-if="loading && !isMore"
          element-loading-customClass="loading-auto"
          v-loading="loading"
          element-loading-text="Loading..."
          element-loading-spinner="el-icon-loading"
          class="auto-load-box"
        ></div>
        <p class="no-more-text" v-if="isMore && more && listData.length > 5">No More</p>
      </template>
      <template v-if="!listData.length && !loading">
        <Empty class="empty" title="You don’t have any billing records" text="Sell Your Home Now" to="/sell"></Empty>
      </template>
    </div>
    <enterPayMentDialog btnTitle="Add card" ref="enterPayMentDialog"></enterPayMentDialog>
    <payMentDialog @handlerAddCard="handlerAddCard" ref="payMentDialog"></payMentDialog>
    <paymentDetailDialog @handleSubmit="handleSubmit" ref="paymentDetailDialog"></paymentDetailDialog>
  </div>
</template>
<script>
import Item from './components/item.vue';
import Empty from '../components/empty.vue';
import enterPayMentDialog from '@/views/client/personal/wallet/components/enterPayMentDialog.vue';
import payMentDialog from '@/views/client/personal/wallet/components/payMentDialog.vue';
import paymentDetailDialog from '@/views/client/personal/wallet/components/paymentDetailDialog.vue';
import { getPayInfo, confirmSubmit, getViliedRequestBackValue, setSessionPayLink } from '@/util/util.js';
import Is from '@/util/is.js';
import * as api from '@/api';
export default {
  components: { Item, Empty, enterPayMentDialog, payMentDialog, paymentDetailDialog },
  data() {
    return {
      payUrl: 'https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xS0UzUlRHc2dXTVVFSWVrKJWlspwGMgaD6kKgk4U6LBb2XvNLNxAL9uq09-vZrP8WaQW4o6t4wJII0xddCaA0hIxof3W9qVOZq8X-',
      listData: [],
      listData1: [
        {
          id: 1,
          agentName: '11111',
          agentPhoneNum: '1111111',
          agentEmail: '11111',
          orderTitle: '11111111',
          orderMoney: '11111',
          orderStatus: 0,
          createTime: '111111',
          orderDetailVOList: [
            {
              detailTitle: '11111',
              detailHour: 1,
              detailMoney: 1,
              orderMoney: 10
            },
            {
              detailTitle: '22222',
              detailHour: 1,
              detailMoney: 1,
              orderMoney: 10
            },
            {
              detailTitle: '33333',
              detailHour: 1,
              detailMoney: 1,
              orderMoney: 10
            },
            {
              detailTitle: '444444',
              detailHour: 1,
              detailMoney: 1,
              orderMoney: 10
            }
          ]
        },
        {
          id: 2,
          agentName: '11111',
          agentPhoneNum: '1111111',
          agentEmail: '11111',
          orderTitle: '11111111',
          orderMoney: '11111',
          orderStatus: 1,
          createTime: '111111',
          orderDetailVOList: [
            {
              detailTitle: '11111',
              detailHour: '11111',
              detailMoney: '1111',
              orderMoney: '1111'
            }
          ]
        },
        {
          id: 3,
          agentName: '11111',
          agentPhoneNum: '1111111',
          agentEmail: '11111',
          orderTitle: '11111111',
          orderMoney: '11111',
          orderStatus: 0,
          createTime: '111111',
          orderDetailVOList: [
            {
              detailTitle: '11111',
              detailHour: '11111',
              detailMoney: '1111',
              orderMoney: '1111'
            }
          ]
        },
        {
          id: 4,
          agentName: '11111',
          agentPhoneNum: '1111111',
          agentEmail: '11111',
          orderTitle: '11111111',
          orderMoney: '11111',
          orderStatus: 0,
          createTime: '111111',
          orderDetailVOList: [
            {
              detailTitle: '11111',
              detailHour: '11111',
              detailMoney: '1111',
              orderMoney: '1111'
            }
          ]
        },
        {
          id: 5,
          agentName: '11111',
          agentPhoneNum: '1111111',
          agentEmail: '11111',
          orderTitle: '11111111',
          orderMoney: '11111',
          orderStatus: 0,
          createTime: '111111',
          orderDetailVOList: [
            {
              detailTitle: '11111',
              detailHour: '11111',
              detailMoney: '1111',
              orderMoney: '1111'
            }
          ]
        },
        {
          id: 6,
          agentName: '11111',
          agentPhoneNum: '1111111',
          agentEmail: '11111',
          orderTitle: '11111111',
          orderMoney: '11111',
          orderStatus: 0,
          createTime: '111111',
          orderDetailVOList: [
            {
              detailTitle: '11111',
              detailHour: '11111',
              detailMoney: '1111',
              orderMoney: '1111'
            }
          ]
        }
      ],
      loading: false, //初次加载
      autoLoading: false, //控制滚动加载
      isMore: false, //判断数据加载完
      more: true,
      queryParams: {
        pageNum: 1,
        pageSzie: 4,
        nameOrEmail: ''
      }
    };
  },
  watch: {
    isMore: function(val) {
      if (val) {
        setTimeout(() => {
          this.more = false;
        }, 1000);
      }
    }
  },
  mounted() {
    this.getData();
    // this.mockInit();
  },
  methods: {
    handleSearch() {
      this.listData = [];
      this.queryParams.pageNum = 1;
      this.getData();
    },
    /**
     * 获取数据
     */
    async getData() {
      this.loading = true;
      await api.bill
        .getUserBillList(this.queryParams)
        .then(res => {
          if (getViliedRequestBackValue(res)) {
            if (Is.arrayEmpty(res.context.dataContent)) {
              this.isMore = true;
            }
            let result = res.context.dataContent;
            let filterList = result.filter(item => item.orderStatus !== 2);
            this.listData = this.listData.concat(filterList);
            // this.listData = [];
            this.autoLoading = false;
          }
          this.loading = false;
        })
        .catch(err => {
          console.log('err===>', err);
          this.loading = false;
        });
    },
    addConflict() {
      this.getData();
    },
    handleCurrentChange({ page }) {
      this.queryParams.pageNum = page;
      this.getData();
    },
    //支付
    handlerPay(item) {
      let payData = {
        orderCode: item.orderCode,
        orderMoney: item.orderMoney,
        paymentMethodId: ''
      };
      getPayInfo().then(data => {
        if (data) {
          this.$refs.paymentDetailDialog.init(payData, 1);
        } else {
          this.$refs.payMentDialog.init();
        }
      });
    },
    //绑定银行卡
    handlerAddCard() {
      this.$refs.enterPayMentDialog.init();
    },
    //确认支付
    handleSubmit(payData, payType) {
      confirmSubmit(payData).then(res => {
        if (res) {
          // this.$refs.paymentDetailDialog.handlerClose();
          this.getData();
          setTimeout(() => {
            setSessionPayLink(res);
            this.$router.push('/pay/success');
          }, 2000);
        } else {
          this.$refs.paymentDetailDialog.btnLoad = false;
        }
      });
    },
    mockInit() {
      this.loading = true;
      setTimeout(() => {
        if (this.queryParams.pageNum == 3) {
          this.isMore = true;
        } else {
          this.listData = this.listData.concat(this.listData1);
          this.loading = false;
          this.autoLoading = false;
        }
      }, 1000);
    },
    //无限滚动
    infineLoad() {
      if (!this.isMore && this.more) {
        this.autoLoading = true;
        this.queryParams.pageNum += 1;
        if (this.queryParams.pageNum > 1 && this.listData.length >= 4) {
          this.getData();
        }
        // this.mockInit();
      }
    }
  }
};
</script>
<style scoped lang="less">
.person-billing-unpaid-container {
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  .flex();
  flex-wrap: wrap;
  align-items: flex-start;
  .empty {
    height: 200px;
    margin-top: 160px;
  }
  .hire_header {
    width: 100%;
    margin-bottom: 15px;
    .hire_header_select_box {
      max-width: 280px;
      width: 100%;
      /deep/.search-input {
        .el-input__inner {
          width: 100%;
          height: 36px;
          background: #ffffff;
          border: 1px solid rgba(15, 27, 67, 0.2);
          border-radius: 6px;
        }
      }
    }
  }
  .scroll-box {
    width: 100%;
    height: calc(100% - 100px);
    overflow-y: auto;
    .auto-load-box {
      width: 100%;
      height: 50px;
    }
    .no-more-text {
      .MoaflyText(400, 14px, 17px, #dc5674);
      text-align: center;
      width: 100%;
    }
    /deep/.el-loading-spinner {
      .el-icon-loading {
        color: #dc5674;
      }
      .el-loading-text {
        color: #dc5674;
      }
    }
  }
}
</style>
