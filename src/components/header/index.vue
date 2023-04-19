<template>
  <div v-cloak class="header-container">
    <div class="header-center">
      <div class="header-logo header-item" @click="handleGoHome">
        <img class="img" :src="logo" alt="" />
      </div>
      <div :class="['header-nav-container', active ? 'active' : '']">
        <div class="header-buy header-item" @click="handleClose">
          <router-link class="link" to="/search">Buy</router-link>
        </div>
        <div class="header-sell header-item" @click="handleClose">
          <router-link class="link" to="/guide">Sell</router-link>
        </div>
        <div class="header-sell header-item" @click="handleClose">
          <router-link class="link" to="/estimates">Estimates</router-link>
        </div>
        <div class="header-agents header-item" @click="handleClose">
          <router-link class="link" to="/agent-guide">Agents</router-link>
        </div>
        <div class="header-contact header-item" @click="handleClose">
          <router-link class="link" to="/contact">Contact Us</router-link>
        </div>
        <template v-if="!token">
          <div class="header-login header-item" @click="handleClose">
            <router-link class="link" to="/login">Log In</router-link>
          </div>
          <div class="header-signup header-item" v-show="!token" @click="handleClose">
            <router-link class="link" to="/signup">Sign Up</router-link>
          </div>
        </template>
        <div v-else>
          <el-dropdown trigger="click">
            <!-- <img class="averate-img" v-if="avatar" :src="avatar" alt="" /> -->
            <el-avatar :src="avatar" icon="el-icon-user-solid" style="background:#c0c4cc47"></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="goDashboard">Dashboard</el-dropdown-item>
              <el-dropdown-item @click.native="goWallet">Wallet</el-dropdown-item>
              <el-dropdown-item @click.native="goPersonal">Account</el-dropdown-item>
              <el-dropdown-item @click.native="doLogOut">Log out</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div :class="['hamburger', active ? 'is-active' : '']" id="hamburger-1" @click="handleOpen">
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </div>
    </div>
  </div>
</template>

<script>
// import { getToken } from '@/util/auth';

export default {
  components: {},
  props: {},
  data() {
    return {
      avatar: this.$store.getters.userInfo?.headImg,
      logo: require('@/assets/images/logo.png'),
      loginStatus: false,
      active: false,
      scroll: '0',
      address: '',
      searchIsShow: false,
      isLogin: false
    };
  },
  computed: {
    activeUrl() {
      return this.$route.path;
    },
    token() {
      return this.$store.getters.token;
    }
  },
  mounted() {
    this.changeHeader(this.$route);
  },
  watch: {
    $route(to, from) {
      this.avatar = this.$store.getters.userInfo?.headImg;
      this.changeHeader(to);
    }
  },
  methods: {
    /**
     * 移动端菜单折叠打开
     */
    handleOpen() {
      this.active = !this.active;
    },
    handleClose() {
      this.active = false;
    },
    // 退出登陆
    doLogOut() {
      this.$store.dispatch('doRemove');
      this.$router.push('/login');
    },
    /**
     * 去个人中心
     */
    goPersonal() {
      this.$router.push('/my-account');
    },
    //去钱包
    goWallet() {
      this.$router.push('/wallet');
    },
    goDashboard() {
      this.$router.push('/person');
    },
    handleGoHome() {
      this.$router.push('/');
      this.handleClose();
    },
    changeHeader(to) {
      if (to.name == 'Home') {
        this.searchIsShow = false;
        this.isLogin = false;
        this.logo = require('@/assets/images/logoColor.png');
      } else {
        this.searchIsShow = true;
        this.isLogin = true;
        this.logo = require('@/assets/images/logoColor.png');
      }
    }
  }
};
</script>
<style scoped lang="less">
@import '~@/assets/styles/hamburger.less';
@import url('./index.less');
.averate-img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
}
</style>
