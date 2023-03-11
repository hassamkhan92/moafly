<template>
  <div class="sell-description-container">
    <div class="title">Please describe your home.</div>
    <el-form class="sell-description-form" :model="form" ref="form">
      <div class="content">
        <p class="moafly-try-title">
          Moafly AI tech can help you generate your customized home descrpition. <span class="auto-handle cursor" v-if="aiDescrpition" @click="hancleAutoCreate">Try it</span>
        </p>
        <MInput
          type="textarea"
          placeholder="Please enter the content"
          v-model="form.houseDescrible"
          :width="668"
          :height="400"
          :maxlength="2500"
          :show-word-limit="true"
          :minlength="100"
          :autosize="{ minRows: 15, maxRows: 25 }"
        ></MInput>
      </div>
    </el-form>
    <div class="footer">
      <WButton radius="4px" text="Previous" color="#DC5674" border="1px solid #DC5674" width="100px" height="39px" bgColor="#fff" @handleClick="handlePre"></WButton>
      <WButton radius="4px" text="Next" v-throttle v-loading="loading" :disabled="disabled" width="84px" height="39px" @handleClick="handleNext" class="next-btn"></WButton>
    </div>
  </div>
</template>
<script>
import MInput from '@/views/client/sell/components/MInput.vue';
import WButton from '@/components/Button';
import { addHomeInfo, listAssign, viladStep } from '@/util/index';
import * as api from '@/api';
export default {
  components: { WButton, MInput },
  data() {
    return {
      disabled: true,
      bgColor: '#ddd',
      form: {
        houseDescrible: '',
        houseStep: '5',
        houseId: ''
      },
      loading: false,
      aiDescrpition: false
    };
  },
  computed: {},
  created() {},
  mounted() {
    let homeInfo = this.$store.getters.homeInfo;
    //判断步骤是否含4判断是否可以生成自动描述
    let stepList = homeInfo?.houseStep.split(',');
    if (stepList.includes('4')) {
      this.aiDescrpition = true;
    }
    if (homeInfo && homeInfo.houseId) {
      listAssign(this.form, homeInfo);
      this.form.houseStep = viladStep(homeInfo.houseStep, this.form.houseStep);
    }
  },
  watch: {
    form: {
      deep: true,
      handler(val) {
        if (val.houseDescrible) {
          this.disabled = false;
          this.bgColor = '#353F62';
        } else {
          this.disabled = true;
          this.bgColor = '#ddd';
        }
      }
    }
  },
  methods: {
    hancleAutoCreate() {
      this.$loading.open();
      api.home
        .createHomeDescription(this.form.houseId)
        .then(res => {
          if (res.code === 'K-000000') {
            this.form.houseDescrible = res.context;
          } else {
            this.$message.error('Description generation failed');
          }
        })
        .catch(error => {
          this.$message.error('Description generation failed');
        })
        .finally(() => {
          this.$loading.close();
        });
    },
    handlePre() {
      this.$router.push('/sell/more-details');
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
              this.$router.push('/sell/photos');
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
p {
  margin: 0;
}
.sell-description-container {
  position: relative;
  width: 100%;
  height: 100%;
  .title {
    .MoaflyText(700, 26px, 32px, #0f1b43);
    margin-bottom: 40px;
  }
  .content {
    width: 814px;
    .moafly-try-title {
      .MoaflyText(400, 14px, 17px, rgba(15, 27, 67, 0.6));
      margin-bottom: 16px;
    }
    .auto-handle {
      color: #dc5674;
      margin-left: 2px;
    }
  }
  .footer {
    display: flex;
    position: absolute;
    right: 0;
    bottom: 60px;
    .next-btn {
      margin-left: 20px;
    }
  }
}
</style>
