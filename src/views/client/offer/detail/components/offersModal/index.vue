<template>
  <MoaflyDialog class="offerDialog" :visible.sync="setShow" title="XXXXXXXXXXXXX">
    <div class="content">
      <el-row :gutter="20">
        <el-col :xs="24" :md="24">
          <img :src="require('@/assets/images/offers-modal.png')" class="offer-img" />
          <h6 class="title">You have chosen contract xx. <a href="javascript:void(0);">Download</a></h6>
          <p class="details">Some analyzing from moafly, Some analyzing from moafly, Some analyzing from moafly, Some analyzing from moafly, Some analyzing from moafly,</p></el-col
        >
        <el-col :xs="24" :md="24">
          <div class="form-buttons">
            <WButton class="cancel-button custom-button" v-throttle text="Accept"></WButton>
            <WButton class="submit-button custom-button" v-throttle text="Refuse" @handleClick="handlerClose"></WButton>
          </div>
        </el-col>
      </el-row>
    </div>
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
      padding: 0 20px;
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
        margin-bottom: 24px;
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
