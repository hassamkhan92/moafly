<template>
  <div class="view_proposal2_main">
    <Skeleton :loading="loading">
      <template>
        <el-empty v-if="isEmpty" description="empty"></el-empty>
        <div v-else v-for="(hireItem, hireIdx) in hireList" :key="hireIdx" class="view_proposal2_user_box">
          <img class="view_proposal2_user_img" :src="hireItem.agentHeaderImg" alt="" />
          <div class="view_proposal2_user_details">
            <div class="view_proposal2_user_name">
              <p class="view_proposal2_user_name_text">{{ hireItem.agentName }}</p>
              <div class="view_proposal2_user_btns_box">
                <WButton class="empty-button" height="30px" text="View Contract" width="160px"></WButton>
              </div>
            </div>
            <p class="view_proposal2_user_adress">
              <i class="el-icon-location-outline icon_left"></i>
              <span class="view_proposal2_user_adress_text">{{ hireItem.agentLocation }}</span>
            </p>
            <div class="view_proposal2_user_data_box">
              <p class="view_proposal2_user_price data_right">
                <i class="el-icon-price-tag icon_left"></i>
                <span class="view_proposal2_user_price_text">${{ hireItem.agentPrice }}/ hour</span>
              </p>
              <p class="view_proposal2_user_rate rate_box data_right">
                <span class="view_proposal2_user_rate_text icon_left">{{ hireItem.agentScore }}</span
                ><el-rate v-model="value" disabled text-color="#ff9900"> </el-rate>
              </p>
            </div>

            <p class="view_proposal2_user_title">
              {{ hireItem.agentIntroduce }}
            </p>
            <div class="view_proposal2_user_labels">
              <div v-for="(item, itemIdx) in hireItem.agentSkills.split(',')" :key="itemIdx" class="labels_item">{{ item }}</div>
            </div>
          </div>
        </div>
      </template>
    </Skeleton>
  </div>
</template>

<script>
import agentImage1 from '@/assets/images/agent/avatar.png';
import Skeleton from '@/components/Skeleton';
import WButton from '@/components/Button/index.vue';
import * as api from '@/api';
export default {
  components: {
    WButton,
    Skeleton
  },
  data() {
    return {
      agentImage1: agentImage1,
      totalNum: 5,
      loading: false,
      isEmpty: false,
      params: {
        pageNum: 1,
        pageSize: 10,
        taskId: this.$route.query.taskId
      },
      hireList: [],
      value: 3.7,
      labelsData: ['Graphic Design', 'English', 'Content Writing', 'HTML', 'Writing', 'Web Design', 'Content Writing', 'Writing']
    };
  },
  created() {
    this.getTaskInviteSalesAgentList();
  },
  methods: {
    handleCurrentUpdate(val) {
      console.log('', val);
    },
    getTaskInviteSalesAgentList() {
      this.params.taskId = typeof this.params.taskId == 'string' ? parseInt(this.params.taskId) : '';
      this.loading = true;
      api.task
        .taskInviteSalesAgentList(this.params)
        .then(res => {
          if (res.code == 'K-000000') {
            this.loading = false;
            this.hireList = res.context.dataContent;
            if (res.context.dataContent && Array.isArray(res.context.dataContent)) {
              if (res.context.dataContent.length === 0) {
                this.isEmpty = true;
              }
            }
          }
        })
        .catch(err => {
          this.isEmpty = true;
        });
    }
  }
};
</script>
<style lang="less" scoped>
p {
  margin-bottom: 12px;
}
.view_proposal2_main {
  margin-top: 32px;
  width: 100%;
  //   height: 1491px;
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
      width: calc(100% - 132px);
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
      .view_proposal2_user_data_box {
        .flex();
        justify-content: flex-start;
        .data_right {
          margin-right: 120px;
        }
        .rate_box {
          width: 200px;
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
        .view_proposal2_user_rate {
          .view_proposal2_user_rate_text {
            float: left;
            font-size: 14px;
            font-family: LibreFranklin-Regular, LibreFranklin;
            font-weight: 400;
            color: #333333;
            line-height: 17px;
          }
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
      }
      .view_proposal2_user_labels {
        width: 100%;
        .flex();
        justify-content: space-between;
        .labels_item {
          height: 23px;
          background: #f2f2f2;
          border-radius: 29px;
          font-size: 12px;
          font-family: LibreFranklin-Regular, LibreFranklin;
          font-weight: 400;
          color: #000000;
          line-height: 15px;
          padding: 4px 12px;
        }
      }
    }
  }
}
</style>
