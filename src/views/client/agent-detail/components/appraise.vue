<template>
  <div class="appraise-container">
    <div class="appraise-item" v-for="item in appraiseList" :key="item.id">
      <div class="appraise-left">
        <img :src="item.headImg || require('@/assets/images/agent/appraise-avatar-2.png')" class="appraise-avatar" />
      </div>
      <div class="appraise-right">
        <div class="rate">
          <Rate :value="item.evaluateScore"></Rate>
        </div>
        <div class="desc regular-text">
          <!-- {{ item.evaluateContent }}
          -->
          He is really patient. I listed the needs of my husband and me for two pages, and He helped us analyze the advantages and disadvantages for a long time. We just finished the transfer
          procedures today. I'm looking forward to it!
        </div>
        <!-- <div class="tags-container">
          <span class="tag" v-for="el in item.tags" :key="el.id" :style="{ backgroundImage: `url(${el.url})`, backgroundRepeat: 'no-repeat', backgroundPosition: '0 0', backgroundSize: 'contain' }">{{
            el.value
          }}</span>
        </div> -->
        <div class="date">{{ timeFormat(item.evaluateTime) }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import Rate from '@/components/Rate/index.vue';
import { timeFormat } from '@/util/index.js';
export default {
  components: { Rate },
  props: {
    appraiseList: {
      type: Array,
      default: () => {
        return [
          {
            id: 0,
            evaluateScore: 5,
            evaluateContent:
              'Laura was fantastic and always on top of things. She provided an outstanding service and was constantly keeping us informed. I would not hesitate to recommend her to my friends and family.',
            tags: [
              {
                id: 1,
                value: 'Making Offer',
                url: require('@/assets/images/agent/tag-1.png')
              },
              {
                id: 2,
                value: 'Price Negotiation',
                url: require('@/assets/images/agent/tag-2.png')
              },
              {
                id: 3,
                value: 'House Touring',
                url: require('@/assets/images/agent/tag-3.png')
              },
              {
                id: 4,
                value: 'House Touring',
                url: require('@/assets/images/agent/tag-4.png')
              }
            ],
            evaluateTime: 'Rick C.@archiebreeker • 5 days ago'
          },
          {
            id: 1,
            evaluateScore: 4,
            evaluateContent:
              'Laura was fantastic and always on top of things. She provided an outstanding service and was constantly keeping us informed. I would not hesitate to recommend her to my friends and family.',
            tags: [
              {
                id: 1,
                value: 'Making Offer',
                url: require('@/assets/images/agent/tag-1.png')
              },
              {
                id: 2,
                value: 'Price Negotiation',
                url: require('@/assets/images/agent/tag-2.png')
              },
              {
                id: 3,
                value: 'House Touring',
                url: require('@/assets/images/agent/tag-3.png')
              },
              {
                id: 4,
                value: 'House Touring',
                url: require('@/assets/images/agent/tag-4.png')
              }
            ],
            evaluateTime: 'Jose C.@mpareja1 • 1 month ago'
          },
          {
            id: 2,
            evaluateScore: 5,
            evaluateContent:
              'Laura was fantastic and always on top of things. She provided an outstanding service and was constantly keeping us informed. I would not hesitate to recommend her to my friends and family.',
            tags: [
              {
                id: 1,
                value: 'Making Offer',
                url: require('@/assets/images/agent/tag-1.png')
              },
              {
                id: 2,
                value: 'Price Negotiation',
                url: require('@/assets/images/agent/tag-2.png')
              },
              {
                id: 3,
                value: 'House Touring',
                url: require('@/assets/images/agent/tag-3.png')
              },
              {
                id: 4,
                value: 'House Touring',
                url: require('@/assets/images/agent/tag-4.png')
              }
            ],
            evaluateTime: 'Karen B.@Dolores76 • 4 months ago'
          },
          {
            id: 3,
            evaluateScore: 5,
            evaluateContent:
              'Laura was fantastic and always on top of things. She provided an outstanding service and was constantly keeping us informed. I would not hesitate to recommend her to my friends and family.',
            tags: [
              {
                id: 1,
                value: 'Making Offer',
                url: require('@/assets/images/agent/tag-1.png')
              },
              {
                id: 2,
                value: 'Price Negotiation',
                url: require('@/assets/images/agent/tag-2.png')
              },
              {
                id: 3,
                value: 'House Touring',
                url: require('@/assets/images/agent/tag-3.png')
              },
              {
                id: 4,
                value: 'House Touring',
                url: require('@/assets/images/agent/tag-4.png')
              }
            ],
            evaluateTime: 'Rick C.@archiebreeker • 5 days ago'
          }
        ];
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    timeFormat(cellValue) {
      return timeFormat(cellValue, 'MM-dd-yyyy');
    }
  }
};
</script>
<style scoped lang="less">
.appraise-container {
  width: 100%;
  .appraise-item {
    width: 100%;
    margin-top: 80px;
    display: flex;
    .appraise-left {
      width: 72px;
      height: 72px;
      background: #42447b;
      border-radius: 8px;
      img {
        width: 72px;
        height: 72px;
      }
    }
    .appraise-right {
      margin-left: 30px;
      width: 80%;
      .rate {
        display: flex;
        align-items: center;
        background: #ffffff;
        font-size: 30px;
        font-weight: 400;
        color: #333333;
        /deep/.el-rate {
          margin-left: 10px;
          display: flex;
          align-items: center;
          .el-rate__icon {
            font-size: 20px;
          }
        }
      }
      .desc {
        font-size: 20px;
        font-weight: 400;
        color: #333333;
        line-height: 25px;
        margin-top: 30px;
      }
      .tags-container {
        margin-top: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .tag {
          padding: 5px 20px 5px 30px;
          font-size: 16px;
          font-weight: 400;
          color: #666666;
        }
      }
      .date {
        font-size: 20px;
        font-weight: 400;
        color: #999999;
        margin-top: 20px;
      }
    }
  }
  .appraise-item:first-child {
    margin-top: 0;
  }
}
</style>
