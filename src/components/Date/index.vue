<!--
 * @Author: zulezhe
 * @Date: 2022-01-10 16:50:07
 * @LastEditors: wangchaoxu
 * @LastEditTime: 2022-01-10 17:01:37
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="date-container">
    <el-date-picker :value="dateValue" :type="type" :placeholder="placeholder" @change="change"></el-date-picker>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    dateValue: {
      type: Date,
      default: new Date()
    },
    type: {
      type: String,
      default: 'date'
    },
    'clear-icon': {
      type: String,
      default: 'el-icon-date'
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      date: ''
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    change(val) {
      this.$emit('change', val);
    }
  }
};
</script>
<style scoped lang="less">
.zu-date-container {
  width: 100%;
  height: 100%;
}
</style>
