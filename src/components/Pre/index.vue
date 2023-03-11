<!--
 * @Author: zulezhe
 * @Date: 2021-11-08 00:08:49
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-09-01 21:33:37
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div
    class="button-container w-button"
    :disable="disabled"
    @click="handleClick"
    :style="{ width: width, height: height, 'border-radius': radius, background: bgColor, pointerEvents: disabled ? 'none' : 'all', border: border }"
  >
    <span class="button-text regular-text" :style="{ fontSize: size, color: color }">
      <i :class="['iconfont', icon]" :style="{ fontSize: size, color: color }"></i>
      {{ text }}
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
    icon: {
      type: String,
      default: 'icon-xiangyou'
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
      default: 'rgba(220, 86, 116,1)'
    },
    border: {
      type: String,
      default: '1px solid #ccc'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#fff'
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
    color: #ffffff;
    font-weight: 400;
    .iconfont {
      margin-left: 10px;
      color: #fff;
      display: inline-block;
      transform: rotate(180deg);
    }
  }
  &:hover {
    background-color: rgba(220, 86, 116, 0.7) !important;
    .button-text {
      color: #ffffff !important;
      font-weight: 400;
      .iconfont {
        margin-left: 10px;
        color: #ffffff !important;
        display: inline-block;
        transform: rotate(0deg);
      }
    }
    .iconfont::before {
      content: '\e8f4';
    }
  }
}
</style>
