<template>
  <MoaflyDialog width="600px" title="preview" :visible.sync="visible">
    <div class="img-box">
      <img :src="url" alt="" />
    </div>
  </MoaflyDialog>
</template>

<script>
import MoaflyDialog from '@/components/MoaflyDialog';
export default {
  components: {
    MoaflyDialog
  },
  data() {
    return {
      url: '',
      visible: false
    };
  },
  methods: {
    init(url) {
      this.url = url;
      this.visible = true;
    }
  }
};
</script>

<style lang="less" scoped>
.img-box {
  width: 100%;
  height: 460px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
