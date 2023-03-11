<template>
  <el-form class="sell-listing-date-container step3" :model="form" ref="form">
    <div class="title">
      When do you want your listing to be displayed?
    </div>
    <div class="content">
      <div class="form-content">
        <MFormItem label="Coming Soon Date">
          <MDate type="date" :picker-options="pickerOptionsS" placeholder="" :width="314" v-model="form.comingSoonDate"></MDate>
        </MFormItem>
        <MFormItem label="Active Date">
          <MDate type="date" :picker-options="pickerOptionsE" placeholder="" :width="314" v-model="form.activeDate"></MDate>
        </MFormItem>
      </div>
      <div class="footer">
        <WButton radius="4px" text="Previous" color="#DC5674" border="1px solid #DC5674" width="100px" height="39px" bgColor="#fff" @handleClick="handlePre(5)"></WButton>
        <WButton radius="4px" text="Next" v-throttle v-loading="loading" width="84px" height="39px" @handleClick="handleNext(6)" class="next-btn"></WButton>
      </div>
    </div>
  </el-form>
</template>
<script>
import MFormItem from '@/views/client/sell/components/MFormItem.vue';
import MDate from '@/views/client/sell/components/MDate.vue';
import WButton from '@/components/Button';
import { addHomeInfo, listAssign, viladStep } from '@/util/index';
export default {
  components: { WButton, MFormItem, MDate },
  data() {
    return {
      bgColor: '#ddd',
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      form: {
        houseStep: '8',
        houseId: '',
        activeDate: '',
        comingSoonDate: ''
      },
      loading: false,
      comingSoonDateOptions: [],
      activeDateOptions: [],
      disabledData: [
        {
          key: 'comingSoonDate',
          value: ''
        },
        {
          key: 'activeDate',
          value: ''
        }
      ],
      pickerOptionsS: {
        disabledDate: time => {
          // 设置可选择的日期为今天之后的一个月内
          let curDate = new Date().getTime();
          // 这里算出一个月的毫秒数,这里使用30的平均值,实际中应根据具体的每个月有多少天计算
          let day = 100 * 24 * 3600 * 1000;
          let dateRegion = curDate + day;
          let end = '';
          if (!this.form.activeDate && this.form.comingSoonDate) {
            end = new Date(this.form.comingSoonDate).getTime();
            return time.getTime() < curDate || time.getTime() >= dateRegion || time.getTime() > end;
          } else {
            return (
              time.getTime() < curDate || time.getTime() >= dateRegion //限制小于当天的日期
            ); //限制大于14天后的日期
          }
        }
      },
      pickerOptionsE: {
        disabledDate: time => {
          let curDate = new Date(this.form.comingSoonDate).getTime();
          let day = 100 * 24 * 3600 * 1000;
          let dateRegion = curDate + day;
          let start = '';
          if (this.form.activeDate && !this.form.comingSoonDate) {
            start = new Date(this.form.activeDate).getTime();
            return time.getTime() < curDate || time.getTime() >= dateRegion || time.getTime() < start;
          } else {
            return (
              time.getTime() < curDate || time.getTime() >= dateRegion //限制小于当天的日期
            ); //限制大于14天后的日期
          }
        }
      }
    };
  },
  computed: {},
  mounted() {
    let homeInfo = this.$store.getters.homeInfo;
    if (homeInfo && homeInfo.houseId) {
      listAssign(this.form, homeInfo);
      this.form.houseStep = viladStep(homeInfo.houseStep, this.form.houseStep);
    }
  },
  methods: {
    handlePre() {
      this.$router.push('/sell/price');
    },
    handleNext() {
      this.$refs.form.validate().then(success => {
        this.loading = true;
        //新增房屋
        addHomeInfo(this.form)
          .then(res => {
            if (res) {
              let obj = this.$store.getters.homeInfo;
              this.$store.commit('SET_HOME_INFO', Object.assign(obj, this.form));
              this.loading = false;
              this.$router.push('/sell/sale-sign');
            } else {
              this.$message.error(res.message);
              this.loading = false;
            }
          })
          .catch(error => {
            this.$message.error(error);
            this.loading = false;
          });
      });
    }
  }
};
</script>
<style scoped lang="less">
.sell-listing-date-container {
  position: relative;
  width: 100%;
  height: 100%;
  .title {
    padding-left: 15px;
    padding-right: 15px;
    .MoaflyText(700, 26px, 32px, #0f1b43);
    margin-bottom: 40px;
  }
  .content {
    padding-left: 15px;
    padding-right: 15px;
    .form-content {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin: 0 -15px;
      width: 100%;
      /deep/ .el-form-item {
        padding-left: 15px;
        padding-right: 15px;
        flex: 0 0 100%;
        width: 100%;
        @media (min-width: 768px) {
          flex: 0 0 calc(50% - 30px);
          width: calc(50% - 30px);
        }
        margin-bottom: 30px;
        label {
          position: relative;
          text-align: left;
          float: none;
          display: inline-block;
        }
        .el-input {
          width: 100% !important;
        }
      }
    }
  }
  .footer {
    display: flex;
    .next-btn {
      margin-left: 20px;
    }
  }
}
</style>
