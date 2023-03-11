<template>
  <div class="request_center">
    <div class="request_center_left contain">
      <!-- <div class="side_box">
        <div class="side">
          <div :style="{ width: activeIdx * 25 + '%' }" class="side_active"></div>
        </div>
        <ul class="side_name_box">
          <li class="side_name" v-for="(item, itemIdx) in sideNameList" :class="{ activeSide: itemIdx <= 1 }" :key="item.value">{{ item.name }}</li>
        </ul>
      </div> -->
      <!-- 标题 -->
      <div class="side_box">
        <div v-for="item in sideNameList" :class="{ side_active: $route.path.includes(item.path) || item.value < activeIdx }" :key="item.value" class="side_item">
          <div class="side_item_icon">
            <div v-if="item.value >= activeIdx" class="item_icon_center"></div>
            <i v-else class="el-icon-check"></i>
          </div>
          <p class="side_item_title">{{ item.name }}</p>
        </div>
      </div>
      <p class="request_title">What are the main skills</p>
      <p class="request_title">required for your</p>
      <p class="request_title">task?</p>
    </div>
    <div class="request_center_right contain">
      <p class="example_title">Language preferred</p>
      <ul class="options_box">
        <li v-for="item in language_optoins" :key="item.value" @click="handlerSelect(item)" :class="{ active: item.isSelect }">{{ item.label }}</li>
      </ul>
      <p class="example_title">Skills required</p>
      <ul class="options_box">
        <li v-for="item in skills_options" :key="item.value" @click="handlerSelect(item)" :class="{ active: item.isSelect }">{{ item.label }}</li>
      </ul>
      <div class="request_btn_box">
        <el-button class="back" size="mini" @click="handlePre()">Back</el-button>
        <el-button class="next" size="mini" :disabled="!nextDisabled" :class="{ 'btn-active': nextDisabled }" @click="handleNext()">Next</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'request_post2',
  data() {
    return {
      activeIdx: 2,
      taskInfo: {
        skills: '',
        languages: ''
      },
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
      skills_options: [
        {
          value: 1,
          label: 'Contracting',
          isSelect: false
        },
        {
          value: 2,
          label: 'House touring',
          isSelect: false
        },
        {
          value: 3,
          label: 'Price negotiation',
          isSelect: false
        },
        {
          value: 4,
          label: 'Staging',
          isSelect: false
        },
        {
          value: 5,
          label: 'Escrow',
          isSelect: false
        },
        {
          value: 6,
          label: 'Title',
          isSelect: false
        },
        {
          value: 7,
          label: 'Photographing',
          isSelect: false
        },
        {
          value: 8,
          label: 'List my home',
          isSelect: false
        }
      ],
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
  computed: {
    nextDisabled() {
      return this.language_optoins.some(item => item.isSelect) && this.skills_options.some(item => item.isSelect);
    }
  },
  created() {
    if (this.$store.state.task.taskInfo) {
      let taskData = this.$store.state.task.taskInfo;
      this.taskInfo = Object.assign(this.taskInfo, taskData);
    }
    if (this.taskInfo.skills && this.taskInfo.languages) {
      this.initSelectData(this.taskInfo.skills, this.skills_options);
      this.initSelectData(this.taskInfo.languages, this.language_optoins);
    }
  },
  methods: {
    handlerSelect(item) {
      item.isSelect = !item.isSelect;
    },
    initSelectData(data, initData) {
      if (!data.length) {
        return;
      }
      let DATA = JSON.parse(data);
      initData.forEach(initItem => {
        DATA.forEach(item => {
          if (initItem.label == item.value) {
            initItem.isSelect = true;
          }
        });
      });
    },
    getSelectString(data) {
      return data
        .filter(item => item.isSelect)
        .map(item => {
          if (item.isSelect) {
            return {
              id: item.value,
              value: item.label
            };
          }
        });
    },
    handlePre() {
      this.$router.push('/request/1');
    },
    handleNext() {
      this.taskInfo.skills = JSON.stringify(this.getSelectString(this.skills_options));
      this.taskInfo.languages = JSON.stringify(this.getSelectString(this.language_optoins));
      this.$store.commit('setTaskInfo', this.taskInfo);
      this.$router.push('/request/3');
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
    //   margin-bottom: 75px;
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
      margin-bottom: 8px;
    }
  }
  .request_center_right {
    position: relative;
    border-radius: 0 16px 16px 0;
    .example_title {
      font-family: 'Libre Franklin';
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #0f1b43;
      margin: 40px 0 16px;
    }
    .options_box {
      width: 100%;
      .flex();
      justify-content: flex-start;
      flex-wrap: wrap;
      li {
        min-width: 70px;
        border-radius: 6px;
        font-family: 'Libre Franklin';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        color: #0f1b43;
        text-align: center;
        margin-top: 8px;
        margin-right: 10px;
        transition: all ease 0.5s;
        border: 1px solid #e0e0e0;
        padding: 2px 16px;
        cursor: pointer;
      }
      .active {
        background: #dc5674;
        color: #ffffff;
      }
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
