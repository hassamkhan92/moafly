<template>
  <div class="count">
    <p>{{ contain }}</p>
    <p>{{ count }}</p>
  </div>
</template>

<script>
export default {
  props: ['contain'],
  data() {
    return {
      count: 3
    };
  },
  mounted() {
    this.countDown();
  },
  methods: {
    countDown() {
      let timer = setInterval(() => {
        this.count--;
        if (this.count == 0) {
          this.$emit('countDownEd');
        }
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
.count {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 500px;
  height: 200px;
  background-color: #ef4873;
  border-radius: 10px;
  .flex();
  flex-wrap: wrap;
  p {
    text-align: center;
    // line-height: 50px;
    width: 100%;
    font-size: 20px;
    color: #ffffff;
  }
}
</style>
