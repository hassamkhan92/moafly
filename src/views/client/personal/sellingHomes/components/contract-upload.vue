<!--
 * @Author: zulezhe
 * @Date: 2021-12-18 14:12:18
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-19 17:07:37
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <el-upload
    class="contract-upload upload-flex"
    ref="upload"
    action="#"
    v-bind="$attrs"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :http-request="httpRequest"
    :file-list="fileList"
    :on-success="handSuccess"
    :on-change="handleChange"
    :on-exceed="handleExceed"
    :before-remove="beforeRemove"
    :auto-upload="autoUpload"
    :accept="accept"
    :limit="limit"
  >
    <el-button slot="trigger" icon="el-icon-circle-plus-outline">{{ text }}</el-button>
  </el-upload>
</template>
<script>
import axios from 'axios';
export default {
  props: {
    action: {
      type: String,
      default: ''
    },
    accept: {
      type: String,
      default: '.png,.jpg,.jpeg,.gif,.pdf'
    },
    limit: {
      type: Number,
      default: 20
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    text: {
      type: String,
      default: 'Upload contract'
    },
    flieType: {
      type: Array,
      default: () => {
        return ['jpg', 'png', 'image/jpeg', 'jpeg', 'image/png', 'pdf', 'gif'];
      }
    },
    fileSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      getNums: '',
      fileList: []
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleChange(file, fileList) {
      //上传文件变化时
      this.fileList = fileList;
      this.$emit('uploadOnchange', file, fileList);
    },
    httpRequest(data) {
      this.$emit('handleUploadSubmit', data);
    },
    handSuccess(response, file, fileList) {
      //上传成功提示并且清除列表
      this.$refs.upload.clearFiles();
      console.log('上传成功==>', response, file, fileList);
    },
    handleRemove(file, fileList) {
      //文件移除的
    },
    handlePreview(file) {
      //点击上传文件的时候的
      // console.log(file);
    },
    handleExceed(files, fileList) {
      //文件限制超个数
      this.$message.warn(`Select at most one file`);
    },
    beforeRemove(file, fileList) {
      //删除
      return this.$confirm(`Sure to remove ${file.name}？`);
    }
  }
};
</script>
<style scoped lang="less">
.contract-upload {
  /deep/.el-upload {
    .el-button {
      border: 1px dashed #dcdfe6;
      .el-icon-circle-plus-outline {
        color: #dc5674;
      }
    }
  }
}
</style>
