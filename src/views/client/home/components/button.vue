<!--
 * @Author: zulezhe
 * @Date: 2022-08-01 21:22:42
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-02 22:18:46
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <button
    :class="[type, border === 'none' ? 'noborder' : '']"
    :style="{
      paddingTop,
      paddingLeft,
      paddingBottom: paddingTop,
      paddingRight: paddingLeft
    }"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: String,
    border: String,
    paddingTop: String,
    paddingLeft: String
  },
  emits: ['click'],
  methods: {
    handleClick() {
      this.$emit('click');
    }
  }
};
</script>

<style lang="less" scoped>
button {
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 45px;
  border-radius: 4px;
}

button.primary {
  color: #fff;
  background: #ea4671;
  border: 2px solid #ea4671;
}

button.secondary {
  color: #fff;
  background: #0f1b45;
  border: 2px solid #0f1b45;
}

button.light {
  color: #0f1b45;
  background: #ffffff;
  border: 2px solid #ffffff;
}

button.noborder {
  border: none;
}
</style>
