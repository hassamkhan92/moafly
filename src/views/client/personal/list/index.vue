<!--
 * @Author: zulezhe
 * @Date: 2021-10-21 22:52:45
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-25 22:39:52
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="preview-container">
    <div class="detail-title">Preview</div>
    <el-collapse v-model="list">
      <el-collapse-item class="detail-item" name="first">
        <template slot="title">
          <div class="detail-item-title">1.Basics</div>
        </template>
        <div class="detail-centent">
          <div class="basics_row">
            <div class="basics_row_child basics_row_left">
              <el-row :gutter="10">
                <el-col :span="8">Address</el-col>
                <el-col class="col_esplise" :span="16">{{ homeInfo.houseAddress }}{{ homeInfo.houseCity }}</el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="8"></el-col>
                <el-col :span="16">unit:{{ homeInfo.houseUnit }}</el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="8"></el-col>
                <el-col :span="16">State:{{ homeInfo.houseState }}</el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="8"></el-col>
                <el-col :span="16">zipCode:{{ homeInfo.zipCode }}</el-col>
              </el-row>
            </div>
            <div class="basics_row_child basics_row_right">
              <el-row :gutter="10">
                <el-col :span="12">HOA</el-col>
                <el-col :span="12">{{ homeInfo.hoa }}</el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">Levels</el-col>
                <el-col :span="12">{{ homeInfo.levels }}</el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">Structure Type</el-col>
                <el-col :span="12">{{ homeInfo.structureType }}</el-col>
              </el-row>
            </div>
          </div>
          <el-row :gutter="10">
            <el-col :span="4">List Price</el-col>
            <el-col :span="8">{{ homeInfo.housePrice ? '$' + homeInfo.housePrice : '' }}</el-col>
            <el-col :span="6">Common Interest</el-col>
            <el-col :span="6">{{ homeInfo.commonInsert }}</el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="4">Beds Total</el-col>
            <el-col :span="8">{{ homeInfo.bedsTotal }}</el-col>
            <el-col :span="6">Property Subtype</el-col>
            <el-col :span="6">{{ homeInfo.propertySubtype }}</el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="4">Baths</el-col>
            <el-col :span="8">{{ homeInfo.baths }}</el-col>
            <el-col :span="6">Garage Spaces</el-col>
            <el-col :span="6">{{ homeInfo.garageSpaces }}</el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="4">Living Area</el-col>
            <el-col :span="8">{{ homeInfo.livingArea }}</el-col>
            <el-col :span="6">Number of Units </el-col>
            <el-col :span="6">Active</el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="4">Lot Size</el-col>
            <el-col :span="8">{{ homeInfo.lotSize }}</el-col>
            <el-col :span="6">Senior Community</el-col>
            <el-col :span="6">{{ homeInfo.seniorCommunity }}</el-col>
          </el-row>
        </div>
      </el-collapse-item>
      <el-collapse-item name="second" class="detail-item">
        <template slot="title">
          <div class="detail-item-title">2.Description</div>
        </template>
        <div class="detail-centent interior-details-centent">
          <p class="des_title title">Introduction</p>
          <p class="des_content">
            {{ homeInfo.houseDescrible }}
          </p>
        </div>
      </el-collapse-item>
      <el-collapse-item name="three" class="detail-item">
        <template slot="title">
          <div class="detail-item-title">3.Features</div>
        </template>
        <div class="detail-centent interior-details-centent">
          <el-row v-for="(v, i) in featData" :key="i" :gutter="10">
            <el-col class="features_name" :span="6">{{ v.text }}</el-col>
            <el-col :span="18"><feat-tag :tagValue="v.value"></feat-tag></el-col>
          </el-row>
        </div>
      </el-collapse-item>
      <el-collapse-item name="four" class="detail-item">
        <template slot="title">
          <div class="detail-item-title">4.More details</div>
        </template>
        <div class="detail-centent interior-details-centent">
          <el-row class="des_title" :gutter="10">
            <el-col :span="6"> HOA Fee(Monthly) </el-col>
            <el-col :span="12">{{ homeInfo.hoaFee }}</el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6"> Buyer Agency Comp </el-col>
            <el-col :span="12">{{ homeInfo.buyerAgencyComp ? '$' + homeInfo.buyerAgencyComp : '' }} </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6"> High School District </el-col>
            <el-col :span="12">{{ homeInfo.heightSchoolDistrict }}</el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6"> Seller phone number</el-col>
            <el-col :span="12"> {{ homeInfo.sellerPhone }} </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6"> Green Validation</el-col>
            <el-col :span="12"> {{ homeInfo.greenValidation }}</el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6"> Power Production </el-col>
            <el-col :span="12">{{ homeInfo.powerProduction }} </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6"> Start Showing Date </el-col>
            <el-col :span="12">{{ homeInfo.startShowDate }} </el-col>
          </el-row>
        </div>
      </el-collapse-item>
      <el-collapse-item name="five" class="detail-item">
        <template slot="title">
          <div class="detail-item-title">5.Photos</div>
        </template>
        <div class="detail-centent interior-details-centent">
          <!-- <div class="col_image_box"><img v-for="(v, i) in imgList" :key="i" class="col_image" :src="v.imgRul" alt="" /></div> -->
          <div class="col_image_box">
            <el-image v-for="(v, i) in imgList" :key="i" class="col_image" :src="v.imgRul" alt="" lazy>
              <div slot="placeholder" class="image-placeholder-slot">
                <img :src="require('@/assets/images/placeholder.png')" />
              </div>
              <div slot="error" class="image-error-slot">
                <img :src="require('@/assets/images/placeholder.png')" />
              </div>
            </el-image>
          </div>
          <!-- <el-row :gutter="10">
            <el-col v-for="v in 12" :key="v" :span="6">
              <img class="col_image" :src="imgUrl" alt="#" />
            </el-col>
          </el-row> -->
        </div>
      </el-collapse-item>
      <el-collapse-item name="six" class="detail-item">
        <template slot="title">
          <div class="detail-item-title">6.Listing Date</div>
        </template>
        <div class="detail-centent interior-details-centent">
          <el-row :gutter="10">
            <el-col :span="6">Coming Soon Date</el-col>
            <el-col :span="12">{{ homeInfo.comingSoonDate }}</el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">Active Date</el-col>
            <el-col :span="12">{{ homeInfo.startShowDate }}</el-col>
          </el-row>
        </div>
      </el-collapse-item>
      <el-collapse-item name="seven" class="detail-item">
        <template slot="title">
          <div class="detail-item-title">7.For Sale Sign</div>
        </template>
        <div class="detail-centent interior-details-centent">
          <el-row :gutter="10">
            <el-col :span="6">
              <img class="col_image" :src="saleSignUrl" alt="" />
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>
      <el-collapse-item name="seven" class="detail-item" v-show="form.contractPdfUrl">
        <template slot="title">
          <div class="detail-item-title">8.Contract</div>
        </template>
        <div class="detail-centent interior-details-centent centent-pdf">
          <PdfView v-if="form.contractPdfUrl" :pdfUrl="form.contractPdfUrl"></PdfView>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="footer">
      <PreButton radius="4px" text="Go Back" border="1px solid #353F62" width="164px" height="56px" @handleClick="handlePre(8)"></PreButton>
    </div>
  </div>
</template>
<script>
import * as api from '@/api';
import PreButton from '@/components/Pre';
import featTag from './components/featTag.vue';
import { mapGetters } from 'vuex';
export default {
  components: { PreButton, featTag },
  data() {
    return {
      imgUrl: require('@/assets/images/detail/small-1.png'),
      contractIsShow: false,
      saleSignUrl: '',
      saleSignList: [require('@/assets/images/sell/template1.png'), require('@/assets/images/sell/template2.png'), require('@/assets/images/sell/template3.png')],
      list: ['first', 'second', 'three', 'four', 'five', 'six', 'seven'],
      featData: [
        {
          text: 'Cooling',
          code: 'cooling',
          value: ''
        },
        {
          text: 'Laundry',
          code: 'Laundry',
          value: ''
        },
        {
          text: 'Room Type',
          code: 'roomType',
          value: ''
        },
        {
          text: 'Fireplace',
          code: 'Fireplace',
          value: ''
        },
        {
          text: 'Pool Features',
          code: 'poolFeatures',
          value: ''
        },
        {
          text: 'View',
          code: 'View',
          value: ''
        },
        {
          text: 'Common Walls',
          code: 'commonWalls',
          value: ''
        },
        {
          text: 'Lot Features',
          code: 'lotFeatures',
          value: ''
        },
        {
          text: 'Community Features',
          code: 'communityFeatures',
          value: ''
        },
        {
          text: 'Sewer',
          code: 'Sewer',
          value: ''
        },
        {
          text: 'Water Source',
          code: 'waterSource',
          value: ''
        }
      ],
      fresh: true,
      disabled: true,
      preBgColor: '#fff',
      bgColor: '#ddd',
      activeName: 'second',
      form: {
        houseStep: '10',
        houseId: '',
        contractPdfUrl: ''
      },
      house: '',
      imgList: [], //图片列表
      previewData: {},
      nextBtnTxt: 'Sign Contract'
    };
  },
  computed: {
    ...mapGetters(['homeInfo'])
  },
  watch: {},
  created() {},
  mounted() {
    console.log('id', this.$store.id);
    api.home.getCompleteHomeDetail(parseInt(this.$store.id)).then(res => {
      if (res.code === 'K-000000') {
        this.form.houseId = res.context.houseId;

        setTimeout(() => {
          this.saleSignUrl =
            res.context.salesignImgUrl == 2
              ? require('@/assets/images/sell/template1.png')
              : res.context.salesignImgUrl == 3
              ? require('@/assets/images/sell/template3.png')
              : require('@/assets/images/sell/template1.png');
        }, 1000);

        let formInfo = res.context.houseInfoVO;

        let houseProperty = JSON.parse(res.context.houseInfoVO.houseProperty);
        this.featData.forEach(item => {
          item.value = houseProperty[item.code];
        });
        this.imgList = res.context.houseInfoVO.imgList;
        this.$store.commit('SET_HOME_INFO', formInfo);
      } else {
        this.$message.error(res.message);
      }
    });
  },
  methods: {
    handlePre(val) {
      this.$router.push('/person/selling-homes');
    }
  }
};
</script>
<style scoped lang="less">
.preview-container {
  cursor: pointer;
  width: 997px;
  .detail-title {
    font-size: 36px;
    font-family: Arial;
    font-weight: bold;
    color: #333333;
    line-height: 48px;
    margin-top: 40px;
  }
  /deep/.el-collapse {
    border-top: 0;
    .el-collapse-item__header {
      height: auto;
      line-height: normal;
    }
    .el-collapse-item__wrap {
      border-bottom: 0;
    }
    .detail-item {
      width: 100%;
      overflow: hidden;
      .detail-item-title {
        width: 100%;
        height: 68px;
        background: #e6e7ff;
        border-radius: 8px;
        margin-top: 20px;
        font-size: 24px;
        font-family: Arial;
        font-weight: bold;
        color: #333333;
        box-sizing: border-box;
        padding: 26px 36px;
      }
      .el-collapse-item__arrow {
        display: none;
      }
      .detail-centent {
        padding: 0 37px;
        .basics_row {
          width: 100%;
          .flex();
          justify-content: flex-start;
          align-items: flex-start;
          .basics_row_child {
            width: 50%;
          }
        }
        .el-col {
          font-size: 24px;
          font-family: Arial;
          font-weight: 400;
          color: #999999;
          line-height: 30px;
          margin-top: 10px;
        }
        .features_name {
          line-height: 44px;
        }
        .col_esplise {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-right: 20px !important;
        }
        .col_image_box {
          max-height: 500px;
          overflow-y: scroll;
          margin-top: 40px;
          .flex();
          justify-content: flex-start;
          flex-wrap: wrap;
          .el-image {
            border: 1px solid #ccc;
            .flex();
          }
          .image-placeholder-slot,
          .image-error-slot {
            position: relative;
            &::before {
              content: '';
              position: absolute;
              left: 0;
              top: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(-45deg, transparent 30%, transparent, rgba(255, 255, 255, 0.5), transparent 70%) no-repeat;
              background-size: 200% 200%;
              animation: aaa 2s infinite;
            }
            @keyframes aaa {
              0% {
                background-position: 200% 200%;
              }
              100% {
                background-position: -100% -100%;
              }
            }
          }
        }
        .col_image {
          width: 192px;
          height: 160px;
          border-radius: 10px;
          margin: 10px;
        }
        .el-col:nth-child(even) {
          font-size: 20px;
          font-family: Arial;
          font-weight: 400;
          color: #333333;
          line-height: 30px;
        } //偶数行
      }
      .interior-details-centent {
        .title {
          font-size: 18px;
          font-family: Arial;
          font-weight: bold;
          color: #333333;
        }
        .des_title {
          margin-top: 50px;
        }
        .des_content {
          font-size: 18px;
          font-family: LibreFranklin;
          font-weight: 400;
          color: #666666;
          line-height: 24px;
          text-align: justify;
          text-justify: inter-ideograph;
        }
        .small-title {
          text-indent: 36px;
          position: relative;
          font-size: 18px;
          font-family: Arial;
          font-weight: 400;
          color: #666666;
        }
        .small-title::before {
          position: absolute;
          content: ' ';
          width: 8px;
          height: 8px;
          background-color: #000;
          border-radius: 50%;
          left: 16px;
          top: 10px;
          line-height: 18px;
        }
      }
      .centent-pdf {
        width: 100%;
        height: 400px;
        overflow-y: auto;
      }
    }
  }
  .footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin: 40px 0;
    .next {
      margin-left: 20px;
    }
  }
}
</style>
