<template>
  <div class="forecast-main">
    <!-- banner图 -->
    <div class="forecast-banner">
      <!-- 内容 -->
      <div class="content margin-auto">
        <p class="title title1">“How Much Is My Home Really Worth?”</p>
        <p class="title title2">
          Here's the truth:most homeowners are seriously underestimating how much they can get for their property. So, we created our Moafly Suggested List Price tool to give you the most accurate
          estimation in seconds.
        </p>
        <!-- 搜索框 -->
        <div class="search-box">
          <div class="search">
            <el-input id="auto-search-address" clear="auto-search-address" style="width:100%;height:100%" v-model="params.address" placeholder="Enter Your Address"></el-input>
          </div>
          <div @click="handlerSearch" class="btn">Start</div>
        </div>
      </div>
    </div>
    <!-- 问题内容解答 -->
    <div class="forecast-question margin-auto">
      <p class="header-title">Your home value questions, answered.</p>
      <div class="question-content ">
        <!-- 问题列表 -->
        <ul class="question-list">
          <li v-for="(item, index) in questionList" :key="item.title" class="question-item" :class="'question-item-' + index">
            <!-- 标题 -->
            <div class="title-box">
              <p class="question-title margin-p">{{ item.title }}</p>
              <p @click="handlerViewContent(item)" class="question-bottom cursor margin-p">
                <i v-if="item.textShow" class="el-icon-caret-top"></i>
                <i v-else class="el-icon-caret-bottom"></i>
              </p>
            </div>
            <!-- 内容 -->
            <div v-if="item.textShow" class="item-content cursor">
              {{ item.text }}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div id="forecast" v-show="false"></div>
    <bottonFooter></bottonFooter>
    <uploadDialog :params="params" v-if="uploadVisible" @handlerClose="uploadVisible = false" :visible="uploadVisible"></uploadDialog>
  </div>
</template>

<script>
import { autoSearch, initMap } from '@/Gmap/core/index.js';
import bottonFooter from '@/components/footer/index';
import uploadDialog from './components/uploadDialog.vue';
export default {
  name: 'forecas',
  components: {
    bottonFooter,
    uploadDialog
  },
  data() {
    return {
      rectangle: null, // 查询范围
      uploadVisible: false,
      questionList: [
        {
          title: 'Why use a home value estimator tool?',
          solid: 333,
          textShow: false,
          text:
            'Knowing the estimated value of your own home helps you price your home for sale, as a precursor to an official home appraisal. This allows you to calculate the proceeds of a future home sale to better understand your potential budget for your next home.'
        },
        {
          title: 'How to find the value of your home?  ',
          solid: 241,
          textShow: false,
          text:
            'We recommend using all the online tools easily accessible and provided by the technology real estate companies. This should include a visit to Zillow, Redfin, and Moafly. Each company created its unique tool to help provide you with a better-estimated value of your home.'
        },
        {
          title: 'What is “Moafly Suggested List Price”?',
          solid: 270,
          textShow: false,
          text:
            'Our patent-pending MSLP is Moafly’s estimated market value tool for your home. MSLP features a unique AI algorithm that uses public and user-provided data. Our tool uses the most current information about your home to provide a more accurate estimate. Moafly Suggested List Price is not an official appraisal but a great starting point in the listing process.'
        },
        {
          title: 'How accurate is the MSLP?',
          solid: 333,
          textShow: false,
          text:
            'Of course, our AI technology is not perfect yet. Our median error rate for homes in California and Florida is 7%. That means Moafly Suggested List Price for homes is within 7% of the final sale price. Some variables can help explain this variance. One can be that the sellers/and their agents priced the home too low, and it sold below market value; another can be that buyers significantly overpaid for a home during bidding wars. Additionally, you can improve the accuracy of your MSLP by providing high-quality photos of your home.'
        }
      ],
      params: {
        address: '',
        postalCode: '',
        unitNumber: ''
      }
      // content: ''
    };
  },
  mounted() {
    this.mapComplete();
  },
  methods: {
    handlerSearch() {
      if (!this.params.address) {
        return this.$message.warn('Please enter address');
      }
      this.uploadVisible = true;
    },
    // 查看问题内容
    handlerViewContent(item) {
      item.textShow = !item.textShow;
    },
    mapComplete() {
      let map = initMap({ el: 'forecast' });
      let el = document.getElementById('auto-search-address');
      autoSearch(el, map, (res, place) => {
        console.log('res====>', res);
        let postcode = '';
        this.params.address = place.formatted_address.split(', USA')[0];
        this.params.address1 = res.address;
        if (res.postcode) {
          postcode = res.postcode.split('-')[0];
          this.params.postalCode = postcode;
        }
        this.params.address2 = res.locality + ', ' + res.state + ', ' + postcode;
        this.params.unitNumber = res.unitNumber ? res.unitNumber : '';
      });
    }
  }
};
</script>

<style lang="less" scoped>
.margin-auto {
  margin: 0 auto;
}
.margin-p {
  margin-bottom: 0;
}
/deep/.el-upload-dragger {
  &:hover {
    border-color: #dc5674;
  }
}
.forecast-main {
  width: 100%;
  height: 100%;
  padding-top: 80px;
  .forecast-banner {
    position: relative;
    width: 100%;
    background-image: url('~@/assets/images/agent/home_much.png');
    background-size: 100% 100%;
    overflow: hidden;
    .content {
      max-width: 1200px;
      width: calc(100% - 30px);
      padding: 50px 15px;
      @media (min-width: 992px) {
        padding: 150px 15px;
      }
      .title {
        color: #ffffff;
        font-family: 'Libre Franklin';
        font-style: normal;
      }
      .title1 {
        width: 100%;
        font-weight: 700;
        margin-bottom: 25px;
        font-size: 44px;
        line-height: 50px;
        @media (min-width: 992px) {
          font-size: 64px;
          line-height: 70px;
        }
      }
      .title2 {
        margin-bottom: 0;
        font-weight: 500;
        color: #ffffff;
        font-size: 24px;
        line-height: 30px;
      }
      .search-box {
        width: 100%;
        height: 60px;
        background: rgba(255, 255, 255, 0.5);
        border: 1px solid rgba(15, 27, 67, 0.2);
        border-radius: 6px;
        margin-top: 40px;
        .flex();
        justify-content: space-between;
        /deep/.search {
          width: calc(100% - 140px);
          height: 100%;
          .el-input__inner {
            height: 60px;
            background: rgba(255, 255, 255, 0);
            padding-left: 40px;
            border: none;
            font-family: 'Libre Franklin';
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 24px;
            text-transform: capitalize;
            &::-webkit-input-placeholder {
              -webkit-text-fill-color: rgba(15, 27, 67, 0.2);
            }
            &::-moz-input-placeholder {
              -webkit-text-fill-color: rgba(15, 27, 67, 0.2);
            }
            &::-ms-input-placeholder {
              -webkit-text-fill-color: rgba(15, 27, 67, 0.2);
            }
          }
        }
        .btn {
          width: 130px;
          height: 48px;
          background: #dc5674;
          border-radius: 6px;
          text-align: center;
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 400;
          font-size: 23px;
          line-height: 48px;
          color: #ffffff;
          margin-right: 10px;
          cursor: pointer;
        }
      }
    }
  }
  .forecast-question {
    max-width: 1200px;
    width: calc(100% - 30px);
    padding: 0 15px;
    background: #ffffff;
    padding-top: 40px;
    box-sizing: border-box;
    .header-title {
      font-family: 'Libre Franklin';
      font-style: normal;
      font-weight: 700;
      font-size: 30px;
      line-height: 36px;
      color: #0f1b43;
    }
    .question-content {
      width: 100%;
      border: 1px solid #e0e0e0;
      border-radius: 16px;
      box-sizing: border-box;
      margin-top: 40px;
      margin-bottom: 111px;
      padding: 15px;
      @media (min-width: 992px) {
        padding: 0px 40px;
      }
      .question-list {
        width: 100%;
        .question-item {
          width: 100%;
          min-height: 104px;
          border-bottom: 1px solid #ccc;
          .title-box {
            position: relative;
            width: 100%;
            height: 104px;
            .flex();
            justify-content: space-between;
            margin-bottom: 16px;
            &::before {
              content: ' ';
              width: 10px;
              height: 10px;
              background: #ea4671;
              @media (min-width: 992px) {
                width: 19px;
                height: 19px;
              }
            }
            .question-title {
              font-family: 'Libre Franklin';
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 22px;
              color: #0f1b43;
              margin: 0 15px;
              width: calc(100% - 58px);
              @media (min-width: 992px) {
                width: calc(100% - 67px);
                font-size: 18px;
                line-height: 24px;
              }
            }
            .question-solid {
              color: #e1e3e7;
              margin-left: 10px;
              border-bottom: 2px dashed #e1e3e7;
              white-space: nowrap;
            }
            .question-bottom {
              color: rgba(15, 27, 67, 0.6);
              width: 18px;
              margin-left: 0;
              margin-right: 0;
            }
            .el-icon-caret-top {
              color: #dc5674;
            }
          }
          .item-content {
            max-width: 860px;
            width: 100%;
            font-family: 'Libre Franklin';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 30px;
            color: rgba(15, 27, 67, 0.6);
            margin-bottom: 34px;
          }
        }
        .question-item-3 {
          border-bottom: 0;
        }
      }
    }
  }
}
</style>
