<template>
  <div class="view_proposals_main">
    <div class="view_proposals_center">
      <div class="view_proposals_header">
        <p @click="handlerBack" class="proposals_icon_box"><i class="el-icon-back"></i></p>
        <p class="proposals_text">{{ taskDetail.taskTitle }}</p>
        <div class="view_proposals_tabs_box">
          <div class="view_proposals_text" :class="{ active: item.path === currentpath }" v-for="(item, idx) in imgList" @click="handlerSelect(item)" :key="idx">
            {{ item.text }}
          </div>
        </div>
      </div>
      <router-view :taskDetail="taskDetail"> </router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import * as api from '@/api';
export default {
  name: 'view_proposals',
  components: {},
  data() {
    return {
      taskDetail: {}, //任务详情
      currentpath: '/task/detail',
      taskId: '',
      imgList: [
        {
          text: 'VIEW REQUEST POST',
          path: '/task/detail'
        },
        // {
        //   text: 'INVITE AGENTS',
        //   path: '/task/invite',
        // },
        {
          text: 'REVIEW PROPOSALS',
          path: '/task/proposals'
        }
        // {
        //   text: 'HIRE',
        //   path: '/task/hire',
        // }
      ],
      params: {
        pageNum: 10,
        pageSize: 1
      }
    };
  },
  created() {
    this.taskId = this.$route.query.taskId;
    this.getTaskDetails();
  },
  watch: {
    $route: {
      handler: function(route) {
        this.currentpath = route.path;
      },
      immediate: true
    }
  },
  methods: {
    /**
     * 获取任务详情
     */
    getTaskDetails() {
      api.task.taskDetail(this.taskId).then(res => {
        if (res.code === 'K-000000') {
          this.taskDetail = res.context;
        }
      });
    },
    handlerSelect(item) {
      this.$router.push(item.path + '?taskId=' + this.taskId);
    },
    handlerBack() {
      this.$router.push('/person/Tasks');
    }
  }
};
</script>
<style lang="less" scoped>
.view_proposals_main {
  width: 100%;
  height: 100%;
  padding-top: 80px;
  .view_proposals_center {
    max-width: 1200px;
    margin: 0 auto;
    padding: 36px 15px;
    width: calc(100% - 30px);
    .view_proposals_header {
      width: 100%;
      margin-bottom: 12px;
      .proposals_icon_box {
        .el-icon-back {
          font-size: 25px;
        }
      }
      .proposals_text {
        font-size: 24px;
        font-family: LibreFranklin-SemiBold, LibreFranklin;
        font-weight: 600;
        color: #333333;
        line-height: 29px;
      }
      .view_proposals_tabs_box {
        width: 100%;
        height: 59px;
        .flex();
        justify-content: flex-start;
        .view_proposals_text {
          width: 221px;
          height: 46px;
          background: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 4px 4px 0px 0px;
          text-align: center;
          cursor: pointer;
          .MoaflyText(500, 18px, 22px, rgba(15, 27, 67, 0.6));
          .flex();
          transition: all ease 0.5s;
          margin-right: 8px;
        }

        .active {
          border: 1px solid #dc5674;
          color: #dc5674;
        }
      }
    }
  }
}
</style>
