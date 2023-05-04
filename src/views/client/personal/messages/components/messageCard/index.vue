<template>
  <div>
    <div class="message-card">
      <div class="card" @click="onCardClick">
        <div class="property-info">
          <div class="img-area">
            <img src="@/assets/images/adress.png" />
          </div>
          <div class="info">
            <p class="address">1189 W 36th st</p>
            <p class="address-two">Los Angeles, California</p>
          </div>
        </div>
        <div class="message">
          <p>Hello ,I want to see the house type...</p>
        </div>
        <div class="meta">
          <div v-if="isCollapsed">
            <p class="date">2023-02-11 12:30</p>
            <p class="email">wanghuan123@qq.com</p>
          </div>
          <div v-else class="reply-wrap">
            <WButton class="reply-button" text="Reply" @handleClick="onClickReply"></WButton>
          </div>
        </div>
      </div>
      <div :class="['thread', isCollapsed ? 'collapsed' : '']">
        <div class="message">
          <div class="person-info">
            <div class="img-area">
              <img src="@/assets/images/adress.png" />
            </div>
            <div class="info">
              <p class="name">KrisWusho(206)</p>
              <p class="message-time">2 minutes ago</p>
            </div>
          </div>
          <div class="message">
            <p>Hello ,I want to see the house type,Hello ,I want to see the house type</p>
          </div>
        </div>
      </div>
    </div>
    <replyDialog :showModal="showMessage" @handlerClose="showMessage = false" :homeId="33" />
  </div>
</template>

<script>
import WButton from '@/components/Button';
import replyDialog from '../replyMessage/index.vue';

export default {
  components: { WButton, replyDialog },
  data() {
    return {
      showMessage: false,
      isCollapsed: true
    };
  },
  methods: {
    onCardClick() {
      this.isCollapsed = false;
    },
    onClickReply() {
      this.showMessage = true;
    }
  }
};
</script>

<style lang="less" scoped>
@import './index';
</style>
