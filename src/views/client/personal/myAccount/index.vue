<template>
  <div class="my-account-container">
    <Empty v-if="false"></Empty>
    <Views></Views>
  </div>
</template>
<script>
import Empty from '../components/empty.vue';
import Views from './view.vue';
export default {
  components: { Empty, Views },
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
.my-account-container {
  width: 100%;
  min-height: 100vh;
  .flex();
}
</style>
