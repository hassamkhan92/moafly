<template>
  <div class="terms-container">
    <div class="terms-content">
      <el-row class="terms-title" type="flex" justify="center">
        <el-col :span="20" class="title">
          Additional Consumer Terms of Service for Moafly Offers
        </el-col>
      </el-row>
      <el-row class="time-con" type="flex" justify="center">
        <el-col :span="12" class="time"> Updated Otcober 2020</el-col>
      </el-row>
      <el-row type="flex" class="first-con">
        <el-col :span="24">
          The following Additional Consumer Terms of Service for the “Moafly Offers” program, together with the Moafly Terms of Use, Privacy Policy and other policies and agreements referenced
          therein, govern your access and use of Moafly Offers as a consumer. Moafly Offers is operated by Moafly Homes, Inc. and promoted by Moafly, Inc. (collectively “Moafly”). By using Moafly
          Offers, you acknowledge and agree that:
        </el-col>
      </el-row>
      <div class="center-con">
        <el-row type="flex" justify="">
          <el-col :span="1">
            <i class="iconfont icon-fangwu"></i>
          </el-col>
          <el-col :span="20">
            Moafly Homes, Inc. and Moafly, Inc. are licensed real estate brokerages. For a complete list of real estate licenses visit Moafly.com/licenses. Neither Moafly Homes, Moafly, or their
            affiliates or employees, represent you or any consumer or provide real estate agency services on behalf of you or other consumers in relation to the Moafly Offers program.
          </el-col>
        </el-row>
        <el-row type="flex" justify="">
          <el-col :span="1">
            <i class="iconfont icon-fangwu"></i>
          </el-col>
          <el-col :span="20">
            Eligibility for the Moafly Offers program and any price delivered or displayed as an “initial offer” or “market value” are subject to change if property information is found to be
            incomplete or inaccurate. The amount of the “initial offer” and any Moafly projected “market value” is based on recent sales in the area in which the subject property is located and the
            home’s list-ready condition. A home evaluation will be performed as part of the Moafly Offers process to verify home condition, statistics, and any possible repairs.
          </el-col>
        </el-row>
        <el-row type="flex" justify="">
          <el-col :span="1">
            <i class="iconfont icon-fangwu"></i>
          </el-col>
          <el-col :span="20">
            You are responsible for complying with any third-party agreements relating to the sale of your home, including any agent listing agreements you may have entered into prior to participating
            in Moafly Offers.
          </el-col>
        </el-row>
        <el-row type="flex" justify="">
          <el-col :span="1">
            <i class="iconfont icon-fangwu"></i>
          </el-col>
          <el-col :span="20">
            Moafly does not guarantee that it will make a final offer to purchase your home or that any offer made will provide the best terms available or will result in the greatest net proceeds to
            you. Moafly reserves the right to perform, or have performed on its behalf, a portion of or none of any identified repairs prior to reselling the home.
          </el-col>
        </el-row>
        <el-row type="flex" justify="">
          <el-col :span="1">
            <i class="iconfont icon-fangwu"></i>
          </el-col>
          <el-col :span="20">
            Moafly shall not be liable for any damages or costs of any type arising out of or in any way connected with your use of Moafly Offers, including any damages related to the evaluation or
            sale of your home.
          </el-col>
        </el-row>
        <el-row type="flex" justify="">
          <el-col :span="1">
            <i class="iconfont icon-fangwu"></i>
          </el-col>
          <el-col :span="20">
            To accept Moafly’s final offer, you will be required to execute a purchase and sale agreement (and other related documentation) that outlines additional terms and conditions related to the
            sale of your home.
          </el-col>
        </el-row>
        <el-row type="flex" justify="">
          <el-col :span="1">
            <i class="iconfont icon-fangwu"></i>
          </el-col>
          <el-col :span="20">
            Moafly assumes no responsibility for any result or consequence related directly or indirectly to any action or inaction that you take based on the services offered through Moafly Offers.
          </el-col>
        </el-row>
        <el-row type="flex" justify="">
          <el-col :span="1">
            <i class="iconfont icon-fangwu"></i>
          </el-col>
          <el-col :span="20">
            IT IS NOT THE INTENT OF Moafly OR ITS AFFILIATES TO SOLICIT THE OFFERING OF ANY LICENSED REAL ESTATE AGENT.
          </el-col>
        </el-row>
      </div>
    </div>
    <w-footer class="w-footer"></w-footer>
  </div>
</template>

<script>
import wFooter from '@/components/footer';
export default {
  components: { wFooter },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped lang="less">
.terms-container {
  width: 100%;
  height: 100%;
  .flex();
  flex-direction: column;
  overflow: auto;
  .terms-content {
    width: 60%;
    height: 100%;
    padding-top: 480px;
    color: #fff;
    .el-row {
      width: 100%;
      margin-top: 10px;
      .el-col {
        line-height: 30px;
      }
    }
    .terms-title {
      .title {
        font-size: 24px;
        text-align: center;
      }
    }
    .time-con {
      .time {
        text-align: right;
      }
    }
    .first-con {
    }
    .center-con {
      width: 100%;
      margin: 0 auto;
      padding-bottom: 40px;
    }
  }
}
</style>
