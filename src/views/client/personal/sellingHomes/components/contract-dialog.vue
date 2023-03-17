<!--
 * @Author: zulezhe
 * @Date: 2022-01-19 23:17:20
 * @LastEditors: zulezhe
 * @LastEditTime: 2023-01-19 22:39:07
 * @Path: https://gitee.com/zulezhe/
 * @Description:合同弹窗
-->

<template>
  <Popups :isShow="isShow" @handleClose="handleClose" width="600px" :closeIsShow="false" class="contract-dialog">
    <div class="content">
      <div class="header">
        <div class="title">Sign Contract</div>
      </div>
      <el-divider></el-divider>
      <div class="body">
        <div class="example-container">
          <span class="text">Please download moafly's listing contract and upload it after signing. </span>
          <span class="see-example" @click="handleSee">See Example</span>
        </div>
        <div class="download-container">
          <WButton
            text="Download Contract"
            width="120px"
            height="38px"
            radius="6px"
            bgColor="rgba(220, 86, 116, 0)"
            border="1px solid #dc5674"
            color="#dc5674"
            size="10px"
            @handleClick="handleDownload"
            class="download-button"
          ></WButton>
        </div>
        <el-divider></el-divider>
        <div class="upload-container">
          <div class="upload-title">
            Upload files
          </div>
          <div class="upload-item">
            <upload class="contract-upload" @uploadOnchange="uploadOnchange"></upload>
          </div>
          <div class="upload-item driving-licence">
            <upload class="license-upload" text="Driving license" @uploadOnchange="uploadLicencechange"></upload>
          </div>
        </div>
      </div>
      <div class="footer">
        <WButton text="Cancel" width="110px" height="32px" bgColor="rgba(220, 86, 116, 0)" color="#dc5674" border="1px solid #dc5674" radius="6px" @handleClick="handleCancel"></WButton>
        <WButton v-throttle text="Confirm" width="110px" height="32px" radius="6px" @handleClick="handleSubmit"></WButton>
      </div>
    </div>
  </Popups>
</template>
<script>
import Popups from '@/components/Popups/index.vue';
import WButton from '@/components/Button';
import upload from './contract-upload.vue';
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import { timeFormat, addMonths, checkFile1, numberFormat } from '@/util/index';
import * as api from '@/api';
export default {
  components: { Popups, WButton, upload },
  props: {
    isShow: {
      type: Boolean,
      default: true
    },
    homeItemInfo: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      fileType: ['jpg', 'png', 'image/jpeg', 'jpeg', 'image/png', 'pdf', 'gif'],
      fileSize: 50,
      pdfDataUri: './assets/Res_Listing_Agmt_-_sample.pdf',
      pdfDataUrl2: './assets/Res_Listing_Agmt_-_sample2.pdf',
      form: {}, //提交的信息
      fileList: []
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    //上传合同文件
    uploadOnchange(file, fileList) {
      if (checkFile1(file, this.fileType, this.fileSize)) {
        const formData = new FormData();
        formData.append('file', file.raw);
        this.$loading.open();
        api.upload
          .uploadFile(formData)
          .then(res => {
            if (res.code === 'K-000000') {
              this.form.contractPdfUrl = res.context;
            }
          })
          .catch(err => {
            console.log('error', err);
          })
          .finally(() => {
            this.$loading.close();
          });
      }
    },
    // 上传驾照
    uploadLicencechange(file, fileList) {
      if (checkFile1(file, this.fileType, this.fileSize)) {
        const formData = new FormData();
        formData.append('file', file.raw);
        this.$loading.open();
        api.upload
          .uploadFile(formData)
          .then(res => {
            if (res.code === 'K-000000') {
              this.form.drivingLicenseUrl = res.context;
            }
          })
          .catch(err => {
            console.log('error', err);
          })
          .finally(() => {
            this.$loading.close();
          });
      }
    },
    handleClose() {
      this.$emit('handleClose');
    },
    handleSee() {
      console.log('查看示例');
      window.open(this.pdfDataUri);
    },
    handleDownload() {
      this.$loading.open('正在生成模板...');
      this.handleRender().then(res => {
        setTimeout(() => {
          this.$loading.close();
          console.log('this.pdfDataUri===>', res);
          // window.open(res);
          this.download(res, 'Moafly Contract');
        }, 1000);
      });
    },
    handleCancel() {
      this.fileList = [];
      this.$emit('handleCancel');
    },
    handleSubmit() {
      this.form.houseStep = '10';
      let data = { ...this.homeItemInfo, ...this.form };
      this.$loading.open();
      api.home
        .addHome(data)
        .then(res => {
          this.$emit('contractSubmitSucssful');
        })
        .catch(err => {
          console.log('err=>', err);
        })
        .finally(() => {
          this.$loading.close();
        });
    },
    /**
     * 渲染内容
     */
    async handleRender() {
      let date = timeFormat(new Date(), 'MM/dd/yyyy');
      let positions = [
        {
          page: 0,
          x: 500,
          y: 170,
          value: date
        },
        {
          page: 0,
          x: 500,
          y: 115,
          value: date
        },
        {
          page: 3,
          x: 480,
          y: 160,
          value: date
        },
        {
          page: 4,
          x: 515,
          y: 310,
          value: date
        },
        {
          page: 4,
          x: 515,
          y: 210,
          value: date
        },
        {
          page: 4,
          x: 515,
          y: 195,
          value: date
        },
        {
          page: 5,
          x: 515,
          y: 210,
          value: date
        },
        {
          page: 5,
          x: 120,
          y: 705,
          value: this.homeItemInfo.houseAddress + ' ' + this.homeItemInfo.houseCity + ',' + ' ' + this.formatZipCode()
        },
        {
          page: 6,
          x: 105,
          y: 715,
          value: date
        },
        {
          page: 6,
          x: 130,
          y: 670,
          value: date
        },
        {
          page: 6,
          x: 390,
          y: 670,
          value: addMonths(timeFormat(new Date(), 'MM/dd/yyyy'), 6)
        },
        {
          page: 6,
          x: 405,
          y: 658,
          value: this.homeItemInfo.houseAddress
        },
        {
          page: 6,
          x: 260,
          y: 640,
          value: this.formatZipCode()
        },
        {
          page: 7,
          x: 110,
          y: 760,
          value: this.homeItemInfo.houseAddress + ' ' + this.homeItemInfo.houseCity + ',' + ' ' + this.formatZipCode()
        },
        {
          page: 7,
          x: 505,
          y: 760,
          value: date
        },
        {
          page: 8,
          x: 110,
          y: 760,
          value: this.homeItemInfo.houseAddress + ' ' + this.homeItemInfo.houseCity + ',' + ' ' + this.formatZipCode()
        },
        {
          page: 9,
          x: 110,
          y: 760,
          value: this.homeItemInfo.houseAddress + ' ' + this.homeItemInfo.houseCity + ',' + ' ' + this.formatZipCode()
        },
        {
          page: 10,
          x: 110,
          y: 760,
          value: this.homeItemInfo.houseAddress + ' ' + this.homeItemInfo.houseCity + ',' + ' ' + this.formatZipCode()
        },
        {
          page: 10,
          x: 480,
          y: 355,
          value: date
        },
        {
          page: 10,
          x: 525,
          y: 205,
          value: date
        },
        {
          page: 11,
          x: 110,
          y: 705,
          value: this.homeItemInfo.houseAddress + ' ' + this.homeItemInfo.houseCity + ',' + ' ' + this.formatZipCode()
        },
        {
          page: 12,
          x: 110,
          y: 760,
          value: this.homeItemInfo.houseAddress + ' ' + this.homeItemInfo.houseCity + ',' + ' ' + this.formatZipCode()
        },
        {
          page: 12,
          x: 520,
          y: 760,
          value: date
        },
        {
          page: 12,
          x: 495,
          y: 250,
          value: date
        },
        {
          page: 12,
          x: 470,
          y: 184,
          value: date
        },
        {
          page: 13,
          x: 485,
          y: 430,
          value: date
        }
      ];
      const existingPdfBytes = await fetch(this.pdfDataUrl2).then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes, {
        updateMetadata: false
      });
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      positions.map(item => {
        const pages = pdfDoc.getPages();
        const page = pages[item.page];
        const { width, height } = page.getSize();
        console.log(width, height);
        page.drawText(item.value, {
          x: item.x,
          y: item.y,
          size: 10,
          color: rgb(0, 0, 0.505),
          lineHeight: 10
        });
      });
      let Uint8Array = await pdfDoc.save({ dataUri: true });
      let bolb = new Blob([Uint8Array.buffer], {
        type: 'application/pdf'
      });
      return URL.createObjectURL(bolb);
    },
    download(url, name) {
      var a = document.createElement('a');
      var filename = name;
      a.href = url;
      a.download = filename;
      a.click();
    },
    formatZipCode() {
      let res = '';
      try {
        if (this.homeItemInfo) {
          if (this.homeItemInfo.zipCode) {
            res = this.homeItemInfo.zipCode.split('-')[0];
          }
        }
      } catch (error) {}
      return res;
    }
  }
};
</script>
<style scoped lang="less">
.contract-dialog {
  /deep/.my-dialog {
    max-width: 600px;
    width: 100% !important;
  }
  .content {
    width: 100%;
    box-shadow: 11px 11px 42px 0px rgba(27, 23, 98, 0.15);
    padding: 24px;
    box-sizing: border-box;
  }
  .header {
    .title {
      height: 16px;
      font-weight: 500;
      color: #0f1b43;
      font-family: 'Libre Franklin';
    }
    .el-radio-group {
      display: flex;
      flex-direction: column;
      margin: 20px 0 0 79px;
      .el-radio {
        margin-bottom: 20px;
      }
    }
  }
  .body {
    width: 100%;
    font-size: 12px;
    .example-container {
      background-color: #f5f6f7;
      border-radius: 8px;
      padding: 15px 20px;
      box-sizing: border-box;
      .text {
        overflow-wrap: break-word;
        font-weight: 400;
        line-height: 20px;
      }
      .see-example {
        margin-left: 20px;
        color: #dc5674;
        cursor: pointer;
      }
    }
    .download-container {
      margin-top: 20px;
      margin-left: 20px;
    }
    .upload-container {
      .upload-title {
        height: 16px;
        font-weight: 500;
        color: #0f1b43;
        font-family: 'Libre Franklin';
      }
      .upload-item {
        margin-top: 16px;
        .contract-upload {
          display: flex;
          /deep/.el-upload {
            .el-button {
              width: 160px;
            }
          }
          /deep/.el-upload-list {
            margin-left: 10px;
          }
        }
      }
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    .w-button {
      margin-right: 5px;
    }
  }
}
</style>
