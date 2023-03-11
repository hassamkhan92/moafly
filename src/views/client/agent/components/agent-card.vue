<template>
  <div class="card-container">
    <div class="card-header">
      <img class="cover" :src="info.agentHeaderImg" />
      <i class="iconfont icon-shoucang"></i>
    </div>
    <div class="card-body">
      <div class="card-body-header">
        <h3>{{ info.agentName }}</h3>
        <div class="extra">{{ info.agentPrice }} USD/Hour</div>
      </div>
      <!-- v-html="
                agentIntroduce
                  .replace(/\n/g, '<br/>')
                  .replace(/&#60;i&#62;/g, '<i>')
                  .replace(/&#60;\/i&#62;/g, '</i>')
              " -->
      <p
        class="card-body-description"
        v-html="
          info.agentIntroduce
            .replace(/\n/g, ' ')
            .replace(/&#60;i&#62;/g, '')
            .replace(/&#60;\/i&#62;/g, '')
        "
      ></p>
      <div class="card-body-footer">
        <div class="footer-top">
          <div class="rate-box">
            <Rate :value="agentScore" :ShowText="false" style="width:auto"></Rate>
            <p class="rate-value">{{ agentScore }}</p>
          </div>
          <div class="position">
            <i class="iconfont icon-31dingwei"></i>
            <span>{{ info.agentLocation }}</span>
          </div>
        </div>
        <div class="footer-bottom">
          <router-link :to="`/agent-detail?id=${info.agentId}`">View Details &gt;&gt;&gt;</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Rate from '@/components/Rate/index.vue';
export default {
  props: ['info'],
  components: { Rate },
  date() {
    return {};
  },
  computed: {
    agentScore() {
      let rateValue = 0;
      if (this.info.agentScore) {
        rateValue = this.info.agentScore;
      } else {
        rateValue = 0.0;
      }
      return rateValue;
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.card-container {
  width: 100%;
  box-shadow: 0px 4px 31px rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  overflow: hidden;
  margin: auto;
  margin-top: 24px;
  position: relative;
  cursor: pointer;
  float: left;
  &:hover {
    .card-body {
      transform: translateY(-120px);
      background: rgba(255, 255, 255, 0.6);
    }
  }
}

.card-header {
  width: 100%;
  height: 380px;
  overflow: hidden;
  position: relative;
  .cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .iconfont {
    position: absolute;
    left: 15px;
    top: 15px;
  }
}
.card-body {
  padding: 16px 24px;
  font-family: 'Libre Franklin';
  font-style: normal;
  font-weight: 400;
  position: relative;
  transition: all 0.4s ease-in-out;
  background: #fcfcfd;
  box-sizing: border-box;
  .card-body-header {
    display: flex;
    justify-content: space-between;

    h3 {
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      color: #0f1b43;
    }

    .extra {
      font-size: 16px;
      line-height: 19px;
      color: #0f1b43;
    }
  }

  .card-body-description {
    margin-top: 12px;
    font-size: 16px;
    line-height: 19px;
    color: #000;
    margin-bottom: 0;
    max-height: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4; //自定义行数
    -webkit-box-orient: vertical;
  }
  .card-body-footer {
    width: 100%;
    position: absolute;
    top: 100%;
    padding: 10px 18px;
    box-sizing: border-box;
    left: 0;
    .footer-top {
      // display: flex;
      // justify-content: space-between;
      // align-items: center;
      .rate-box {
        .flex();
        justify-content: flex-start;
        .rate-value {
          width: 34px;
          height: 16px;
          background: #fdd446;
          border-radius: 6px;
          margin: 0;
          .flex();
          transform: translateY(2px);
        }
      }
      .position {
        margin-top: 10px;
        font-size: 16px;
        span {
          margin-left: 0.5em;
        }
      }
    }

    .footer-bottom {
      text-align: center;
      margin-top: 15px;
      a {
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        color: #dc5674;
      }
    }
  }
}
</style>
