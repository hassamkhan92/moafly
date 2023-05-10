<template>
  <div class="messages-wrap">
    <el-tabs v-model="activeName" class="messages-tab">
      <el-tab-pane :label="`Buy message (${buyMessageList.length})`" name="buyMessage">
        <div class="messages">
          <div class="message" v-for="(message, index) in buyMessageList" :key="index">
            <MessageCard :data="message" />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="`Sell message (${sellMessageList.length})`" name="sellMessage">
        <div class="messages">
          <div class="message" v-for="(message, index) in sellMessageList" :key="index">
            <MessageCard :data="message" />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { messages } from '@/api';

import { getViliedRequestBackValue } from '@/util/util';
import Is from '@/util/is.js';

import MessageCard from './components/messageCard';

export default {
  components: { MessageCard },
  data() {
    return {
      activeName: 'buyMessage',
      loading: false,
      autoLoading: false,
      isMore: false,
      more: true,
      queryParams: {
        pageNum: 1,
        pageSize: 3
      },
      buyMessageList: [],
      sellMessageList: []
    };
  },
  watch: {
    isMore: function(val) {
      if (val) {
        setTimeout(() => {
          this.more = false;
        }, 1000);
      }
    }
  },
  mounted() {
    this.getData();
    this.getSellData();
  },
  methods: {
    infineLoad() {
      if (!this.isMore && this.more) {
        this.autoLoading = true;
        this.queryParams.pageNum += 1;
        if (this.queryParams.pageNum > 1 && (this.buyMessageList.length >= 3 || this.sellMessageList.length >= 3)) {
          this.getData();
          this.getSellData();
        }
      }
    },
    getData() {
      this.loading = true;
      messages
        .getBuyMessagesList(this.queryParams)
        .then(data => {
          if (getViliedRequestBackValue(data)) {
            if (Is.arrayEmpty(data.context.dataContent)) {
              this.isMore = true;
            }
            this.buyMessageList = this.buyMessageList.concat(data.context.dataContent);
            this.loading = false;
            this.autoLoading = false;
          }
        })
        .catch(err => {
          console.log('err===>', err);
          this.loading = false;
        });
    },
    getSellData() {
      this.loading = true;
      messages
        .getSellMessagesList(this.queryParams)
        .then(data => {
          if (getViliedRequestBackValue(data)) {
            if (Is.arrayEmpty(data.context.dataContent)) {
              this.isMore = true;
            }
            this.sellMessageList = this.sellMessageList.concat(data.context.dataContent);
            this.loading = false;
            this.autoLoading = false;
          }
        })
        .catch(err => {
          console.log('err===>', err);
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import './index';
</style>
