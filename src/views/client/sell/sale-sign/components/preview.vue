<template>
  <MoaflyDialog class="template-preview-modal" title="preview" :visible.sync="visible">
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
.template-preview-modal {
  /deep/.el-dialog {
    max-width: 600px;
    width: 100%;
  }
}
.img-box {
  width: 100%;
  height: 460px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
