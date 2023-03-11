<template>
  <div class="photo-container">
    <div class="content">
      <div class="title">
        <p class="text">
          Photos of your home.
        </p>
        <p class="small-text">
          Listing photos: Listing photo dimensions must be at least 330 pixels wide and 220 pixels high.Depending on the page, a photo can go as big as 3,264px (width) and 2,448px (height). You can
          save in JPG, PNG, TIF, or GIF image format while keeping the size around 10-50 MB.
        </p>
      </div>
      <div class="upload-content">
        <template v-if="fileList.length">
          <div v-for="(item, idx) in fileList" :key="idx" class="img-item">
            <img class="img-home" :src="item.imgRul || item.imgUrl" alt="" />
            <i @click="handleRemove(item, idx)" class="el-icon-error cursor"></i>
          </div>
          <div class="upload">
            <Upload @uploadHttpRequest="uploadHttpRequest" :file-list="fileList" class="upload-box">
              <div class="el-upload-center" slot="default">
                <i class="el-icon-plus"></i>
              </div>
            </Upload>
          </div>
        </template>
        <div v-else class="upload-empty">
          <Upload @uploadHttpRequest="uploadHttpRequest" :file-list="fileList" class="upload-box">
            <div class="el-upload-center" slot="default">
              <img class="upload-icon" :src="require('@/assets/svg/upload-icon.svg')" alt="" />
              <p class="upload-title ">Upload Files</p>
              <p class="icon-text">Or drag and drop a file</p>
            </div>
          </Upload>
        </div>
      </div>
      <!-- <Upload @uploadHttpRequest="uploadHttpRequest" @uploadOnchange="uploadOnchange"></Upload> -->
    </div>
    <!-- <div class="photo-center-bottom">
        <div class="preview">
          <div class="image-item" v-for="(item, index) in fileList" :key="index">
            <img :src="item.url" alt="" />
            <div class="img-loading" v-loading="item.status === 'ready'"></div>
            <div class="img-reset" v-show="item.status === 'error'" :title="item.status">
              <i class="iconfont icon-shangchuanshibai"></i>
            </div>
            <div class="img-mask">
              <div class="mask-header" :style="{ visibility: index === 0 ? 'visible' : 'hidden' }">Main picture</div>
              <div class="mask-footer">
                <i class="iconfont icon-yulan" @click="handlePreview(item)"></i>
                <i class="iconfont icon-xiazaidaoru" @click="handleDownload(item)"></i>
                <i class="iconfont icon-shanchu" @click="handleRemove(item)"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <PreButton radius="4px" text="Previous" :disabled="disabled" width="164px" height="56px" @handleClick="handlePre(3)"></PreButton>
          <WButton class="next" radius="4px" text="Next" :disabled="disabled" v-loading="loading" :bgColor="bgColor" width="164px" height="56px" @handleClick="handleNext(3)"></WButton>
        </div>
      </div> -->
    <div class="footer">
      <WButton radius="4px" text="Previous" color="#DC5674" border="1px solid #DC5674" width="100px" height="39px" bgColor="#fff" @handleClick="handlePre"></WButton>
      <WButton radius="4px" text="Next" v-throttle v-loading="loading" :disabled="fileList.length === 0" width="84px" height="39px" @handleClick="handleNext" class="next-btn"></WButton>
    </div>
  </div>
</template>
<script>
import * as api from '@/api';
import WButton from '@/components/Button';
// import Upload from '@/components/upload';
import Upload from '@/views/client/estimates/components/upload.vue';
import { getToken } from '@/util/auth.js';
import axios from 'axios';
import { checkFile1, addHomeInfo, listAssign, viladStep } from '@/util/index';
export default {
  components: { WButton, Upload },
  data() {
    return {
      fileType: ['jpg', 'png', 'jpeg', 'image/jpeg'],
      fileSize: 1,
      disabled: true,
      preview: false,
      previewUrl: '',
      bgColor: '#ddd',
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      form: {
        houseStep: '6',
        houseId: ''
      },
      fileList: [],
      loading: false
    };
  },
  computed: {},
  created() {},
  mounted() {
    let homeInfo = this.$store.getters.homeInfo;
    if (homeInfo && homeInfo.houseId) {
      listAssign(this.form, homeInfo);
      this.form.houseStep = viladStep(homeInfo.houseStep, this.form.houseStep);
      if (homeInfo.imgList) {
        if (Array.isArray(homeInfo.imgList)) {
          this.fileList = homeInfo.imgList;
        }
      }
    }
  },
  methods: {
    handlePre() {
      this.$router.push('/sell/description');
    },
    handleNext() {
      this.loading = true;
      //新增房屋
      addHomeInfo(this.form)
        .then(res => {
          let obj = this.$store.getters.homeInfo;
          obj.imgList = this.fileList;
          this.$store.commit('SET_HOME_INFO', Object.assign(obj, this.form));
          this.$router.push('/sell/price');
          this.loading = false;
        })
        .catch(err => {
          this.$message.error(err);
          this.loading = false;
        });
    },
    //上传文件
    // uploadOnchange(file, fileList) {
    //   if (checkFile1(file, this.fileType, this.fileSize)) {
    //     const formData = new FormData();
    //     formData.append('file', file.raw);
    //     api.upload.uploadFile(formData).then(res => {
    //       if (res.code === 'K-000000') {
    //         let obj = {
    //           imgRul: res.context
    //         };
    //         this.fileList.push(obj);
    //       }
    //     });
    //   }
    // },
    // 上传接口
    uploadHttpRequest(data) {
      let { file } = data;
      if (!checkFile1(file, this.fileType, this.fileSize)) {
        return true;
      }
      const formData = new FormData();
      formData.append('file', file);
      axios
        .post('/moafly/houseInfo/addImg?houseId=' + this.form.houseId, formData, { headers: { 'Content-Type': 'multipart/form-data', token: getToken() } })
        .then(result => {
          let res = result.data;
          if (res.code === 'K-000000' && res.context) {
            this.fileList.push(res.context);
            this.disabled = false;
            this.bgColor = '#353F62';
          }
        })
        .catch(error => {
          console.log('error=>', error);
        });
    },
    handleRemove(item, index) {
      this.$confirm('Are you sure to delete this photo?', 'Confirmation', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        if (item.imgId) {
          api.home
            .removeHomeImg({
              houseId: this.form.houseId,
              imgId: item.imgId
            })
            .then(res => {
              if (res.code === 'K-000000') {
                this.fileList.splice(index, 1);
                this.$message.success('Deleted successfully!');
              }
            })
            .catch(error => {
              this.$message.error(error);
            });
        } else {
          this.fileList.splice(index, 1);
        }
      });
    },
    // handleDownload(item) {
    //   var a = document.createElement('a');
    //   var filename = item.name;
    //   a.href = item.url;
    //   a.download = filename;
    //   a.click();
    // },
    // handlePreview(item) {
    //   this.preview = true;
    //   this.previewUrl = item.url;
    // },
    handleClose() {
      this.preview = false;
    }
  }
};
</script>
<style lang="less" scoped>
.photo-container {
  position: relative;
  width: 100%;
  height: 100%;
  .footer {
    display: flex;
    position: absolute;
    right: 0;
    bottom: 60px;
    .next-btn {
      margin-left: 20px;
    }
  }
}
.content {
  width: 537px;
  .title {
    margin-bottom: 40px;
    .text {
      .MoaflyText(700, 26px, 32px, #0f1b43);
    }
    .small-text {
      // .MoaflyText(500, 14px, 17px, rgba(15, 27, 67, 0.8));
      font-family: 'Libre Franklin';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      text-align: justify;

      color: rgba(15, 27, 67, 0.8);

      margin-top: 16px;
    }
  }
  .upload-content {
    width: 100%;
    .flex();
    justify-content: flex-start;
    flex-wrap: wrap;
    .upload {
      width: 110px;
      height: 110px;
      .flex();
      .el-upload-center {
        .el-icon-plus {
          font-size: 36px;
        }
      }
    }
    .img-item {
      position: relative;
      width: 110px;
      height: 110px;
      border-radius: 4px;
      margin: 12px;
      .img-home {
        border-radius: 4px;
      }
      img {
        width: 100%;
        height: 100%;
      }
      .el-icon-error {
        color: #dc5674;
        position: absolute;
        font-size: 17px;
        right: -8px;
        top: -8px;
      }
    }
    .upload-empty {
      width: 220px;
      height: 204px;
      border-radius: 8px;
      .upload-icon {
        margin-top: 12px;
      }

      .icon-text {
        margin-top: 18px;
        .MoaflyText(400, 14px, 17px, rgba(15, 27, 67, 0.6));
      }
      .upload-title {
        margin-top: 12px;
        .MoaflyText(400, 14px, 17px, #dc5674);
        color: #dc5674 !important;
      }
    }
  }
}
</style>
