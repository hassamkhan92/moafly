<template>
  <el-dialog
    class="popups-container w-popups"
    :visible.sync="isShow"
    :destroy-on-close="destroy"
    :width="width"
    :close-on-click-modal="closeModal"
    :modal="modal"
    :modal-append-to-body="modelAppendBody"
    :append-to-body="appendBody"
    :custom-class="customClass"
    :close-on-press-escape="false"
  >
    <div class="el-dialog-close-btn" @click="handleClose" v-show="closeIsShow">×</div>
    <div class="el-dialog-content">
      <slot></slot>
    </div>
  </el-dialog>
</template>
<script>
export default {
  components: {},
  props: {
    destroy: {
      type: Boolean,
      default: true
    },
    isShow: {
      type: Boolean,
      default: false
    },
    closeIsShow: {
      type: Boolean,
      default: true
    },
    customClass: {
      type: String,
      default: 'my-dialog'
    },
    width: {
      type: String,
      default: '656px'
    },
    closeModal: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: true
    },
    appendBody: {
      type: Boolean,
      default: false
    },
    modelAppendBody: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleClose() {
      this.$emit('handleClose');
    }
  }
};
</script>
<style scoped lang="less">
/deep/.el-dialog {
  background: #ffffff;
  box-shadow: 11px 11px 42px 0px rgba(27, 23, 98, 0.15);
  border-radius: 10px;

  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    position: relative;
    padding: 0;
  }
  .el-dialog-close-btn {
    width: 60px;
    height: 60px;
    background: #ffffff;
    border: 2px solid #dddddd;
    border-radius: 50%;
    font-size: 40px;
    .flex();
    position: absolute;
    right: 30px;
    top: 30px;
    cursor: pointer;
  }
  .el-dialog-content {
    width: 100%;
    overflow: hidden;
  }
}
</style>
