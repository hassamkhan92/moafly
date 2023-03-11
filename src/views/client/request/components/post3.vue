<template>
  <div class="request_center">
    <div class="request_center_left contain">
      <!-- <div class="side_box">
        <div class="side">
          <div :style="{ width: activeIdx * 25 + '%' }" class="side_active"></div>
        </div>
        <ul class="side_name_box">
          <li class="side_name" v-for="(item, itemIdx) in sideNameList" :class="{ activeSide: itemIdx <= 2 }" :key="item.value">{{ item.name }}</li>
        </ul>
      </div> -->
      <div class="side_box">
        <div v-for="item in sideNameList" :class="{ side_active: $route.path.includes(item.path) || item.value < activeIdx }" :key="item.value" class="side_item">
          <div class="side_item_icon">
            <div v-if="item.value >= activeIdx" class="item_icon_center"></div>
            <i v-else class="el-icon-check"></i>
          </div>
          <p class="side_item_title">{{ item.name }}</p>
        </div>
      </div>
      <!-- 标题 -->
      <p class="request_title">Describe your job</p>
      <p class="request_text">This is how our agents figures out what you need and how they can better help you out!</p>
    </div>
    <div class="request_center_right contain">
      <p class="write_box">Describe your job</p>
      <el-input v-model="taskInfo.taskDetail" type="textarea" maxlength="5000" :rows="10" show-word-limit style="width:100%"></el-input>
      <div class="request_btn_box">
        <el-button class="back" @click="handlePre()">Back</el-button>
        <el-button class="next" :disabled="!taskInfo.taskDetail" :class="{ 'btn-active': taskInfo.taskDetail }" @click="handleNext()">Next</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'request_post3',
  props: {
    taskData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      activeIdx: 3,
      taskInfo: {
        taskDetail: ''
      },
      sideNameList: [
        {
          name: 'Title',
          path: '/request/1',
          value: 1
        },
        {
          name: 'Skills',
          path: '/request/2',
          value: 2
        },
        {
          name: 'Description',
          path: '/request/3',
          value: 3
        },
        {
          name: 'Budget',
          path: '/request/4',
          value: 4
        }
      ]
    };
  },
  created() {
    if (this.$store.state.task.taskInfo) {
      let taskData = this.$store.state.task.taskInfo;
      this.taskInfo = Object.assign(this.taskInfo, taskData);
    }
  },
  methods: {
    handlePre() {
      this.$router.push('/request/2');
    },
    handleNext() {
      this.$store.commit('setTaskInfo', this.taskInfo);
      this.$router.push('/request/4');
    }
  }
};
</script>

<style lang="less" scoped>
.request_center {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  .flex();
  .contain {
    width: calc(100% - 30px);
    padding: 30px;
    @media (min-width: 768px) {
      width: calc(50% - 60px);
    }
  }
  .request_center_left {
    border-radius: 16px 0 0 16px;
    margin-bottom: 30px;
    @media (min-width: 768px) {
      margin-bottom: 0;
    }
    .side_box {
      width: 330px;
      .flex();
      justify-content: space-between;
      margin-bottom: 50px;
      .side_item {
        position: relative;
        width: 36px;
        height: 61px;
        .side_item_icon {
          position: relative;
          width: 36px;
          height: 36px;
          border: 2px solid #ffffff;
          border-radius: 50%;
          .flex();
          .el-icon-check {
            font-size: 20px;
            color: rgba(102, 102, 102, 0.43);
          }
          &:after {
            content: '';
            display: block;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateX(100%) translateY(-50%);
            width: 62px;
            height: 1px;
            background: #ffffff;
          }
          .item_icon_center {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #ffffff;
            z-index: 10;
          }
        }
        .side_item_title {
          position: absolute;
          left: 0;
          bottom: 0;
          width: auto;
          text-align: center;
          margin: 0;
          font-family: 'Libre Franklin';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 17px;
          color: #ffffff;
        }
        &:nth-child(3) {
          .side_item_title {
            transform: translateX(-25%);
          }
        }
        &:nth-child(4) {
          .side_item_title {
            transform: translateX(-10%);
          }
          .side_item_icon {
            &:after {
              display: none;
            }
          }
        }
      }
      .side_active {
        .side_item_icon {
          background: #ffffff;
          .item_icon_center {
            z-index: 11;
            border: 1px solid #ffffff;
            background: rgba(102, 102, 102, 0.43);
          }
        }
      }
    }
    // .side_box {
    //   width: 100%;
    //   height: 50px;
    //   .side {
    //     width: 100%;
    //     height: 10px;
    //     margin-bottom: 22px;
    //     background: #ffffff;
    //     border-radius: 14px;

    //     .side_active {
    //       width: 100%;
    //       height: 100%;
    //       transition: all ease 0.5s;
    //       background: #ff9a1c;
    //       border-radius: 14px;
    //     }
    //   }
    //   .side_name_box {
    //     width: 100%;
    //     .flex();
    //     .side_name {
    //       width: 25%;
    //       text-align: left;
    //       font-size: 12px;
    //       font-family: LibreFranklin-Regular, LibreFranklin;
    //       font-weight: 400;
    //       color: #ffffff;
    //       line-height: 15px;
    //       &:last-child {
    //         text-align: right;
    //       }
    //     }
    //     .activeSide {
    //       color: #ff9a1c;
    //     }
    //   }
    // }
    .request_title {
      font-family: 'Libre Franklin';
      font-style: normal;
      font-weight: 700;
      font-size: 36px;
      line-height: 44px;
      color: #ffffff;
      margin: 75px 0 24px;
    }
    .request_text {
      font-family: 'Libre Franklin';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
    }
  }
  .request_center_right {
    position: relative;
    border-radius: 0 16px 16px 0;
    .write_box {
      font-family: 'Libre Franklin';
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #0f1b43;
    }
    .example_title {
      font-size: 14px;
      font-family: LibreFranklin-Medium, LibreFranklin;
      font-weight: 500;
      color: #333333;
      line-height: 17px;
      margin: 40px 0 24px;
    }
    /deep/.request_btn_box {
      margin-top: 30px;
      .el-button {
        min-width: 80px;
        height: 28px;
        font-family: 'Libre Franklin';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 23px;
        text-transform: capitalize;
        color: #dc5674;
        padding: 0 17px;
        border-radius: 6px;
      }
      .back {
        border: 1px solid #dc5674;
        &:hover {
          background: #ffffff;
        }
      }
      .next {
        background: #e0e0e0;
        color: #ffffff;
        &:hover {
          background: #dc5674;
          color: #ffffff;
        }
      }
      .btn-active {
        background: #dc5674;
        color: #ffffff;
      }
    }
  }
}
</style>
