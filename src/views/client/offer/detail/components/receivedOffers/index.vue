<template>
  <div class="offer-container">
    <h4 class="section-title">Received offers</h4>
    <div class="offer">
      <div class="left">
        <pdfIcon class="icon" />
        <p class="document">Test.pdf</p>
      </div>
      <div class="right">
        <WButton type="" text="View detail >>>" class="view-details" @handleClick="onClick"></WButton>
      </div>
    </div>
    <div class="offer">
      <div class="left">
        <pdfIcon class="icon" />
        <p class="document">res_listing_agmt__exclusive (1).pdf</p>
      </div>
      <div class="right">
        <WButton type="" text="View detail >>>" class="view-details" @handleClick="onOfferAction"></WButton>
      </div>
    </div>
    <div class="offer">
      <div class="left">
        <pdfIcon class="icon" />
        <p class="document">res_listing_agmt__exclusive (1).pdf</p>
      </div>
      <div class="right">
        <WButton type="" text="View detail >>>" class="view-details"></WButton>
      </div>
    </div>
    <div class="offer">
      <div class="left">
        <pdfIcon class="icon" />
        <p class="document">res_listing_agmt__exclusive (1).pdf</p>
      </div>
      <div class="right">
        <WButton type="" text="View detail >>>" class="view-details"></WButton>
      </div>
    </div>
    <OffersModal :showModal="showOfferModal" @handlerClose="showOfferModal = false" />
    <OffersActionModal :showModal="showOfferActionModal" @handlerClose="showOfferActionModal = false" />
  </div>
</template>

<script>
import pdfIcon from '@/assets/svg/pdfIcon.vue';
import WButton from '@/components/Button';
import OffersModal from '../offersModal';
import OffersActionModal from '../offerActionModal';

export default {
  components: { pdfIcon, OffersModal, OffersActionModal, WButton },
  data() {
    return {
      showOfferModal: false,
      showOfferActionModal: false
    };
  },
  methods: {
    onClick() {
      this.showOfferModal = true;
    },
    onOfferAction() {
      this.showOfferActionModal = true;
    }
  }
};
</script>

<style lang="less" scoped>
@import './index';
</style>
