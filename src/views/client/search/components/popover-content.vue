<!--
 * @Author: zulezhe
 * @Date: 2022-09-28 23:28:03
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-16 12:00:24
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="bedrooom-content">
    <div class="num-list">
      <div v-for="(item, idx) in list" :key="idx" class="num-item" :class="[active == item ? 'num-active' : '']" @click="select(item)">
        <span>{{ item }}</span>
        <i class="el-icon-check"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    list: {
      type: Array,
      default: () => {
        return ['no limit', '1', '2', '3', '4', '5', '6', '7', '8+'];
      }
    }
  },
  data() {
    return {
      active: 'no limit'
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    select(item) {
      this.active = item;
      this.$emit('select', item);
    }
  }
};
</script>
<style scoped lang="less">
.bedrooom-content {
  width: 100%;
  height: 100%;
  padding: 0 5px;
  box-sizing: border-box;
  .num-list {
    padding-bottom: 8px;
    .num-item {
      height: 24px;
      transition: all ease 0.5s;
      padding-left: 30px;
      padding-right: 5px;
      box-sizing: border-box;
      font-family: 'Libre Franklin';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: #0f1b43;
      margin-top: 8px;
      box-sizing: border-box;
      cursor: pointer;
      .flex();
      justify-content: space-between;
      .el-icon-check {
        color: #ffffff;
      }
      &:hover {
        background: rgba(220, 86, 116, 0.2);
        .el-icon-check {
          display: none;
        }
      }
    }
    .num-active {
      background: #dc5674;
      color: #ffffff;
    }
  }
}
</style>
