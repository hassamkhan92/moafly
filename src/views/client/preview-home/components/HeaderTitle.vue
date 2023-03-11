<template>
  <p class="HeaderTitle">{{ title }}</p>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Map'
    }
  }
};
</script>

<style lang="less" scoped>
.HeaderTitle {
  font-family: 'Libre Franklin';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #0f1b43;
  margin-bottom: 15px;
}
</style>
