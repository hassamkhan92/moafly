<template>
  <div class="view_proposal2_main">
    <Skeleton :loading="loading">
      <div class="view_proposal2_user_box header_box">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Agent list" name="first"></el-tab-pane>
          <el-tab-pane :label="'Invited agents(' + totalNum2 + ')'" name="second"></el-tab-pane>
        </el-tabs>
      </div>
      <template v-if="activeName === 'first'">
        <div v-for="item in agentList" :key="item.agentId" class="view_proposal2_user_box">
          <img class="view_proposal2_user_img" :src="item.agentHeaderImg" alt="" />
          <div class="view_proposal2_user_details">
            <div class="view_proposal2_user_name">
              <p class="view_proposal2_user_name_text">{{ item.agentName }}</p>
              <div class="view_proposal2_user_btns_box">
                <span class="material-icons icon_left">
                  favorite_border
                </span>
                <WButton
                  v-if="item.agentEmployState == 1"
                  class="empty-button"
                  height="30px"
                  bgColor="#fff"
                  border="1px solid #353F62"
                  @handleClick="handlerHire(item)"
                  color="#353F62"
                  text="Hire"
                  width="92px"
                ></WButton>
                <WButton v-if="item.agentEmployState == 1" class="empty-button" height="30px" text="Invite to Job" @handleClick="handleInviteToJob(item)"></WButton>
              </div>
            </div>
            <p class="view_proposal2_user_rate">
              <span class="view_proposal2_user_rate_text icon_left">{{ item.agentScore }}</span>
              <el-rate :value="Number(item.agentScore)" disabled text-color="#ff9900"> </el-rate>
            </p>
            <p class="view_proposal2_user_price">
              <i class="el-icon-price-tag icon_left"></i>
              <span class="view_proposal2_user_price_text">${{ item.agentPrice }}/ hour</span>
            </p>
            <p class="view_proposal2_user_adress">
              <i class="el-icon-location-outline icon_left"></i>
              <span class="view_proposal2_user_adress_text">{{ item.agentLocation }}</span>
            </p>
            <p class="view_proposal2_user_title">{{ item.agentIntroduce }}</p>
            <div class="view_proposal2_user_labels">
              <div v-for="(item, itemIdx) in formatAgentSkills(item.agentSkills)" :key="itemIdx" class="labels_item">{{ item }}</div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div v-for="item in agentList2" :key="item.agentId" class="view_proposal2_user_box">
          <img class="view_proposal2_user_img" :src="item.agentHeaderImg" alt="" />
          <div class="view_proposal2_user_details">
            <div class="view_proposal2_user_name">
              <p class="view_proposal2_user_name_text">{{ item.agentName }}</p>
              <div class="view_proposal2_user_btns_box">
                <span class="material-icons icon_left">
                  favorite_border
                </span>
                <WButton class="empty-button" height="30px" bgColor="#fff" border="1px solid #353F62" @handleClick="handlerHire(item)" color="#353F62" text="Hire" width="92px"></WButton>
                <!-- <WButton v-if="item.agentEmployState == 1" class="empty-button" height="30px" text="Invite to Job" @handleClick="handleInviteToJob(item)"></WButton> -->
              </div>
            </div>
            <p class="view_proposal2_user_rate">
              <span class="view_proposal2_user_rate_text icon_left">{{ item.agentScore }}</span>
              <el-rate :value="Number(item.agentScore)" disabled text-color="#ff9900"> </el-rate>
            </p>
            <p class="view_proposal2_user_price">
              <i class="el-icon-price-tag icon_left"></i>
              <span class="view_proposal2_user_price_text">${{ item.agentPrice }}/ hour</span>
            </p>
            <p class="view_proposal2_user_adress">
              <i class="el-icon-location-outline icon_left"></i>
              <span class="view_proposal2_user_adress_text">{{ item.agentLocation }}</span>
            </p>
            <p class="view_proposal2_user_title">{{ item.agentIntroduce }}</p>
            <div class="view_proposal2_user_labels">
              <div v-for="(item, itemIdx) in formatAgentSkills(item.agentSkills)" :key="itemIdx" class="labels_item">{{ item }}</div>
            </div>
          </div>
        </div>
      </template>
    </Skeleton>
    <w-pagination class="pagination" :total="totalNum" :page="params.pageNum" :limit="6" layout="prev,pager,next" @update:page="handleCurrentUpdate" />
    <!-- 留言弹窗 -->
    <Dialog class="dialog-invite" :isShow="showInViteDialog" @handleClose="handleInviteDialogClose" width="820px">
      <div class="title">Invite to job</div>
      <div class="content">
        <div class="agent_info_box">
          <div class="agent_img_box">
            <img :src="inviteParams.agentHeaderImg" alt="" />
            <div class="img_icon"></div>
          </div>
          <div class="agent_info">
            <p class="text1">{{ inviteParams.agentName }}</p>
            <p class="text2"><i style="font-size:20px;margin-right:8px" class="el-icon-location-outline"></i>{{ inviteParams.agentLocation }}</p>
          </div>
        </div>
        <!-- 输入框 -->
        <div class="invite_message_box">
          <div class="input_box">
            <p class="title">Message</p>
            <div class="q-pa-md" style="width:100%">
              <q-input color="#353F62" placeholder="Please leave a message!" outlined :bottom-slots="true" v-model="inviteParams.iviteContent" filled type="textarea">
                <template v-slot:hint> {{ inviteParams.iviteContent.length }} characters left </template>
              </q-input>
            </div>
          </div>
          <div v-if="false" class="select_box">
            <p class="title">Invite to an existing job</p>
            <div class="q-pa-md" style="width:100%">
              <q-select style="height:40px" outlined v-model="inviteParams.salesAgentId" :options="options" />
            </div>
          </div>
        </div>
      </div>
      <div class="handle">
        <WButton class="send_invit" width="170px" height="30px" radius="29px" text="Send Invitation" color="#fff" border="1px solid #353F62" @handleClick="handleSubmit"></WButton>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Skeleton from '@/components/Skeleton';
import agentImage1 from '@/assets/images/agent/agent-avatar.png';
import WPagination from '@/components/Pagination';
import WButton from '@/components/Button/index.vue';
import Dialog from '@/components/Popups/';
import * as api from '@/api';
export default {
  components: {
    WPagination,
    WButton,
    Skeleton,
    Dialog
  },
  data() {
    return {
      options: ['1'],
      activeName: 'first',
      showInViteDialog: false,
      loading: true,
      content: '',
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
      agentList2: [],
      totalNum2: 0,
      inviteParams: {
        iviteContent: '',
        salesAgentId: '',
        taskId: ''
      }
    };
  },
  mounted() {
    this.getAgentList();
    this.getInviteList();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.name == 'name') {
        this.getTaskList();
      } else if (tab.name == 'second') {
        this.getInviteList();
      }
    },
    handleInviteDialogClose() {
      this.showInViteDialog = false;
      this.inviteParams = this.$options.data().inviteParams;
    },
    formatAgentSkills(agentSkills) {
      if (typeof agentSkills == 'string') {
        return agentSkills.split(',');
      } else {
        return [];
      }
    },
    /**
     * 邀请加入任务
     */
    handleInviteToJob(item) {
      this.showInViteDialog = true;
      this.inviteParams = {
        ...item,
        ...this.inviteParams
      };
    },
    //雇佣中介
    handlerHire(item) {
      this.$router.push('/agent-detail?id=' + item.agentId);
    },
    /**
     * 获取任务列表
     */
    getTaskList() {
      let params = {
        pageNum: 1,
        pageSize: 5
      };
      api.task.listTask(params).then(res => {
        if (res.code === 'K-000000') {
          console.log('res===>', res);
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
            this.agentList = res.context.dataContent;
            this.totalNum = res.context.totalNum;
            setTimeout(() => {
              this.loading = false;
            }, 2000);
          }
        }
      });
    },
    /**
     * 邀请中介加入任务(非正式2)
     */
    handleSubmit() {
      if (!this.inviteParams.iviteContent) {
        return this.$message.error('Please enter a message');
      }
      let params = {
        taskId: this.$route.query.taskId,
        salesAgentId: this.inviteParams.agentId,
        iviteContent: this.inviteParams.iviteContent
      };
      api.task.addTaskInvite(params).then(res => {
        if (res.code === 'K-000000') {
          this.$message.success('Invite to Job success');
          this.handleInviteDialogClose();
          this.getAgentList();
        }
      });
    },
    /**
     * 用户邀请中介列表 非正式
     */
    getInviteList() {
      let params = {
        taskId: this.$route.query.taskId,
        salesAgentId: this.inviteParams.agentId,
        iviteContent: this.inviteParams.iviteContent
      };
      api.task.taskInviteList(params).then(res => {
        if (res.code === 'K-000000') {
          let data = res.context.dataContent;
          console.log('data==<', data);
          this.agentList2 = data;
          this.totalNum2 = res.context.totalNum;
        }
      });
    },
    handleCurrentUpdate(val) {
      this.agentParams.pageNum = val;
      this.getAgentList();
    }
  }
};
</script>
<style lang="less" scoped>
p {
  margin-bottom: 12px;
}
::v-deep.view_proposal2_main {
  margin-top: 32px;
  width: 100%;
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
      background: #d8d8d8;
      border-radius: 10px;
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
        justify-content: flex-start;
        .labels_item {
          height: 23px;
          background: #f2f2f2;
          margin-left: 8px;
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
  .header_box {
    height: 67px;
    padding: 27px 41px 0;
    .el-tabs__nav-wrap::after {
      display: none;
    }
    .is-active {
      color: #ff9a1c;
    }
    .el-tabs__active-bar {
      height: 1px;
      background: #ff9a1c;
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
::v-deep.dialog-invite {
  .el-dialog__body {
    min-height: 545px;
    padding: 46px 32px 32px;
    .title {
      font-size: 24px;
      font-family: LibreFranklin-SemiBold, LibreFranklin;
      font-weight: 600;
      color: #333333;
      line-height: 29px;
    }
    .content {
      .agent_info_box {
        .flex();
        margin-top: 49px;
        justify-content: flex-start;
        .agent_img_box {
          position: relative;
          width: 87px;
          height: 87px;
          border-radius: 50%;
          .img_icon {
            position: absolute;
            width: 15px;
            height: 15px;
            background: #6ccb77;
            border-radius: 50%;
            right: 5px;
            bottom: 5px;
          }
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .agent_info {
          margin-left: 32px;
          p {
            margin-bottom: 12px;
          }
          .text1 {
            font-size: 14px;
            font-family: LibreFranklin-SemiBold, LibreFranklin;
            font-weight: 600;
            color: #333333;
            line-height: 17px;
          }
          .text2 {
            font-size: 14px;
            font-family: LibreFranklin-Regular, LibreFranklin;
            font-weight: 400;
            color: #333333;
            line-height: 17px;
          }
        }
      }
      .invite_message_box {
        .input_box {
          margin-top: 18px;
          .q-field__messages {
            text-align: right;
          }
        }

        .select_box {
          margin-top: 24px;
          .q-field__control {
            min-height: 40px;
            height: 40px;
            border: none;
          }
          .q-field__native {
            min-height: 40px;
            height: 40px;
          }
          .q-field__append {
            height: 40px;
          }
        }
        .title {
          font-size: 16px;
          font-family: LibreFranklin-SemiBold, LibreFranklin;
          font-weight: 600;
          color: #333333;
          line-height: 19px;
        }
        .q-field__control {
          background: #ffffff;
          border-radius: 4px;
          border: 1px solid #999999;
        }
        .q-pa-md {
          padding: 0;
        }
      }
    }
    .handle {
      margin-top: 32px;
      width: 100%;
      .flex();
      justify-content: flex-end;
      .send_invit:hover {
        background: #ff9a1c !important;
        border: none !important;
      }
    }
  }
}
</style>
