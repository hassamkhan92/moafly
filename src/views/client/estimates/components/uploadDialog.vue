<template>
  <div v-if="visible" class="dialog-main">
    <!-- 伤处单元号 -->
    <div v-if="contentType == 'unitNumber'" class="upload-main unitNumber-main">
      <p class="unitNumber-title">Specify your unit number?</p>
      <el-form :model="form" ref="form" :rules="rule">
        <el-form-item prop="unitNumber">
          <el-input class="unitNumber-input" maxlength="4" placeholder="" v-model="form.unitNumber"></el-input>
        </el-form-item>
      </el-form>
      <div class="footer">
        <div @click="handleSkip('upload', 1)" class="btn btn-cancel cursor">Skip</div>
        <div @click="handlerNext('upload', 2)" class="btn btn-go cursor">Continue</div>
      </div>
    </div>
    <!-- 上传内容 -->
    <div v-else-if="contentType == 'upload'" class="upload-main">
      <div class="header-box">
        <p class="title">Upload home pictures</p>
        <i @click="handlerClose" class="el-icon-circle-close"></i>
      </div>
      <!-- 上传后内容 -->
      <div v-if="fileList.length" class="upload-content upload-fileList">
        <div class="img-list-box">
          <div v-for="(item, idx) in fileList" :key="idx" class="img-item">
            <img class="img-home" :src="item" alt="" />
            <i @click="handlerDelet(idx)" class="el-icon-error cursor"></i>
          </div>
          <upload @uploadOnchange="uploadOnchange" :file-list="fileList" class="img-upload-item img-item">
            <i class="el-icon-plus"></i>
          </upload>
        </div>
        <div class="footer">
          <div @click="handlerClose" class="btn btn-cancel cursor">Cancel</div>
          <div @click="handlerQuery" class="btn btn-go cursor">Let's go!</div>
        </div>
      </div>
      <!-- 上传内容 -->
      <div v-else class="upload-content">
        <upload @uploadOnchange="uploadOnchange" :file-list="fileList" class="upload-box">
          <div class="el-upload-center" slot="default">
            <img class="upload-icon" :src="require('@/assets/images/agent/upload-icon.png')" alt="" />
            <p class="upload-title icon-text">Upload pictures</p>
          </div>
        </upload>
        <p class="upload-title">Our AI model will give an estimate price based on your home information and photos uploaded</p>
      </div>
      <q-inner-loading :showing="loading" color="red-4" label="Please wait..." label-class="text-teal" label-style="font-size: 1.1em" />
    </div>
    <!--查询内容 -->
    <!-- <div v-else class="result-main">
      <i @click="handlerClose" class="el-icon-error"></i>
      <div class="header-bg"></div>
      <div class="result-content">
        <div class="title-box">
          <p class="title title1">{{ params.address1 }}</p>
          <p class="title title2">{{ params.address2 }}</p>
        </div>

        <div class="result-price">
          <p class="price-name">Your home value</p>
          <p class="price-text">
            <span class="text1">moafly estimate </span>
            <el-tooltip :hide-after="0" popper-class="price-tootip" class="item" effect="light" placement="bottom-start">
              <div slot="content">{{ tipContent }}<span class="tootip-title-learn">Learn more.</span></div>
              <img :src="require('@/assets/images/agent/question.png')" alt="" />
            </el-tooltip>
            <span class="text3">--------------------------------------------------------------------</span>
            <span class="text4"> ${{ numberFormat(homePrice) }}</span>
          </p>
        </div>
      </div>
    </div> -->
    <div v-else class="result-main">
      <i @click="handlerClose" class="el-icon-error"></i>
      <!-- 上半部分 -->
      <div class="header-bg"></div>
      <!-- 内容 -->
      <div class="result-content">
        <div class="title-box">
          <p class="title title1">{{ params.address1 }}</p>
          <p class="title title2">{{ params.address2 }}</p>
        </div>
        <!-- 价格显示 -->
        <div class="result-price">
          <p class="price-name">Your home value</p>
          <div class="price-text" :class="{ 'Moafly-active': isMoafly }">
            <span class="text1 nowrap">moafly estimate </span>
            <el-tooltip :hide-after="0" popper-class="price-tootip" class="item" effect="light" placement="bottom-start">
              <div slot="content">{{ tipContent }}<span class="tootip-title-learn">Learn more.</span></div>
              <img class="img-question" :src="require('@/assets/images/agent/question.png')" alt="" />
            </el-tooltip>
            <p class="line-row"></p>
            <span class="text4"> ${{ homePrice == 'N/A' ? homePrice : numberFormat(homePrice) }}</span>
          </div>
          <div class="price-text" :class="{ 'zillow-text': isZillow }">
            <img v-if="isZillow" class="zillow-text-img" :src="require('@/assets/svg/zillow-text.svg')" alt="" />
            <span v-else class="text1 nowrap">zillow estimate</span>
            <span class="text1"> estimate</span>
            <p class="line-row"></p>
            <span class="text4"> ${{ zestimate == 'N/A' ? zestimate : numberFormat(zestimate) }}</span>
          </div>
        </div>
        <div class="opera-box">
          <img class="zillow-img" :src="require('@/assets/svg/zillow.svg')" alt="" />
          <p @click="handlerSellHere" class="view-home-title cursor">
            Start selling here >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import upload from './upload';
import { checkFile1, numberFormat } from '@/util/index';
import * as api from '@/api';
export default {
  name: 'upload-dialog',
  components: {
    upload
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    const validaUnit = (rule, value, callback) => {
      if (!value) {
        callback(new Error('UnitNumber is required '));
      } else {
        if (typeof Number(value) !== 'number' || value < 1) {
          callback(new Error('Please provide a correct number'));
        }
        callback();
      }
    };
    return {
      tipContent: 'A moafly estimate home valuation is moafly’s estimated market value. It is not an appraisal. Use it as a starting point to determine a home’s value.',
      contentType: 'unitNumber', //upload:上传;housePrice：房屋估价; :单元号:unitNumber
      form: {
        unitNumber: ''
      },
      fileList: [],
      fileType: ['jpg', 'jpeg', 'png', 'image/jpeg', 'PDF'],
      fileSize: 5,
      homePrice: 'N/A',
      zestimate: 'N/A',
      loading: false,
      rule: {
        unitNumber: [{ validator: validaUnit, trigger: 'blur' }]
      },
      isZillow: true,
      isMoafly: true
    };
  },
  methods: {
    numberFormat,
    handleSkip(type) {
      this.contentType = type;
    },
    //跳转下一步
    handlerNext(type, code) {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.contentType = type;
        }
      });
    },
    //删除
    handlerDelet(idx) {
      this.fileList.splice(idx, 1);
    },
    //关闭弹窗
    handlerClose() {
      this.$emit('handlerClose');
    },
    //上传文件
    uploadOnchange(file, fileList) {
      if (checkFile1(file, this.fileType, this.fileSize)) {
        const formData = new FormData();
        formData.append('file', file.raw);
        api.upload.uploadFile(formData).then(res => {
          if (res.code === 'K-000000') {
            this.fileList.push(res.context);
          }
        });
      }
    },
    handlerQuery() {
      if (this.fileList.length < 1) {
        return this.$message.warn('Please upload at least five pictures');
      }
      let params = {};
      params.address = this.params.address;
      params.imgUrlList = this.fileList;
      params.postalCode = this.params.postalCode;
      params.unitNumber = this.form.unitNumber;
      this.loading = true;
      api.search
        .moestimate(params)
        .then(res => {
          if (res.code === 'K-000000') {
            if (res.context) {
              this.homePrice = res.context.moestimate;
              this.zestimate = res.context.zestimate;
              if (res.context.moestimate == '0') {
                this.homePrice = 'N/A';
              }
              if (res.context.zestimate == '0') {
                this.zestimate = 'N/A';
              }
            } else {
              this.homePrice = 'N/A';
              this.zestimate = 'N/A';
            }
            this.contentType = 'housePrice';
          } else if (res.code === 'K-000001') {
            this.homePrice = 'N/A';
            this.zestimate = 'N/A';
            this.contentType = 'housePrice';
          } else {
            this.$message.warn('The query fails');
          }
          this.loading = false;
          console.log('this.homePrice==>', this.homePrice, this.zestimate);
        })
        .catch(err => {
          this.homePrice = 'N/A';
          this.zestimate = 'N/A';
        });
    },
    //跳转页面
    handlerSellHere() {
      this.$store.commit('SET_HOME_ID', '');
      this.$store.commit('SET_HOME_INFO', {});
      this.$router.push('/sell');
    }
  }
};
</script>
<style lang="less">
.price-tootip.is-light {
  font-family: 'Libre Franklin';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: rgba(15, 27, 67, 0.6);
  width: 260px;
  height: 118px;
  background: #ffffff;
  border: 1px solid #d7d9df;
  border-radius: 6px;
  .tootip-title-learn {
    color: #dc5674;
  }
}
.text-teal {
  color: #dc5674;
}
</style>
<style lang="less" scoped>
p {
  margin: 0;
}
.dialog-main {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  .flex();

  .upload-main {
    width: 600px;
    min-height: 420px;
    max-height: 700px;
    overflow-y: auto;
    background: #ffffff;
    border-radius: 16px;
    position: relative;
    .header-box {
      width: 100%;
      height: 70px;
      .MoaflyText(500, 18px, 18px, #0f1b43);
      .flex();
      justify-content: space-between;
      padding: 24px;
      box-sizing: border-box;
      border-bottom: 1px solid rgba(15, 27, 67, 0.1);
      .title {
        margin: 0;
      }
      .el-icon-circle-close {
        font-size: 20px;
      }
    }
    .upload-content {
      width: 100%;
      min-height: calc(100% - 70px);
      .flex();
      align-items: flex-start;
      flex-wrap: wrap;
      .upload-box {
        width: 187px;
        height: 157px;
        margin-top: 69px;
      }
      .upload-icon {
        margin-top: 12px;
      }
      .upload-title {
        .MoaflyText(400, 14px, 17px, rgba(15, 27, 67, 0.6));
        text-align: center;
        margin-top: 24px;
      }
      .icon-text {
        margin-top: 12px;
      }
    }
    .upload-fileList {
      padding: 12px 36px 40px 28px;
      justify-content: flex-start;
      min-height: 350px;
      .img-list-box {
        width: 100%;
        max-height: 440px;
        .flex();
        justify-content: flex-start;
        overflow-y: auto;
        flex-wrap: wrap;
      }
      .img-item {
        position: relative;
        width: 110px;
        height: 110px;
        border-radius: 4px;
        margin: 12px;
        .img-home {
          border-radius: 4px;
        }
        img {
          width: 100%;
          height: 100%;
        }
        .el-icon-error {
          color: #dc5674;
          position: absolute;
          font-size: 17px;
          right: -8px;
          top: -8px;
        }
      }
      .img-upload-item {
        width: 110px;
        height: 110px;
        border: 1px dashed rgba(15, 27, 67, 0.2);
        border-radius: 4px;
        .flex();
        .el-icon-plus {
          font-size: 40px;
          color: #d9d9d9;
        }
      }
      .footer {
        margin-top: 78px;
        width: 100%;
        height: 32px;
        .flex();
        .btn {
          width: 120px;
          height: 32px;
          border: 1px solid #dc5674;
          border-radius: 6px;
          .MoaflyText(500, 16px, 32px, #dc5674);
          margin-right: 16px;
          text-align: center;
        }
        .btn-go {
          color: #ffffff;
          background: #dc5674;
        }
      }
    }
  }
  .unitNumber-main {
    min-height: 380px;
    padding-top: 100px;
    .unitNumber-title {
      .MoaflyText(400, 24px, 29px, #0f1b43);
      text-align: center;
      margin: 0;
    }
    .el-form {
      margin: 40px auto;
      width: 40%;
    }
    .footer {
      margin-bottom: 16px;
      width: 100%;
      height: 32px;
      .flex();
      .btn {
        width: 120px;
        height: 32px;
        border: 1px solid #dc5674;
        border-radius: 6px;
        .MoaflyText(500, 16px, 32px, #dc5674);
        margin-right: 16px;
        text-align: center;
      }
      .btn-go {
        color: #ffffff;
        background: #dc5674;
      }
    }
  }
  .result-main {
    position: relative;
    box-sizing: border-box;
    width: 990px;
    height: 568px;
    background: #ffffff;
    border-radius: 16px;
    .flex();
    .el-icon-error {
      position: absolute;
      right: 24px;
      top: 24px;
      font-size: 53px;
      color: rgba(15, 27, 67, 0.2);
      z-index: 10;
    }
    .header-bg {
      width: 406px;
      height: 100%;
      background-image: url('~@/assets/images/estimate/estimate.png');
      background-size: 100% 100%;
    }
    .result-content {
      width: calc(100% - 406px);
      height: 100%;
      background: radial-gradient(98.74% 100% at 48.51% 0%, rgba(255, 255, 255, 0.15) 29.69%, rgba(220, 87, 117, 0.0045) 99.99%, rgba(220, 86, 116, 0.012) 100%);
      backdrop-filter: blur(5px);
      padding: 120px 32px 0 32px;
      box-sizing: border-box;
      .title-box {
        .title {
          .MoaflyText(500, 34px, 40px, #0f1b43);
        }
        .title3 {
          font-size: 28px;
        }
      }
      .result-price {
        margin-top: 47px;
        .price-name {
          .MoaflyText(500, 28px, 40px, #0f1b43);
          margin-bottom: 12px;
        }
        .price-text {
          padding: 0 16px;
          .flex();
          justify-content: flex-start;
          .text1 {
            .MoaflyText(400, 24px, 40px, #0f1b43);
          }
          .line-row {
            margin-left: 24px;
            width: 150px;
            height: 0;
            border: 1px dashed #e1e3e7;
          }
          .img-question {
            margin-left: 10px;
          }
          /deep/.is-light {
            border-color: #dc5674 !important;
          }
          .text4 {
            margin-left: 24px;
            .MoaflyText(500, 24px, 40px, #0f1b43);
          }

          .zillow-text-img {
            width: 79px;
            height: 17px;
          }
        }
        .zillow-text {
          .text1 {
            color: #256df6;
          }
          .text4 {
            color: #256df6;
          }
        }
        .Moafly-active {
          background: rgba(220, 86, 116, 0.1);
          border-radius: 8px;
        }
      }

      .opera-box {
        width: 100%;
        position: absolute;
        right: 0;
        bottom: 40px;
        padding: 0 24px;
        box-sizing: border-box;
        .flex();
        justify-content: space-between;
        .view-home-title {
          .MoaflyText(400, 24px, 40px, #dc5674);
        }
        .zillow-img {
          width: 100px;
          height: 38px;
        }
      }
    }
  }
}
</style>
