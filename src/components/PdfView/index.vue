<!--
 * @Author: zulezhe
 * @Date: 2022-01-26 23:39:49
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-06-19 23:23:11
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="pdf-view">
    <pdf v-for="i in numPages" :key="i" :src="src" :page="i"></pdf>
  </div>
</template>

<script>
import pdf from 'vue-pdf';

export default {
  components: {
    pdf
  },
  props: {
    pdfUrl: {
      type: String,
      default: './assets/Res_Listing_Agmt_-_sample.pdf'
    }
  },
  data() {
    return {
      src: pdf.createLoadingTask(this.pdfUrl),
      numPages: undefined
    };
  },
  mounted() {
    this.src.promise.then(pdf => {
      this.numPages = pdf.numPages;
      setTimeout(() => {
        this.$emit('pdfRenderComplete');
      }, 800);
    });
  }
};
</script>
<style lang="less" scoped>
.pdf-view {
  width: 100%;
  height: 100%;
}
</style>
