<!--
relationState 合同状态 1 active 2   3 pedding

 -->

<template>
  <div v-loading="loading" class="hiring-history-container" :class="{ 'hireing-empty': listData.length === 0 }">
    <div v-infinite-scroll="infineLoad" infinite-scroll-disabled="autoLoading" infinite-scroll-distance="10" class="content">
      <el-row type="flex" :key="index" v-for="(item, index) in listData" class="hire_q_item" :class="'el-row-' + item.id">
        <el-col :xs="24" :sm="24" :lg="3" class="item-col1">
          <img class="hire_image" :src="item.agentHeaderImg" alt="" />
        </el-col>
        <el-col :xs="12" :sm="6" :lg="6" class="col-flex item-col2">
          <div class="agentTitle">{{ item.agentName }}</div>
          <div class="agentText">
            {{ item.inviteTitle }}
          </div>
        </el-col>
        <el-col :xs="12" :sm="6" :lg="3" class="col-flex item-col3">
          <!-- 按小时 -->
          <template v-if="item.payType === 0">
            <div class="agentText">Hourly</div>
            <div v-if="item.relationState === 3" class="agentText">Pending</div>
            <div v-else-if="item.relationState === 1" class="agentText">Active</div>
            <div v-else class="agentText">Completed</div>
          </template>
          <!-- 一口价 -->
          <template v-else>
            <div class="agentText">Fixed-price</div>
            <div v-if="item.relationState === 1" class="agentText">Active</div>
            <div v-if="item.relationState === 2" class="agentText">Completed</div>
          </template>
        </el-col>
        <el-col :xs="24" :sm="5" :lg="5" class="col-flex item-col4">
          <div class="agentText nowrap">Los Angeles, California</div>
          <div class="agentText">{{ parseTime(new Date(item.createTime), '{y}-{m}-{d} {h}:{i}') }}</div>
        </el-col>
        <el-col :xs="0" :sm="1" :lg="1" class="item-line"></el-col>
        <el-col :xs="24" :sm="6" :lg="6" class="item-col5">
          <!-- 按小时 -->
          <w-button
            v-if="item.relationState === 1"
            class="action_btn"
            width="102px"
            height="28px"
            bgColor="rgba(220, 86, 116, 0.2 "
            color="#DC5674"
            radius="6px"
            text="Rate now"
            size="12px"
            :iconShow="false"
            @handleClick="handlerRateNow(item)"
          ></w-button>
          <w-button
            v-if="item.relationState === 3"
            class="action_btn"
            width="102px"
            height="28px"
            bgColor="rgba(15, 27, 67, 0.1)"
            color="rgba(15, 27, 67, 0.4)"
            radius="6px"
            text="Pending"
            size="12px"
            :iconShow="false"
            disabled
          ></w-button>
          <div v-if="item.relationState === 2" class="rate-box">
            <el-rate :value="Number(item.evaluateScore) || 0" disabled />
            <div class="rage-title">{{ item.evaluateScore || 0 }}</div>
          </div>
        </el-col>
      </el-row>
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
        <p v-if="isMore && more && listData.length > 6" class="no-more-text">No More</p>
      </template>
      <template v-if="!listData.length && !loading">
        <Empty title="You haven't hired any agents yet" text="Check moafly agents" to="/agent"></Empty>
      </template>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/util/util';
import Empty from '@/views/client/personal/components/empty.vue';
import WButton from '@/components/Button';
import Is from '@/util/is.js';
import { getViliedRequestBackValue } from '@/util/util.js';
import * as api from '@/api';
export default {
  name: 'hire_history_new',
  components: {
    Empty,
    WButton
  },
  data() {
    return {
      billDetail: {}, //账单详情
      isCommetDisabled: false, //评价页面状态
      queryParams: {
        pageNum: 1,
        sortType: '',
        pageSize: 7
      }, //筛选项
      /** 雇佣历史记录 */
      listData: [],
      listData1: [
        {
          inviteTitle: '11111',
          agentHeaderImg: 'https://moaflytest.s3.us-east-2.amazonaws.com/moafly/20221030/1667061595527.png',
          agentName: '111111',
          relationState: 2,
          agentScore: 3,
          evaluateScore: 4,
          payType: 1,
          totalMoney: 10,
          createTime: '1111111111'
        },
        {
          inviteTitle: '11111',
          agentHeaderImg: 'https://moaflytest.s3.us-east-2.amazonaws.com/moafly/20221030/1667061595527.png',
          agentName: '111111',
          relationState: 2,
          agentScore: 3,
          evaluateScore: 4,
          payType: 1,
          totalMoney: 10,
          createTime: '1111111111'
        },
        {
          inviteTitle: '11111',
          agentHeaderImg: 'https://moaflytest.s3.us-east-2.amazonaws.com/moafly/20221030/1667061595527.png',
          agentName: '111111',
          relationState: 2,
          agentScore: 3,
          evaluateScore: 4,
          payType: 1,
          totalMoney: 10,
          createTime: '1111111111'
        },
        {
          inviteTitle: '11111',
          agentHeaderImg: 'https://moaflytest.s3.us-east-2.amazonaws.com/moafly/20221030/1667061595527.png',
          agentName: '111111',
          relationState: 2,
          agentScore: 3,
          evaluateScore: 4,
          payType: 1,
          totalMoney: 10,
          createTime: '1111111111'
        },
        {
          inviteTitle: '11111',
          agentHeaderImg: 'https://moaflytest.s3.us-east-2.amazonaws.com/moafly/20221030/1667061595527.png',
          agentName: '111111',
          relationState: 2,
          agentScore: 3,
          evaluateScore: 4,
          payType: 1,
          totalMoney: 10,
          createTime: '1111111111'
        },
        {
          inviteTitle: '11111',
          agentHeaderImg: 'https://moaflytest.s3.us-east-2.amazonaws.com/moafly/20221030/1667061595527.png',
          agentName: '111111',
          relationState: 2,
          agentScore: 3,
          evaluateScore: 4,
          payType: 1,
          totalMoney: 10,
          createTime: '1111111111'
        }
      ],
      /** 是否显示退押金窗口 */
      loading: false, //初次加载
      autoLoading: false, //控制滚动加载
      isMore: false, //判断数据加载完
      more: true
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
  created() {
    this.getData();
  },
  methods: {
    parseTime: parseTime,
    //无限滚动
    infineLoad() {
      if (!this.isMore && this.more) {
        this.autoLoading = true;
        this.queryParams.pageNum += 1;
        if (this.queryParams.pageNum > 1 && this.listData.length >= 7) {
          this.getData();
        }
      }
    },
    /** 更新当前页面历史记录 */
    async getData() {
      this.loading = true;
      await api.hiringHistory
        .getHistoryList(this.queryParams)
        .then(res => {
          if (getViliedRequestBackValue(res)) {
            if (Is.arrayEmpty(res.context.dataContent)) {
              this.isMore = true;
            }
            this.listData = this.listData.concat(res.context.dataContent);
            // this.listData = [];
            this.loading = false;
            this.autoLoading = false;
          }
        })
        .catch(err => {
          console.log('err===>', err);
          this.loading = false;
        });
    },
    /**
     * 点击去评分
     * @param {*} item
     */
    handlerRateNow(item) {
      this.$router.push(`/end_contrant?customreSalesRelationId=${item.customreSalesRelationId}&&agentName=${item.agentName}&&inviteTitle=${item.inviteTitle}`);
    }
  }
};
</script>

<style lang="less" scoped>
.hiring-history-container {
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  overflow-y: auto;
  .auto-load-box {
    width: 100%;
    height: 50px;
  }
  .no-more-text {
    margin-top: 10px;
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
  .hire_q_item {
    width: 100%;
    min-height: 110px;
    background: rgba(15, 27, 67, 0.02);
    border-radius: 8px;
    margin-bottom: 16px;
    padding: 16px 24px;
    box-sizing: border-box;
    margin-bottom: 16px;
    flex-wrap: wrap;
    gap: 30px 0;
    .agentTitle {
      width: 100%;
      .MoaflyText(400, 14px, 17px, #0f1b43);
    }
    .agentText {
      width: 100%;
      .MoaflyText(400, 14px, 17px, rgba(15, 27, 67, 0.6));
      margin-top: 6px;
    }
  }
  .col-flex {
    .flex();
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 10px 5px !important;
    box-sizing: border-box;
  }
  .item-col1 {
    padding: 0 !important;
    .hire_image {
      width: 78px;
      height: 78px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .item-line {
    border-right: 2px solid #f1f1f1;
    margin-left: -10px;
  }
  .item-col5 {
    @media (min-width: 768px) {
      .flex();
    }
    .rate-box {
      max-width: 180px;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      @media (min-width: 768px) {
        padding-left: 15px;
      }
      /deep/.el-rate__icon {
        font-size: 16px;
      }
      .rage-title {
        width: 34px;
        height: 16px;
        background: #fdd446;
        border-radius: 6px;
        .MoaflyText(400, 12px, 15px, #ffffff);
        text-align: center;
        margin-left: 10px;
      }
    }
  }
}
.hireing-empty {
  .flex();
}
</style>
