import { initMap } from '@/util/map';
<!--
 * @Author: zulezhe
 * @Date: 2022-09-22 23:06:37
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-24 19:10:33
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <el-popover :placement="placement" :width="width" :trigger="trigger" :popper-class="popperClass" v-model="visible" @show="show" @hide="hide">
    <slot name="content"></slot>
    <template v-if="!text">
      <el-button slot="reference">
        <span class="placeholder-txt">{{ placeholder }}</span>
        <i class="el-icon-caret-bottom" :class="visible ? 'show' : 'hide'"></i
      ></el-button>
    </template>
    <template v-else>
      <el-button slot="reference">{{ text }} <i class="el-icon-caret-bottom" :class="visible ? 'show' : 'hide'"></i></el-button>
    </template>
  </el-popover>
</template>
<script>
export default {
  props: {
    trigger: {
      type: String,
      default: 'click'
    },
    popperClass: {
      type: String,
      default: 'price-pop'
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    width: {
      type: String,
      default: '150px'
    },
    isShow: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: 'no limit'
    },
    placeholder: {
      type: String,
      default: 'Price'
    }
  },
  components: {},
  data() {
    return {
      visible: this.isShow
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    show() {
      this.visible = true;
      this.$emit('show');
    },
    hide() {
      this.$emit('hide');
      this.visible = false;
    }
  }
};
</script>
<style scoped lang="less">
.el-icon-caret-bottom {
  transition: all 0.3s ease-in-out;
}
.show {
  transform: rotate(180deg);
}
.hide {
  transform: rotate(0deg);
}
.placeholder-txt {
  color: #ccc;
}
.el-popover__reference-wrapper {
  .el-button {
    color: #000;
  }
  .el-button:focus,
  .el-button:hover {
    border-color: #dc5674;
    background-color: rgba(0, 0, 0, 0) !important;
  }
}
</style>
<style lang="less">
.el-popper {
  position: relative;
  .popper__arrow {
    &::after {
      z-index: 10;
      border-bottom-color: #dc5674 !important;
    }
    &::before {
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
      z-index: 12;
      top: 1px;
      margin-left: -6px;
      border-top-width: 0;
      border-bottom-color: #fff;
    }
  }
}
</style>
