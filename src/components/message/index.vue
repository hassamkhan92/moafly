<template>
  <transition name="message-fade">
    <div v-if="visible" :class="wrapClasses">
      <img class="message_img" :src="typeImg" />
      <span class="message-title">{{ message }}</span>
      <i class="el-icon-close"></i>
    </div>
  </transition>
</template>
<script>
const prefixCls = 'message';
export default {
  name: 'message',
  data() {
    return {
      visible: false,
      type: 'info',
      message: '',
      duration: 3000
    };
  },
  computed: {
    typeImg() {
      return require(`@/assets/images/message/message-${this.type}.svg`);
    },
    wrapClasses() {
      return [`${prefixCls}`, `${prefixCls}-${this.type}`];
    }
  },
  mounted() {
    // 挂载的时候就开始计时，3000ms后消失
    this.setTimer();
  },
  methods: {
    setTimer() {
      setTimeout(() => {
        // 3000ms之后调用关闭方法
        this.handleClose();
      }, this.duration);
    },
    handleClose() {
      this.visible = false;
      // 从DOM里将这个组件移除
      // visible只是控制了显示与隐藏  但是dom结构中还是存在组件  为了避免消耗内存必须销毁组件
      setTimeout(() => {
        this.$el.parentNode.removeChild(this.$el);
      }, 500);
    }
  }
};
</script>
<style lang="less" scoped>
.message-fade-enter-active,
.message-fade-leave-active {
  transition: all 0.3s ease;
}
.message-fade-enter, .message-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(-20px);
  opacity: 0;
}
.message {
  position: fixed;
  top: 30px;
  right: 39%;
  min-width: 380px;
  height: 32px;
  border-radius: 4px;
  padding: 8px 27px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-radius: 2px;
  z-index: 999;
}
.el-icon-close {
  position: absolute;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
}
.message-title {
  .MoaflyText(400, 12px, 15px, #0f1b43);
}
.message_img {
  width: 18px;
  margin-right: 6px;
}
.message-success {
  background: #effff6;
  border: 1px solid rgba(35, 193, 107, 0.6);
}
.message-info {
  background: #ffffff;
  border: 1px solid rgba(15, 27, 67, 0.1);
  box-shadow: 0px 4px 4px rgba(15, 27, 67, 0.2);
}
.message-warn {
  background: #ffffff;
  border: 1px solid rgba(15, 27, 67, 0.1);
  box-shadow: 0px 4px 4px rgba(15, 27, 67, 0.2);
}
.message-error {
  background: #ffeeee;
  border: 1px solid rgba(224, 38, 38, 0.6);
}
</style>
