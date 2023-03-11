<template>
  <div class="summary-container">
    <div class="house-info">
      <div class="left">
        <img class="home-photo" :src="data.imgUrl" />
        <div class="info-col">
          <div class="row-content">{{ data.unparsedAddress || data.houseAddress || '-' }}</div>
          <div class="row-header">{{ `${data.city || '-'}, ${data.stateOrProvince || '-'} ${data.postalCode || '-'}` }}</div>
        </div>
        <div class="info-col">
          <div class="row-content">${{ data.listPrice ? Number(data.listPrice).toLocaleString() : '-' }}</div>
          <div class="row-header">Price</div>
        </div>
      </div>

      <div class="right">
        <div class="info-col">
          <div class="row-content">{{ data.bedRoomsTotal || '-' }}</div>
          <div class="row-header">Beds</div>
        </div>
        <div class="info-col">
          <div class="row-content">{{ data.bathRoomsTotal || '-' }}</div>
          <div class="row-header">Baths</div>
        </div>
        <div class="info-col">
          <div class="row-content">{{ data.livingArea || '-' }}</div>
          <div class="row-header">Sq. Ft.</div>
        </div>
      </div>
    </div>

    <el-row class="offer-info" :gutter="20">
      <el-col :sm="24" :md="12">
        <h6>YOUR OFFER STATUS</h6>
        <div class="item">
          <span class="item-key">Status</span>
          <span class="item-value">
            <template v-if="data.offerState === 0">Submitted</template>
            <template v-else-if="data.offerState === 1">Accepted</template>
            <template v-else-if="data.offerState === 2">Refused</template>
            <template v-else>-</template>
          </span>
        </div>
        <div class="item">
          <span class="item-key">Created On</span>
          <span class="item-value">{{ createTime }}</span>
        </div>
        <h6>YOUR OFFER</h6>
        <div class="item">
          <span class="item-key">MLS Status</span>
          <span class="item-value">{{ data.mlsStatus || '-' }}</span>
        </div>
        <div class="item">
          <span class="item-key">MLS#</span>
          <span class="item-value">{{ data.listingId || '-' }}</span>
        </div>
        <div class="item">
          <span class="item-key">Your Price</span>
          <span class="item-value">{{ data.offerPrice || '-' }}</span>
        </div>
        <div class="item">
          <span class="item-key">Estimated Redfin Refund</span>
          <span class="item-value">{{ refund }}*</span>
        </div>
      </el-col>
      <el-col :sm="24" :md="12">
        <h6>BASIC DETAILS</h6>
        <div class="item">
          <span class="item-key">Buyer Name</span>
          <span class="item-value">{{ data.fullName }} {{ data.lastName }}</span>
        </div>
        <div class="item">
          <span class="item-key">Email</span>
          <span class="item-value">{{ data.email }}</span>
        </div>
        <div class="item">
          <span class="item-key">Phone</span>
          <span class="item-value">{{ data.phoneNum }}</span>
        </div>
        <h6>FINANCING</h6>
        <div class="item">
          <span class="item-key">Loan Type</span>
          <span class="item-value">
            <template v-if="data.payType === 0">Loan</template>
            <template v-else-if="data.payType === 1">Cash</template>
            <template v-else>-</template>
          </span>
        </div>
        <div class="item">
          <span class="item-key">Down Payment</span>
          <span class="item-value">{{ data.downPayment || '-' }}</span>
        </div>
        <h6>ADDITIONAL NOTES</h6>
        <p class="extra">You're entering a secure area of Redfin. To ensure the safety of your account information, we ask that you sign in one more time.</p>
      </el-col>
    </el-row>
    <p class="hint">
      *The estimated refund amount depends on a variety of factors including list price, listing type (short sale or not), location, etc. For a more thorough explanation of how your savings are
      calculated. Please see <a href="">how the refund works.</a>
    </p>
  </div>
</template>

<script>
export default {
  props: ['data'],
  computed: {
    refund() {
      const res = Number((this.data.previousListPrice * this.data.buyerAgencyCompensation) / 100);
      if (isNaN(res)) return '-';
      else return '$' + res.toLocaleString();
    },
    createTime() {
      const d = new Date(this.data.createTime);
      return d.toLocaleString('en-US');
    }
  }
};
</script>

<style lang="less" scoped>
@import './index';
</style>
