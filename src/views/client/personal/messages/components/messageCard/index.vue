<template>
  <div>
    <div class="message-card" :class="isUnread && data.unReadMsg > 0">
      <div class="card" @click="onCardClick">
        <div class="property-info">
          <div class="img-area">
            <img :src="data.houseImgUrl" />
          </div>
          <div class="info">
            <p class="address">{{ data.houseAddress }}</p>
            <p class="address-two">{{ data.houseCity }}, {{ data.houseState }}</p>
          </div>
        </div>
        <div class="message">
          <p>{{ data.lastMessage }}</p>
        </div>
        <div class="meta">
          <div v-if="isCollapsed">
            <p class="date">{{ data.lastMessgeTime }}</p>
            <p class="email">{{ data.senderEmail }}</p>
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
    <replyDialog :showModal="showMessage" @handlerClose="showMessage = false" :homeId="data.houseId" />
  </div>
</template>

<script>
import WButton from '@/components/Button';
import replyDialog from '../replyMessage/index.vue';

export default {
  components: { WButton, replyDialog },
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
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
