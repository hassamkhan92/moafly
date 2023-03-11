<!--
 * @Author: zulezhe
 * @Date: 2022-10-17 16:54:24
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-24 20:16:52
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <InputNumber
    v-model="val"
    :default-value="1000"
    :controls="controls"
    :min="min"
    :max="max"
    :step="step"
    :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
    :parser="value => value.replace(/\$\s?|(,*)/g, '')"
    @change="onChange"
  />
</template>
<script>
import InputNumber from 'ant-design-vue/lib/input-number'; // 加载 JS
import 'ant-design-vue/lib/input-number/style/css'; // 加载 CSS
export default {
  props: {
    val: {
      type: Number,
      default: 100000
    },
    step: {
      type: Number,
      default: 50000
    },
    min: {
      type: Number,
      default: 50000
    },
    max: {
      type: Number,
      default: 50000
    },
    controls: {
      type: Boolean,
      default: true
    }
  },
  components: { InputNumber },
  data() {
    return {
      value: 0,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    onChange(val) {
      console.log('发生变化===>', this.result);
      this.$emit('change', this.result);
    }
  }
};
</script>
<style scoped lang="less">
.zu-input-number {
  width: 100%;
  height: 100%;
}
</style>
