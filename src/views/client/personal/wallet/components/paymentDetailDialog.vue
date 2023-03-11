<template>
  <MoaflyDialog class="pay-ment-dialog" width="600px" :visible.sync="visible" @update="handlerClose" title="Payment method">
    <div v-loading="loading" class="form-box">
      <div class="prompt-box">
        <div class="card-box">
          <div class="card-flex-box">
            <div class="card-round"></div>
            <div class="card-round"></div>
            <p class="card-box-title">{{ cardInfo.last4 }}</p>
          </div>
        </div>
        <div class="card-title-box">We will {{ payType ? ' charge' : 'hold' }} {{ payType ? payInfo.orderMoney : 1 }} USD on card ending with {{ cardInfo.last4 }}</div>
      </div>
      <WButton class="profile" v-throttle radius="6px" text="Pay with card 0044" v-loading="btnLoad" @handleClick="handleSubmit" width="520px" height="48px"></WButton>
    </div>
  </MoaflyDialog>
</template>

<script>
import MoaflyDialog from '@/components/MoaflyDialog';
import WButton from '@/components/Button';
import { getPayInfo } from '@/util/util.js';
export default {
  name: 'addCardDialog',
  components: {
    MoaflyDialog,
    WButton
  },
  data() {
    return {
      loading: false,
      btnLoad: false,
      visible: false,
      payType: 0, //支付类型
      payInfo: {},
      cardInfo: {}
    };
  },
  methods: {
    init(data, payType) {
      this.loading = true;
      if (data) {
        this.payInfo = data;
        this.payType = payType;
      }
      this.visible = true;
      getPayInfo().then(res => {
        if (res) {
          this.loading = false;
          this.cardInfo = res.card;
          this.payInfo.paymentMethodId = res.id;
        } else {
          this.loading = false;
        }
      });
    },
    handlerClose() {
      this.visible = false;
      this.btnLoad = true;
    },
    //冻结
    handleSubmit() {
      this.btnLoad = true;
      this.$emit('handleSubmit', this.payInfo, this.payType);
    }
  }
};
</script>

<style lang="less" scoped>
p {
  margin: 0;
}
.pay-ment-dialog {
  /deep/.el-dialog {
    height: 512px;
  }
  .form-box {
    .prompt-box {
      margin: 0 auto;
      .flex();
      flex-wrap: wrap;
      .card-box {
        width: 348px;
        height: 205.64px;
        background: url('~@/assets/images/wallet/wallet-card.png') no-repeat;
        padding: 15px 24px;
        box-sizing: border-box;
        .flex();
        justify-content: flex-start;
        align-items: flex-end;
        .card-flex-box {
          .flex();
          justify-content: flex-start;
          .card-round {
            width: 6px;
            height: 6px;
            background: #dc5674;
            border-radius: 50%;
            margin-right: 4px;
          }
          .card-box-title {
            .MoaflyText(400, 16px, 19px, #dc5674);
          }
        }
      }
      .card-title-box {
        width: 348px;
        height: 104px;
        background: url('~@/assets/images/wallet/wallet-title-bg.png') no-repeat;
        .flex();
      }
      .prompt-title {
        .MoaflyText(400, 16px, 19px, #0f1b43);
      }
    }
    .profile {
      margin: 0 auto;
    }
  }
}
</style>
