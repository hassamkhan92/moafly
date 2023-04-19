<template>
  <div class="message-card">
    <div class="card">
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
        <p class="date">2023-02-11 12:30</p>
        <p class="email">wanghuan123@qq.com</p>
      </div>
    </div>
    <div class="thread">
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
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
@import './index';
</style>
