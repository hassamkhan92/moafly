<template>
  <div class="radio-button-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: ['value'],
  methods: {
    radioChange(v) {
      this.$children.forEach(item => {
        item.$emit('dispatch', v);
      });
    }
  },
  updated() {
    this.radioChange(this.value);
  },
  mounted() {
    this.$on('change', this.radioChange);
    this.radioChange(this.value);
  }
};
</script>

<style lang="less" scoped>
.radio-button-group {
  width: 387px;
  margin: auto;

  .radio-button-container:not(:first-child) {
    margin-top: 20px;
  }
}
</style>
