<!--
 * @Author: zulezhe
 * @Date: 2021-11-17 23:06:36
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-05-09 18:36:06
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="person-emptty-container">
    <img :src="require('@/assets/images/logo2.png')" alt="" />
    <span class="empty-title">{{ title }}</span>
    <WButton v-if="btnShow" class="empty-button" :text="text" width="300px" @handleClick="handleClick"></WButton>
  </div>
</template>
<script>
import WButton from '@/components/Button/index.vue';
export default {
  components: { WButton },
  props: {
    title: {
      type: String,
      default: "You don't have any agent"
    },
    text: {
      type: String,
      default: 'Find Your Agent Now'
    },
    to: {
      type: String,
      default: '/agent'
    },
    btnShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleClick() {
      this.$router.push(this.to);
    }
  }
};
</script>
<style scoped lang="less">
.person-emptty-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-70%);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .empty-title {
    margin-top: 20px;
  }
  .empty-button {
    margin-top: 24px;
  }
}
</style>
