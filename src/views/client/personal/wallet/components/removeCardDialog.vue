<template>
  <MoaflyDialog class="remove-card-dialog" width="600px" :visible.sync="visible" title="Remove card">
    <div class="form-box">
      <div class="prompt-box">
        <div class="img-box"><img class="prompt-icon" :src="require('@/assets/images/wallet/prompt-icon.png')" alt="" /></div>
        <p class="prompt-title">Are you sure you want to remove this card</p>
      </div>
      <div class="btn-box">
        <WButton class="profile" radius="6px" text="Cancel" color="#DC5674" border="1px solid #DC5674" @handleClick="handlerClose" width="110px" height="32px" bgColor="#fff"></WButton>
        <WButton class="profile" v-throttle radius="6px" text="Confirm" v-loading="btnLoad" width="110px" @handleClick="handlerSubmit" height="32px"></WButton>
      </div>
    </div>
  </MoaflyDialog>
</template>

<script>
import MoaflyDialog from '@/components/MoaflyDialog';
import WButton from '@/components/Button';
import * as api from '@/api';
export default {
  name: 'addCardDialog',
  components: {
    MoaflyDialog,
    WButton
  },
  data() {
    return {
      btnLoad: false,
      visible: false,
      payMethodId: ''
    };
  },
  methods: {
    init(id) {
      this.payMethodId = id;
      this.visible = true;
    },
    handlerSubmit() {
      this.btnLoad = true;
      let payMethodId = this.payMethodId;
      api.pay
        .delPayMethod(payMethodId)
        .then(res => {
          if (res.code === 'K-000000') {
            this.btnLoad = false;
            this.$message.success('Remove Success');
            this.handlerClose();
            this.$emit('handlerClose');
          } else {
            this.btnLoad = false;
          }
        })
        .catch(error => {
          this.$message.success(error);
        });
    },
    handlerClose() {
      this.visible = false;
    }
  }
};
</script>

<style lang="less" scoped>
p {
  margin: 0;
}
.remove-card-dialog {
  /deep/.el-dialog {
    height: 384px;
  }
  .form-box {
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
    }
    .btn-box {
      width: 100%;
      margin-top: 72px;
      .flex();
      .profile {
        margin-left: 8px;
      }
    }
  }
}
</style>
