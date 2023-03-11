<!--
 * @Author: zulezhe
 * @Date: 2021-07-22 15:14:33
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-08 21:35:00
 * @Path: https://gitee.com/zulezhe/
 * @Description: 上传图片组件
-->
<template>
  <div class="upload-container">
    <el-upload
      class="upload"
      :action="uploadUrl"
      :drag="drag"
      :auto-upload="autoUpload"
      :multiple="multiple"
      :on-change="uploadOnchange"
      :on-success="uploadOnSuccess"
      :on-error="uploadOnError"
      :on-remove="uploadBeforeRemove"
      :on-preview="uploadOnPreview"
      :on-exceed="uploadOnExceed"
      :on-progress="uploadOnProgress"
      :file-list="fileList"
      :limit="limit"
      :accept="accept"
      :data="uploadParams"
      :before-upload="beforeUpload"
      :show-file-list="false"
      :http-request="uploadHttpRequest"
    >
      <div class="el-upload-center" slot="default">
        <img :src="require('@/assets/images/sell/upload-icon.png')" alt="" />
        <div class="upload-btn">
          <span class="text">
            Upload files
          </span>
          <i class="iconfont icon-shangchuan"></i>
        </div>
        <div class="upload-tips">
          Or drag and drop a file
        </div>
      </div>
      <div slot="file" slot-scope="{ file }" style="width:100%;height:100%">
        <img class="el-upload-list__item-thumbnail" style="width:100%;height:100%" :src="file.url" alt="" />
      </div>
    </el-upload>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    accept: {
      type: String,
      default: '.jpg,.png,.jpeg'
    },
    limit: {
      type: Number,
      default: 36
    },
    multiple: {
      type: Boolean,
      default: true
    },
    uploadUrl: {
      type: String,
      default: ''
    },
    drag: {
      type: Boolean,
      default: true
    },
    'auto-upload': {
      type: Boolean,
      default: true
    },
    flieType: {
      type: Array,
      default: () => {
        return ['jpg', 'png', 'image/jpeg', 'jpeg', 'image/png'];
      }
    },
    fileSize: {
      type: Number,
      default: 10
    },
    headers: {
      type: Object,
      default: () => {
        return {};
      }
    },
    uploadParams: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      fileList: []
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    // 上传之前
    beforeUpload(file) {
      let type = file.type;
      let size = file.size;
      const extension = this.flieType.includes(type);
      const isLt2M = size / 1024 / 1024 < this.limit;
      if (!extension) {
        this.$message.warn('Upload file can only be' + this.flieType + 'type!');
      }
      if (!isLt2M) {
        this.$message.warn('The size of the uploaded file cannot exceed' + this.limit + ' MB!');
      }
      return extension && isLt2M;
    },
    // 上传图片发生变化
    uploadOnchange(file, fileList) {
      this.fileList = fileList;
      this.$emit('uploadOnchange', file, fileList);
    },
    // 上传成功
    uploadOnSuccess(response, file, fileList) {
      console.log('上传成功', response, file, fileList);
    },
    // 上传失败
    uploadOnError(err, file, fileList) {
      console.log('上传失败', err, file, fileList);
    },
    // 删除图片的回调
    uploadBeforeRemove(file, fileList) {
      console.log('删除图片', file, fileList);
    },
    // 点击上传成功后的图片
    uploadOnPreview(file) {
      console.log('点击文件列表中已上传的文件时的钩子', file);
    },
    // 自定义上传
    uploadHttpRequest(data) {
      this.$emit('uploadHttpRequest', data);
    },
    uploadOnProgress(data) {
      console.log('上传进度', data);
      this.$emit('uploadOnProgress', data);
    },
    // 文件超出个数
    uploadOnExceed(files, fileList) {
      console.log('文件超出个数', files, fileList);
    },
    handleRemove() {}
  }
};
</script>
<style scoped lang="less">
// 上传图片区
.upload-container {
  width: 445px;
  height: 399px;
  background: #ffffff;
  // border: 2px solid #dddddd;
  border-radius: 4px;
  /deep/.upload {
    .size();
    .el-upload {
      .size();
      .el-upload-dragger {
        .size();
        .flex();
        border: 2px solid #d9d9d9;
        .el-upload-center {
          width: 220px;
          height: 230px;
          .upload-btn {
            width: 221px;
            height: 56px;
            background: #353f62;
            border-radius: 4px;
            .flex();
            .text {
              font-size: 20px;
              font-weight: 400;
              color: #ffffff;
            }
            .iconfont {
              color: #fff;
              margin-left: 10px;
            }
          }
          .upload-tips {
            font-size: 20px;
            font-weight: 400;
            color: #333333;
            line-height: 27px;
            margin-top: 20px;
          }
        }
      }
    }
  }
}
</style>
