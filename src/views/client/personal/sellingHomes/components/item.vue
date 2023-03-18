<template>
  <div class="content-item" :class="layoutType">
    <div class="img-container">
      <img :src="getImgUrl(item)" alt="" />
      <Tag class="tag" :text="clentHomeStatusByText(item.houseDataState)"></Tag>
      <template v-if="item.houseDataState == 0">
        <i class="iconfont icon-shanchu" @click="handleRemove(item)"></i>
      </template>
      <template v-else>
        <i class="iconfont icon-bianji1" @click="handleQuestion(item)"></i>
      </template>
    </div>
    <div class="desc-container">
      <div class="desc-price">${{ getHousePrice(item) }} &nbsp;</div>
      <div class="desc-address">
        {{ item.houseAddress }}
      </div>
      <div class="desc-button">
        <!-- 房屋状态 0编辑未完成 1编辑已完成 2在售 3已下架 4合同已上传 -->
        <template v-if="item.houseDataState == 0"> <span @click="handleGoToSell(item)">Keep Editing >>></span></template>
        <template v-else-if="item.houseDataState == 1"> <span @click="handleSignContract(item)">Sign Contract >>></span></template>
        <template v-else-if="item.houseDataState == 2"> <span @click="handleGoToDeatail(item)">Views Details >>></span> </template>
        <template v-else-if="item.houseDataState == 3"> <span @click="handleGoToDeatail(item)">Views Details >>></span></template>
        <template v-else-if="item.houseDataState == 4"> <span @click="handleGoToDeatail(item)">Views Details >>></span></template>
      </div>
    </div>
  </div>
</template>
<script>
import Tag from './tag.vue';
import { clentHomeStatusByText } from '@/shared/home/index.js';
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
    clentHomeStatusByText: clentHomeStatusByText,
    handleClick(item) {
      this.$emit('handleClick', item);
    },
    handleRemove(item) {
      this.$emit('handleRemove', item);
    },
    handleQuestion(item) {
      this.$emit('handleQuestion', item);
    },
    getImgUrl(item) {
      let url = require('@/assets/images/person/my-home/home1.png');
      if (item) {
        if (item.imgList && Array.isArray(item.imgList)) {
          let obj = item.imgList[0];
          if (obj) {
            url = obj.imgRul;
          }
        }
      }
      return url;
    },
    getHousePrice(item) {
      let housePrice = 0;
      if (item && item.housePrice) {
        housePrice = item.housePrice.toLocaleString();
      }
      return housePrice;
    },
    handleGoToSell(item) {
      this.$store.commit('SET_HOME_ID', item.houseId);
      this.$router.push('/sell');
    },
    /**
     * 查看详情
     */
    handleGoToDeatail(item) {
      console.log('看详情===>', item);
      this.$router.push('/preview-home?houseId=' + item.houseId);
    },
    /**
     * 签署合同
     * @return {*}
     * @author: zulezhe
     */
    handleSignContract(item) {
      this.$emit('handleSignContract', item);
    }
  }
};
</script>
<style scoped lang="less">
.content-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0 0 100%;
  @media (min-width: 768px) {
    flex: 0 0 calc(50% - 17px);
  }
  @media (min-width: 992px) {
    flex: 0 0 calc(33.3333% - 22px);
  }
  min-height: 271px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid rgba(15, 27, 67, 0.2);
  cursor: pointer;
  //   display: inline-block;
  .img-container {
    width: 100%;
    height: 160px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border-radius: 8px 8px 0 0;
      object-fit: cover;
      object-position: center;
    }
    .tag {
      position: absolute;
      left: 15px;
      top: 12px;
    }
    .iconfont {
      position: absolute;
      right: 15px;
      top: 12px;
      color: #fff;
    }
  }
  .desc-container {
    width: 100%;
    height: 111px;
    padding: 16px;
    box-sizing: border-box;
    .desc-price {
      .MoaflyText(700, 18px, 22px, #0f1b43);
    }
    .desc-address {
      margin-top: 8px;
      display: flex;
      .MoaflyText(400, 16px, 19px, #373f5f);
      display: flex;
      align-items: center;
    }
    .desc-button {
      width: 100%;
      margin-top: 12px;
      .MoaflyText(400, 14px, 17px, #dc5674);
    }
  }
}
</style>
