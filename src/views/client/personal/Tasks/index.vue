<template>
  <div v-loading="loading" class="my_request">
    <div v-infinite-scroll="infineLoad" infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="content">
      <Item v-for="item in listData" :item="item" @initData="getData" @handlerEdit="handlerEdit" @handlerRemove="handlerRemove" @handlerView="handlerView" :key="item.id"></Item>
      <!-- 滚动内容 -->
      <template v-if="listData.length">
        <div
          v-if="loading && !isMore"
          element-loading-customClass="loading-auto"
          v-loading="loading"
          element-loading-text="Loading..."
          element-loading-spinner="el-icon-loading"
          class="auto-load-box"
        ></div>
        <p class="no-more-text" v-if="isMore && more && listData.length > 6">No More</p>
      </template>
      <template v-if="!listData.length && !loading">
        <Empty :btnShow="false" to="/request/1" title="You don’t have any task records" text="Post a Task" v-if="listData.length === 0 && !loading"></Empty>
      </template>
    </div>
  </div>
</template>

<script>
import * as api from '@/api';
import Empty from '@/views/client/personal/components/empty.vue';
import Item from './components/item.vue';
import { getViliedRequestBackValue } from '@/util/util.js';
import Is from '@/util/is.js';
export default {
  name: 'my_request',
  components: { Empty, Item },
  data() {
    return {
      queryParams: {
        pageNum: 1,
        pageSize: 7
      },
      loading: false, //初次加载
      autoLoading: false, //控制滚动加载
      isMore: false, //判断数据加载完
      more: true,
      listData: [],
      listData1: [
        {
          id: 1,
          taskTitle: '11111',
          createTime: '2022/02/05'
        },
        {
          id: 2,
          taskTitle: '11111',
          createTime: '2022/02/05'
        },
        {
          id: 3,
          taskTitle: '11111',
          createTime: '2022/02/05'
        },
        {
          id: 4,
          taskTitle: '11111',
          createTime: '2022/02/05'
        },
        {
          id: 5,
          taskTitle: '11111',
          createTime: '2022/02/05'
        },
        {
          id: 6,
          taskTitle: '11111',
          createTime: '2022/02/05'
        },
        {
          id: 7,
          taskTitle: '11111',
          createTime: '2022/02/05'
        },
        {
          id: 8,
          taskTitle: '11111',
          createTime: '2022/02/05'
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
  created() {
    //初始化清除任务内容
    this.$store.commit('setTaskInfo', {});
    this.getData();
    // this.mockInit();
  },
  methods: {
    //无限滚动
    infineLoad() {
      if (!this.isMore && this.more) {
        this.autoLoading = true;
        this.queryParams.pageNum += 1;
        if (this.queryParams.pageNum > 1 && this.listData.length >= 7) {
          this.getData();
        }
        // this.mockInit();
      }
    },
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
    async getData(val) {
      if (val) {
        this.queryParams.pageNum = 1;
        this.listData = [];
      }
      this.loading = true;
      await api.task
        .listTask(this.queryParams)
        .then(res => {
          if (getViliedRequestBackValue(res)) {
            if (Is.arrayEmpty(res.context.dataContent)) {
              this.isMore = true;
            }
            this.listData = this.listData.concat(res.context.dataContent);
            this.loading = false;
            this.autoLoading = false;
          }
        })
        .catch(err => {
          console.log('err===>', err);
          this.loading = false;
        });
    },
    handlerInvite(item) {
      this.$router.push(`/task/invite?taskId=${item.taskId}`);
    },
    handlerMake(item) {
      let data = { taskId: item.taskId };
      if (item.taskState == 1) {
        data.taskState = 2;
      } else if (item.taskState == 2) {
        data.taskState = 1;
      }
      api.task.EditTaskState(data).then(res => {
        if (res.code === 'K-000000') {
          this.$message.success('Make private Success');
          this.getData(1);
        }
      });
    },
    handlerView(item) {
      this.$router.push(`/task/detail?taskId=${item.taskId}`);
    },
    handlerEdit(item) {
      this.$store.commit('setTaskInfo', item);
      this.$router.push('/request');
    },
    handlerToPathViewProposals(taskId) {
      this.$router.push(`/task/proposals?taskId=${taskId}`);
    },
    handlerRemove(item) {
      let data = {
        taskId: item.taskId,
        taskState: 0
      };
      api.task.EditTaskState(data).then(res => {
        if (res.code === 'K-000000') {
          this.$message.success('Remove posting success');
          this.getData(1);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 765px;
  overflow-y: auto;
  padding: 36px 24px;
  box-sizing: border-box;
  .auto-load-box {
    width: 100%;
    height: 50px;
  }
  .no-more-text {
    font-family: 'Libre Franklin';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #dc5674;
    text-align: center;
    width: 100%;
  }
  /deep/.el-loading-spinner {
    .el-icon-loading {
      color: #dc5674;
    }
    .el-loading-text {
      color: #dc5674;
    }
  }
}
::v-deep.my_request {
  position: relative;
  width: 100%;
  .q-item__section {
    display: flex;
    justify-content: center;
  }
  .request_item_label {
    margin-top: 15px;
  }
  .request_active_text {
    font-size: 14px;
    font-family: LibreFranklin-Regular, LibreFranklin;
    font-weight: 400;
    color: #999999;
    line-height: 17px;
    margin-top: 10px;
  }
}
</style>
