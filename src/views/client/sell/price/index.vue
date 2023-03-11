<template>
  <div class="sell-price-container">
    <div class="title">What's your estimated selling price</div>
    <el-form class="content" :model="form" ref="myForm">
      <MFormItem label="Estimated home value" class="estimate-home">
        <MInput prefix @input="onInput" v-model="form.housePrice"> <span class="unit" slot="prefix">$</span> </MInput>
        <div class="price-title-box">
          <p class="price-title">Moafly AI can estimate your home value</p>
          <p class="price-valuation cursor" @click="handlerToEstimates">Start here</p>
        </div>
      </MFormItem>
      <div class="footer">
        <WButton radius="4px" text="Previous" color="#DC5674" border="1px solid #DC5674" width="100px" height="39px" bgColor="#fff" @handleClick="handlePre"></WButton>
        <WButton radius="4px" text="Next" v-throttle v-loading="loading" :disabled="disabled" width="84px" height="39px" @handleClick="handleNext" class="next-btn"></WButton>
      </div>
    </el-form>
    <estimatedDialog ref="estimatedDialog" :visible="estimatedVisible" @handlerClose="handlerClose"></estimatedDialog>
  </div>
</template>
<script>
import WButton from '@/components/Button';
import MInput from '@/views/client/sell/components/MInput.vue';
import MFormItem from '@/views/client/sell/components/MFormItem.vue';
import { getHomeInfo } from '@/util/auth';
import { listAssign, viladStep, numberParse, numberFormat } from '@/util/index';
import estimatedDialog from './components/estimatedDialog.vue';
import Is from '@/util/is.js';
import * as api from '@/api';
export default {
  components: { WButton, MInput, MFormItem, estimatedDialog },
  data() {
    return {
      estimatedVisible: false,
      homeInfo: {},
      disabled: true,
      loading: false,
      form: {
        housePrice: '',
        houseStep: '7',
        houseId: ''
      }
    };
  },
  watch: {
    form: {
      deep: true,
      handler(val) {
        if (val.housePrice) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      }
    }
  },

  mounted() {
    this.homeInfo = this.$store.getters.homeInfo;
    if (this.homeInfo && this.homeInfo.houseId) {
      listAssign(this.form, this.homeInfo);
      this.form.houseStep = viladStep(this.homeInfo.houseStep, this.form.houseStep);
      this.form.houseId = this.homeInfo.houseId;
      this.form.housePrice = numberFormat(this.form.housePrice);
    }
  },
  methods: {
    //获取估价金额
    handlerClose(price) {
      this.form.housePrice = price;
    },
    //去估价
    handlerToEstimates() {
      if (this.homeInfo) {
        if (Is.obj(this.homeInfo)) {
          if (Is.arrayEmpty(this.homeInfo.imgList)) {
            return this.$message.warn('Please upload at least five pictures');
          } else {
            // this.estimatedVisible = true;
            this.$refs.estimatedDialog.handlerQuery(this.homeInfo);
          }
        } else {
          return this.$message.warn('Please upload  pictures');
        }
      } else {
        return this.$message.warn('Please upload  pictures');
      }
    },
    onInput() {
      this.form.housePrice = numberFormat(this.form.housePrice);
    },
    handlePre() {
      this.$router.push('/sell/photos');
    },
    handleNext() {
      this.loading = true;
      this.form.housePrice = numberParse(this.form.housePrice);
      api.home
        .addHome(this.form)
        .then(res => {
          if (res.code === 'K-000000') {
            let obj = this.$store.getters.homeInfo;
            this.loading = false;
            this.$store.commit('SET_HOME_INFO', Object.assign(obj, this.form));
            this.$router.push('/sell/listing-date');
          } else {
            this.loading = false;
            this.$message.error(res.message);
          }
        })
        .catch(err => {
          this.loading = false;
          this.$message.error(err);
        });
    }
  }
};
</script>
<style scoped lang="less">
p {
  margin: 0;
}
.sell-price-container {
  position: relative;
  width: 100%;
  height: 100%;
  .title {
    .MoaflyText(700, 26px, 32px, #0f1b43);
    margin-bottom: 40px;
  }
  .content {
    /deep/.estimate-home {
      label {
        position: relative;
        text-align: left;
        float: none;
        display: inline-block;
      }
      .el-input {
        width: 100% !important;
        @media (min-width: 768px) {
          max-width: 50%;
        }
      }
    }
    .price-title-box {
      width: 100%;
      margin-top: 16px;
      .flex();
      justify-content: flex-start;
      .price-title {
        .MoaflyText(500, 16px, 32px, #dc5674);
      }
      .price-valuation {
        margin-left: 10px;
        padding: 5px;
        background: #dc5674;
        border-radius: 5px;
        .MoaflyText(500, 16px, 20px, #ffffff);
      }
    }
  }
  .footer {
    display: flex;
    .next-btn {
      margin-left: 20px;
    }
  }
}
</style>
