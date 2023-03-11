<template>
  <el-form class="sell-basics-content step3" :rules="rules" :model="form" ref="myForm">
    <div class="title">Basic information about your home.</div>
    <div class="content">
      <div class="form-content">
        <MFormItem label="HOA" prop="hoa">
          <MSelect :isSlot="true" v-model="form.hoa">
            <el-option v-for="(item, idx) in systemList.SeniorCommunity" :key="idx" :label="item" :value="item"> </el-option>
          </MSelect>
        </MFormItem>
        <MFormItem label="Living Area" prop="livingArea">
          <MInput append v-model="form.livingArea">
            <span slot="append">Sq Ft</span>
          </MInput>
        </MFormItem>
        <MFormItem label="Beds Total" prop="bedsTotal">
          <MSelect :isSlot="true" v-model="form.bedsTotal">
            <el-option v-for="(item, idx) in beds" :key="idx" :label="item" :value="item"> </el-option>
          </MSelect>
        </MFormItem>
        <MFormItem label="Baths" prop="baths">
          <MSelect :isSlot="true" v-model="form.baths">
            <el-option v-for="(item, idx) in baths" :key="idx" :label="item" :value="item"> </el-option>
          </MSelect>
        </MFormItem>
        <MFormItem label="Common Interest">
          <MSelect :isSlot="true" v-model="form.commonInsert">
            <el-option v-for="(item, idx) in systemList.CommonInterest" :key="idx" :label="item" :value="item"> </el-option>
          </MSelect>
        </MFormItem>
        <MFormItem label="Property Subtype">
          <MSelect :isSlot="true" v-model="form.propertySubtype">
            <el-option v-for="(item, idx) in propertySubtypeList" :key="idx" :label="item" :value="item"> </el-option>
          </MSelect>
        </MFormItem>
        <MFormItem label="Lot Size">
          <MInput append v-model="form.lotSize"> <span slot="append">Sq Ft</span></MInput>
        </MFormItem>
        <MFormItem label="Number of Units">
          <MSelect :isSlot="true" v-model="form.numberUnits">
            <el-option v-for="(item, idx) in beds" :key="idx" :label="item" :value="item"> </el-option>
          </MSelect>
        </MFormItem>
        <MFormItem label="Garage Spaces">
          <MSelect :isSlot="true" v-model="form.garageSpaces">
            <el-option v-for="(item, idx) in beds" :key="idx" :label="item" :value="item"> </el-option>
          </MSelect>
        </MFormItem>
        <MFormItem label="Senior Community">
          <MSelect :isSlot="true" v-model="form.seniorCommunity">
            <el-option v-for="(item, idx) in systemList.SeniorCommunity" :key="idx" :label="item" :value="item"> </el-option>
          </MSelect>
        </MFormItem>
        <MFormItem label="Structure Types">
          <MSelect :isSlot="true" v-model="form.structureType">
            <el-option v-for="(item, idx) in structureTypes" :key="idx" :label="item" :value="item"> </el-option>
          </MSelect>
        </MFormItem>
        <MFormItem label="Levels">
          <MSelect :isSlot="true" v-model="form.levels">
            <el-option v-for="(item, idx) in systemList.Levels" :key="idx" :label="item" :value="item"> </el-option>
          </MSelect>
        </MFormItem>
      </div>
      <div class="footer">
        <WButton radius="4px" text="Previous" color="#DC5674" border="1px solid #DC5674" width="100px" height="39px" bgColor="#fff" @handleClick="handlePre(3)"></WButton>
        <WButton radius="4px" text="Next" v-throttle v-loading="loading" width="84px" height="39px" @handleClick="handleNext" class="next-btn"></WButton>
      </div>
    </div>
  </el-form>
</template>
<script>
import MFormItem from '@/views/client/sell/components/MFormItem.vue';
import MSelect from '@/views/client/sell/components/MSelect.vue';
import MInput from '@/views/client/sell/components/MInput.vue';
import WButton from '@/components/Button';
import * as api from '@/api';
import selectData from '@/util/select';
import { mapGetters } from 'vuex';
import { listAssign, viladStep } from '@/util/index';
export default {
  components: { WButton, MFormItem, MSelect, MInput },
  data() {
    return {
      propertySubtypeList: selectData.propertySubtypeList,
      structureTypes: selectData.structureTypes,
      beds: selectData.beds,
      commonInserts: selectData.commonInserts,
      levels: selectData.levels,
      baths: selectData.baths,
      seniorCommuns: selectData.seniorCommuns,
      bgColor: '#ddd',
      loading: false,
      form: {
        baths: '',
        bedsTotal: '',
        hoa: '',
        livingArea: '',
        houseId: '',
        houseStep: '2',
        commonInsert: '',
        garageSpaces: '',
        levels: '',
        lotSize: '',
        numberUnits: '',
        propertySubtype: '',
        seniorCommunity: '',
        structureType: ''
      },
      rules: {
        hoa: [{ required: true, message: 'Select you HOA', trigger: 'change' }],
        livingArea: [{ required: true, message: 'Enter you Living area', trigger: 'blur' }],
        bedsTotal: [{ required: true, message: 'Select you Beds Total', trigger: 'change' }],
        baths: [{ required: true, message: 'Select you Baths', trigger: 'change' }]
      },
      disabledData: [
        {
          key: 'hoa',
          value: ''
        },
        {
          key: 'livingArea',
          value: ''
        },
        {
          key: 'bedsTotal',
          value: ''
        },
        {
          key: 'baths',
          value: ''
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['systemList']),
    isValid() {
      let result = parseFloat(this.form.livingArea);
      return result && typeof result == 'number';
    }
  },
  created() {
    this.form.lotSize = ' ';
  },
  mounted() {
    let homeInfo = this.$store.getters.homeInfo;
    if (homeInfo && homeInfo.houseId) {
      listAssign(this.form, homeInfo);
      this.form.houseStep = viladStep(homeInfo.houseStep, this.form.houseStep);
    }
  },
  methods: {
    handlePre() {
      this.$router.push('/sell/Address');
    },
    handleNext() {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          this.loading = true;
          api.home
            .addHome(this.form)
            .then(res => {
              if (res.code === 'K-000000') {
                let obj = this.$store.getters.homeInfo;
                this.$store.commit('SET_HOME_INFO', Object.assign(obj, this.form));
                this.$router.push('/sell/features');
                this.loading = false;
              } else {
                this.$message.error(res.message);
                this.loading = false;
              }
            })
            .catch(err => {
              this.$message.error(err);
              this.loading = false;
            });
        } else {
          console.log('验证不通过');
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
.sell-basics-content {
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
