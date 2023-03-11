<template>
  <div class="tag-container">{{ text }}</div>
</template>
<script>
export default {
  components: {},
  props: {
    text: {
      type: String,
      default: 'LISTED BY MOAFLY'
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped lang="less">
.tag-container {
  min-width: 41px;
  height: 23px;
  background: rgba(15, 27, 67, 0.6);
  border-radius: 4px;
  .MoaflyText(400, 12px, 15px, #ffffff);
  padding: 4px 6px;
  .flex();
}
</style>
