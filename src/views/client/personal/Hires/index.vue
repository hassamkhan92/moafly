<template>
  <div v-loading="loading" v-infinite-scroll="infineLoad" infinite-scroll-disabled="autoLoading" infinite-scroll-distance="10" class="my-agent-container">
    <agent-item v-for="(agent, index) in listData" :key="index" :agentInfo="agent"></agent-item>
    <template v-if="listData.length">
      <div
        v-if="loading && !isMore"
        element-loading-customClass="loading-auto"
        v-loading="loading"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        class="auto-load-box"
      ></div>
      <p class="no-more-text" v-if="isMore && more && listData.length > 2">No More</p>
    </template>
    <template v-if="!listData.length && !loading">
      <Empty title="You haven't hired any agents yet" to="/agent"></Empty>
    </template>
  </div>
</template>

<script>
import AgentItem from './components/item/index.vue';
import { agent } from '@/api';
import Empty from '@/views/client/personal/components/empty.vue';
import { getViliedRequestBackValue } from '@/util/util';
import Is from '@/util/is.js';
export default {
  components: { AgentItem, Empty },
  data() {
    return {
      currentPage: 1,
      pageSize: 4,
      loading: false, //初次加载
      autoLoading: false, //控制滚动加载
      isMore: false, //判断数据加载完
      more: true,
      queryParams: {
        pageNum: 1,
        pageSize: 3
      },
      listData: [],
      listData1: [
        {
          agentEmail: 'agentEmail',
          agentHeaderImg: 'agentHeaderImg',
          agentIntroduce: 'agentIntroduce',
          agentLocation: 'agentLocation',
          agentName: 'agentName',
          agentPhoneNum: 'agentPhoneNum',
          agentPrice: 0,
          agentScore: 5,
          agentSkills: 'agentSkills',
          contractInfoList: [
            {
              fixedPrice: 0,
              hourPrice: 0,
              inviteTitle: 'inviteTitle',
              payType: 0,
              relationState: 0
            },
            {
              fixedPrice: 0,
              hourPrice: 0,
              inviteTitle: 'inviteTitle',
              payType: 0,
              relationState: 0
            },
            {
              fixedPrice: 0,
              hourPrice: 0,
              inviteTitle: 'inviteTitle',
              payType: 0,
              relationState: 0
            }
          ],
          customreSalesRelationId: 0,
          relationState: 0,
          salesAgentId: 0
        },
        {
          agentEmail: 'agentEmail',
          agentHeaderImg: 'agentHeaderImg',
          agentIntroduce: 'agentIntroduce',
          agentLocation: 'agentLocation',
          agentName: 'agentName',
          agentPhoneNum: 'agentPhoneNum',
          agentPrice: 0,
          agentScore: 5,
          agentSkills: 'agentSkills',
          customreSalesRelationId: 0,
          relationState: 0,
          salesAgentId: 0
        },
        {
          agentEmail: 'agentEmail',
          agentHeaderImg: 'agentHeaderImg',
          agentIntroduce: 'agentIntroduce',
          agentLocation: 'agentLocation',
          agentName: 'agentName',
          agentPhoneNum: 'agentPhoneNum',
          agentPrice: 0,
          agentScore: 5,
          agentSkills: 'agentSkills',
          customreSalesRelationId: 0,
          relationState: 0,
          salesAgentId: 0
        },
        {
          agentEmail: 'agentEmail',
          agentHeaderImg: 'agentHeaderImg',
          agentIntroduce: 'agentIntroduce',
          agentLocation: 'agentLocation',
          agentName: 'agentName',
          agentPhoneNum: 'agentPhoneNum',
          agentPrice: 0,
          agentScore: 5,
          agentSkills: 'agentSkills',
          customreSalesRelationId: 0,
          relationState: 0,
          salesAgentId: 0
        }
      ]
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
    // this.mockInit();
  },
  methods: {
    mockInit() {
      this.loading = true;
      setTimeout(() => {
        if (this.queryParams.pageNum == 3) {
          this.isMore = true;
        } else {
          this.listData = this.listData.concat(this.listData1);
          this.loading = false;
          this.autoLoading = false;
        }
      }, 1000);
    },
    //无限滚动
    infineLoad() {
      if (!this.isMore && this.more) {
        this.autoLoading = true;
        this.queryParams.pageNum += 1;
        if (this.queryParams.pageNum > 1 && this.listData.length >= 3) {
          this.getData();
        }
        // this.mockInit();
      }
    },
    getData() {
      this.loading = true;
      agent
        .getHiredAgentsList(this.queryParams)
        .then(data => {
          if (getViliedRequestBackValue(data)) {
            if (Is.arrayEmpty(data.context.dataContent)) {
              this.isMore = true;
            }
            this.listData = this.listData.concat(data.context.dataContent);
            // this.listData = [];
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
@import './index.less';
</style>
