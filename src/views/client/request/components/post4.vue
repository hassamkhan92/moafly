<template>
  <div class="request_center">
    <div class="request_center_left contain">
      <!-- <div class="side_box">
        <div class="side">
          <div :style="{ width: activeIdx * 25 + '%' }" class="side_active"></div>
        </div>
        <ul class="side_name_box">
          <li class="side_name" v-for="(item, itemIdx) in sideNameList" :class="{ activeSide: itemIdx <= 3 }" :key="item.value">{{ item.name }}</li>
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
      <p class="request_title">Tell us about your</p>
      <p class="request_title">budget.</p>
      <p class="request_text">This will help us match you to our agents within your range.</p>
    </div>
    <div class="request_center_right contain">
      <div class="select_box">
        <div :class="{ selectActive: taskInfo.payType == 1 }" class="select_box_left select">
          <img class="select-img" :src="pay_hour_left" alt="" />
          <p class="select_text">Hourly rate</p>
          <q-radio class="select_radio" v-model="taskInfo.payType" color="red" :val="1" />
        </div>
        <div :class="{ selectActive: taskInfo.payType == 2 }" class="select_box_right select">
          <img class="select-img" :src="pay_hour_right" alt="" />
          <p class="select_text">Task budget</p>
          <q-radio class="select_radio" v-model="taskInfo.payType" color="red" :val="2" />
        </div>
      </div>
      <!-- hourly rate -->
      <template v-if="taskInfo.payType == 1">
        <div class="hourly_rate_box">
          <div class="hourly_rate_form hourly_rate">
            <p class="hourly_rate_title">From</p>
            <div class="form_input price_input">
              <q-input style="width:156px;height:40px" color="red teal-1" outlined v-model="taskInfo.minHourPrice" @input="onInput('minHourPrice')" prefix="$"> </q-input>
            </div>
            <p class="unit">/hour</p>
          </div>
          <div class="hourly_rate_to hourly_rate">
            <p class="hourly_rate_title">To</p>
            <div class="form_input price_input">
              <q-input style="width:156px;height:40px" color="red teal-1" outlined v-model="taskInfo.maxHourPrice" @input="onInput('maxHourPrice')" prefix="$"> </q-input>
            </div>
            <p class="unit">/hour</p>
          </div>
        </div>
      </template>
      <!-- Project budget -->
      <template v-if="taskInfo.payType == 2">
        <div class="project_budget_box">
          <p class="project_budget_title">Maximum project budget (USD)</p>
          <q-input style="width:337px;height:40px" outlined v-model="taskInfo.projectPrice" color="red" @input="onInput('projectPrice')" prefix="$"> </q-input>
          <p class="project_budget_text">You can negotiate with your agents then make a fixed-price offer.</p>
        </div>
      </template>
      <div class="request_btn_box">
        <el-button class="back" @click="handlePre(3)">Back</el-button>
        <el-button class="next" :class="{ 'btn-active': taskInfo.projectPrice || (taskInfo.minHourPrice && taskInfo.maxHourPrice) }" @click="handleNext(5)">Post your request</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { numberFormat, numberParse } from '@/util/index';
import pay_hour_left from '@/assets/images/agent/pay_hour_left.png';
import pay_hour_right from '@/assets/images/agent/pay_hour_right.png';
import * as api from '@/api';
export default {
  name: 'request_post4',
  props: {
    taskData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      pay_hour_left: pay_hour_left,
      pay_hour_right: pay_hour_right,
      taskInfo: {
        payType: 1,
        minHourPrice: '',
        maxHourPrice: '',
        projectPrice: ''
      },
      activeIdx: 4,
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
    this.taskInfo.projectPrice = numberFormat(this.taskInfo.projectPrice);
    this.taskInfo.minHourPrice = numberFormat(this.taskInfo.minHourPrice);
    this.taskInfo.maxHourPrice = numberFormat(this.taskInfo.maxHourPrice);
  },
  methods: {
    onInput(name) {
      this.taskInfo[name] = numberFormat(this.taskInfo[name]);
    },
    handlePre() {
      this.$router.push('/request/3');
    },
    handleNext() {
      this.taskInfo.projectPrice = numberParse(this.taskInfo.projectPrice);
      this.taskInfo.minHourPrice = numberParse(this.taskInfo.minHourPrice);
      this.taskInfo.maxHourPrice = numberParse(this.taskInfo.maxHourPrice);
      api.task
        .UserAddTask(this.taskInfo)
        .then(res => {
          if (res.code == 'K-000000') {
            this.$store.commit('setTaskInfo', {});
            this.$message.success('Congratulations on your new task post!');
            this.$router.push('/person/Tasks');
          }
        })
        .catch(error => {
          this.$message.error('Something went wrong with our server');
        });
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
    //       background: #dc5674;
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
      font-family: LibreFranklin-SemiBold, LibreFranklin;
      font-weight: 600;
      color: #ffffff;
      line-height: 44px;
      margin-bottom: 8px;
    }
    .request_text {
      font-size: 14px;
      font-family: LibreFranklin-Regular, LibreFranklin;
      font-weight: 400;
      color: #ffffff;
      line-height: 17px;
      padding-right: 42px;
    }
  }
  .request_center_right {
    position: relative;
    border-radius: 0 16px 16px 0;
    .select_box {
      width: 100%;
      .flex();
      justify-content: flex-start;
      .select {
        position: relative;
        width: 156px;
        height: 97px;
        // background: #ffffff;
        border-radius: 8px;
        border: 1px solid #dddddd;
        padding: 25px 0 0 25px;
        box-sizing: border-box;
        &:nth-child(1) {
          margin-right: 25px;
        }
        .select-img {
          width: 20px;
          height: 20px;
        }
        .select_text {
          font-family: 'Libre Franklin';
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 17px;
          color: #0f1b43;
          text-align: left;
          margin-top: 10px;
        }
        .select_radio {
          position: absolute;
          top: 0;
          right: 0;
        }
        p {
          width: 100%;
          margin: 0;
          text-align: center;
        }
      }
      .selectActive {
        border: 1px solid #dc5674;
      }
    }
    .hourly_rate_box {
      width: 100%;
      margin-top: 40px;
      .flex();
      justify-content: flex-start;
      p {
        margin: 0;
      }
      .hourly_rate {
        width: 45%;
        .hourly_rate_title {
          font-family: 'Libre Franklin';
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 19px;
          color: #0f1b43;
          margin-bottom: 8px;
        }
        /deep/ .price_input {
          .flex();
          justify-content: flex-start;
          margin-top: 16px;
          .q-field__control {
            height: auto;
          }
        }
        .unit {
          margin-top: 4px;
          padding-right: 25px;
          font-family: 'Libre Franklin';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 17px;
          color: rgba(15, 27, 67, 0.6);
          text-align: right;
        }
      }
    }
    .hourly_rate_text {
      font-size: 12px;
      font-family: LibreFranklin-Regular, LibreFranklin;
      font-weight: 400;
      color: #666666;
      line-height: 15px;
      margin-top: 8px;
    }
    .hourly_rate_instructions {
      font-size: 12px;
      font-family: LibreFranklin-Regular, LibreFranklin;
      font-weight: 400;
      color: #666666;
      line-height: 15px;
      margin-top: 40px;
      .price_title {
        font-size: 14px;
        font-family: LibreFranklin-SemiBold, LibreFranklin;
        font-weight: 600;
        color: #333333;
        line-height: 19px;
      }
    }
    /deep/.project_budget_box {
      margin-top: 40px;
      .q-field__control {
        height: auto;
      }
      .project_budget_title {
        font-family: 'Libre Franklin';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        color: #0f1b43;
        margin-bottom: 8px;
      }
      .project_budget_text {
        font-family: 'Libre Franklin';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #0f1b43;
        margin-top: 15px;
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
