<template>
  <MoaflyDialog class="pay-ment-dialog" :visible.sync="visible" title="Payment method">
    <div class="form-box">
      <div class="prompt-box">
        <div class="img-box"><img class="prompt-icon" :src="require('@/assets/images/wallet/wallet-empty.png')" alt="" /></div>
        <p class="prompt-title">You haven't set up your payment method yet</p>
        <p @click="handlerAddCard" class="add-card-title cursor">Click to add</p>
      </div>
    </div>
  </MoaflyDialog>
</template>

<script>
import MoaflyDialog from '@/components/MoaflyDialog';
export default {
  name: 'addCardDialog',
  components: {
    MoaflyDialog
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    init() {
      this.visible = true;
    },
    handlerClose() {
      this.visible = false;
    },
    handlerAddCard() {
      this.handlerClose();
      this.$emit('handlerAddCard');
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
    max-width: 600px;
    width: 100%;
    min-height: 520px;
  }
  .form-box {
    padding-top: 60px;
    .prompt-box {
      margin: 0 auto;
      .flex();
      flex-wrap: wrap;
      .img-box {
        .flex();
      }
      .prompt-title {
        width: 100%;
        .MoaflyText(400, 16px, 18px, #0f1b43);
        text-align: center;
        margin-top: 24px;
      }
      .add-card-title {
        .MoaflyText(400, 16px, 19px, #dc5674);
        margin-top: 16px;
      }
    }
  }
}
</style>
