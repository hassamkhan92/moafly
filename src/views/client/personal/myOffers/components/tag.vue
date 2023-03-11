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
  padding: 0 5px;
  height: 23px;
  background: rgba(15, 27, 67, 0.6);
  border-radius: 4px;
  color: #fff;
  font-family: 'Libre Franklin';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  .flex();
}
</style>
