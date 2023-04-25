<template>
  <div class="roadmap-container">
    <h3 class="section-title">Roadmap</h3>
    <div class="steps-wrap">
      <Step v-for="(step, index) in steps" :step="step" :key="index"></Step>
    </div>
  </div>
</template>

<script>
import Step from '../step';
import listHome from '@/assets/svg/listHome.vue';
import listingContract from '@/assets/svg/listingContract.vue';
import confirmPurchase from '@/assets/svg/confirmPurchase.vue';
import escrow from '@/assets/svg/escrow.vue';
import sold from '@/assets/svg/sold.vue';
export default {
  data() {
    return {
      steps: [
        {
          isActive: true,
          stepNumber: 1,
          icon: listHome,
          title: 'List home'
        },
        {
          isActive: true,
          stepNumber: 2,
          icon: listingContract,
          title: 'Listing contract'
        },
        {
          isActive: true,
          stepNumber: 3,
          icon: confirmPurchase,
          title: 'Confirm purchase contract'
        },
        {
          isActive: false,
          stepNumber: 4,
          icon: escrow,
          title: 'Tittle and Escrow'
        },
        {
          isActive: false,
          stepNumber: 5,
          icon: sold,
          title: 'Sold'
        }
      ]
    };
  },
  components: { Step, listHome, listingContract, confirmPurchase, escrow, sold }
};
</script>

<style lang="less" scoped>
@import './index';
</style>
