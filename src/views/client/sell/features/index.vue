<template>
  <el-form class="sell-feature-container" :model="form" ref="form">
    <div class="title">Features of your property.</div>
    <div class="content">
      <div class="form-content">
        <MFormItem label="Cooling" prop="hoa">
          <MSelect multiple :collapse-tags="false" :isSlot="true" v-model="form.cooling">
            <el-option v-for="(item, idx) in systemList.Cooling" :key="idx" :label="item" :value="item"> </el-option>
          </MSelect>
        </MFormItem>
        <MFormItem label="Laundry" prop="Laundry">
          <MSelect multiple :collapse-tags="false" :isSlot="true" v-model="form.Laundry">
            <el-option v-for="(item, idx) in systemList.Laundry" :key="idx" :label="item" :value="item"> </el-option>
          </MSelect>
        </MFormItem>
        <MFormItem label="Room Type" prop="roomType">
          <MSelect multiple :collapse-tags="false" :isSlot="true" v-model="form.roomType">
            <el-option v-for="(item, idx) in systemList.RoomType" :key="idx" :label="item" :value="item"> </el-option>
          </MSelect>
        </MFormItem>
        <MFormItem label="Fireplace" prop="Fireplace">
          <MSelect multiple :collapse-tags="false" :isSlot="true" v-model="form.Fireplace">
            <el-option v-for="(item, idx) in systemList.Fireplace" :key="idx" :label="item" :value="item"> </el-option>
          </MSelect>
        </MFormItem>
        <MFormItem label="Pool Features" prop="Fireplace">
          <MSelect multiple :collapse-tags="false" :isSlot="true" v-model="form.poolFeatures">
            <el-option v-for="(item, idx) in systemList.PoolFeatures" :key="idx" :label="item" :value="item"> </el-option>
          </MSelect>
        </MFormItem>
        <MFormItem label="View" prop="View">
          <MSelect multiple :collapse-tags="false" :isSlot="true" v-model="form.View">
            <el-option v-for="(item, idx) in systemList.View" :key="idx" :label="item" :value="item"> </el-option>
          </MSelect>
        </MFormItem>
        <MFormItem label="Common Walls" prop="commonWalls">
          <MSelect multiple :collapse-tags="false" :isSlot="true" v-model="form.commonWalls">
            <el-option v-for="(item, idx) in systemList.CommonWalls" :key="idx" :label="item" :value="item"> </el-option>
          </MSelect>
        </MFormItem>
        <MFormItem label="Lot Features" prop="lotFeatures">
          <MSelect multiple :collapse-tags="false" :isSlot="true" v-model="form.lotFeatures">
            <el-option v-for="(item, idx) in systemList.LotFeatures" :key="idx" :label="item" :value="item"> </el-option>
          </MSelect>
        </MFormItem>
        <MFormItem label="Community Features" prop="communityFeatures">
          <MSelect multiple :collapse-tags="false" :isSlot="true" v-model="form.communityFeatures">
            <el-option v-for="(item, idx) in systemList.CommunityFeatures" :key="idx" :label="item" :value="item"> </el-option>
          </MSelect>
        </MFormItem>
        <MFormItem label="Sewer" prop="Sewer">
          <MSelect multiple :collapse-tags="false" :isSlot="true" v-model="form.Sewer">
            <el-option v-for="(item, idx) in systemList.Sewer" :key="idx" :label="item" :value="item"> </el-option>
          </MSelect>
        </MFormItem>
        <MFormItem label="Water Source" prop="waterSource">
          <MSelect multiple :collapse-tags="false" :isSlot="true" v-model="form.waterSource">
            <el-option v-for="(item, idx) in systemList.WaterSource" :key="idx" :label="item" :value="item"> </el-option>
          </MSelect>
        </MFormItem>
      </div>
      <div class="footer">
        <WButton radius="4px" text="Previous" color="#DC5674" border="1px solid #DC5674" width="100px" height="39px" bgColor="#fff" @handleClick="handlePre"></WButton>
        <WButton radius="4px" text="Next" v-throttle v-loading="loading" :disabled="disabled" width="84px" height="39px" @handleClick="handleNext" class="next-btn"></WButton>
      </div>
    </div>
  </el-form>
</template>
<script>
import MFormItem from '@/views/client/sell/components/MFormItem.vue';
import MSelect from '@/views/client/sell/components/MSelect.vue';
import WButton from '@/components/Button';
import selectData from '@/util/select';
import { mapGetters } from 'vuex';
import { addHomeInfo, listAssign, viladStep } from '@/util/index';
export default {
  components: { WButton, MFormItem, MSelect },
  data() {
    return {
      disabled: false,
      collingOptions: selectData.collingOptions,
      laundryOptions: selectData.laundryOptions,
      roomTypesOptions: selectData.roomTypesOptions,
      poolFeaturesOptions: selectData.poolFeaturesOptions,
      commonWallsOptions: selectData.commonWallsOptions,
      communityFeaturesOptions: selectData.communityFeaturesOptions,
      waterSourcesOptions: selectData.waterSourcesOptions,
      firePlaceOptions: selectData.firePlaceOptions,
      viewsOptions: selectData.viewsOptions,
      lotFeaturesOptions: selectData.lotFeaturesOptions,
      sewerOptions: selectData.sewerOptions,
      prebgColor: '#ddd',
      bgColor: '#ddd',
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      form: {
        cooling: []
      },
      homeInfo: {
        houseId: '',
        houseStep: '3',
        houseProperty: ''
      },
      loading: false
    };
  },
  computed: {
    ...mapGetters(['systemList'])
  },
  created() {},
  mounted() {
    let homeInfo = this.$store.getters.homeInfo;
    if (homeInfo && homeInfo.houseId) {
      listAssign(this.homeInfo, homeInfo);
      this.homeInfo.houseStep = viladStep(homeInfo.houseStep, this.homeInfo.houseStep);
      if (homeInfo.houseProperty) {
        this.form = JSON.parse(homeInfo.houseProperty);
      }
    }
  },
  watch: {
    form: {
      deep: true,
      handler(val, oldVal) {
        let isOk = Object.values(val).some(item => item);
        if (isOk) {
          this.disabled = false;
          this.bgColor = '#353F62';
        }
      }
    }
  },
  methods: {
    handlePre() {
      this.$router.push('/sell/basics');
    },
    handleNext() {
      this.$refs.form.validate().then(success => {
        this.loading = true;
        let houseProperty = JSON.stringify(this.form);
        this.homeInfo.houseProperty = houseProperty;
        //新增房屋
        addHomeInfo(this.homeInfo)
          .then(res => {
            if (res) {
              let obj = this.$store.getters.homeInfo;
              this.$store.commit('SET_HOME_INFO', Object.assign(obj, this.homeInfo));
              this.loading = false;
              this.$router.push('/sell/more-details');
            } else {
              this.$message.error(res.message);
              this.loading = false;
            }
          })
          .catch(err => {
            this.$message.error(err);
            this.loading = false;
          });
      });
    }
  }
};
</script>
<style scoped lang="less">
.sell-feature-container {
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
        .el-select,
        .el-input-group {
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
