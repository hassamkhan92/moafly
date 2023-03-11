<!--
 * @Author: wangchaoxu
 * @Date: 2021-06-10 01:47:41
 * @LastEditors: wangchaoxu
 * @LastEditTime: 2021-06-13 19:08:42
 * @Path: https://gitee.com/wangchaoxu/
 * @Description:房屋照片上传
-->
<template>
  <div class="home-description-container">
    <div class="description-box">
      <p class="title-one">Please Choose your for sale sign</p>
      <!-- <p class="title-two">Questioning about a proper price? click here to find a Moafly agent help you!</p> -->
      <div class="e-main-left-bottom" v-loading="loading" element-loading-text="Loading..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0)">
        <el-row type="flex" justify="" :gutter="10" class="description-container">
          <el-radio-group :disabled="isdisabled" v-model="logotemplate" @change="handleCheck">
            <el-radio value="./images/template1.png" label="./images/template1.png">
              <el-image src="./images/template1.png" fit="fill" :preview-src-list="['./images/template1.png']"></el-image>
            </el-radio>
            <el-radio value="./images/template2.png" label="./images/template2.png">
              <el-image src="./images/template2.png" fit="fill" :preview-src-list="['./images/template2.png']"></el-image>
            </el-radio>
            <el-radio value="./images/template3.png" label="./images/template3.png">
              <el-image src="./images/template3.png" fit="fill" :preview-src-list="['./images/template3.png']"></el-image>
            </el-radio>
          </el-radio-group>
        </el-row>
        <!-- <el-row type="flex" class="handle-submit-con">
          <el-button class="cancel-button" @click="handleCancel">Previous</el-button>
          <el-button class="submit-button" @click="handleSubmit">Next</el-button>
        </el-row> -->
      </div>
    </div>
  </div>
</template>
<script>
import { houserEdit, homePuted, delectImage, getAdvertisementCompany } from '@/api/home';
export default {
  name: 'logoTemplete',
  props: ['templateVal', 'isdisabled'],
  data() {
    return {
      loading: false,
      dialogVisible: false,
      description: '',
      logotemplate: ''
    };
  },
  computed: {},
  created() {
    this.logotemplate = this.templateVal;
    console.log('this.templateVal=>', this.templateVal);
  },
  mounted() {},
  methods: {
    change(val) {
      console.log(val);
    },
    handleCancel() {
      this.$router.push('/submit/homeDescription');
    },
    handleSubmit() {
      houserEdit(this.hostList).then(res => {
        if (res.code === 200) {
          this.$message.warn('Your house has been submitted successfully');
        }
      });
      this.$router.push('/submit/homeStep');
    },
    handleCheck(val) {
      console.log(val, this.logotemplate);
      this.$emit('handLogo', val);
    }
  }
};
</script>
<style scoped lang="less">
.home-description-container {
  width: 100%;
  height: 100%;
  .description-box {
    width: 800px;
    margin: 10px 0 0 20px;
    text-align: center;
    .title-one {
      letter-spacing: 2px;
      font-size: 24px;
      font-family: Lato;
      font-weight: 600;
      line-height: 30px;
      color: #ffffff;
    }
    .title-two {
      text-align: left;
      margin-top: 22px;
      font-size: 16px;
      font-family: Lato;
      font-weight: 500;
      line-height: 22px;
      color: #ffffff;
      opacity: 1;
    }
    .description-container {
      width: 100%;
      height: 300px;
      margin: 40px auto;
      outline: 1px #ddd dashed;
      padding: 20px;
      /deep/.el-radio-group {
        width: 100%;
        height: 100%;
        .flex();
        .el-radio {
          width: 33%;
          height: 100%;
          .flex();
          flex-direction: column-reverse;
          .el-radio__input {
            height: 10%;
            width: 100%;
            margin-top: 10%;
            .el-radio__inner {
              height: 24px;
              width: 24px;
            }
          }
          .el-radio__label {
            width: 100%;
            height: 80%;
            padding: 0;
            .el-image {
              .size() !important;
            }
          }
        }
      }
    }
    .handle-submit-con {
      width: 100%;
      height: 40px;
      margin-top: 60px;
      display: flex;
      justify-content: space-around;

      /deep/.el-button {
        width: 120px;
        background-color: #ea4772;
        border: 0;
        color: #ddd;
        .flex();
      }
      .el-button:hover {
        border: 0;
      }
    }

    /deep/.el-loading-mask {
      .el-loading-spinner {
        .el-icon-loading {
          color: #ef4873;
          font-size: 24px;
        }
        .el-loading-text {
          color: #ef4873;
          font-size: 24px;
        }
      }
    }
  }
}
</style>
