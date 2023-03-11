<template>
  <div class="sell-listing-date-container step3" :form="form" ref="form">
    <div class="title">Please choose your prefered for sale sign.</div>
    <div class="content">
      <el-row type="flex" justify="space-between" :gutter="20">
        <el-col class="template-col" :span="12">
          <div class="tempalte template1" :class="form.salesignImgUrl == 1 ? 'active' : ''" @click="handleSelect(1)">
            <el-image :src="require('@/assets/images/sell/template2.png')" fit="fill" :lazy="true"></el-image>
            <img class="zoom-icon" @click="handlerSale(require('@/assets/images/sell/template2.png'))" :src="require('@/assets/svg/zoom.svg')" alt="" />
          </div>
          <div class="tempalte template2" :class="form.salesignImgUrl == 3 ? 'active' : ''" @click="handleSelect(3)">
            <el-image :src="require('@/assets/images/sell/template3.png')" fit="fill" :lazy="true"></el-image>
            <img class="zoom-icon" @click="handlerSale(require('@/assets/images/sell/template3.png'))" :src="require('@/assets/svg/zoom.svg')" alt="" />
          </div>
        </el-col>
        <el-col class="template-col" :span="12">
          <div class="tempalte template3" :class="form.salesignImgUrl == 2 ? 'active' : ''" @click="handleSelect(2)">
            <el-image :src="require('@/assets/images/sell/template1.png')" fit="fill" :lazy="true"></el-image>
            <img class="zoom-icon" @click="handlerSale(require('@/assets/images/sell/template1.png'))" :src="require('@/assets/svg/zoom.svg')" alt="" />
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="footer">
      <WButton radius="4px" text="Previous" color="#DC5674" border="1px solid #DC5674" width="100px" height="39px" bgColor="#fff" @handleClick="handlePre(3)"></WButton>
      <WButton radius="4px" text="Next" v-throttle v-loading="loading" :disabled="disabled" width="84px" height="39px" @handleClick="handleNext(3)" class="next-btn"></WButton>
    </div>
    <preview ref="preview"></preview>
  </div>
</template>
<script>
import WButton from '@/components/Button';
import { addHomeInfo, viladStep } from '@/util/index';
import preview from './components/preview.vue';
export default {
  components: { WButton, preview },
  data() {
    return {
      disabled: false,
      isDrag: false,
      preBgColor: '#fff',
      bgColor: '#ddd',
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      form: {
        houseStep: '9',
        salesignImgUrl: 2,
        houseId: ''
      },
      currentImgUrl: '',
      loading: false,
      show: '1',
      homeInfo: null,
      img: require(`@/assets/images/sell/template2-2.png`)
    };
  },
  computed: {},
  created() {},
  mounted() {
    let homeInfo = this.$store.getters.homeInfo;
    this.homeInfo = homeInfo;
    if (homeInfo && homeInfo.houseId) {
      this.form.houseId = homeInfo.houseId;
      this.form.salesignImgUrl = homeInfo.salesignImgUrl ? homeInfo.salesignImgUrl : 2;
      this.currentImgUrl = require(`@/assets/images/sell/template${this.form.salesignImgUrl}.png`);
      this.form.houseStep = viladStep(homeInfo.houseStep, this.form.houseStep);
    }
  },
  methods: {
    handlePre() {
      this.$router.push('/sell/listing-date');
    },
    handleNext() {
      this.loading = true;
      addHomeInfo(this.form)
        .then(res => {
          if (res) {
            let obj = this.$store.getters.homeInfo;
            this.$store.commit('SET_HOME_INFO', Object.assign(obj, this.form));
            this.$message.success('success');
            this.$router.push('/sell/preview');
            this.loading = false;
          } else {
            this.loading = false;
            this.$message.error(res.message);
          }
        })
        .catch(err => {
          this.loading = false;
          this.$message.error(err);
        });
    },
    //放大图片
    handlerSale(url) {
      this.$refs.preview.init(url);
    },
    handleSelect(type) {
      this.form.salesignImgUrl = type;
      this.currentImgUrl = require(`@/assets/images/sell/template${type}.png`);
      this.img = require(`@/assets/images/sell/template${type}-2.png`);
    }
  }
};
</script>
<style scoped lang="less">
.sell-listing-date-container {
  position: relative;
  width: 100%;
  height: 100%;
  .title {
    .MoaflyText(700, 26px, 32px, #0f1b43);
    margin-bottom: 40px;
  }
  .content {
    width: 100%;
    .flex();
    justify-content: space-between;
    align-items: flex-start;
    /deep/.el-row {
      margin-top: 20px;
      &:first-child {
        margin-top: 0px;
      }
      .el-col {
        .tempalte {
          cursor: pointer;
          width: 260.79px;
          height: 172.42px;
          border-radius: 4px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          &.active::after {
            position: absolute;
            content: ' ';
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border: 4px solid rgb(220, 86, 116);
            z-index: 0;
            pointer-events: none;
          }
          .zoom-icon {
            position: absolute;
            right: 10px;
            bottom: 10px;
            width: 25px;
            height: 25px;
          }
          img {
            width: 100%;
            height: 100%;
            transition: all 0.5s;
            // &:hover {
            //   transform: scale(1.5);
            // }
          }
        }
        .template3 {
          margin-top: 2px;
        }
        .template3 {
          width: 245.7px;
          height: 347px;
        }
      }
    }
    .template-col {
      height: 160px;
    }
  }
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
</style>
