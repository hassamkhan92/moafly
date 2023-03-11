<template>
  <div class="list-container">
    <el-row type="flex" justify="" class="list-item" :class="'el-row-' + item.id" :gutter="40">
      <el-col :xs="12" :sm="12" :lg="5" class="item-col1">
        <div class="agentTitle">
          <VueText :value="item.orderTitle" style="width:150px"></VueText>
        </div>
        <div class="agentText">
          {{ item.agentName }}
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="5" class="item-col2">
        <div class="agentTitle">{{ formatDate(item.createTime) }}</div>
        <div class="agentText">
          {{ item.agentPhoneNum }}
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="9" class="item-col3">
        <div class="col3-title-box">
          <span class="agentTitle title1">${{ item.orderMoney }}</span>
          <span v-if="item.orderStatus === 0" class="to-pay-title title2 cursor" @click="handlerPay(item)">To be paid</span>
          <span v-else class="agentTitle title2">Paid</span>
        </div>
        <div class="agentText">
          emma@moafly.com
        </div>
      </el-col>
      <el-col :xs="1" :sm="1" class="item-col4"> </el-col>
      <el-col :push="1" :xs="11" :sm="11" :lg="3" class="item-col5">
        <el-popover placement="bottom-end" trigger="click" popper-class="billings-popover" @show="show" @hide="hide">
          <div class="bill-detail">
            <p class="detail-title">Billing detail</p>
            <div class="detail-bill-box">
              <el-row v-for="(orderDetailVO, index) in item.orderDetailVOList" :key="index" type="flex" justify="space-between">
                <el-col class="bill-text" :span="12">{{ orderDetailVO.detailTitle }}</el-col>
                <el-col class="bill-text" :span="6"> {{ orderDetailVO.detailHour }}&nbsp; hours</el-col>
                <el-col class="bill-text" :span="6">{{ orderDetailVO.detailMoney }}&nbsp; USD</el-col>
              </el-row>
              <el-row class="line-row"></el-row>
              <el-row type="flex" justify="space-between">
                <el-col class="bill-title" :span="12">Total</el-col>
                <el-col class="bill-title" :span="6"> {{ getArrayTotalNums(item.orderDetailVOList, 'detailHour') }}&nbsp; hours</el-col>
                <el-col class="bill-title" :span="6">{{ getArrayTotalNums(item.orderDetailVOList, 'detailMoney') }}&nbsp; USD</el-col>
              </el-row>
              <el-row class="mofley-color" type="flex" justify="space-between" v-if="item.discountedPrice">
                <el-col class="bill-title" :span="12">Friend & Family</el-col>
                <el-col class="bill-title" :span="6">{{ item.discountedPrice }} USD</el-col>
              </el-row>
            </div>
            <div v-if="item.conflictStatus == 1" class="detail-question">Working on the problem</div>
            <div v-else @click="handleQustion(item)" class="detail-question cursor">Have questions on current bill?</div>
          </div>
          <span slot="reference" class="view-detail-title cursor">Billing detail</span>
        </el-popover>
        <WButton
          v-if="item.orderStatus == 0"
          bgColor="rgba(220, 86, 116, 0.3)"
          @handleClick="handlerPay(item)"
          text="Pay"
          width="70px"
          height="28px"
          size="12px"
          radius="6px"
          color="#DC5674"
          :iconShow="false"
        ></WButton>
        <WButton
          v-if="item.orderStatus == 1"
          height="28px"
          size="12px"
          radius="6px"
          color="rgba(15, 27, 67, 0.4)"
          :disabled="true"
          bgColor="rgba(15, 27, 67, 0.1)"
          text="Paid"
          :iconShow="false"
          width="70px"
        ></WButton>
      </el-col>
    </el-row>
    <Wpopups :isShow="quesPopIsShow" :closeIsShow="false" class="question-popups">
      <div class="header-title-box">
        Give feedback and suggestions
      </div>
      <div class="content">
        <el-form ref="form" :model="form" label-width="0px" :rules="ruleForm">
          <el-form-item prop="workOrderContext">
            <!-- :autosize="{ minRows: 2, maxRows: 8 }" -->
            <el-input type="textarea" v-model="form.workOrderContext" placeholder="Please enter your appeal" resize="none" maxlength="300" show-word-limit></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="handle">
        <WButton width="120px" height="32px" border="1px solid #DC5674" bgColor="#FFFFFF" color="#DC5674" :iconShow="false" @handleClick="handleClose" text="Cancel" radius="6px"></WButton>
        <WButton width="120px" height="32px" :iconShow="false" text="Submit" radius="6px" @handleClick="handleSubmit"></WButton>
      </div>
    </Wpopups>
  </div>
</template>
<script>
import * as api from '@/api';
import WButton from '@/components/Button';
import Wpopups from '@/components/Popups/index.vue';
import { getArrayTotalNums, timeFormat } from '@/util';
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: { WButton, Wpopups },
  data() {
    return {
      isView: true,
      totalHours: 0,
      totalMoney: 0,
      disabled: true,
      quesPopIsShow: false,
      form: {
        orderCode: this.item.orderCode,
        workOrderContext: ''
      },
      loading: true,
      timer: null,
      ruleForm: {
        workOrderContext: [{ required: true, message: 'Please enter the context', trigger: 'blur' }]
      }
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.timer = setTimeout(() => {
      this.loading = false;
    }, 1000 * 1);
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  methods: {
    getArrayTotalNums: getArrayTotalNums,
    formatDate(date) {
      return timeFormat(new Date(date), 'yyyy-MM-dd HH:mm');
    },
    show() {
      this.isView = false;
    },
    hide() {
      this.isView = true;
    },
    handlerPay(item) {
      this.$emit('handlerPay', item);
      //   let param = {
      //     orderCode: id
      //   };
      //   api.bill.payBill(param).then(res => {
      //     if (res.code === 'K-000000' && res.context) {
      //       window.open(res.context, '_blank');
      //     }
      //   });
    },
    handleQustion(item) {
      console.log('有疑问', item);
      this.quesPopIsShow = true;
    },
    /**
     * 提交疑问
     */
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          api.conflict
            .addConflict(this.form)
            .then(res => {
              if (res.code == 'K-000000') {
                this.$message.success('success');
                this.quesPopIsShow = false;
                this.form = {};
                this.$emit('addConflict');
              } else {
                this.$message.error('提交失败');
              }
            })
            .catch(err => {
              this.$message.error(err);
            });
        }
      });
    },
    handleClose() {
      this.quesPopIsShow = false;
    }
  }
};
</script>
<style scoped lang="less">
.agentTitle {
  .MoaflyText(500, 14px, 17px, #0f1b43);
}
.agentText {
  .MoaflyText(400, 14px, 17px, rgba(15, 27, 67, 0.6));
  margin-top: 16px;
}
.list-container {
  width: 100%;
  min-height: 110px;
  margin-bottom: 16px;
  .el-row {
    width: 100%;
    height: 100%;
    margin-left: 0 !important;
    margin-right: 0 !important;
    background: rgba(15, 27, 67, 0.02);
    border-radius: 8px;
    padding: 24px;
    flex-wrap: wrap;
    gap: 30px 0;
    .el-col {
      box-sizing: border-box;
      padding: 0 !important;
    }
    .item-col3 {
      .col3-title-box {
        .title2 {
          margin-left: 80px;
        }
      }
      .to-pay-title {
        color: #dc5674;
      }
    }
    /deep/.item-col5 {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      & > span {
        width: 100%;
        text-align: center;
      }
      .button-container {
        margin-top: 16px;
      }
    }
    .item-col4 {
      width: 2px;
      height: 59.54px;
      background: #f1f1f1;
    }
    .view-detail-title {
      .MoaflyText(400, 14px, 17px, #dc5674);
    }
  }
  .el-row-0 {
    margin-top: 60px;
  }
  /deep/.question-popups {
    .el-dialog {
      width: 600px;
      height: 404px;
    }
    .el-dialog__body {
      .header-title-box {
        width: 100%;
        border-bottom: 1px solid rgba(15, 27, 67, 0.1);
        .MoaflyText(500, 18px, 70px, #0f1b43);
        padding-left: 24px;
      }
    }
    .title {
      height: 19px;
      .MoaflyText(bold, 24px, 34px, #333333);
    }
    .content {
      width: 465px;
      height: 230px;
      margin: 24px auto;
      .el-textarea__inner {
        width: 465px;
        height: 230px;
      }
    }
    .handle {
      .flex();
      .w-button {
        margin-right: 16px;
      }
    }
  }
  /deep/.el-textarea {
    .el-textarea__inner:focus {
      border-color: #353f62;
    }
  }
}
</style>
<style lang="less">
.el-popover.el-popper.billings-popover {
  width: 332px;
  min-height: 273px;
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(15, 27, 67, 0.2);
  border-radius: 6px;
  padding: 25px 16px;
  box-sizing: border-box;
  .bill-detail {
    width: 100%;
    .detail-title {
      .MoaflyText(500, 16px, 19px, #0f1b43);
      .text-overflow();
    }
    .detail-bill-box {
      margin-top: 16px;
      margin-bottom: 24px;
      max-height: 150px;
      overflow-y: auto;
      .el-row {
        margin-bottom: 12px;
      }
      .line-row {
        width: 100%;
        height: 1px;
        background: rgba(15, 27, 67, 0.1);
        border-radius: 2px;
      }
      .bill-title {
        .MoaflyText(400, 14px, 17px, #0f1b43);
        .text-overflow();
      }
      .bill-text {
        .MoaflyText(400, 12px, 15px, rgba(15, 27, 67, 0.6));
        .text-overflow();
      }
    }
    .mofley-color {
      .bill-title {
        color: #dc5674;
      }
    }
    .detail-question {
      transform: translateY(10px);
      .MoaflyText(400, 14px, 17px, #dc5674);
      text-decoration-line: underline;
      text-align: right;
    }
  }
}
</style>
