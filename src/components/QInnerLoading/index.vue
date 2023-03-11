<template>
  <q-inner-loading :showing="visible">
    <q-spinner-gears :size="size" color="primary" />
  </q-inner-loading>
</template>

<script>
export default {
  name: 'q_inner_loading',
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: '50px'
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped></style>
