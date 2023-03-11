<!--
 * @Author: zulezhe
 * @Date: 2022-01-19 23:17:20
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-04 19:00:14
 * @Path: https://gitee.com/zulezhe/
 * @Description:合同弹窗
-->

<template>
  <Popups :isShow="isShow" @handleClose="handleClose" width="1200px">
    <div class="contract-container">
      <div class="contract-header">
        <div class="contract-title bold-text">
          contract
        </div>
      </div>
      <div class="contract-content" ref="pdfRef" v-if="pdfDataUri">
        <PdfView v-if="pdfViewIsShow" :pdfUrl="pdfDataUri" @pdfRenderComplete="pdfRenderComplete"></PdfView>
      </div>
      <div class="contract-footer">
        <WPreButton text="生成" radius="4px" width="184px" @handleClick="handleRender"></WPreButton>
      </div>
    </div>
  </Popups>
</template>
<script>
import PdfView from '@/components/PdfView';
import Popups from '@/components/Popups/index.vue';
import WPreButton from '@/components/Pre';
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import { fileToUrl, base64ToFile } from '@/util/file.js';
export default {
  components: { Popups, WPreButton, PdfView },
  props: {
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      pdfViewIsShow: true,
      isLock: false,
      pdfDataUri: '',
      blob: null,
      url: '', //上传成功的文件
      positions: [
        {
          page: 0,
          x: 500,
          y: 170,
          value: 'new Date()'
        },
        {
          page: 0,
          x: 500,
          y: 115,
          value: 'new Date()'
        },
        {
          page: 3,
          x: 480,
          y: 160,
          value: 'new Date()'
        },
        {
          page: 4,
          x: 515,
          y: 310,
          value: 'new Date()'
        },
        {
          page: 4,
          x: 515,
          y: 210,
          value: 'new Date()'
        },
        {
          page: 4,
          x: 515,
          y: 195,
          value: 'new Date()'
        },
        {
          page: 5,
          x: 515,
          y: 210,
          value: 'new Date()'
        },
        {
          page: 5,
          x: 120,
          y: 705,
          value: 'address'
        },
        {
          page: 6,
          x: 105,
          y: 715,
          value: 'new Date()'
        },
        {
          page: 6,
          x: 130,
          y: 670,
          value: 'new Date()'
        },
        {
          page: 6,
          x: 390,
          y: 670,
          value: '6 month'
        },
        {
          page: 6,
          x: 405,
          y: 658,
          value: '3180  St'
        },
        {
          page: 6,
          x: 375,
          y: 647,
          value: 'City'
        },
        {
          page: 6,
          x: 65,
          y: 640,
          value: 'County'
        },
        {
          page: 6,
          x: 260,
          y: 640,
          value: 'Post Code'
        },
        {
          page: 7,
          x: 110,
          y: 760,
          value: 'address'
        },
        {
          page: 7,
          x: 505,
          y: 760,
          value: 'new Date()'
        },
        {
          page: 8,
          x: 110,
          y: 760,
          value: 'address'
        },
        {
          page: 9,
          x: 110,
          y: 760,
          value: 'address'
        },
        {
          page: 10,
          x: 110,
          y: 760,
          value: 'address'
        },
        {
          page: 10,
          x: 480,
          y: 355,
          value: 'new Date()'
        },
        {
          page: 10,
          x: 525,
          y: 205,
          value: 'new Date()'
        },
        {
          page: 11,
          x: 110,
          y: 705,
          value: 'address'
        },
        {
          page: 12,
          x: 110,
          y: 760,
          value: 'address'
        },
        {
          page: 12,
          x: 520,
          y: 760,
          value: 'new Date()'
        },
        {
          page: 12,
          x: 495,
          y: 250,
          value: 'new Date()'
        },
        {
          page: 12,
          x: 470,
          y: 184,
          value: 'new Date()'
        },
        {
          page: 13,
          x: 485,
          y: 430,
          value: 'new Date()'
        }
      ]
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
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
    //渲染内容
    async handleRender() {
      const url = './assets/Res_Listing_Agmt_-_sample.pdf';
      const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes, {
        updateMetadata: false
      });
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      this.positions.map(item => {
        const pages = pdfDoc.getPages();
        const page = pages[item.page];
        const { width, height } = page.getSize();
        // console.log('page===>', pages, item.page, page);
        console.log(width, height);
        page.drawText(item.value, {
          x: item.x,
          y: item.y,
          size: 12,
          color: rgb(0.44, 0.49, 0.6),
          lineHeight: 12
          // x: 520 / 2,
          // // 出现的 y 轴坐标
          // y: height / 2 + 300,
          // // 字体大小
          // size: 36,
          // // 字体
          // font: helveticaFont,
          // // 颜色
          // color: rgb(0.95, 0.1, 0.1),
          // // 倾斜角度
          // rotate: degrees(-45),
          // // 透明度
          // opacity: 0.5
        });
      });
      let Uint8Array = await pdfDoc.save({ dataUri: true });
      let bolb = new Blob([Uint8Array.buffer], {
        type: 'application/pdf'
      });
      this.pdfDataUri = URL.createObjectURL(bolb);
      window.open(this.pdfDataUri);
    },
    // 保存签名
    handleSave() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      let file = base64ToFile(data);
      this.url = fileToUrl(file);
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
</style>
