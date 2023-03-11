<template>
  <div
    :class="`button-container w-button ${disabled ? 'button-disabled' : ''}`"
    :disable="disabled"
    @click="handleClick"
    :style="{ width: width, height: height, 'border-radius': radius, background: bgColor, pointerEvents: disabled ? 'none' : 'all', border: border }"
  >
    <span class="button-text regular-text" :style="{ fontSize: size, color: color }">
      {{ text }}
      <i :class="['iconfont', icon]" :style="{ fontSize: size, color: color }" v-show="iconShow"></i>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: '174px'
    },
    height: {
      type: String,
      default: '40px'
    },
    color: {
      type: String,
      default: '#fff'
    },
    border: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'icon-xiangyou'
    },
    iconShow: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: 'View Details'
    },
    size: {
      type: String,
      default: '16px'
    },
    radius: {
      type: String,
      default: '50px'
    },
    bgColor: {
      type: String,
      default: 'rgb(220, 86, 116)'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleClick() {
      this.$emit('handleClick');
    }
  }
};
</script>
<style scoped lang="less">
.button-container {
  cursor: pointer;
  .flex();
  transition: all 0.5s ease-in-out;
  .button-text {
    transition: all 0.5s ease-in-out;
    color: #ffffff;
    font-weight: 400;
    .iconfont {
      transition: all 0.5s ease-in-out;
      margin-left: 10px;
      color: #fff;
    }
  }
  &:hover {
    .button-text {
      color: #fff !important;
    }
    .iconfont {
      color: #fff !important;
    }
    background-color: rgba(220, 86, 116, 0.7) !important;
    .iconfont::before {
      content: '\e624';
    }
  }
  &.button-disabled {
    background-color: #ddd !important;
  }
}
</style>
