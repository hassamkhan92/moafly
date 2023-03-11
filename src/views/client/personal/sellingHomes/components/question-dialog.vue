<!--
 * @Author: zulezhe
 * @Date: 2022-12-22 19:20:12
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-25 22:59:52
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <Wpopups :isShow="visible" :closeIsShow="false" class="question-popups">
    <div class="header-title-box">
      Let Moafly know what can help
    </div>
    <div class="content">
      <el-form ref="form" :model="form" label-width="0px" :rules="ruleForm">
        <el-form-item prop="workOrderContext">
          <el-input
            placeholder="Please leave your message"
            maxlength="200"
            :width="465"
            :height="230"
            :autosize="{ minRows: 8, maxRows: 8 }"
            resize="none"
            show-word-limit
            type="textarea"
            v-model="form.workOrderContext"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="handle">
      <WButton width="120px" height="32px" border="1px solid #DC5674" bgColor="#FFFFFF" color="#DC5674" :iconShow="false" @handleClick="handleClose" text="Cancel" radius="6px"></WButton>
      <WButton v-throttle width="120px" height="32px" v-loading="btnLoad" :iconShow="false" text="Confirm" radius="6px" @handleClick="handleSubmit"></WButton>
    </div>
  </Wpopups>
</template>

<script>
import MInput from '@/views/client/sell/components/MInput.vue';
import WButton from '@/components/Button';
import Wpopups from '@/components/Popups/index.vue';
import * as api from '@/api';
export default {
  name: 'addCardDialog',
  components: {
    WButton,
    Wpopups,
    MInput
  },
  props: {
    homeItemInfo: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      visible: false,
      form: {
        messageContent: '',
        houseInfoId: ''
      },
      btnLoad: false,
      ruleForm: {
        messageContent: [{ required: true, message: 'Please enter the messageContent', trigger: 'blur' }]
      }
    };
  },
  methods: {
    init(houseInfoId) {
      this.form.houseInfoId = houseInfoId;
      this.visible = true;
      this.form.messageContent = '';
    },
    handleClose() {
      this.visible = false;
      this.form.workOrderContext = '';
    },
    handleSubmit() {
      this.$loading.open();
      let data = {
        houseInfoId: this.homeItemInfo.houseId,
        messageContent: this.form.workOrderContext
      };
      api.home
        .addHomeMessage(data)
        .then(res => {})
        .catch(err => {})
        .finally(() => {
          this.handleClose();
          this.$loading.close();
        });
      //   this.$emit('handlerAddCard');
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-dialog {
  width: 600px;
  height: 404px;
  .el-dialog__body {
    .header-title-box {
      width: 100%;
      border-bottom: 1px solid rgba(15, 27, 67, 0.1);
      .MoaflyText(500, 18px, 70px, #0f1b43);
      padding-left: 24px;
    }
  }
}
.question-popups {
  .title {
    height: 19px;
    .MoaflyText(bold, 24px, 34px, #333333);
  }
  .content {
    width: 465px;
    height: 230px;
    margin: 24px auto;
  }
  .handle {
    .flex();
    .w-button {
      margin-right: 16px;
    }
  }
}
</style>
