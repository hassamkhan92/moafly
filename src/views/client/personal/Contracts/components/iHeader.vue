<template>
  <div class="person-content-header-container">
    <div class="header" v-for="(item, index) in header" :key="index">
      <div class="title" :style="`margin-left:${item.marginLeft}`">{{ item.title }}</div>
      <div class="line" :style="`width:${item.lineWidth};margin-left:${item.gutter}`"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['header'],
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="less">
.person-content-header-container {
  width: 100%;
  white-space: nowrap;

  .header {
    display: inline-flex;
    align-items: center;

    .title {
      display: inline-block;
      font-size: 14px;
      font-family: LibreFranklin-Medium, LibreFranklin;
      font-weight: 500;
      color: #999999;
      line-height: 17px;
    }

    .line {
      display: inline-block;
      height: 2px;
      background-color: #ddd;
    }
  }
}
</style>
