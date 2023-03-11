<template>
  <div class="detail_info-Mostagents">
    <HeaderTitle title="Most Popular Moafly Agents" />
    <div class="agent_box">
      <transition name="slide">
        <div class="agent_swiper_box">
          <div ref="agent_swiper" class="agent_swiper" :style="{ width: 310 * agentSyncList.length + 'px' }">
            <div class="agent_item_box" v-for="(agentItem, agentIdx) in agentSyncList" :key="agentIdx" @click="handleViewDetail(agentItem)">
              <div class="agent_content">
                <img :src="agentItem.avatar" alt="" style="object-fit:cover" />
                <div class="agentItem_title_box">
                  <p class="agent_item_name">{{ agentItem.name }}</p>
                  <p class="agent_item_score">
                    <span class="score transform_score">
                      <el-rate disabled :value="Number(agentItem.rate)" :show-score="false" text-color="#FDD546" :colors="['#FDD546', '#FDD546', '#FDD546']" void-color="#D9D9D9"> </el-rate>
                    </span>
                    <span class="score number_score">{{ agentItem.rate }}</span>
                  </p>
                  <p class="agent_item_service agent_item_title">
                    <i class="el-icon-discount"></i><span class="transform_title">{{ agentItem.price }} USD / hour</span>
                  </p>
                  <p class="agent_item_adress agent_item_title">
                    <i class="el-icon-location-outline"></i><span class="transform_title">{{ agentItem.address }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import * as api from '@/api';
import { formatData } from '@/views/client/agent/index.js';
import HeaderTitle from './HeaderTitle.vue';
export default {
  components: {
    HeaderTitle
  },
  data() {
    return {
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        priceSort: 0
      },
      agentSyncList: [],
      num: 0
    };
  },
  created() {
    this.getAgentData();
  },
  methods: {
    handleViewDetail(item) {
      this.$router.push('/agent-detail?id=' + item.id);
    },
    getAgentData() {
      api.agent.listAgent(this.queryParams).then(res => {
        console.log('res===>', res);
        if (res.code === 'K-000000') {
          this.agentSyncList = formatData(res.context.dataContent).splice(0, 6);
          this.agentSyncList = this.agentSyncList.sort(this.compare('rate', 0));
          console.log('this.agentSyncList===>', this.agentSyncList);
        }
      });
    },
    compare(attr, rev) {
      //第二个参数没有传递 默认升序排列
      if (rev == undefined) {
        rev = 1;
      } else {
        rev = rev ? 1 : -1;
      }
      return function(a, b) {
        a = a[attr];
        b = b[attr];
        if (a < b) {
          return rev * -1;
        }
        if (a > b) {
          return rev * 1;
        }
        return 0;
      };
    }
  }
};
</script>

<style lang="less" scoped>
.detail_info-Mostagents {
  width: 100%;
  padding-top: 24px;
  padding-bottom: 23px;
  border-bottom: 1px solid #eeeeee;
  .agent_box {
    width: 100%;
    position: relative;
    .click {
      position: absolute;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15);
      background: #ffffff;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 11;
      .flex();
      transition: all ease 0.5s;
      &:hover {
        transition: all ease 0.5s;
        transform: scale(1.1) translateY(-50%);
      }

      .el-icon-back {
        font-size: 60px;
        color: #353f62;
      }
    }
    .right_click {
      left: auto;
      right: 0;
    }
    .agent_swiper_box {
      width: 100%;
      height: 100%;
      position: relative;
    }
    .agent_swiper {
      // position: absolute;
      // left: 0;
      // top: 0;
      height: 100%;
      display: flex;
      align-items: center;
      transition: all ease 0.5s;
    }
    .agent_item_box {
      .agent_content {
        width: 100%;
        min-height: 437px;
        float: left;
        background: #ffffff;
        box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15);
        border-radius: 16px;
        cursor: pointer;
        &:nth-last-child(1) {
          margin-right: 0;
        }
        .agentItem_title_box {
          padding: 0 16px;
          box-sizing: content-box;
        }
        img {
          width: 100%;
          height: 282px;
          border-top-right-radius: 10px;
          border-top-left-radius: 10px;
        }
        .agent_item_name {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 700;
          font-size: 18px;
          line-height: 22px;
          color: #000000;
          margin-top: 16px;
          margin-bottom: 9px;
        }
        .agent_item_score {
          margin-bottom: 14px;
          .score {
            display: inline-block;
          }
          .number_score {
            width: 34px;
            height: 16px;
            background: #fdd546;
            text-align: center;
            line-height: 16px;
            font-size: 12px;
            border-radius: 6px;
            color: #fff;
          }
          .transform_score {
            transform: translateX(2px) translateY(-2px);
            /deep/.el-rate__icon {
              font-size: 20px;
            }
          }
        }
        .agent_item_title {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 19px;
          color: #373f5f;
          .el-icon-discount {
            transform: rotateZ(45deg);
          }
          .transform_title {
            margin-left: 3px;
          }
        }
        .agent_item_service {
          color: #373f5f;
        }
      }
    }
  }
}
</style>
