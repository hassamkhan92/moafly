<template>
  <div class="empty-wallet">
    <img class="wallet-img" :src="require('@/assets/images/wallet/wallet-empty.png')" alt="" />
    <p class="empty-title">You haven't provide your bank information yet</p>
    <p @click="handlerAddCard" class="card-add cursor">Click here to add</p>
  </div>
</template>

<script>
export default {
  name: 'empty-wallet',
  data() {
    return {};
  },
  methods: {
    handlerAddCard() {
      this.$emit('handlerAddCard');
    }
  }
};
</script>

<style lang="less" scoped>
.empty-wallet {
  width: 320px;
  .wallet-img {
    margin: 0 auto;
    display: block;
    width: 274px;
    height: 170px;
  }
  .empty-title {
    .MoaflyText(400, 14px, 17px, rgba(15, 27, 67, 0.6));
    // text-align: center;
    margin-top: 16px;
  }
  .card-add {
    .MoaflyText(400, 16px, 19px, #dc5674);
    text-align: center;
    margin-top: 18px;
  }
}
</style>
