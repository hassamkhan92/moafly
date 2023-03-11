<template>
  <div
    :class="{
      'radio-button-container': true,
      active: isChecked
    }"
    @click="handleClick"
  >
    <div class="text">{{ text }}</div>
  </div>
</template>

<script>
export default {
  props: ['text', 'value', 'checked'],
  data() {
    return {
      isChecked: this.checked
    };
  },
  methods: {
    handleClick() {
      this.isChecked = true;
      this.$parent.$emit('change', this.value);
    },
    dispatch(v) {
      this.isChecked = this.value === v;
    }
  },
  mounted() {
    if (this.checked) this.handleClick();
    this.$on('dispatch', this.dispatch);
  }
};
</script>

<style lang="less" scoped>
.radio-button-container {
  width: 100%;
  height: 56px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #999999;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &.active {
    border: 1px solid #353f62;
  }

  .text {
    font-size: 20px;
    font-family: LibreFranklin-Regular, LibreFranklin;
    font-weight: 400;
    color: #333333;
    line-height: 24px;
  }
}
</style>
