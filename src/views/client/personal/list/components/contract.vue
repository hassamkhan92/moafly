<!--
 * @Author: zulezhe
 * @Date: 2022-01-19 23:17:20
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-07-20 23:37:10
 * @Path: https://gitee.com/zulezhe/
 * @Description:合同弹窗
-->

<template>
  <Popups :isShow="isShow" @handleClose="handleClose" width="1200px">
    <div class="contract-container">
      <div class="contract-header">
        <div class="contract-title bold-text">
          Listing contract
        </div>
      </div>
      <div class="contract-content" ref="pdfRef">
        <!-- <div class="full-btn" @click="handleScreen">
          <img v-if="fullSceneType == '全屏'" :src="require('@/assets/images/全屏.svg')" alt="" />
          <img v-else :src="require('@/assets/images/取消全屏.svg')" alt="" />
        </div> -->
        <PdfView v-if="pdfViewIsShow" :pdfUrl="pdfDataUri" @pdfRenderComplete="pdfRenderComplete"></PdfView>
      </div>
      <div class="contract-footer">
        <WPreButton v-if="pdfViewType =='default'" text="Add signature" radius="4px" width="184px" @handleClick="handleCreate"></WPreButton>
        <WButton v-if="pdfViewType =='changed'" text="Submit" radius="4px" width="164px" @handleClick="handleSubmit"></WButton>
      </div>
    </div>
    <Popups :isShow="writePadIsShow" @handleClose="handleWritePadClose" width="900px" :modal="false">
      <div class="contract-container write-pad-container">
        <div class="contract-title write-pad-title bold-text">
          Create an electronic signature
        </div>
        <div class="write-pad-content">
          <VueSignaturePad id="signature" width="100%" height="100%" ref="signaturePad" :options="options" />
        </div>
        <div class="contract-footer write-pad-footer">
          <WPreButton text="Clear" radius="4px" width="164px" height="48px" @handleClick="handleClear"></WPreButton>
          <WButton text="Done" radius="4px" width="164px" height="48px" class="finished-btn" @handleClick="handleSave"></WButton>
        </div>
      </div>
    </Popups>
  </Popups>
</template>
<script>
import PdfView from '@/components/PdfView';
import Popups from '@/components/Popups/index.vue';
import WButton from '@/components/Button';
import WPreButton from '@/components/Pre';
import { PDFDocument } from 'pdf-lib';
import { fileToUrl, base64ToFile } from '@/util/file.js';
import * as api from '@/api';
export default {
  components: { Popups, WButton, WPreButton, PdfView },
  props: {
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      fullSceneType: '全屏',
      pdfViewIsShow: true,
      isLock: false,
      writePadIsShow: false,
      options: {
        penColor: '#000'
      },
      pdfDataUri: './assets/Res_Listing_Agmt_-_sample.pdf',
      pdfViewType: 'default',
      blob: null,
      url: '', //上传成功的文件
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    // 提交
    handleSubmit() {
      this.$loading.open();
      let file = new File([this.blob], 'test.pdf', { type: 'application/pdf' });
      let formData = new FormData();
      formData.append('file', file);
      api.upload
        .uploadFile(formData)
        .then(result => {
          if (result.code === 'K-000000') {
            this.$emit('handleSubmit', result.context);
            this.$message.success('Successfully signed contract!');
          } else {
            this.$message.error('error');
            this.$emit('handleSubmit');
          }
          this.$loading.close();
        })
        .catch(err => {
          this.$message.error('error');
          this.$loading.close();
          this.$emit('handleSubmit');
        });
    },
    /**
     * pdf渲染完成
     */
    pdfRenderComplete() {
      if (this.isLock) {
        console.log('pdf渲染完成', this.$refs.pdfRef.scrollHeight);
        this.$refs.pdfRef.scrollTop = this.$refs.pdfRef.scrollHeight;
      }
    },
    // tab 弹窗关闭
    handleClose() {
      this.$emit('handleClose');
    },
    /**
     * 全屏操作
     * @param {quan} event
     */
    handleScreen(event) {},
    //手写板打开
    handleCreate() {
      this.writePadIsShow = true;
    },
    // 手写板关闭
    handleWritePadClose() {
      this.writePadIsShow = false;
      this.handleClear();
    },
    //撤回一步
    handleUndo() {
      this.$refs.signaturePad.undoSignature();
    },
    // 清除画板
    handleClear() {
      this.$refs.signaturePad.clearSignature();
    },
    // 保存签名
    handleSave() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      let file = base64ToFile(data);
      this.url = fileToUrl(file);
      this.handleClear();
      this.handleAddImgToPdf(this.url, blob => {
        this.pdfDataUri = URL.createObjectURL(blob);
        this.pdfViewIsShow = false;
        this.blob = blob;
        console.log('this.pdfDataUri===>', this.pdfDataUri);
        console.log('this.blob===>', blob);
        setTimeout(() => {
          this.pdfViewIsShow = true;
          this.isLock = true;
        }, 100);
      });
      this.pdfViewType = 'changed';
      this.writePadIsShow = false;
    },
    /**
     * file转base64方法
     */
    fileToBase64(file, callback) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        callback(e.target.result);
      };
    },
    /**
     * 把签名添加到pdf上
     */
    async handleAddImgToPdf(pngUrl, callback) {
      this.$loading.open();
      const pngImageBytes = await fetch(pngUrl)
        .then(res => res.arrayBuffer())
        .catch(err => {
          console.log(err);
        });
      const url = './assets/Res_Listing_Agmt_-_sample.pdf';
      const existingPdfBytes = await fetch(url)
        .then(res => res.arrayBuffer())
        .catch(err => {
          console.log(err);
        });
      const pdfDoc = await PDFDocument.load(existingPdfBytes, {
        updateMetadata: false
      });
      const pngImage = await pdfDoc.embedPng(pngImageBytes);
      const pages = pdfDoc.getPages();
      const page = pages[pages.length - 1];
      page.drawImage(pngImage, {
        x: page.getWidth() - 80,
        y: page.getHeight() - 750,
        width: 80,
        height: 30
      });
      let Uint8Array = await pdfDoc.save({ dataUri: true });
      let bolb = new Blob([Uint8Array.buffer], {
        type: 'application/pdf'
      });
      this.$loading.close();
      callback(bolb);
    }
  }
};
</script>
<style scoped lang="less">
.contract-container {
  width: 100%;
  height: 100%;
  padding: 66px 80px;
  box-sizing: border-box;
  box-shadow: 11px 11px 42px 0px rgba(27, 23, 98, 0.15);
  border-radius: 10px;
  .contract-header {
    .contract-title {
      font-size: 24px;
      font-weight: bold;
      color: #333333;
    }
    .contract-create {
      img {
        width: 50px;
        height: 50px;
      }
    }
  }

  .contract-content {
    width: 100%;
    height: 500px;
    margin-top: 20px;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    .text {
      font-size: 16px;
      font-weight: 500;
    }
    .iconfont {
      margin-left: 10px;
    }
    .full-btn {
      position: absolute;
      right: 20px;
      top: 20px;
      z-index: 9999;
      display: none;
      img {
        width: 32px;
        height: 32px;
      }
    }
    &:hover {
      .full-btn {
        display: block;
      }
    }
  }
  .contract-footer {
    display: flex;
    height: 60px;
    margin-top: 20px;
    justify-content: center;
  }
}
/deep/.write-pad-container {
  width: 100%;
  height: 100%;
  padding: 26px 40px;
  box-sizing: border-box;
  box-shadow: 11px 11px 42px 0px rgba(27, 23, 98, 0.15);
  border-radius: 10px;
  .write-pad-content {
    border: 1px dashed #ccc;
    margin-top: 20px;
  }
}
</style>
