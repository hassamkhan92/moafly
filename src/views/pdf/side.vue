<template>
  <div class="block">
    <span style="width: 60px" v-show="flag" @click="toggle">{{
      value + "%"
    }}</span>
    <el-input
      ref="input"
      style="width: 60px"
      v-show="!flag"
      v-model="inputValue"
      @blur="blurValue"
      oninput="value=value.replace(/[^\d.]/g,'')"
    ></el-input>
    <span
      style="
        cursor: pointer;
        padding: 0px 10px 0px 0px;
        transform: translateY(-1px);
      "
      @click="reducing"
      >-</span
    >
    <el-slider
      v-model="value"
      :format-tooltip="formatTooltip"
      :min="min"
      :max="max"
      style="width: 138px; display: inline-block"
      @change="change"
    ></el-slider>
    <span
      style="
        cursor: pointer;
        padding: 0px 0px 0px 10px;
        transform: translateY(-1px);
      "
      @click="add"
      >+</span
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 100,
      flag: true,
      min: 50,
      max: 200,
      inputValue: "",
    };
  },
  watch: {
    inputValue: {
      handler(newval) {
        this.$emit("changevalue", newval);
      },
    },
  },
  methods: {
    blurValue() {
      //文本框显示出来
      this.flag = !this.flag;
      //文本框获取到最新的值
      this.value = Number(this.inputValue);
    },
    formatTooltip(val) {
      return val + "%";
    },
    //点击切换到input框 并且自动聚焦
    toggle() {
      this.flag = !this.flag;
      this.$nextTick(() => this.$refs.input.focus());
      //获取到Input框的值
      this.inputValue = this.value;
    },
    //点击减号 减少10%
    reducing() {
      if (this.value > this.min) {
        this.value -= 10;
        this.$emit("changevalue", this.value);
      }
    },
    //点击加号 增加10%
    add() {
      if (this.value < this.max) {
        this.value += 10;
        this.$emit("changevalue", this.value);
      }
    },
    change(newval) {
      this.$emit("changevalue", newval);
    },
  },
};
</script>

<style lang="less" scoped>
.block {
  display: flex;
  align-items: center;
}
</style>
<style>
.el-slider__runway {
    height: 3px;
}

/* //左侧进度条样式 */
.el-slider__bar {
    height: 3px;
}

/* //中间button样式 */
.el-slider__button {
    width: 4px;
    height: 4px;
    border: 1px solid #409EFF;
    background-color: #FFF;
}

.el-slider__button-wrapper {
    height: auto;
    width: auto;
    position: absolute;
    top: 0;
    transform: translate(-50%, -50%);
}
</style>
