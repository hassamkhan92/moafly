<template>
  <div class="request_center">
    <div class="request_center_left contain">
      <div class="side_box">
        <div v-for="item in sideNameList" :class="{ side_active: $route.path.includes(item.path) }" :key="item.value" class="side_item">
          <div class="side_item_icon">
            <div class="item_icon_center"></div>
          </div>
          <p class="side_item_title">{{ item.name }}</p>
        </div>
      </div>
      <!-- 标题 -->
      <p class="request_title">Let's start with a strong title.</p>
      <p class="request_text">This helps your job post stand out to the right agents. It's the first thing they’ll see, so make it count!</p>
    </div>
    <div class="request_center_right contain">
      <p class="write_box">Write a title for your task post</p>
      <el-input v-model="taskInfo.taskTitle" style="width:388px"></el-input>
      <p class="example_title">Example titles</p>
      <ul class="example_text_box">
        <li>
          <p class="exaple_round"></p>
          <p class="example_text">I need a professional real estate agent help me do a house tour</p>
        </li>
        <li>
          <p class="exaple_round"></p>
          <p class="example_text">I need a guy who is super experiened in house price negotiation</p>
        </li>
        <li>
          <p class="exaple_round"></p>
          <p class="example_text">I have some problems with my real estate contacts</p>
        </li>
      </ul>
      <div class="request_btn_box">
        <el-button :disabled="!taskInfo.taskTitle" :class="{ 'btn-active': taskInfo.taskTitle }" @click="handleNext()" type="info">Next</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'request_post1',
  props: {
    taskData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      taskInfo: {
        taskTitle: ''
      },
      activeIdx: 1,
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
    handleNext() {
      this.$store.commit('setTaskInfo', this.taskInfo);
      this.$router.push('/request/2');
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
          backdrop-filter: blur(11px);
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
      font-size: 36px;
      font-family: 'Libre Franklin';
      font-weight: 700;
      color: #ffffff;
      line-height: 44px;
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
    /deep/ .el-input {
      max-width: 390px;
      width: 100% !important;
    }
    .example_title {
      font-family: 'Libre Franklin';
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #0f1b43;
      margin: 40px 0 24px;
    }
    /deep/.el-input__inner {
      background: rgba(255, 255, 255, 0.5);
      border: 1px solid rgba(15, 27, 67, 0.2);
      border-radius: 6px;
    }
    .example_text_box {
      li {
        font-family: 'Libre Franklin';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        color: #0f1b43;
        .flex();
        justify-content: space-between;
        .exaple_round {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #000000;
          align-self: flex-start;
          margin-top: 10px;
        }
        .example_text {
          width: 95%;
        }
      }
    }
    /deep/.request_btn_box {
      margin-top: 30px;
      .el-button {
        width: 80px;
        height: 28px;
        font-family: 'Libre Franklin';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 23px;
        text-transform: capitalize;
        color: #ffffff;
        padding: 0 17px;
        border-radius: 6px;
        transition: all ease 0.5s;
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
