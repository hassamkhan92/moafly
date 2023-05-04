<template>
  <div class="messages-wrap">
    <el-tabs v-model="activeName" class="messages-tab">
      <el-tab-pane label="Buy message (10)" name="buyMessage">
        <div class="messages">
          <MessageCard />
        </div>
      </el-tab-pane>
      <el-tab-pane label="Sell message (10)" name="sellMessage"> </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MessageCard from './components/messageCard';
export default {
  components: { MessageCard },
  data() {
    return {
      activeName: 'buyMessage'
    };
  }
};
</script>

<style lang="less" scoped>
@import './index';
</style>
