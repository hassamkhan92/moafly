<template>
  <div class="detail_info-Features">
    <p class="feature-title">Feature</p>
    <div class="feature_box">
      <el-row :gutter="20" class="features-row">
        <el-col class="features-col" :xs="12" :md="8" :lg="3">
          <p class="title">On Moafly</p>
          <p class="text" v-if="homeDetail.daysOnMarket">{{ homeDetail.daysOnMarket }} days</p>
          <p class="text" v-else>-</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" :lg="3">
          <p class="title">Type</p>
          <p class="text" v-if="homeDetail.propertyType">{{ homeDetail.propertyType }}</p>
          <p class="text" v-else>-</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" :lg="3">
          <p class="title">City</p>
          <p class="text">{{ homeDetail.city }}</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" :lg="3">
          <p class="title">Home size</p>
          <p class="text" v-if="homeDetail.livingArea">{{ homeDetail.livingArea }} sq. ft.</p>
          <p class="text" v-else>-</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" :lg="3">
          <p class="title">Built in</p>
          <p class="text" v-if="homeDetail.yearBuilt">{{ homeDetail.yearBuilt }}</p>
          <p class="text" v-else>-</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" :lg="3">
          <p class="title">Lot size</p>
          <p class="text" v-if="homeDetail.lotSizeArea">{{ homeDetail.lotSizeArea }} sq. ft.</p>
          <p class="text" v-else>-</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" :lg="3">
          <p class="title">Price per sqft</p>
          <p class="text" v-if="homeDetail.livingArea && homeDetail.livingArea > 0">${{ formatPricePer() }}</p>
          <p class="text" v-else>-</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" :lg="3">
          <p class="title">Beds</p>
          <p class="text" v-if="homeDetail.bedroomsTotal">{{ homeDetail.bedroomsTotal }}</p>
          <p class="text" v-else>-</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" :lg="3">
          <p class="title">Baths</p>
          <p class="text" v-if="homeDetail.bathroomsFull">{{ homeDetail.bathroomsFull }}</p>
          <p class="text" v-else>-</p>
        </el-col>
        <el-col class="features-col" :xs="12" :md="8" :lg="5">
          <p class="title">HOA dues</p>
          <p class="text" v-if="homeDetail.associationFee">${{ homeDetail.associationFee }} a month</p>
          <p class="text" v-else>-</p>
        </el-col>
      </el-row>
    </div>
    <div class="feat_btns">
      <WButton text="Start An Offer" bgColor="#DC5674" radius="6px" height="34px" size="12px" width="153px" @handleClick="handleClick"></WButton>
      <p class="bug-moafly-title">(Buy with Moafly, save up to ${{ handleGetNumber() }})</p>
    </div>
    <MoaflyDialog class="offerDialog" :visible.sync="visible" title="Start an offer">
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
                <el-form-item label="Upload your signed contract" prop="contract">
                  <el-upload class="upload" multiple :on-change="handleFileChange">
                    <el-button type="primary">Click to upload</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :md="12">
                <el-form-item label="Deposit amount" prop="deposit">
                  <el-input v-model="ruleForm.deposit"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :md="12">
                <el-form-item label="Offer Price" prop="offer">
                  <el-input v-model="ruleForm.offer"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :md="12">
                <el-form-item label="Appraisal contingency" prop="appraisalContingency">
                  <el-select class="request-select" v-model="ruleForm.appraisalContingency" placeholder="Please Select">
                    <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :md="12">
                <el-form-item label="Type of loan" prop="loan">
                  <el-select class="request-select" v-model="ruleForm.loanType" placeholder="Please Select">
                    <el-option v-for="item in loanType" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :md="12">
                <el-form-item label="Loan contingency" prop="loanContingency">
                  <el-select class="request-select" v-model="ruleForm.loanContingency" placeholder="Please Select">
                    <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :md="12">
                <el-form-item label="Appraisal contingency" prop="contingency">
                  <el-select class="request-select" v-model="ruleForm.contingency" placeholder="Please Select">
                    <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :md="12">
                <el-form-item label="Escrow and title fees paid by" prop="titleFee">
                  <el-select class="request-select" v-model="ruleForm.titleFee" placeholder="Please Select">
                    <el-option v-for="item in feeTypes" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col>
                <div class="form-buttons">
                  <WButton class="cancel-button custom-button" v-throttle text="Cancel"></WButton>
                  <WButton class="submit-button custom-button" v-throttle text="Send" v-loading="btnLoad"></WButton>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </MoaflyDialog>
  </div>
</template>

<script>
import WButton from '@/components/Button';
import MoaflyDialog from '@/components/MoaflyDialog';
import { formatNumber } from '@/util/index.js';
import { ref } from 'vue'

export default {
  components: { WButton, MoaflyDialog },
  props: {
    homeDetailsData: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    homeDetailsData(newVal, oldVal) {
      this.homeDetail = newVal;
    }
  },
  created() {
    this.homeDetail = this.homeDetailsData;
  },
  data() {
    return {
      homeDetail: {},
      visible: false,
      labelPosition: 'top',
      btnLoad: false,
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
          value: 'Yes',
          label: 'Yes'
        },
        {
          value: 'No',
          label: 'No'
        }
      ],
      loanType: [
        {
          value: 'Conventional',
          label: 'Conventional'
        },
        {
          value: 'Jumbo loan',
          label: 'Jumbo loan'
        },
        {
          value: 'Government-insured loan',
          label: 'Government-insured loan'
        },
        {
          value: 'Fixed-rate mortgage',
          label: 'Fixed-rate mortgage'
        },
        {
          value: 'Adjustable-rate mortgage',
          label: 'Adjustable-rate mortgage'
        }
      ],
      feeTypes: [
        {
          value: 'Split',
          label: 'Split'
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
    handleGetNumber() {
      return formatNumber((this.homeDetailsData.listPrice * this.homeDetailsData.buyerAgencyCompensation) / 100);
    },
    handleClick() {
      this.visible = true;
    },
    handlerClose() {
      this.visible = false;
    },
    formatPricePer() {
      return (this.homeDetail.listPrice / this.homeDetail.livingArea).toFixed(1);
    },
      handleFileChange = (uploadFile, uploadFiles) => {
  fileList.value = fileList.value.slice(-3)
    }
  }
};
</script>

<style lang="less" scoped>
.detail_info-Features {
  width: 100%;
  padding-bottom: 23px;
  border-bottom: 1px solid #eeeeee;
  .feature-title {
    font-family: 'Libre Franklin';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #0f1b43;
    margin-bottom: 15px;
  }
  .features-row {
    display: flex;
    flex-wrap: wrap;
    gap: 30px 0;
    margin-bottom: 30px;

    .features-col {
      float: none;
    }
  }
  .feature_box {
    width: 100%;

    .title {
      font-size: 14px;
      font-family: 'Libre Franklin';
      font-style: normal;
      font-weight: 400;
      color: rgba(15, 27, 67, 0.6);
      line-height: 17px;
    }

    .text {
      font-family: 'Libre Franklin';
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: #0f1b43;
    }
  }
  .feat_btns {
    width: 100%;
    .flex();
    justify-content: flex-start;

    .button-container {
      margin-right: 20px;
    }

    .bug-moafly-title {
      font-family: 'Libre Franklin';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: rgba(15, 27, 67, 0.6);
      margin-top: 15px;
    }
  }
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
}
</style>
