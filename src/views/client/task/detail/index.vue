<template>
  <div v-loading="loading" class="view_proposal1_main">
    <div class="view_proposal1_left">
      <div class="proposal1_left_top">
        <div class="proposal1_left_top_left">
          <!-- <i class="el-icon-location-outline icon_right"></i> -->
          <p class="proposal1_left_top_left_text2"><img class="svg-icon icon_right" :src="require('@/assets/svg/address-black.svg')" alt="" />Los Angeles, California</p>
          <p class="proposal1_left_top_left_text1">Posted 1 minute ago</p>
        </div>
        <div class="proposal1_left_top_right">
          <template v-if="taskDetail.minHourPrice && taskDetail.maxHourPrice">
            <p class="proposal1_left_top_right_text1">
              <img class="svg-icon icon_right" :src="require('@/assets/svg/time.svg')" alt="" />${{ taskDetail.minHourPrice }}-${{ taskDetail.maxHourPrice }}
            </p>
            <p class="proposal1_left_top_right_text2">Hourly</p></template
          >
        </div>
      </div>
      <div class="proposal1_left_center">{{ taskDetail.taskDetail }}</div>
      <div class="proposal1_left_bottom">
        <div class="proposal1_left_bottom_left">
          <p class="proposal1_left_bottom_left_text1">Skills and Languages</p>
          <p class="proposal1_left_bottom_left_text2">Languages preferred</p>
          <ul class="options_box">
            <li v-for="item in language_optoins" :key="item.id">{{ item.value }}</li>
          </ul>
        </div>
        <div class="proposal1_left_bottom_right">
          <p class="proposal1_left_bottom_right_text1">Skills required</p>
          <ul class="options_box">
            <li v-for="item in skills_options" :key="item.id">{{ item.value }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="view_proposal1_right">
      <ul>
        <li class="view_proposal1_right_li" @click="handlerClick('edit', '')">
          <span><i class=" yello_icon el-icon-edit-outline"></i></span>
          <span class="yello_icon view_proposal1_right_text">Edit posting</span>
        </li>
        <li class="view_proposal1_right_li" @click="handlerClick('remove', 0)">
          <span><i class=" yello_icon el-icon-delete"></i></span>
          <span class="yello_icon view_proposal1_right_text">Remove posting</span>
        </li>
        <li class="view_proposal1_right_li" @click="handlerClick('open', 1)" v-show="taskDetail.taskState === 2" v-loading="loading">
          <span><i class=" yello_icon el-icon-unlock"></i></span>
          <span class="yello_icon view_proposal1_right_text">Make public</span>
        </li>
        <li class="view_proposal1_right_li" @click="handlerClick('private', 2)" v-show="taskDetail.taskState === 1" v-loading="loading">
          <span><i class=" yello_icon el-icon-lock"></i></span>
          <span class="yello_icon view_proposal1_right_text">Make private</span>
        </li>
      </ul>
    </div>
    <editPostDialog @initData="initData" ref="editPostDialog"></editPostDialog>
  </div>
</template>

<script>
import * as api from '@/api';
import editPostDialog from '@/views/client/personal/Tasks/components/editPostDialog.vue';
import { getViliedRequestBackValue } from '@/util/util';
export default {
  components: {
    editPostDialog
  },
  data() {
    return {
      loading: false,
      language_optoins: [
        {
          value: 1,
          label: 'Chinese',
          isSelect: false
        },
        {
          value: 2,
          label: 'English',
          isSelect: false
        },
        {
          value: 3,
          label: 'French',
          isSelect: false
        },
        {
          value: 4,
          label: 'Japanese',
          isSelect: false
        },
        {
          value: 5,
          label: 'Korean',
          isSelect: false
        },
        {
          value: 6,
          label: 'Spanish',
          isSelect: false
        }
      ],
      skills_options: [],
      taskId: '',
      taskDetail: {}
    };
  },
  created() {
    this.taskId = this.$route.query.taskId;
    this.getTaskDetails();
  },
  mounted() {},
  methods: {
    initData() {
      this.getTaskDetails();
    },
    getTaskDetails() {
      this.loading = true;
      api.task.taskDetail(this.taskId).then(res => {
        if (getViliedRequestBackValue(res, 'Object')) {
          this.taskDetail = res.context;
          this.skills_options = JSON.parse(this.taskDetail.skills);
          this.language_optoins = JSON.parse(this.taskDetail.languages);
          this.loading = false;
        }
      });
    },
    // 点击设置任务状态 任务状态 0关闭 1开启(默认) 2私有
    handlerClick(val, state) {
      if (val == 'edit') {
        this.$refs.editPostDialog.PostVisible = true;
        this.$refs.editPostDialog.init(this.taskDetail);
      } else {
        let data = {
          taskId: this.taskId,
          taskState: state
        };
        this.loading = true;
        api.task
          .EditTaskState(data)
          .then(res => {
            if (res.code === 'K-000000') {
              if (val == 'remove') {
                this.$router.push('/person/Tasks');
              } else {
                this.getTaskDetails();
              }
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(err => {
            console.log('修改任务状态吧报错', err);
          });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.view_proposal1_main {
  width: 100%;
  border: 1px solid #e0e0e0;
  .flex();
  .icon_right {
    margin-right: 8px;
  }
  .view_proposal1_left {
    height: 100%;
    width: 100%;
    @media (min-width: 768px) {
      width: calc(100% - 332px);
    }
    .proposal1_left_top {
      .flex();
      border-bottom: 1px solid #e0e0e0;
      .proposal1_left_top_left {
        width: calc(50% - 48px);
        height: 100%;
        padding: 32px 24px;
        .proposal1_left_top_left_text1 {
          .MoaflyText(400, 14px, 17px, rgba(15, 27, 67, 0.6));
        }
        .proposal1_left_top_left_text2 {
          .MoaflyText(500, 18px, 22px, #0f1b43);
        }
      }
      .proposal1_left_top_right {
        width: calc(50% - 48px);
        height: 100%;
        padding: 32px 24px;
        .proposal1_left_top_right_text1 {
          .MoaflyText(500, 18px, 22px, #0f1b43);
        }
        .proposal1_left_top_right_text2 {
          .MoaflyText(400, 14px, 17px, rgba(15, 27, 67, 0.6));
        }
      }
    }
    .proposal1_left_center {
      width: 100%;
      .flex();
      justify-content: flex-start;
      padding-left: 24px;
      .MoaflyText(400, 18px, 22px, #0f1b43);
    }
    .proposal1_left_bottom {
      .flex();
      .options_box {
        width: 100%;
        .flex();
        justify-content: flex-start;
        flex-wrap: wrap;
        li {
          min-width: 86px;
          border: 1px solid rgba(15, 27, 67, 0.2);
          border-radius: 6px;
          background: #ffffff;
          text-align: center;
          margin-top: 8px;
          margin-right: 8px;
          transition: all ease 0.5s;
          padding: 4px 12px;
          cursor: pointer;
          .MoaflyText(400, 14px, 17px, rgba(15, 27, 67, 0.6));
        }
      }
      .proposal1_left_bottom_left {
        width: calc(50% - 48px);
        padding: 32px 24px;
        .proposal1_left_bottom_left_text1 {
          .MoaflyText(700, 20px, 24px, #0f1b43);
        }
        .proposal1_left_bottom_left_text2 {
          .MoaflyText(400, 16px, 19px, #0f1b43);
        }
      }
      .proposal1_left_bottom_right {
        width: calc(50% - 48px);
        padding: 32px 24px;
        .proposal1_left_bottom_right_text1 {
          .MoaflyText(400, 16px, 19px, #0f1b43);
        }
      }
    }
  }
  .view_proposal1_right {
    max-width: 100%;
    border-top: 1px solid #e0e0e0;
    @media (min-width: 768px) {
      max-width: 283px;
      border-left: 1px solid #e0e0e0;
      border-top: 0;
    }
    width: calc(100% - 48px);
    padding: 32px 24px;
    .view_proposal1_right_li {
      margin-bottom: 21px;
      cursor: pointer;
    }
    .view_proposal1_right_text {
      margin-left: 8px;
    }
    .yello_icon {
      .MoaflyText(400, 16px, 19px, #dc5674);
    }
  }
}
</style>
