<template>
  <div class="view_proposal2_main">
    <div v-for="i in 2" :key="i" class="view_proposal2_user_box">
      <img class="view_proposal2_user_img" :src="agentImage1" alt="" />
      <div class="view_proposal2_user_details">
        <div class="view_proposal2_user_name">
          <p class="view_proposal2_user_name_text">Laura Addario</p>
          <div class="view_proposal2_user_btns_box">
            <!-- <el-button size="mini" round>View Contract<i class="el-icon-arrow-right"></i></el-button> -->
            <WButton class="empty-button" height="30px" text="View Contract" width="160px"></WButton>
          </div>
        </div>
        <p class="view_proposal2_user_adress">
          <i class="el-icon-location-outline icon_left"></i>
          <span class="view_proposal2_user_adress_text">Los Angeles, California</span>
        </p>
        <div class="view_proposal2_user_data_box">
          <p class="view_proposal2_user_price data_right">
            <i class="el-icon-price-tag icon_left"></i>
            <span class="view_proposal2_user_price_text">$14.00/ hour</span>
          </p>
          <p class="view_proposal2_user_rate data_right">
            <span class="view_proposal2_user_rate_text icon_left">$100k+ earned </span>
          </p>
          <p class="view_proposal2_user_rate rate_box data_right">
            <span class="view_proposal2_user_rate_text icon_left">{{ value }}</span
            ><el-rate v-model="value" disabled text-color="#ff9900"> </el-rate>
          </p>
          <p class="view_proposal2_user_rate">
            <span class="view_proposal2_user_rate_text icon_left">TOP RATED </span>
          </p>
        </div>

        <p class="view_proposal2_user_title">
          Hello I’m Laura, a mostly agent! I’m expert in housing touring, offer making and price negotiation. Look forward to working with you!I assure to teach each step in the home buying process.
          My clients are my number one focus, and I am available when…
        </p>
        <div class="view_proposal2_user_labels">
          <div v-for="(item, itemIdx) in labelsData" :key="itemIdx" class="labels_item">{{ item }}</div>
        </div>
      </div>
    </div>
    <!-- <w-pagination class="pagination" :total="totalNum" :page="params.pageNum" :limit="5" layout="prev,pager,next" @update:page="handleCurrentUpdate" /> -->
  </div>
</template>

<script>
import agentImage1 from '@/assets/images/agent/avatar.png';
// import WPagination from '@/components/Pagination';
import WButton from '@/components/Button/index.vue';
export default {
  components: {
    WButton
    // WPagination
  },
  data() {
    return {
      agentImage1: agentImage1,
      totalNum: 5,
      params: {
        pageNum: 1
      },
      value: 3.7,
      labelsData: ['Graphic Design', 'English', 'Content Writing', 'HTML', 'Writing', 'Web Design', 'Content Writing', 'Writing']
    };
  },
  methods: {
    handleCurrentUpdate(val) {
      console.log('', val);
    }
  }
};
</script>
<style lang="less" scoped>
p {
  margin-bottom: 12px;
}
.view_proposal2_main {
  margin-top: 32px;
  width: 100%;
  //   height: 1491px;
  border: 1px solid #afafaf;
  padding-bottom: 24px;
  .pagination {
    margin-top: 80px;
  }
  .view_proposal2_user_box {
    width: 100%;
    height: 267px;
    border-bottom: 1px solid #afafaf;
    padding: 32px 24px;
    .flex();
    justify-content: space-between;
    align-items: flex-start;
    .view_proposal2_user_img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .view_proposal2_user_details {
      width: calc(100% - 132px);
      .icon_left {
        margin-right: 8px;
      }
      .view_proposal2_user_name {
        width: 100%;
        .flex();
        justify-content: space-between;
        .view_proposal2_user_name_text {
          font-size: 24px;
          font-family: LibreFranklin-SemiBold, LibreFranklin;
          font-weight: 600;
          color: #333333;
          line-height: 29px;
        }
        .view_proposal2_user_btns_box {
          .el-icon-picture-outline-round {
            font-size: 30px;
            transform: translateY(5px);
          }
        }
      }
      .view_proposal2_user_data_box {
        .flex();
        justify-content: flex-start;
        .data_right {
          margin-right: 120px;
        }
        .rate_box {
          width: 200px;
        }
        .view_proposal2_user_price {
          .view_proposal2_user_price_text {
            font-size: 14px;
            font-family: LibreFranklin-SemiBold, LibreFranklin;
            font-weight: 600;
            color: #333333;
            line-height: 17px;
          }
        }
        .view_proposal2_user_rate {
          .view_proposal2_user_rate_text {
            float: left;
            font-size: 14px;
            font-family: LibreFranklin-Regular, LibreFranklin;
            font-weight: 400;
            color: #333333;
            line-height: 17px;
          }
        }
      }

      .view_proposal2_user_adress {
        .view_proposal2_user_adress_text {
          font-size: 14px;
          font-family: LibreFranklin-Regular, LibreFranklin;
          font-weight: 400;
          color: #333333;
          line-height: 17px;
        }
      }
      .view_proposal2_user_title {
        font-size: 14px;
        font-family: LibreFranklin-Regular, LibreFranklin;
        font-weight: 400;
        color: #333333;
        line-height: 17px;
      }
      .view_proposal2_user_labels {
        width: 100%;
        .flex();
        justify-content: space-between;
        .labels_item {
          height: 23px;
          background: #f2f2f2;
          border-radius: 29px;
          font-size: 12px;
          font-family: LibreFranklin-Regular, LibreFranklin;
          font-weight: 400;
          color: #000000;
          line-height: 15px;
          padding: 4px 12px;
        }
      }
    }
  }
}
</style>
