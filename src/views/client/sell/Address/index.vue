<template>
  <div class="sell-address-container">
    <el-form ref="myForm" label-position="top" class="adress-form" label-width="0" :rules="rules" :model="form">
      <div class="content">
        <div class="title">Which home are you selling?</div>
        <MFormItem label="Addres" prop="houseAddress" class="full-field">
          <AddressInput v-model="form.houseAddress"></AddressInput>
        </MFormItem>
        <div v-if="formDatailIsShow" class="form-content">
          <MFormItem label="City" prop="houseCity">
            <MInput :width="187" v-model="form.houseCity"></MInput>
          </MFormItem>
          <MFormItem label="State" prop="houseState">
            <MSelect :width="187" :isSlot="true" v-model="form.houseState">
              <el-option v-for="(item, idx) in stateList" :key="idx" :label="item.abbr" :value="item.abbr"> </el-option>
            </MSelect>
          </MFormItem>
          <MFormItem label="Unit">
            <MInput :width="187" v-model="form.houseUnit"></MInput>
          </MFormItem>
          <MFormItem label="ZIP Code" prop="zipCode">
            <MInput :width="187" v-model="form.zipCode"></MInput>
          </MFormItem>
        </div>
        <div class="footer">
          <WButton radius="6px" text="Next" v-throttle v-loading="loading" width="84px" height="39px" @handleClick="handleNext()"></WButton>
        </div>
      </div>
    </el-form>
    <div class="map-container">
      <Map @complete="mapComplete"></Map>
      <div class="gmap-street-container" id="map-street"></div>
    </div>
  </div>
</template>
<script>
import WButton from '@/components/Button';
import MInput from '@/views/client/sell/components/MInput.vue';
import AddressInput from '@/components/addressInput';
import MFormItem from '@/views/client/sell/components/MFormItem.vue';
import MSelect from '@/views/client/sell/components/MSelect.vue';
import Map from '@/Gmap/ui/Map';
import stateList from '@/Gmap/assets/states.json';
import { autoSearch, addMarkerByPlace, addMarker, goToMarker, addStreetView, geocodeAddress } from '@/Gmap/core/index.js';
import { listAssign, viladStep } from '@/util/index';
import * as api from '@/api';
import areaList from './citys';
import { mapGetters } from 'vuex';
export default {
  components: { WButton, Map, MInput, MFormItem, MSelect, AddressInput },
  data() {
    return {
      stateList,
      formDatailIsShow: false,
      bgColor: '#DC5674',
      map: null,
      position: null,
      form: {
        houseAddress: '',
        houseCity: '',
        houseState: '',
        zipCode: '',
        houseStep: '1',
        houseUnit: ''
      },
      rules: {
        houseAddress: [{ required: true, message: 'Please provide the correct address', trigger: 'blur' }],
        houseCity: [{ required: true, message: 'Enter you City', trigger: 'blur' }],
        houseState: [{ required: true, message: 'Enter you State', trigger: 'blur' }],
        zipCode: [{ required: true, message: 'Enter you ZipCode', trigger: 'blur' }]
      },
      homeData: {},
      loading: false,
      disabledData: [
        {
          key: 'houseAddress',
          value: ''
        },
        {
          key: 'houseCity',
          value: ''
        },
        {
          key: 'zipCode',
          value: ''
        },
        {
          key: 'houseState',
          value: ''
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['homeInfo'])
  },
  watch: {
    //监听房屋di属性
    homeInfo: {
      deep: true,
      handler(newName, oldName) {
        if (newName.houseId != oldName.houseId) {
          let homeInfo = this.homeInfo;
          if (homeInfo && homeInfo.houseId) {
            listAssign(this.form, homeInfo);
            this.form.houseStep = viladStep(homeInfo.houseStep, this.form.houseStep);
            this.form.houseId = homeInfo.houseId;
            if (homeInfo.houseAddress) {
              this.formDatailIsShow = true;
            }
          }
        }
      }
    }
  },
  created() {},
  mounted() {
    let homeInfo = this.homeInfo;
    if (homeInfo && homeInfo.houseId) {
      listAssign(this.form, homeInfo);
      this.form.houseStep = viladStep(homeInfo.houseStep, this.form.houseStep);
      this.form.houseId = homeInfo.houseId;
      if (homeInfo.houseAddress) {
        this.formDatailIsShow = true;
      }
    }
    addStreetView('map-street', { lat: 40.731, lng: -73.997 });
  },
  methods: {
    /**
     * 点击下一步
     */
    handleNext() {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          this.loading = true;
          api.home
            .addHome(this.form)
            .then(res => {
              if (res.code === 'K-000000') {
                this.form.houseId = res.context.houseInfoVO.houseId;
                let formInfo = res.context.houseInfoVO;
                this.$store.commit('SET_HOME_ID', formInfo.houseId);
                this.$store.commit('SET_HOME_INFO', formInfo);
                this.$router.push('/sell/basics');
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
    },
    /**
     * 获取已有地址回显marker点
     */
    showMarker(address) {
      geocodeAddress(address)
        .then(location => {
          let marker = addMarker(this.map, location);
          let position = marker.getPosition();
          goToMarker(this.map, position);
        })
        .catch(err => {
          console.log('转换失败===>', err);
        });
    },
    /**
     * 地图加载完成
     */
    mapComplete(map) {
      this.map = map;
      let el = document.getElementById('auto-search-address');
      autoSearch(el, map, (res, place) => {
        this.formDatailIsShow = true;
        this.form.houseAddress = res.address;
        this.form.houseCity = res.locality;
        this.form.houseState = res.state;
        this.form.zipCode = res.postcode;
        let marker = addMarkerByPlace(map, place);
        this.position = marker.getPosition();
        if (!areaList.includes(res.locality)) {
          this.errorMsg = true;
          return;
        } else {
          this.errorMsg = false;
        }
        goToMarker(map, this.position);
        addStreetView('map-street', this.position);
      });
    }
  }
};
</script>
<style scoped lang="less">
.sell-address-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .adress-form {
    width: 100%;
    margin-bottom: 30px;
    @media (min-width: 768px) {
      width: calc(100% - 365px);
      margin-bottom: 0;
    }
    .content {
      padding-left: 15px;
      padding-right: 15px;
      .full-field {
        .el-input {
          width: 100% !important;
        }
      }
      .form-content {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin: 0 -15px;
        width: 100%;
        @media (min-width: 768px) {
          width: auto;
        }
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
          .el-input {
            width: 100% !important;
          }
        }
      }
    }
  }
  .map-container {
    width: 100%;
    margin-bottom: 30px;
    @media (min-width: 768px) {
      max-width: calc(350px - 15px);
      margin-bottom: 0;
      margin-left: 15px;
    }

    .gmap-map-container {
      width: 100%;
      height: 214px;
      margin-bottom: 16px;
    }
    .gmap-street-container {
      width: 100%;
      height: 214px;
    }
  }
  .title {
    .MoaflyText(700, 26px, 32px, #0f1b43);
    margin-bottom: 40px;
  }
  label.req::before {
    content: '* ';
    color: red;
  }
}
</style>
