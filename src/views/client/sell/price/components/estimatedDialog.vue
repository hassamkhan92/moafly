<template>
  <div v-if="visible" class="dialog-main" v-loading="loading">
    <div class="result-main">
      <i @click="handlerClose" class="el-icon-error pointer"></i>
      <!-- 上半部分 -->
      <div class="header-bg"></div>
      <!-- 内容 -->
      <div class="result-content">
        <div class="title-box">
          <p class="title title1">{{ homeInfo.houseAddress }}</p>
          <p class="title title2">{{ homeInfo.houseCity }}</p>
        </div>
        <!-- 价格显示 -->
        <div class="result-price">
          <p class="price-name">Your home value</p>
          <div class="price-text">
            <span class="text1">moafly estimate </span>
            <el-tooltip :hide-after="0" popper-class="price-tootip" class="item pointer" effect="light" placement="bottom-start">
              <div slot="content">{{ tipContent }}<span class="tootip-title-learn">Learn more.</span></div>
              <img class="img-question" :src="require('@/assets/images/agent/question.png')" alt="" />
            </el-tooltip>
            <p class="line-row"></p>
            <span class="text4"> ${{ homePrice !== 'N/A' ? numberFormat(homePrice) : homePrice }}</span>
          </div>
          <div class="price-text">
            <span class="text1">zillow estimate </span>
            <el-tooltip :hide-after="0" popper-class="price-tootip" class="item pointer" effect="light" placement="bottom-start">
              <div slot="content">{{ tipContent }}<span class="tootip-title-learn">Learn more.</span></div>
              <img class="img-question" :src="require('@/assets/images/agent/question.png')" alt="" />
            </el-tooltip>
            <p class="line-row"></p>
            <span class="text4"> ${{ homePrice !== 'N/A' ? numberFormat(zestimate) : zestimate }}</span>
          </div>
        </div>
        <!-- <p @click="handlerSellHere" class="view-home-title cursor">
          Start selling here >
        </p> -->
      </div>
    </div>
  </div>
</template>

<script>
import { numberFormat } from '@/util/index';
import is from '@/util/is';
import * as api from '@/api';
export default {
  name: 'estimatedDialog',
  //   props: {
  //     visible: {
  //       type: Boolean,
  //       default: false
  //     }
  //   },
  data() {
    return {
      tipContent: 'A moafly estimate home valuation is moafly’s estimated market value. It is not an appraisal. Use it as a starting point to determine a home’s value.',
      contentType: 'unitNumber', //upload:上传;housePrice：房屋估价; :单元号:unitNumber
      unitNumber: '',
      homePrice: 'N/A',
      zestimate: 'N/A',
      homeInfo: {},
      loading: false,
      visible: false
      // params: {
      //   zestimate: 301100,
      //   img: [
      //     'https://tse1-mm.cn.bing.net/th/id/OIP-C.enfDY0pCprvhePKKwURNKQHaE8?pid=ImgDet&rs=1',
      //     'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.ijuzhong.com%2Fzhuangxiu%2Fuploads%2Fallimg%2F20200102%2F1577930843186_4.jpg&refer=http%3A%2F%2Fwww.ijuzhong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668247719&t=34a26202b96958967d0fedb9f609f88a'
      //   ]
      // }
    };
  },
  methods: {
    numberFormat,
    //关闭弹窗
    handlerClose() {
      //   this.$emit('handlerClose');
      this.visible = false;
    },
    //保存估价金额
    handlerSellHere() {
      this.handlerClose();
      this.$emit('handlerClose', this.homePrice);
    },
    handlerQuery(homeInfo) {
      let params = {};
      this.homeInfo = homeInfo;
      if (!homeInfo.imgList || !Array.isArray(homeInfo.imgList)) {
        return this.$message.warn('You have not uploaded a picture of the house');
      }
      params.imgUrlList = homeInfo.imgList.map(item => {
        return item.imgRul;
      });
      params.address = homeInfo.houseAddress;
      // params.imgUrlList = homeInfo.imgList;
      params.postalCode = homeInfo.zipCode;
      params.unitNumber = homeInfo.houseUnit;
      this.visible = true;
      this.loading = true;
      api.search
        .moestimate(params)
        .then(res => {
          if (res.code === 'K-000000' && res.context) {
            this.homePrice = res.context.moestimate;
            this.zestimate = res.context.zestimate;
            if (res.context == 0) {
              this.homePrice = 'N/A';
              this.zestimate = 'N/A';
            }
          } else {
            this.homePrice = 'N/A';
            this.zestimate = 'N/A';
          }
          this.loading = false;
        })
        .catch(err => {
          this.homePrice = 'N/A';
          this.zestimate = 'N/A';

          this.loading = false;
        });
    }
  }
};
</script>
<style lang="less">
.price-tootip.is-light {
  font-family: 'Libre Franklin';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: rgba(15, 27, 67, 0.6);
  width: 260px;
  height: 118px;
  background: #ffffff;
  border: 1px solid #d7d9df;
  border-radius: 6px;
  .tootip-title-learn {
    color: #dc5674;
  }
}
.text-teal {
  color: #dc5674;
}
</style>
<style lang="less" scoped>
p {
  margin: 0;
}
.dialog-main {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  .flex();

  .result-main {
    position: relative;
    box-sizing: border-box;
    width: 990px;
    height: 568px;
    background: #ffffff;
    border-radius: 16px;
    .flex();
    .el-icon-error {
      position: absolute;
      right: 24px;
      top: 24px;
      font-size: 53px;
      color: rgba(15, 27, 67, 0.2);
      z-index: 10;
    }
    .header-bg {
      width: 406px;
      height: 100%;
      background-image: url('~@/assets/images/estimate/estimate.png');
      background-size: 100% 100%;
    }
    .result-content {
      width: calc(100% - 406px);
      height: 100%;
      background: radial-gradient(98.74% 100% at 48.51% 0%, rgba(255, 255, 255, 0.15) 29.69%, rgba(220, 87, 117, 0.0045) 99.99%, rgba(220, 86, 116, 0.012) 100%);
      backdrop-filter: blur(5px);
      padding: 120px 0 0 24px;
      box-sizing: border-box;
      .title-box {
        .title {
          .MoaflyText(500, 34px, 40px, #0f1b43);
        }
        .title3 {
          font-size: 28px;
        }
      }
      .result-price {
        margin-top: 47px;
        .price-name {
          .MoaflyText(500, 28px, 40px, #0f1b43);
        }
        .price-text {
          .flex();
          justify-content: flex-start;
          .text1 {
            .MoaflyText(400, 24px, 40px, #0f1b43);
          }
          .line-row {
            margin-left: 24px;
            width: 150px;
            height: 0;
            border: 1px dashed #e1e3e7;
          }
          .img-question {
            margin-left: 16px;
          }
          /deep/.is-light {
            border-color: #dc5674 !important;
          }
          .text4 {
            margin-left: 24px;
            .MoaflyText(500, 24px, 40px, #0f1b43);
          }
        }
      }
      .view-home-title {
        position: absolute;
        right: 40px;
        bottom: 40px;
        .MoaflyText(400, 24px, 40px, #dc5674);
      }
    }
  }
}
</style>
