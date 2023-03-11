<template>
  <div class="account_main">
    <div class="header_icon">
      <el-form :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <p class="account-title">Account</p>
        <el-form-item class="form-item-upload" label="">
          <el-avatar :size="80">
            <template v-if="uploadImgUrl">
              <img :src="uploadImgUrl" />
            </template>
            <template v-else>
              <div class="default-avatar">{{ getFirstWorld(ruleForm.nickName) }}</div>
            </template>
          </el-avatar>
          <el-upload
            class="upload-demo"
            action="/moafly/file/upload"
            :headers="headers"
            :on-preview="handlePreview"
            :on-success="handleUploadSuccess"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :show-file-list="false"
          >
            <!-- <el-button class="uplod_btn" type="text" icon="el-icon-edit"></el-button> -->
            <p class="upload-title">Upload avatar</p>
          </el-upload>
        </el-form-item>
        <el-form-item label="Name" prop="nickName">
          <el-input v-model="ruleForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="Phone" prop="phoneNum">
          <el-input v-model="ruleForm.phoneNum"></el-input>
        </el-form-item>
        <el-form-item label="Zip Code" prop="zipCode">
          <el-input v-model="ruleForm.zipCode"></el-input>
        </el-form-item>
        <WButton class="profile" v-throttle radius="6px" text="Save Profile" v-loading="btnLoad" width="139px" height="39px" @handleClick="submitForm('ruleForm')"></WButton>
      </el-form>
    </div>
  </div>
</template>

<script>
import WButton from '@/components/Button';
import { getToken } from '@/util/auth';
import * as api from '@/api';
export default {
  components: {
    WButton
  },
  data() {
    return {
      ruleForm: {},
      btnLoad: false,
      labelPosition: 'top',
      fileList: [],
      uploadImgUrl: '', //上传成功图片存储字段
      headers: {
        token: getToken()
      }, //上传信息参数
      rules: {
        nickName: [{ required: true, message: 'Please enter the preferred name', trigger: 'blur' }],
        zipCode: [{ required: true, message: 'Please enter the Zip Codes', trigger: 'blur' }],
        phoneNum: [{ required: true, message: 'Please enter the Phone Number', trigger: 'blur' }]
      }
    };
  },
  mounted() {
    //从用户信息获取基本信息
    let userInfo = this.$store.getters.userInfo;
    if (userInfo.nickName) {
      this.ruleForm = {
        nickName: userInfo.nickName,
        zipCode: userInfo.zipCode,
        phoneNum: userInfo.phoneNum,
        headImg: userInfo.headImg
      };
      this.uploadImgUrl = this.ruleForm.headImg;
    }
  },
  methods: {
    //上传成功
    handleUploadSuccess(response, file, fileList) {
      this.uploadImgUrl = response.context;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.headImg = this.uploadImgUrl;
          this.btnLoad = true;
          api.user.editUserInfo(this.ruleForm).then(res => {
            if (res.code == 'K-000000') {
              this.$message.success('Saving succeeded');
              let data = this.$store.getters.userInfo;
              data.nickName = this.ruleForm.nickName;
              data.zipCode = this.ruleForm.zipCode;
              data.phoneNum = this.ruleForm.phoneNum;
              data.headImg = this.ruleForm.headImg;
              this.$store.commit('SET_USER_INFO', data);
              this.btnLoad = false;
            }
          });
        } else {
          this.btnLoad = false;
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handlePreview() {},
    handleRemove() {},
    beforeRemove() {},
    handleExceed() {},
    getFirstWorld(val = 'moafly') {
      return val.split('')[0];
    }
  }
};
</script>
<style lang="less" scoped>
.account_main {
  position: relative;
  padding: 40px 80px;
  box-sizing: border-box;
  .size();
  max-width: 760px;
  width: 100%;
  min-height: 664px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  .account-title {
    .MoaflyText(600, 24px, 29px, #0f1b43);
  }
  .upload-title {
    width: 110px;
    height: 22px;
    .MoaflyText(400, 14px, 22px, #dc5674);
    margin: 0;
    background: rgba(220, 86, 116, 0.1);
    border-radius: 4px;
    margin-left: 24px;
    transform: translateY(-10px);
  }
}
/deep/.header_icon {
  width: 100%;
  .form-item-upload {
    .el-form-item__content {
      max-width: 500px;
      width: 100%;
    }
  }
  .el-form-item {
    &:nth-child(2) {
      margin-top: 40px;
    }
  }
  .el-input__inner {
    width: 600px;
    height: 56px;
    border: 1px solid rgba(15, 27, 67, 0.4);
    border-radius: 6px;
    .MoaflyText(400, 14px, 17px, #0f1b43);
  }
  .el-avatar {
    .default-avatar {
      .flex();
      background: rgba(0, 0, 0, 0);
      font-size: 40px;
      font-weight: 700;
      background-color: #353f62;
    }
  }
  .el-form-item__label:before {
    display: none;
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  }
  .el-form-item__label {
    .MoaflyText(600, 12px, 15px, #333333);
    padding-bottom: 16px;
  }
  .el-form-item__label:after {
    content: '*';
    color: #f56c6c;
    margin-left: 4px;
  }
  .el-form-item.is-error .el-input__inner,
  .el-form-item.is-error .el-input__inner:focus,
  .el-form-item.is-error .el-textarea__inner,
  .el-form-item.is-error .el-textarea__inner:focus {
    border-color: #353f62;
  }
  .profile {
    position: absolute;
    right: 80px;
    bottom: 40px;
    width: 139px;
    height: 39px;
    background: #dc5674;
    border-radius: 6px;
    border-color: none;
    .MoaflyText(500, 16px, 16px, #ffffff);
  }
  .uplod_btn {
    color: #000000;
  }
  .el-button--primary:hover {
    background: #353f62;
  }
  .upload-demo {
    display: inline-block;
  }
}
</style>
