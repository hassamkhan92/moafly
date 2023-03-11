<!--
 * @Author: zulezhe
 * @Date: 2021-10-26 21:44:16
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-08 21:34:33
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="input-container">
    <el-input ref="input" placeholder="" v-model="adress" id="pac-input"> </el-input>
    <el-button type="primary" @click="goSearch">Notify me! <i class="iconfont icon-xiangyou"></i></el-button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      adress: ''
    };
  },
  computed: {},
  mounted() {
    this.$refs.input.focus();
  },
  methods: {
    goSearch() {
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (reg.test(this.adress)) {
        this.$emit('handleShowPop', this.adress);
      } else {
        this.$message.error('The mailbox format is incorrect');
      }
    },
    restForm() {
      this.adress = '';
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    }
  }
};
</script>
<style scoped lang="less">
.input-container {
  width: 100%;
  height: 50px;
  display: flex;
  /deep/.el-input {
    width: 453px;
    height: 100%;
    background: #ffffff;
    border-radius: 8px;
    border-radius: 8px 0px 0px 8px;
    .el-input__inner {
      height: 100%;
      border-radius: 8px 0px 0px 8px;
      font-size: 18px;
      font-family: Arial;
      font-weight: 400;
      color: #999999;
      line-height: 28px;
    }
  }
  /deep/.el-button {
    width: 153px;
    height: 100%;
    background: #353f62;
    border-radius: 0px 8px 8px 0px;
    border: 0px;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .iconfont {
      margin-left: 10px;
      color: #fff;
    }
    &:hover {
      background-color: #000;
      .iconfont::before {
        content: '\e624';
      }
    }
  }
}
</style>
