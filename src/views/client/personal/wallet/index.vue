<template>
  <div v-loading="loading" class="wallet-main">
    <div class="wallet-info-box">
      <p class="wallet-title">Payment Setting</p>
      <empty v-if="!isCard" @handlerAddCard="handlerAddCard" class="empty-box"></empty>
      <template v-else>
        <div class="card-info-box">
          <div class="card-box">
            <div class="card-flex-box">
              <div class="card-round"></div>
              <div class="card-round"></div>
              <p class="card-box-title">{{ cardInfo.last4 }}</p>
            </div>
          </div>
          <div class="card-title-box">
            <div class="title-box">
              <p class="card-title">{{ cardInfo.brand }} {{ cardInfo.funding }}</p>
              <div class="card-round"></div>
              <div class="card-round"></div>
              <p class="card-title">{{ cardInfo.last4 }}</p>
            </div>
          </div>
          <div class="card-info">
            <div class="card-date">
              <p class="info-title">Expirtion date</p>
              <p class="info-title">{{ cardInfo.expMonth }}/{{ cardInfo.expYear }}</p>
            </div>
            <div class="line"></div>
            <div class="card-address">
              <p class="info-title">Billing address</p>
              <!-- <p class="info-title">1189 W 36 St 5 Los Angeles, CA 90007</p> -->
              <p class="info-title">{{ billAddress }}</p>
            </div>
          </div>
        </div>
        <div class="btn-box">
          <WButton class="profile" @handleClick="handlerRemove" radius="6px" text="Remove card" color="#DC5674" border="1px solid #DC5674" width="131px" height="27px" bgColor="#fff"></WButton>
        </div>
      </template>
    </div>
    <addCardDialog title="Add card" @handlerClose="handlerClose" ref="addCardDialog"> </addCardDialog>
    <removeCardDialog @handlerClose="handlerClose" ref="removeCardDialog"></removeCardDialog>
  </div>
</template>
<script>
import removeCardDialog from './components/removeCardDialog.vue';
import addCardDialog from './components/addCardDialog.vue';
import WButton from '@/components/Button';
import empty from './components/empty.vue';
import { getPayInfo, isEmpty } from '@/util/util.js';
export default {
  name: 'wallet',
  components: {
    empty,
    WButton,
    addCardDialog,
    removeCardDialog
  },
  data() {
    return {
      loading: false,
      btnLoad: false,
      isCard: true,
      cardInfo: {},
      payMethodId: '',
      billAddress: ''
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.getPayMethodList();
  },
  methods: {
    getPayMethodList() {
      this.loading = true;
      getPayInfo()
        .then(data => {
          if (data) {
            this.isCard = true;
            this.payMethodId = data.id;
            this.cardInfo = data.card;
            if (this.cardInfo.expMonth < 10) {
              this.cardInfo.expMonth = '0' + this.cardInfo.expMonth;
            }
            let billingDetails = data.billingDetails.address;
            this.billAddress =
              isEmpty(billingDetails.line1) +
              '\xa0' +
              isEmpty(billingDetails.line2) +
              '\xa0' +
              isEmpty(billingDetails.city) +
              '\xa0' +
              isEmpty(billingDetails.state) +
              '\xa0' +
              isEmpty(billingDetails.postalCode);
          } else {
            this.isCard = false;
          }
          this.loading = false;
        })
        .catch(error => {
          this.isCard = false;
          console.log(error);
        });
    },
    handlerAddCard() {
      this.$refs.addCardDialog.init();
    },
    handlerClose() {
      this.getPayMethodList();
    },
    handlerRemove() {
      this.$refs.removeCardDialog.init(this.payMethodId);
    }
  }
};
</script>
<style scoped lang="less">
p {
  margin: 0;
}
.wallet-main {
  width: 100%;
  height: 100%;
  .flex();
  align-items: flex-start;
  .wallet-info-box {
    position: relative;
    margin-top: 160px;
    width: 760px;
    height: 664px;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 16px;
    padding: 40px 80px;
    box-sizing: border-box;
    .wallet-title {
      .MoaflyText(600, 24px, 29px, #0f1b43);
    }
    .empty-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
    .card-info-box {
      margin-top: 40px;
      width: 100%;
      .card-box {
        width: 348px;
        height: 205.64px;
        background: url('~@/assets/images/wallet/wallet-card.png') no-repeat;
        padding: 15px 24px;
        box-sizing: border-box;
        .flex();
        justify-content: flex-start;
        align-items: flex-end;
        .card-flex-box {
          .flex();
          justify-content: flex-start;
          .card-round {
            width: 6px;
            height: 6px;
            background: #dc5674;
            border-radius: 50%;
            margin-right: 4px;
          }
          .card-box-title {
            .MoaflyText(400, 16px, 19px, #dc5674);
          }
        }
      }
      .card-title-box {
        width: 348px;
        height: 104px;
        background: url('~@/assets/images/wallet/wallet-title-bg.png') no-repeat;
        .flex();
        justify-content: flex-start;
        .title-box {
          .flex();
          justify-content: flex-start;
          .card-round {
            width: 6px;
            height: 6px;
            background: #0f1b43;
            border-radius: 50%;
            margin-left: 4px;
          }
          .card-title {
            margin-left: 4px;
            .MoaflyText(400, 16px, 19px, #0f1b43);
          }
        }
      }
      .card-info {
        width: 100%;
        padding-left: 2px;
        box-sizing: border-box;
        .flex();
        justify-content: flex-start;
        .info-title {
          .MoaflyText(500, 18px, 22px, #0f1b43);
          margin-bottom: 12px;
          white-space: nowrap;
        }
        .card-date {
          width: 180px;
        }
        .line {
          width: 1px;
          height: 40px;
          background: rgba(15, 27, 67, 0.2);
        }
        .card-address {
          margin-left: 60px;
        }
      }
    }
    .btn-box {
      position: absolute;
      right: 80px;
      bottom: 40px;
      .flex();
      .profile {
        margin-left: 8px;
      }
    }
  }
  .pay-container {
    position: absolute;
    top: 20%;
    top: 20%;
    z-index: 999;
    width: 400px;
    height: 400px;
    .border();
    background-color: #fff;
  }
}
</style>
