<!--
 * @Author: zulezhe
 * @Date: 2022-08-01 21:22:42
 * @LastEditors: zulezhe
 * @LastEditTime: 2023-02-16 21:50:45
 * @Path: https://gitee.com/zulezhe/
 * @Description:
-->
<template>
  <div class="agent-card-container">
    <div class="agent-info-wrap hvr-grow">
      <div class="top-container">
        <img :src="item.agentHeaderImg" />
        <Tag v-if="item.comingSoon === 0" class="tag" width="143px" height="28px" :text="agentStatusByText(0)"></Tag>
        <Tag v-if="item.comingSoon === 1" class="tag" width="143px" height="28px" :text="agentStatusByText(1)"></Tag>
      </div>
      <div class="name">{{ item.agentName }}</div>
      <div class="salary">{{ item.agentPrice }} USD / hour</div>
      <div class="address">{{ item.agentLocation }}</div>
      <i-button
        type="primary"
        padding-top="12px"
        padding-left="36px"
        @click="
          () => {
            $router.push(`/agent-detail?id=${item.agentId}`);
          }
        "
      >
        Read More</i-button
      >
    </div>
  </div>
</template>

<script>
import IButton from './button.vue';
import Tag from './tag.vue';
import { agentStatusByText } from '@/shared/home/index.js';
export default {
  components: { IButton, Tag },
  props: ['item'],
  methods: {
    agentStatusByText: agentStatusByText
  }
};
</script>

<style lang="less" scoped>
.agent-card-container {
  padding-left: 15px;
  padding-right: 15px;
  flex: 0 0 calc(100% - 30px);
  margin-bottom: 30px;
  @media (min-width: 768px) {
    flex: 0 0 calc(50% - 30px);
  }
  @media (min-width: 1200px) {
    flex: 0 0 calc(25% - 30px);
  }
  .agent-info-wrap {
    padding: 10px;
    line-height: 33px;
    text-align: center;
    position: relative;
    background: #f3f9ff;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15);
    display: block;
    .top-container {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      position: relative;

      img {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
      }
      .tag {
        position: absolute;
        background: rgba(15, 27, 67, 0.6) !important;
        left: 15px;
        top: 20px;
        z-index: 99;
        .flex();
      }
    }

    .name {
      margin-top: 22px;
      text-transform: capitalize;
      text-align: center;
      font-size: 22px;
      font-weight: 600;
    }

    .salary,
    .address {
      font-size: 18px;
      text-transform: capitalize;
      text-align: center;
    }

    button {
      margin-top: 20px;
    }
  }
}
</style>
