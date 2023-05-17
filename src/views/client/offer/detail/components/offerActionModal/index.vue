<template>
  <MoaflyDialog class="offerDialog" :visible.sync="setShow" title="Accept Your Offer">
    <el-row :gutter="20">
      <el-col :xs="24" :md="24">
        <div class="content">
          <img :src="require('@/assets/images/offers-modal.png')" class="offer-img" />
          <h6 class="title">You have chosen contract xx. <a href="javascript:void(0);">Download</a></h6>
          <p class="details">Some analyzing from moafly, Some analyzing from moafly, Some analyzing from moafly, Some analyzing from moafly, Some analyzing from moafly,</p>
        </div>
      </el-col>
      <el-col :xs="24" :md="24">
        <div class="form-area">
          <el-form :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
            <el-form-item class="input-wrap" label="" prop="contract">
              <el-upload class="upload" multiple :auto-upload="false" :on-change="handleFileChange">
                <el-button class="upload-button"><img :src="require('@/assets/images/upload-plus.svg')" alt="Upload" />Upload contract</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="" prop="contract">
              <el-input class="accept-reject-reason" type="textarea" placeholder="Please enter your message" />
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :xs="24" :md="24">
        <div class="form-buttons">
          <WButton class="cancel-button custom-button" v-throttle text="Accept"></WButton>
          <WButton class="submit-button custom-button" v-throttle text="Refuse" @handleClick="handlerClose"></WButton>
        </div>
      </el-col>
    </el-row>
  </MoaflyDialog>
</template>
<script>
import MoaflyDialog from '@/components/MoaflyDialog';
import WButton from '@/components/Button';

export default {
  components: { MoaflyDialog, WButton },
  props: { showModal: { type: Boolean, default: false } },
  watch: {
    showModal(newVal, oldVal) {
      this.setShow = newVal;
    }
  },
  data() {
    return {
      setShow: false,
      labelPosition: 'top'
    };
  },
  methods: {
    handlerClose() {
      this.$emit('handlerClose');
    }
  }
};
</script>

<style lang="less" scoped>
.offerDialog {
  /deep/.el-dialog {
    max-width: 600px;
    width: 100%;
    .content {
      border-bottom: 1px solid rgba(15, 27, 67, 0.2);
      margin-bottom: 16px;
      padding-bottom: 24px;
      .offer-img {
        max-width: 100%;
        display: block;
        margin: 0 auto 24px;
      }
      .title {
        font-weight: 500;
        font-size: 16px;
        line-height: 18px;
        text-align: center;
        color: #0f1b43;
        margin-bottom: 16px;
        a {
          color: #dc5674;
        }
      }
      .details {
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        text-align: center;
        color: rgba(15, 27, 67, 0.6);
        margin-bottom: 0;
      }
    }
    .form-area {
      .upload {
        text-align: center;
        .upload-button {
          padding: 9px 16px;
          border: 1px dashed rgba(15, 27, 67, 0.2);
          border-radius: 6px;
          span {
            display: flex;
            align-items: center;
            font-weight: 400;
            font-size: 12px;
            line-height: 14px;
            color: rgba(15, 27, 67, 0.6);
            img {
              margin-right: 9px;
            }
          }
        }
      }
      .accept-reject-reason {
        textarea {
          resize: none;
          height: 160px;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 8px;
          padding: 25px;
          font-weight: 400;
          font-size: 16px;
          line-height: 19px;
          border: 0;
          font-family: 'Libre Franklin';
          &::placeholder {
            color: rgba(15, 27, 67, 0.2);
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
</style>
