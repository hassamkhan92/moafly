<template>
  <div class="person-side-container">
    <el-menu :default-openeds="['billings']" class="person-side-menu" active-text-color="#353F62" @select="menuSelect" :default-active="$route.path" :router="true">
      <template v-for="item in menuList">
        <el-submenu v-if="item.children" :key="item.index" :index="item.index">
          <template slot="title">{{ item.title }}</template>
          <el-menu-item v-for="el in item.children" :key="el.index" :index="el.index">{{ el.title }}</el-menu-item>
        </el-submenu>
        <el-menu-item v-else :key="item.index" :index="item.index">{{ item.title }} </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    menuList: {
      type: Array,
      default: () => {
        return [
          {
            index: '/person/Finance',
            title: 'Finance'
          },
          {
            index: '/person/Tasks',
            title: 'Tasks'
          },
          {
            index: '/person/Hires',
            title: 'Hires'
          },
          // {
          //   index: '/person/my-offers',
          //   title: 'Offers'
          // },
          {
            index: '/person/Contracts',
            title: 'Contracts'
          },
          {
            index: '/person/selling-homes',
            title: 'Selling  Homes'
          }
        ];
      }
    }
  },
  data() {
    return {
      activeRouter: this.$route.path,
      userInfo: this.$store.getters.userInfo
    };
  },
  computed: {},
  created() {},
  mounted() {
    console.log(this.$route.path);
  },
  methods: {
    menuSelect(item) {
      console.log(item);
      this.$router.push(item);
    },
    getPath() {
      console.log(this.$route.path);
      this.activeRouter = this.$route.path;
    }
  }
};
</script>
<style scoped lang="less">
.person-side-container {
  width: 100%;
  border-bottom: 1px solid rgba(15, 27, 67, 0.1);
  @media (min-width: 992px) {
    width: 20%;
    border-right: 1px solid rgba(15, 27, 67, 0.1);
  }
  .person-side-title {
    max-width: 190px;
    font-size: 24px;
    font-weight: bold;
    color: #333333;
    margin-top: 92px;
    text-align: center;
  }
  /deep/.person-side-menu {
    width: calc(100% - 30px);
    margin: 15px;
    border-right: 0px;
    @media (max-width: 991.99px) {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
    }
    .el-menu-item,
    .el-submenu__title {
      height: 47px;
      line-height: 47px;
      font-weight: 500;
      font-size: 18px;
      .el-submenu__icon-arrow.el-icon-arrow-down {
        display: none;
      }
    }
    .el-menu-item.is-active {
      color: #dc5674 !important;
    }
  }
}
</style>
