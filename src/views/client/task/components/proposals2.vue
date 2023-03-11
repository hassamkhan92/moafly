<template>
  <div class="view_proposal2_main">
    <div v-for="i in 5" :key="i" class="view_proposal2_user_box">
      <img class="view_proposal2_user_img" :src="agentImage1" alt="" />
      <div class="view_proposal2_user_details">
        <div class="view_proposal2_user_name">
          <p class="view_proposal2_user_name_text">Laura Addario</p>
          <div class="view_proposal2_user_btns_box">
            <span class="material-icons icon_left">
              favorite_border
            </span>
            <WButton class="empty-button" height="30px" text="Hire" width="92px"></WButton>
            <WButton class="empty-button" height="30px" text="Invite to Job" width="129px" @handleClick="handleInviteToJob"></WButton>
          </div>
        </div>
        <p class="view_proposal2_user_rate">
          <span class="view_proposal2_user_rate_text icon_left">{{ value }}</span
          ><el-rate v-model="value" disabled text-color="#ff9900"> </el-rate>
        </p>
        <p class="view_proposal2_user_price">
          <i class="el-icon-price-tag icon_left"></i>
          <span class="view_proposal2_user_price_text">$14.00/ hour</span>
        </p>
        <p class="view_proposal2_user_adress">
          <i class="el-icon-location-outline icon_left"></i>
          <span class="view_proposal2_user_adress_text">Los Angeles, California</span>
        </p>
        <p class="view_proposal2_user_title">
          Hello I’m Laura, a mostly agent! I’m expert in housing touring, offer making and price negotiation. Look forward to working with you!I assure to teach each step in the home buying process.
          My clients are my number one focus, and I am available when…
        </p>
        <div class="view_proposal2_user_labels">
          <div v-for="(item, itemIdx) in labelsData" :key="itemIdx" class="labels_item">{{ item }}</div>
        </div>
      </div>
    </div>
    <w-pagination class="pagination" :total="totalNum" :page="params.pageNum" :limit="5" layout="prev,pager,next" @update:page="handleCurrentUpdate" />
    <WPopups :isShow="popupsIsShow" @handleClose="handleClose" class="dismissal-popups" width="600px">
      <template>
        <div class="title">Invitation</div>
        <div class="content">
          <el-input type="textarea" style="margin-bottom: 56px;width:489px" :rows="2" placeholder="Leave a note " v-model="inviteParams.iviteContent"> </el-input>
        </div>
        <div class="handle">
          <PreButton width="174px" radius="4px" text="Confirm" bgColor="#fff" color="#353F62" border="1px solid #353F62" @handleClick="handleSubmit"></PreButton>
          <WButton width="174px" radius="4px" text="Cancel" color="#fff" border="1px solid #353F62" @handleClick="handleCancel"></WButton>
        </div>
      </template>
    </WPopups>
  </div>
</template>

<script>
import WPopups from '@/components/Popups';
import agentImage1 from '@/assets/images/agent/agent-avatar.png';
import WPagination from '@/components/Pagination';
import WButton from '@/components/Button/index.vue';
import PreButton from '@/components/Pre/index.vue';
import * as api from '@/api';
export default {
  components: {
    WPagination,
    WButton,
    WPopups,
    PreButton
  },
  data() {
    return {
      content: '',
      popupsIsShow: false,
      agentImage1: agentImage1,
      totalNum: 5,
      params: {
        pageNum: 1
      },
      agentParams: {
        pageNum: 1,
        pageSize: 10,
        priceSort: 0
      },
      agentList: [],
      inviteParams: {
        iviteContent: '',
        salesAgentId: 0,
        taskId: 0
      },
      value: 3.7,
      labelsData: ['Graphic Design', 'English', 'Content Writing', 'HTML', 'Writing', 'Web Design', 'Content Writing', 'Writing']
    };
  },
  mounted() {
    this.getAgentList();
  },
  methods: {
    handleClose() {
      this.popupsIsShow = false;
    },
    /**
     * 邀请加入任务
     */
    handleInviteToJob() {
      this.popupsIsShow = true;
      api.task.addTaskInvite(this.inviteParams).then(res => {
        if (res.code === 'K-000000') {
          console.log('邀请成功');
        }
      });
    },
    /**
     * 获取中介列表
     */
    getAgentList() {
      api.agent.listAgent(this.agentParams).then(res => {
        if (res.code === 'K-000000') {
          if (res.context) {
            console.log('中介列表==>', res.context.dataContent);
            this.agentList = res.context.dataContent;
            this.totalNum = res.context.totalNum;
          }
        }
      });
    },
    handleSubmit() {
      this.popupsIsShow = false;
    },
    handleCancel() {
      this.popupsIsShow = false;
    },
    handleCurrentUpdate(val) {
      console.log('', val);
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
  height: 1491px;
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
      width: 276px;
      height: 182px;
    }
    .view_proposal2_user_details {
      width: calc(100% - 308px);
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
          width: 450px;
          .flex();
          .empty-button {
            margin-left: 10px;
          }
          .material-icons {
            font-size: 30px;
          }
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
      .view_proposal2_user_price {
        .view_proposal2_user_price_text {
          font-size: 14px;
          font-family: LibreFranklin-SemiBold, LibreFranklin;
          font-weight: 600;
          color: #333333;
          line-height: 17px;
        }
        .el-icon-price-tag {
          transform: rotateZ(30deg);
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
.dismissal-popups {
  /deep/.el-dialog-content {
    padding: 60px 80px;
    box-sizing: border-box;
  }
  .title {
    height: 29px;
    font-size: 24px;
    font-family: LibreFranklin-SemiBold, LibreFranklin;
    font-weight: 600;
    color: #333333;
    line-height: 29px;
  }
  .content {
    height: 38px;
    font-size: 16px;
    font-family: LibreFranklin-Regular, LibreFranklin;
    font-weight: 400;
    color: #333333;
    line-height: 19px;
    margin-top: 20px;
  }
  .handle {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 80px;
  }
}
</style>
