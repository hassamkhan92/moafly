<template>
  <MoaflyDialog class="messageDialog" :visible.sync="setShow" title="Send Message">
    <div class="content">
      <div class="form-area">
        <el-form :label-position="labelPosition" :model="messageForm" :rules="rules" ref="messageForm" label-width="80px">
          <el-row :gutter="20">
            <el-col :xs="24" :md="24">
              <el-form-item class="input-wrap" label="Send your message" prop="message">
                <el-input class="custom-textarea" v-model="messageForm.message" placeholder="Please enter" type="textarea" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :md="24">
              <div class="form-buttons">
                <WButton class="cancel-button custom-button" v-throttle text="Cancel" @handleClick="handlerClose"></WButton>
                <WButton class="submit-button custom-button" v-throttle text="Send" v-loading="btnLoad" @handleClick="handlerSubmit"></WButton>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </MoaflyDialog>
</template>

<script>
import MoaflyDialog from '@/components/MoaflyDialog';
import WButton from '@/components/Button';

import * as api from '@/api';

export default {
  components: { MoaflyDialog, WButton },
  props: { showModal: { type: Boolean, default: false }, homeId: { type: Number, default: null } },
  watch: {
    showModal(newVal, oldVal) {
      this.setShow = newVal;
    }
  },
  data() {
    return {
      btnLoad: false,
      setShow: false,
      labelPosition: 'top',
      messageForm: {
        houseId: '',
        message: ''
      },
      rules: {
        message: [{ required: true, message: 'Please enter valid message', trigger: 'blur' }]
      }
    };
  },
  methods: {
    handlerClose() {
      this.$emit('handlerClose');
    },
    handlerSubmit() {
      this.$refs.messageForm.validate().then(success => {
        if (success) {
          this.btnLoad = true;
          let data = {
            houseId: this.homeId,
            senderMessage: this.messageForm.message
          };
          api.messages
            .replyMessage(data)
            .then(res => {
              if (res.code === 'K-000000') {
                this.$message.success('Your message has been sent successfully!');
                this.btnLoad = false;
                this.handlerClose();
              } else {
                this.btnLoad = false;
                this.$message.error(res.message || 'error');
              }
            })
            .catch(error => {
              this.$message.error(error);
              this.btnLoad = false;
            });
        } else {
          console.log('Error');
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.messageDialog {
  /deep/.el-dialog {
    max-width: 600px;
    width: 100%;
    .content {
      .form-area {
        .custom-textarea {
          textarea {
            height: 160px;
            resize: none;
            background: rgba(0, 0, 0, 0.05);
            border-radius: 8px;
            font-family: 'Libre Franklin';
            &::placeholder {
              font-weight: 400;
              font-size: 16px;
              line-height: 19px;
              color: rgba(15, 27, 67, 0.2);
              font-family: 'Libre Franklin';
            }
          }
        }
      }
      .form-buttons {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 20px 20px;
        .custom-button {
          max-width: 140px;
          width: 100% !important;
          border: 1px solid #dc5674;
          border-radius: 6px !important;
          height: auto !important;
          padding: 0;
          span {
            font-weight: 500;
            font-size: 16px !important;
            line-height: 1ppx;
            display: block;
            padding: 9px 15px;
          }
          &.cancel-button {
            background-color: #fff !important;
            span {
              color: #dc5674 !important;
            }
            &:hover {
              background-color: #f4f7f9 !important;
            }
          }
        }
      }
    }
  }
}
</style>
