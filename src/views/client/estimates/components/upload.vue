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
      <slot></slot>
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
      default: 10
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
  background: #ffffff;
  width: 100%;
  height: 100%;
  border: 1px dashed rgba(15, 27, 67, 0.2);
  border-radius: 8px;
  /deep/.upload {
    .size();
    .el-upload {
      .size();
      .el-upload-dragger {
        .size();
        .flex();
        .el-upload-center {
          .upload-icon {
            .el-icon-upload2 {
              font-size: 40px;
              color: rgba(15, 27, 67, 0.6);
            }
          }
          .upload-title {
            font-family: 'Libre Franklin';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 17px;
            color: rgba(15, 27, 67, 0.2);
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
