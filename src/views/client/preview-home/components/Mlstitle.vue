<template>
  <div class="detail_info-Mlstitle">
    <p>
      Listed by <span> {{ homeDetailsData.listAgentFullName }} </span> {{ homeDetailsData.listAgentStateLicense }}, {{ homeDetailsData.listOfficeName }}.
      {{ homeDetailsData.originatingSystemName }} #{{ homeDetailsData.listingId }}, APN: #{{ homeDetailsData.parcelNumber }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    homeDetailsData: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    homeDetailsData(newVal, oldVal) {
      this.homeDetail = newVal;
    }
  },
  data() {
    return {
      homeDetail: {}
    };
  }
};
</script>

<style lang="less" scoped>
.detail_info-Mlstitle {
  width: 100%;
  font-size: 12px;
  font-family: LibreFranklin-Regular, LibreFranklin;
  font-weight: 400;
  color: #666666;
  line-height: 15px;
  padding-top: 43px;
  p {
    margin: 0;
  }
}
</style>
