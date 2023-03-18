<template>
  <div v-loading="loading" class="sell-home-main">
    <div v-infinite-scroll="infineLoad" infinite-scroll-disabled="autoLoading" infinite-scroll-distance="10" class="my-selling-home-container">
      <Witem
        v-for="item in listData"
        :key="item.id"
        :item="item"
        @handleClick="handleViewDetail"
        @handleSignContract="handleSignContract"
        @handleRemove="handleRemove"
        @handleQuestion="handleQuestion"
      ></Witem>
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
        <p v-if="isMore && more && listData.length > 9" class="no-more-text">No More</p>
      </template>
      <template v-if="!listData.length > 0 && !loading">
        <Empty title="You haven't listed any property" text="Sell Your Home Now" to="/sell"></Empty>
      </template>
      <!-- 合同提示弹窗 -->
      <MoaflyDialog title="Publish listings" class="publish-dialog" :visible.sync="publishDialog">
        <div class="publish-box">
          <img class="publish-img margin-auto" :src="require('@/assets/images/sell/complete2.png')" alt="" />
          <p class="publish-title">One more step left!</p>
          <p class="publish-text">
            You need to sign listing contract before we list your home to local MLS.
          </p>
          <div class="btn-box">
            <WButton radius="4px" text="Cancel" color="#DC5674" border="1px solid #DC5674" width="100px" height="32px" bgColor="#fff" @handleClick="handlerPathSellHome"></WButton>
            <WButton radius="4px" text="Sign contract" width="149px" height="32px" @handleClick="handlerContract" class="next-btn"></WButton>
          </div>
        </div>
      </MoaflyDialog>
      <!-- 合同上传弹窗 -->
      <contract
        :isShow="contractIsShow"
        @handleClose="contractIsShow = false"
        :homeItemInfo="homeItemInfo"
        @handleCancel="contractIsShow = false"
        @contractSubmitSucssful="contractSubmitSucssful"
      ></contract>
      <!-- 房屋留言 -->
      <questionDialog ref="questionDialog" :homeItemInfo="homeItemInfo"></questionDialog>
    </div>
  </div>
</template>
<script>
import WPopups from '@/components/Popups';
import Empty from '@/views/client/personal/components/empty.vue';
import contract from './components/contract-dialog.vue';
import MoaflyDialog from '@/components/MoaflyDialog';
import questionDialog from './components/question-dialog.vue';
import * as api from '@/api';
import Witem from './components/item';
import WButton from '@/components/Button';
import PreButton from '@/components/Pre';
import { getViliedRequestBackValue } from '@/util/util.js';
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: { Witem, Empty, WPopups, WButton, PreButton, contract, MoaflyDialog, questionDialog },
  data() {
    return {
      listData: [],
      homeItemInfo: {}, //卖家房屋信息
      houseId: '',
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      home: 'default',
      loading: false, //初次加载
      autoLoading: false, //控制滚动加载
      isMore: false, //判断数据加载完
      more: true,
      contractIsShow: false, //合同弹窗
      publishDialog: false //合同提示弹窗
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log(to, from);
    next(vm => {
      if (from.path == '/sell/preview') {
        vm.publishDialog = true;
        vm.houseId = to.query.houseId;
        vm.getHomeDetailForId();
      }
      // vm.publishDialog = true;
    });
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
  },
  methods: {
    getHomeDetailForId() {
      api.home
        .getCompleteHomeDetail(this.houseId)
        .then(res => {
          if (res.code === 'K-000000') {
            if (res.context) {
              this.homeItemInfo = res.context.houseInfoVO;
            }
          }
        })
        .catch(err => {
          console.log('发生错误==>', err);
        });
    },
    //无限滚动
    infineLoad() {
      if (!this.isMore && this.more) {
        this.autoLoading = true;
        this.queryParams.pageNum += 1;
        if (this.queryParams.pageNum > 1 && this.listData.length >= 10) {
          this.getData();
        }
      }
    },
    async getData() {
      this.loading = true;
      await api.home
        .getHomeList(this.queryParams)
        .then(res => {
          if (getViliedRequestBackValue(res)) {
            if (res.context.dataContent.length == 0) {
              this.isMore = true;
            }
            this.listData = this.listData.concat(res.context.dataContent);
            this.loading = false;
          } else {
            this.isMore = true;
          }
          this.autoLoading = false;
        })
        .catch(err => {
          console.log('err===>', err);
          this.loading = false;
        });
    },
    /**
     * 弹窗按钮
     * @return {*}
     * @author: zulezhe
     */
    handlerPathSellHome() {
      this.$router.push('/person/selling-homes');
    },
    //打开合同弹窗
    handlerContract(item) {
      this.publishDialog = false;
      this.contractIsShow = true;
      this.currentHouse = item;
    },
    /**
     * 打开问题弹窗
     */
    handleQuestion(homeItemInfo) {
      this.homeItemInfo = homeItemInfo;
      this.$refs.questionDialog.init();
    },
    /**
     * 查看房屋详情
     * @param {*} homeItemInfo
     */
    handleViewDetail(homeItemInfo) {
      this.homeItemInfo = homeItemInfo;
    },
    /**
     * 签署房屋合同
     * @return {*}
     * @author: zulezhe
     */
    handleSignContract(homeItemInfo) {
      this.contractIsShow = true;
      this.homeItemInfo = homeItemInfo;
    },
    /**
     * 删除房屋
     * @param {*} item
     */
    handleRemove(item) {
      this.$confirm('Are you sure to delete this house?', 'Confirmation', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          api.home
            .removeHome(item.houseId)
            .then(res => {
              if (res.code === 'K-000000') {
                this.$message.success('del successfully');
                this.queryParams.pageNum = 1;
                this.listData = [];
                this.getData();
              } else {
                this.$message.error(res.message);
              }
            })
            .catch(err => {
              console.log('删除房屋报错');
            });
        })
        .catch(() => {
          console.log('取消删除');
        });
    },
    /**
     * 合同提交成功
     * @param {*} pdfUrl
     */
    contractSubmitSucssful() {
      this.$message.success('Contract submission successful');
      this.contractIsShow = false;
      this.queryParams.pageNum = 1;
      this.listData = [];
      this.getData();
    }
  }
};
</script>
<style scoped lang="less">
.sell-home-main {
  width: 100%;
  height: 100%;
}
.my-selling-home-container {
  width: calc(100% - 48px);
  height: 790px;
  padding: 24px;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
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
  .w-popups {
    .content {
      max-width: 656px;
      width: 100%;
      height: 326px;
      background: #ffffff;
      box-shadow: 11px 11px 42px 0px rgba(27, 23, 98, 0.15);
      border-radius: 10px;
      .header {
        .title {
          height: 22px;
          .MoaflyText(bold, 24px, 34px, #333333);
          margin: 66px 0 0 79px;
        }
        .el-radio-group {
          display: flex;
          flex-direction: column;
          margin: 20px 0 0 79px;
          .el-radio {
            margin-bottom: 20px;
          }
        }
      }
      .footer {
        display: flex;
        justify-content: flex-start;
        margin: 41px 0 0 79px;
        .w-button {
          margin-right: 20px;
        }
      }
    }
  }
  // 合同提示弹窗样式
  ::v-deep {
    .publish-dialog {
      .el-dialog {
        max-width: 600px;
        width: 100% !important;
      }
      .el-dialog__body {
        padding: 30px 20px;
        @media (min-width: 768px) {
          padding: 40px 72.85px;
        }
        box-sizing: border-box;
      }
      .publish-box {
        width: 100%;
        border-radius: 16px;
        .flex();
        flex-direction: column;
        .publish-img {
          display: block;
        }
        .publish-title {
          .MoaflyText(400, 16px, 18px, #0f1b43);
          margin-top: 15px;
          text-align: center;
        }
        .title-top {
          margin-top: 24px;
        }
        .text-top {
          margin-top: 16px;
        }
        .publish-text {
          .MoaflyText(400, 14px, 18px, rgba(15, 27, 67, 0.6));
          text-align: center;
          line-height: 18px;
          max-width: 305px;
          word-break: break-word;
        }
        .btn-box {
          .flex();
          margin-top: 50px;
          .button-container {
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>
