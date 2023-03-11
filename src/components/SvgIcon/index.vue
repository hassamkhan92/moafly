<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
  <svg v-else :class="svgClass" :style="svgStyles" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: ''
    },
    className: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 24
    },
    plain: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.iconClass);
    },
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      let classList = 'svg-icon';
      if (this.className) {
        classList += ` ${this.className}`;
      }
      if (this.plain) {
        classList += ' svg-icon--plain';
      }
      return classList;
    },
    svgStyles() {
      // 目前主要是处理尺寸
      return `font-size: ${this.size}px;`;
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      };
    }
  }
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  stroke: currentColor;
  overflow: hidden;
}

.svg-icon--plain {
  stroke: none;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
