<template>
  <MoaflyDialog class="offerDialog" :visible.sync="setShow" title="Start an offer">
    <div class="content">
      <div class="contract-area">
        <div class="download-contract">
          <p>Please download moafly's listing contract and upload it after signing <a href="#">See Example</a></p>
        </div>
        <WButton text="Download Contract" class="download-contract-button"></WButton>
      </div>
      <div class="form-area">
        <el-form :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
          <el-row :gutter="20">
            <el-col :xs="24" :md="24">
              <el-form-item class="input-wrap" label="Upload your signed contract" prop="contract">
                <el-upload class="upload" multiple :auto-upload="false" :on-change="handleFileChange">
                  <el-button class="upload-button"><img :src="require('@/assets/images/upload-plus.svg')" alt="Upload" />Upload contract</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :md="12">
              <el-form-item class="input-wrap" label="Deposit amount" prop="deposit">
                <el-input class="request-input" v-model="ruleForm.deposit" placeholder="Please enter (%)" type="text" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :md="12">
              <el-form-item class="input-wrap" label="Offer Price" prop="offer">
                <el-input class="request-input" v-model="ruleForm.offer" placeholder="Please enter" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :md="12">
              <el-form-item class="input-wrap" label="Appraisal contingency" prop="appraisalContingency">
                <el-select class="request-select" v-model="ruleForm.appraisalContingency" placeholder="Please Select">
                  <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :md="12">
              <el-form-item class="input-wrap" label="Type of loan" prop="loan">
                <el-select class="request-select" v-model="ruleForm.loanType" placeholder="Please Select">
                  <el-option v-for="item in loanType" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :md="12">
              <el-form-item class="input-wrap" label="Loan contingency" prop="loanContingency">
                <el-select class="request-select" v-model="ruleForm.loanContingency" placeholder="Please Select">
                  <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :md="12">
              <el-form-item class="input-wrap" label="Appraisal contingency" prop="contingency">
                <el-select class="request-select" v-model="ruleForm.contingency" placeholder="Please Select">
                  <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :md="12">
              <el-form-item class="input-wrap" label="Escrow and title fees paid by" prop="titleFee">
                <el-select class="request-select" v-model="ruleForm.titleFee" placeholder="Please Select">
                  <el-option v-for="item in feeTypes" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :md="24">
              <div class="form-buttons">
                <WButton class="cancel-button custom-button" v-throttle text="Cancel" @handleClick="handlerClose"></WButton>
                <WButton class="submit-button custom-button" v-throttle text="Send" v-loading="btnLoad"></WButton>
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
      btnLoad: false,
      setShow: false,
      labelPosition: 'top',
      ruleForm: {
        fileList: [],
        deposit: '',
        offer: '',
        appraisalContingency: '',
        loanType: '',
        loanContingency: '',
        titleFee: '',
        investigation: ''
      },
      yesNoOptions: [
        {
          value: '1',
          label: 'Yes'
        },
        {
          value: '0',
          label: 'No'
        }
      ],
      loanType: [
        {
          value: '1',
          label: 'Conventional'
        },
        {
          value: '2',
          label: 'Jumbo'
        },
        {
          value: '3',
          label: 'FHA loan'
        },
        {
          value: '4',
          label: 'VA loan'
        }
      ],
      feeTypes: [
        {
          value: '1',
          label: 'Split'
        },
        {
          value: '2',
          label: 'Buyer'
        },
        {
          value: '3',
          label: 'Seller'
        }
      ],
      rules: {
        deposit: [{ required: true, message: 'Please enter valid amount', trigger: 'blur' }],
        offer: [{ required: true, message: 'Please enter valid offer price', trigger: 'blur' }],
        appraisalContingency: [{ required: true, message: 'Please select either of the value', trigger: 'blur' }],
        loanType: [{ required: true, message: 'Please select either of the value', trigger: 'blur' }],
        loanContingency: [{ required: true, message: 'Please select either of the value', trigger: 'blur' }],
        titleFee: [{ required: true, message: 'Please select either of the value', trigger: 'blur' }],
        investigation: [{ required: true, message: 'Please select either of the value', trigger: 'blur' }]
      }
    };
  },
  methods: {
    handlerClose() {
      this.$emit('handlerClose');
    },
    handleFileChange() {
      this.ruleForm.fileList.value = this.ruleForm.fileList.value.slice(-3);
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
      .contract-area {
        padding-bottom: 24px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        .download-contract {
          background: #f5f6f7;
          border-radius: 4px;
          padding: 12px 24px;
          margin-bottom: 12px;
          p {
            font-weight: 400;
            font-size: 12px;
            line-height: 18px;
            color: #0f1b43;
            a {
              color: #dc5674;
            }
          }
        }
        .download-contract-button {
          border: 1px solid #dc5674;
          border-radius: 6px !important;
          max-width: 122px;
          width: 100% !important;
          height: auto !important;
          background-color: #fff !important;
          padding: 0;

          span {
            font-weight: 400;
            font-size: 10px !important;
            line-height: 16px;
            color: #dc5674 !important;
            display: block;
            padding: 8px 16px;
          }
        }
      }
      .form-area {
        padding-top: 24px;
        .request-select {
          width: 100%;
        }
        .input-wrap {
          .el-form-item__label {
            font-weight: 400;
            font-size: 14px;
            line-height: 17px;
            color: rgba(15, 27, 67, 0.6);
            padding-bottom: 12px;
          }
          .request-input,
          .request-select {
            input {
              border: 1px solid rgba(15, 27, 67, 0.2);
              border-radius: 6px;
              font-weight: 400;
              font-size: 14px;
              line-height: 17px;
              color: #0f1b43;
            }
          }
        }
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
}
</style>
