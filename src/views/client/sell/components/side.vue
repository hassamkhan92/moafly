<template>
  <div class="sell-side-container">
    <div class="sell-side-title">
      Commision-free Listing
    </div>
    <el-menu :default-openeds="['billings']" class="sell-side-menu" active-text-color="#353F62" @select="menuSelect" :default-active="$route.path" :router="true">
      <el-menu-item v-for="item in menuList" :key="item.index" :index="item.path">{{ item.title }} </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  components: {},
  props: {
    menuList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      activeRouter: this.$route.path
    };
  },
  computed: {
    ...mapGetters(['hoseId'])
  },
  created() {},
  mounted() {},
  methods: {
    menuSelect(path) {
      if (!this.hoseId) {
        return this.$message.warn('请先添加地址');
      }
      this.$router.push(path);
      let index = null;
      this.menuList.map(item => {
        if (item.path == path) {
          index = item.id;
        }
      });
      this.$emit('menuSelect', index);
    }
  }
};
</script>
<style scoped lang="less">
.sell-side-container {
  display: flex;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .sell-side-title {
    width: 100%;
    padding: 23px 0;
    background: rgba(255, 255, 255, 0.8);
    .MoaflyText(700, 20px, 24px, #0f1b43);
    text-align: center;
  }
  /deep/.sell-side-menu {
    width: calc(100% - 48px);
    padding: 40px 24px;
    background: none;
    display: flex;
    flex-wrap: wrap;
    .el-menu-item {
      width: 100%;
      @media (min-width: 768px) and (max-width: 991.99px) {
        padding: 0 15px;
        width: calc(33.333% - 30px);
      }
      height: 54px;
      margin-bottom: 5px;
      &:hover {
        background: rgba(255, 255, 255, 0.6);
        border-radius: 4px;
        &::before {
          content: ' ';
          position: absolute;
          width: 6px;
          height: 100%;
          background: #dc5674;
          border-radius: 3px;
          left: 0;
          top: 0;
        }
      }
      &.is-active {
        background: rgba(255, 255, 255, 0.6);
        border-radius: 4px;
      }
      .MoaflyText(400, 18px, 54px, #0f1b43);
    }

    .el-menu-item.is-active {
      position: relative;
      color: #dc5674;
      &::before {
        content: ' ';
        position: absolute;
        width: 6px;
        height: 100%;
        background: #dc5674;
        border-radius: 3px;
        left: 0;
        top: 0;
      }
    }
  }
}
</style>
