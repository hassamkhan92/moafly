<template>
  <div class="step-wrap" :class="{ active: step.isActive }">
    <div class="badge">Step {{ step.stepNumber }}</div>
    <div class="content">
      <div class="icon-wrap">
        <div class="icon" :is="step.icon"></div>
      </div>
      <h5 class="title">{{ step.title }}</h5>
    </div>
    <roadmapArrow class="arrow-bottom" />
  </div>
</template>

<script>
import roadmapArrow from '@/assets/svg/roadmapArrow.vue';
export default {
  components: { roadmapArrow },
  props: {
    step: {
      isActive: {
        type: Boolean,
        default: false
      },
      stepNumber: {
        type: String,
        default: ''
      },
      icon: {
        type: [String, Object],
        default: 'div'
      },
      title: {
        type: String,
        default: ''
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import './index';
</style>
