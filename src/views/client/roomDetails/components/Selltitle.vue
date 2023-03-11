<template>
  <div class="detail_info_Selltitle">
    <div class="Selltitle_box">
      <p class="title1">Also selling a home? We can help with that too.</p>
      <p class="title2">Tell us about your home and we’ll make a competitive offer to buy it from you.</p>
      <WButton text="Request a free offer" radius="29px" height="30px" size="12px" width="180px"></WButton>
    </div>
  </div>
</template>

<script>
import WButton from '@/components/Button';
export default {
  components: { WButton }
};
</script>

<style lang="less" scoped>
.detail_info_Selltitle {
  width: 100%;
  padding: 32px 0;
  border-bottom: 1px solid #afafaf;
  .Selltitle_box {
    width: 100%;
    height: 182px;
    background: #e6f6ff;
    border-radius: 8px;
    padding: 24px 40px;
    .title1 {
      font-size: 24px;
      font-family: LibreFranklin-SemiBold, LibreFranklin;
      font-weight: 600;
      color: #333333;
      line-height: 29px;
    }
    .title2 {
      font-size: 16px;
      font-family: LibreFranklin-Regular, LibreFranklin;
      font-weight: 400;
      color: #333333;
      line-height: 19px;
    }
  }
}
</style>
