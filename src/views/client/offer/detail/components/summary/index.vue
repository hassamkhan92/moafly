<template>
  <div class="summary-container">
    <div class="house-info">
      <div class="left">
        <img class="home-photo" :src="data.imgUrl" />
        <div class="info-col">
          <h3 class="row-content">{{ data.unparsedAddress || data.houseAddress || '-' }}</h3>
          <h4 class="row-header">{{ `${data.city || '-'}, ${data.stateOrProvince || '-'} ${data.postalCode || '-'}` }}</h4>
        </div>
      </div>
      <div class="right">
        <div class="info-col">
          <h4 class="row-content">${{ data.listPrice ? Number(data.listPrice).toLocaleString() : '-' }}</h4>
          <el-button class="preview-button">Preview</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  computed: {
    refund() {
      const res = Number((this.data.previousListPrice * this.data.buyerAgencyCompensation) / 100);
      if (isNaN(res)) return '-';
      else return '$' + res.toLocaleString();
    },
    createTime() {
      const d = new Date(this.data.createTime);
      return d.toLocaleString('en-US');
    }
  }
};
</script>

<style lang="less" scoped>
@import './index';
</style>
