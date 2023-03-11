<template>
  <div class="person-content-item">
    <div class="person-content-row" v-for="(row, index) in data" :key="index">
      <div :class="`item ${item.align}`" v-for="(item, jndex) in header" :key="jndex" :style="`width:${item.width};margin-left:${item.marginLeft};`">
        <slot v-if="item.slot" :name="item.slot" :data="data[index]"></slot>
        <div v-else class="text" :style="`font-weight:${item.bold}`">{{ item.format ? item.format(data[index][item.key]) : data[index][item.key] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['header', 'data'],
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.person-content-item {
  white-space: nowrap;
  margin-top: 47px;
  display: flex;
  flex-direction: column;

  .person-content-row {
    border-bottom: 2px solid #ddd;
    display: flex;
    align-items: center;

    .item {
      display: inline-flex;
      justify-content: center;
      align-items: flex-start;
      height: 124px;
      flex-direction: column;

      &.center {
        align-items: center;
      }

      .text {
        white-space: normal;
        font-size: 14px;
        font-family: LibreFranklin-Regular, LibreFranklin;
        font-weight: 400;
        color: #000000;
        line-height: 17px;
      }
    }
  }
}
</style>