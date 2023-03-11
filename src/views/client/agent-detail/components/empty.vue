<template>
  <div class="empty-main">
    <img class="empty-img" :src="emptyImg" alt="" />
    <p class="empty-title">No evaluation～</p>
  </div>
</template>

<script>
export default {
  name: 'empty',
  data() {
    return {
      emptyImg: require('@/assets/images/agent/agent-empty.png')
    };
  }
};
</script>

<style lang="less" scoped>
.empty-main {
  .flex();
  align-items: flex-start;
  flex-wrap: wrap;
  width: 253px;
  .empty-img {
    width: 253px;
    height: 251px;
  }
  .empty-title {
    width: 100%;
    .MoaflyText(400, 18px, 22px, rgba(15, 27, 67, 0.6));
    text-align: center;
  }
}
</style>
