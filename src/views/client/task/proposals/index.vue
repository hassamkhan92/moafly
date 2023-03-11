<template>
  <div v-loading="loading" class="view_proposal2_main">
    <div v-for="(proItem, proIdx) in proposalList" :key="proIdx" class="view_proposal2_user_box">
      <img class="view_proposal2_user_img" :src="proItem.agentHeaderImg" alt="" />
      <div class="view_proposal2_user_details">
        <div class="view_proposal2_user_name">
          <p class="view_proposal2_user_name_text">{{ proItem.agentName }}</p>
          <div class="view_proposal2_user_btns_box">
            <WButton @handleClick="handlerHire(proItem)" class="btn" bgColor="rgba(220, 86, 116, 0.3)" text="Hire" width="92px" height="28px" size="14px" radius="6px" color="#DC5674"></WButton>
            <!-- <WButton class="empty-button" height="30px" @handleClick="handlerHire(proItem)" text="Hire" width="92px"></WButton> -->
          </div>
        </div>
        <p class="view_proposal2_user_price">
          <i class="el-icon-price-tag icon_left"></i>
          <span class="view_proposal2_user_price_text">{{ proItem.agentPrice }} USD / hour</span>
        </p>
        <div class="view_proposal2_price_box">
          <p class="view_proposal2_user_adress">
            <i class="el-icon-location-outline icon_left"></i>
            <span class="view_proposal2_user_adress_text">{{ proItem.agentLocation }}</span>
          </p>
          <div class="view_proposal2_user_rate proposals_left">
            <el-rate :value="proItem.agentScore && Number(proItem.agentScore)" disabled text-color="#ff9900"> </el-rate>
            <p class="view_proposal2_user_rate_text icon_left">{{ proItem.agentScore || 0.0 }}</p>
          </div>
        </div>
        <p class="view_proposal2_user_title">
          {{ proItem.proposalContent }}
        </p>
        <div class="view_proposal2_user_labels">
          <div v-for="(item, itemIdx) in proItem.agentSkills.split(',')" :key="itemIdx" class="labels_item">{{ item }}</div>
        </div>
      </div>
    </div>
    <el-empty v-if="proposalList.length === 0"></el-empty>
    <w-pagination v-if="proposalList.length > 0" class="pagination" :total="totalNum" :page="agentParams.pageNum" :limit="5" layout="prev,pager,next" @update:page="handleCurrentUpdate" />
  </div>
</template>

<script>
import Skeleton from '@/components/Skeleton';
import agentImage1 from '@/assets/images/agent/avatar.png';
import WPagination from '@/components/Pagination';
import WButton from '@/components/Button/index.vue';
import { getViliedRequestBackValue } from '@/util/util';
import * as api from '@/api';
export default {
  components: {
    WPagination,
    WButton,
    Skeleton
  },
  data() {
    return {
      agentImage1: agentImage1,
      totalNum: 5,
      loading: false,
      agentParams: {
        pageNum: 1,
        pageSize: 10,
        taskId: this.$route.query.taskId
      },
      isEmpty: false,
      value: 3.7,
      proposalList: [],
      labelsData: ['Graphic Design', 'English', 'Content Writing', 'HTML', 'Writing', 'Web Design', 'Content Writing', 'Writing']
    };
  },
  created() {
    this.getProposalsList();
  },
  methods: {
    handleCurrentUpdate(val) {
      this.agentParams.pageNum = val;
      this.getProposalsList();
    },
    //雇佣中介
    handlerHire(item) {
      console.log('雇佣', item);
      this.$router.push('/agent-detail?id=' + item.salesAgentId);
    },
    getProposalsList() {
      this.loading = true;
      api.task.proposalList(this.agentParams).then(res => {
        if (getViliedRequestBackValue(res)) {
          this.loading = false;
          this.proposalList = res.context.dataContent;
          this.totalNum = res.context.totalNum;
          //   if (res.context.dataContent.length === 0) {
          //     this.isEmpty = true;
          //   }
        } else {
          this.loading = false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
p {
  margin-bottom: 12px;
}
.el-icon-price-tag {
  transform: rotate(-45deg);
}
.view_proposal2_main {
  width: 100%;
  min-height: 300px;
  max-height: 1491px;
  border: 1px solid #afafaf;
  padding-bottom: 24px;
  .pagination {
    margin-top: 80px;
  }
  .view_proposal2_user_box {
    width: 100%;
    height: 267px;
    border-bottom: 1px solid #afafaf;
    padding: 32px 24px;
    .flex();
    justify-content: space-between;
    align-items: flex-start;
    .view_proposal2_user_img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .view_proposal2_user_details {
      width: calc(100% - 120px);
      .icon_left {
        margin-right: 8px;
      }
      .view_proposal2_user_name {
        width: 100%;
        .flex();
        justify-content: space-between;
        .view_proposal2_user_name_text {
          font-size: 24px;
          font-family: LibreFranklin-SemiBold, LibreFranklin;
          font-weight: 600;
          color: #333333;
          line-height: 29px;
        }
        .view_proposal2_user_btns_box {
          .el-icon-picture-outline-round {
            font-size: 30px;
            transform: translateY(5px);
          }
        }
      }
      .view_proposal2_price_box {
        .flex();
        justify-content: space-between;
        .proposals_left {
          transform: translateY(-10px);
        }
      }
      .view_proposal2_user_rate {
        .flex();
        min-width: 150px;
        .view_proposal2_user_rate_text {
          font-size: 14px;
          font-family: LibreFranklin-Regular, LibreFranklin;
          font-weight: 400;
          color: #ffffff;
          padding: 2px 5px;
          background: rgb(247, 186, 42);
          margin: 0;
          border-radius: 5px;
        }
        .view_proposal2_earned_text {
          font-weight: 600;
          color: #333333;
        }
      }
      .view_proposal2_user_price {
        .view_proposal2_user_price_text {
          font-size: 14px;
          font-family: LibreFranklin-SemiBold, LibreFranklin;
          font-weight: 600;
          color: #333333;
          line-height: 17px;
        }
      }
      .view_proposal2_user_adress {
        .view_proposal2_user_adress_text {
          font-size: 14px;
          font-family: LibreFranklin-Regular, LibreFranklin;
          font-weight: 400;
          color: #333333;
          line-height: 17px;
        }
      }
      .view_proposal2_user_title {
        font-size: 14px;
        font-family: LibreFranklin-Regular, LibreFranklin;
        font-weight: 400;
        color: #333333;
        line-height: 17px;
        margin-top: 24px;
      }
      .view_proposal2_user_labels {
        margin-top: 24px;
        width: 100%;
        display: flex;
        .labels_item {
          border: 1px solid rgba(15, 27, 67, 0.2);
          border-radius: 5px;
          font-size: 12px;
          font-family: LibreFranklin-Regular, LibreFranklin;
          font-weight: 400;
          color: rgba(15, 27, 67, 0.6);
          line-height: 15px;
          padding: 4px 12px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
