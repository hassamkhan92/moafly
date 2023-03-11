<template>
  <div class="sell-main">
    <div class="sell-content">
      <div class="left-side">
        <Side :menuList="sellMenuList"></Side>
      </div>
      <div class="right-content">
        <img class="sell-icon" :src="require('@/assets/images/sell/sell-icon.png')" alt="" />
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Side from './components/side.vue';
import { getHomeInfo } from '@/util/index';
import { mapGetters } from 'vuex';
export default {
  components: { Side },
  data() {
    return {
      rating: 4,
      step: 0,
      homeInfo: {},
      sellMenuList1: [
        {
          id: 1,
          path: '/sell/Address',
          iscomplete: true,
          title: 'Address'
        }
      ]
    };
  },
  created() {},
  watch: {
    $route: 'routerChange'
  },
  computed: {
    ...mapGetters(['sellMenuList', 'SellInStatus', 'hoseId'])
  },
  mounted() {
    // if (!this.$store.getters.SellInStatus) {
    //   let sellMenuList = this.$store.getters.sellMenuList;
    //   let newNoSteps = sellMenuList.find(item => item.iscomplete == false);
    //   if (newNoSteps) {
    //     this.$router.push(newNoSteps.path);
    //   }
    // }
    this.routerChange();
  },

  methods: {
    // 每次刷新和跳转路由都会执行的事件
    routerChange() {
      //   let hoseId = 130;
      let hoseId = this.hoseId;
      if (hoseId) {
        getHomeInfo(hoseId);
      } else {
        this.$store.commit('SET_HOME_INFO', {});
        this.$store.commit('SET_SELL_MENULIST', this.sellMenuList1);
        this.$router.push('/sell/Address');
      }
    }
  }
};
</script>
<style scoped lang="less">
.sell-main {
  width: 100%;
  height: 100%;
  padding-top: 120px;
  padding-bottom: 40px;
  box-sizing: border-box;
  background: #dcdcdc;
  overflow-y: auto;

  .sell-content {
    margin: 0 auto;
    max-width: 1200px;
    width: calc(100% - 30px);
    padding: 0 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .left-side {
      width: 100%;
      @media (min-width: 992px) {
        width: 20%;
      }
      height: 100%;
      border: 1px solid #ffffff;
      border-radius: 8px;
      background: url('~@/assets/images/sell/sell-side.png') no-repeat -6px;
    }
    .right-content {
      position: relative;
      width: calc(100% - 122px);
      @media (min-width: 992px) {
        width: calc(80% - 122px);
      }
      height: 100%;
      border-radius: 8px;
      background: #ffffff;
      padding: 60px;
      .sell-icon {
        position: absolute;
        left: 60px;
        top: 40px;
      }
    }
  }
}
</style>
