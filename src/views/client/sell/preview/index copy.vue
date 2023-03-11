<template>
  <div class="preview-container">
    <div class="title">Preview</div>
    <ul class="collapse-box">
      <li class="preview-item" v-for="(item, idx) in previewList" :key="idx">
        <div class="preview-left">
          <p class="name">{{ item.name }}</p>
          <p v-if="!item.isComplete" class="complete">
            <span class="complete-title title1">(Lack of information，</span><span @click="handlerComplete(item)" class="complete-title cursor title2">complete it now)</span>
          </p>
        </div>
        <div class="preview-right">
          <img v-if="item.isComplete" :src="require('@/assets/images/sell/preview.png')" alt="" />
        </div>
      </li>
    </ul>
    <div class="footer">
      <WButton radius="4px" text="preview" color="#DC5674" border="1px solid #DC5674" width="100px" height="39px" bgColor="#fff" @handleClick="handlerPreview"></WButton>
      <WButton radius="4px" :text="nextBtnTxt" v-loading="loading" width="161px" height="39px" @handleClick="handleNext()" class="next-btn"></WButton>
    </div>
    <contract :isShow="contractIsShow" @handleClose="contractIsShow = false" @handleSubmit="handleSubmit"></contract>
    <MoaflyDialog width="600px" title="Publish listings" class="publish-dialog" :visible.sync="publishDialog">
      <div class="publish-box">
        <img class="publish-img margin-auto" :src="require('@/assets/images/sell/complete.png')" alt="" />
        <p class="publish-title">One more step left! </p>
        <p class="publish-text">
          You need to sign your listing contract.
        </p>
        <div class="btn-box">
          <WButton radius="4px" text="Cancel" color="#DC5674" border="1px solid #DC5674" width="100px" height="39px" bgColor="#fff" @handleClick="handlerPathSellHome"></WButton>
          <WButton radius="4px" text="Confirm" width="161px" height="39px" @handleClick="handlerContract" class="next-btn"></WButton>
        </div>
      </div>
    </MoaflyDialog>
  </div>
</template>
<script>
import WButton from '@/components/Button';
import contract from './components/contract.vue';
import MoaflyDialog from '@/components/MoaflyDialog';
import { mapGetters } from 'vuex';
import { getHomeInfo, addHomeInfo, listAssign, viladStep } from '@/util/index';
export default {
  components: { WButton, contract, MoaflyDialog },
  data() {
    return {
      contractIsShow: false,
      publishDialog: false,
      previewList: [],
      list: [
        {
          name: 'Address',
          path: '/sell/Address',
          step: '1'
        },
        {
          name: 'Basics',
          path: '/sell/basics',
          step: '2'
        },
        {
          name: 'Features',
          path: '/sell/features',
          step: '3'
        },
        {
          name: 'Advance Details',
          path: '/sell/more-details',
          step: '4'
        },
        {
          name: 'Description',
          path: '/sell/description',
          step: '5'
        },
        {
          name: 'Photos',
          path: '/sell/photos',
          step: '6'
        },
        {
          name: 'Price',
          path: '/sell/price',
          step: '7'
        },
        {
          name: 'Lisiting Date',
          path: '/sell/listing-date',
          step: '8'
        },
        {
          name: 'For Sale sign',
          path: '/sell/sale-sign',
          step: '9'
        }
      ],
      fresh: true,
      loading: false,
      bgColor: '#ddd',
      form: {
        houseStep: '10',
        houseId: '',
        contractPdfUrl: ''
      },
      imgList: [], //图片列表
      previewData: {}
    };
  },
  computed: {
    ...mapGetters(['homeInfo']),
    isComplete() {
      return this.previewList.every(item => item.isComplete);
    },
    nextBtnTxt() {
      let isComplete = this.previewList.every(item => item.isComplete);
      if (isComplete && this.form.contractPdfUrl) {
        return 'Finished';
      } else if (isComplete) {
        return 'Sign contract';
      } else {
        return 'Publish listing';
      }
    }
  },
  watch: {
    form: {
      handler(newVal) {
        if (newVal.contractPdfUrl) {
          if (this.fresh) {
            addHomeInfo(this.form).then(res => {
              if (res) {
                getHomeInfo();
                //房屋步骤完成清空房屋信息
                this.$store.commit('SET_HOME_INFO', {});
                this.contractIsShow = false;
                this.$router.push('/sell/finishPage');
                this.fresh = false;
              } else {
                setTimeout(() => {
                  this.$loading.close();
                  this.$message.error('error');
                }, 2000);
              }
            });
          }
        } else {
          this.fresh = true;
        }
      },
      deep: true //为true，
    }
  },
  created() {},
  mounted() {
    this.form.contractPdfUrl = this.homeInfo.contractPdfUrl;
    //根据步骤判断是否完成
    if (this.homeInfo && this.homeInfo.houseStep) {
      let stepList = this.homeInfo.houseStep.split(',');
      this.previewList = this.list.map(item => {
        if (stepList.includes(item.step)) {
          item.isComplete = true;
        }
        return {
          ...item
        };
      });
    } else {
      this.previewList = this.list;
    }
    console.log('this.previewList=>', this.previewList);
    //克隆房屋信息
    listAssign(this.form, this.homeInfo);
    //获取当前已完成步骤
    this.form.houseStep = viladStep(this.homeInfo.houseStep, this.form.houseStep);
  },
  methods: {
    handlerPathSellHome() {
      this.$router.push('/person/selling-homes');
    },
    handleNext() {
      if (!this.isComplete) {
        return this.$message.warn('房屋信息不完善，去完善信息');
      }
      if (this.form.contractPdfUrl) {
        this.$loading.open();
        this.fresh = true;
        this.$loading.close();
      } else {
        this.$router.push("/person/selling-homes")
        // this.publishDialog = true;
      }
    },
    //打开合同弹窗
    handlerContract() {
      this.publishDialog = false;
      this.contractIsShow = true;
    },
    /**
     * 关闭合同谈弹窗
     */
    handleClose() {
      this.contractIsShow = false;
    },
    handleSubmit(pdfUrl) {
      this.form.contractPdfUrl = pdfUrl;
      this.contractIsShow = false;
    },
    //去完成
    handlerComplete(item) {
      this.$router.push(item.path);
    },
    //预览
    handlerPreview() {
      this.$router.push({
        name: 'preview-home',
        params: {
          houseId: this.form.houseId
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
p {
  margin: 0;
}
.margin-auto {
  margin: 0 auto;
}
.preview-container {
  position: relative;
  width: 100%;
  height: 100%;
  .title {
    .MoaflyText(700, 26px, 32px, #0f1b43);
    margin-bottom: 40px;
  }
  .collapse-box {
    width: 100%;
    height: calc(100% - 120px);
    overflow-y: auto;
    .preview-item {
      width: 100%;
      background: #f5f6f7;
      box-shadow: 0px 4px 12px rgba(15, 27, 67, 0.1);
      border-radius: 2px;
      margin-bottom: 20px;
      .flex();
      justify-content: space-between;
      padding: 15px 24px;
      .preview-left {
        .MoaflyText(500, 16px, 19px, #0f1b43);
        .flex();
        .title1 {
          color: #666666;
          margin-left: 2px;
        }
        .title2 {
          color: #dc5674;
        }
      }
    }
  }
  .footer {
    display: flex;
    position: absolute;
    right: 0;
    bottom: 0;
    .next-btn {
      margin-left: 20px;
    }
  }
  ::v-deep {
    .publish-dialog {
      .el-dialog__body {
        padding: 40px 72.85px;
        box-sizing: border-box;
      }
      .publish-box {
        width: 100%;
        .publish-img {
          display: block;
        }
        .publish-title {
          .MoaflyText(400, 16px, 18px, #0f1b43);

          text-align: center;
        }
        .title-top {
          margin-top: 24px;
        }
        .text-top {
          margin-top: 16px;
        }
        .publish-text {
          .MoaflyText(400, 14px, 18px, rgba(15, 27, 67, 0.6));
          text-align: center;
        }
        .btn-box {
          .flex();
          margin-top: 50px;
          .button-container {
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>
