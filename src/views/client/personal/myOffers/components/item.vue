<template>
  <div class="content-item" :class="layoutType">
    <div class="img-container">
      <img :src="item.imgUrl" alt="" />
      <Tag class="tag" text="Submitted 5/17/2022"></Tag>
    </div>
    <div class="desc-container">
      <div class="desc-price">${{ item.listPrice }} &nbsp;</div>
      <div class="desc-address">{{ item.bedRoomsTotal }} beds {{ item.bathRoomsTotal }} baths {{ item.livingArea }} sq.ft.</div>
      <div class="address">{{ item.houseAddress }}</div>
      <div class="desc-button">
        <template> <span @click="handleViewOffer(item.offerId)">VIEW PROPOSALS >>></span></template>
      </div>
    </div>
  </div>
</template>
<script>
import Tag from './tag.vue';
export default {
  props: {
    layoutType: {
      type: String,
      default: 'image'
    },
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: { Tag },
  data() {
    return {
      loading: true,
      isCollect: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  methods: {
    handleViewOffer(offerId) {
      this.$router.push('/offer/detail/' + offerId);
    }
  }
};
</script>
<style scoped lang="less">
.content-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 266px;
  height: 290px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid rgba(15, 27, 67, 0.2);
  cursor: pointer;
  display: inline-block;
  margin: 0 20px 20px 0;
  .img-container {
    width: 266px;
    height: 160px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border-radius: 8px 8px 0 0;
    }
    .tag {
      position: absolute;
      left: 15px;
      top: 12px;
    }
  }
  .desc-container {
    width: 100%;
    height: 129px;
    padding: 16px;
    box-sizing: border-box;
    .desc-price {
      font-family: 'Libre Franklin';
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      color: #0f1b43;
    }
    .desc-address {
      margin-top: 6px;
      display: flex;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      display: flex;
      align-items: center;
      color: #373f5f;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .address {
      font-family: 'Libre Franklin';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      margin-top: 6px;
      color: rgba(15, 27, 67, 0.6);
    }
    .desc-button {
      width: 100%;
      margin-top: 12px;
      font-family: 'Libre Franklin';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #dc5674;
    }
  }
}
</style>
