<!-- 设计稿没有分页组件，目前写死读取1000条 -->

<template>
  <div class="agent-container">
    <h1>moafly agents</h1>
    <div class="filter">
      <label>FILTER BY：</label>
      <nav>
        <router-link to="?sort=rating">Rating: High to low</router-link>
        <router-link to="?sort=price-low">Price: Low to high</router-link>
        <router-link to="?sort=price-high">Price: High to low</router-link>
      </nav>
    </div>

    <div class="agents">
      <!-- <agent-card v-for="agent in agentList" :key="agent.agentId" :info="agent" /> -->
      <el-row class="agents-list" :gutter="24">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" v-for="agent in agentList" :key="agent.agentId">
          <agent-card :info="agent" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import AgentCard from './components/agent-card.vue';
import { agent } from '@/api';

export default {
  components: { AgentCard },
  data() {
    return {
      agentList: []
    };
  },
  mounted() {
    this.loadAgents();
  },
  methods: {
    loadAgents() {
      const sortTypes = ['rating', 'price-low', 'price-high'];
      let priceSort = sortTypes.indexOf(this.sortType);
      if (priceSort === -1) {
        this.$router.replace({ query: { sort: 'rating' } });
        return;
      }

      agent
        .listAgent({
          pageNum: 1,
          pageSize: 1000,
          priceSort
        })
        .then(({ context }) => {
          const { dataContent, totalNum } = context;
          this.agentList = dataContent;
        });
    }
  },
  computed: {
    sortType() {
      return this.$route.query.sort;
    }
  },
  watch: {
    sortType() {
      this.loadAgents();
    }
  }
};
</script>

<style lang="less" scoped>
.agent-container {
  max-width: 1200px;
  margin: auto;
  padding-top: 80px;
  font-style: normal;
  font-weight: 400;
  padding-bottom: 205px;
}

h1 {
  /* moafly agents */
  margin-top: 60px;
  font-size: 80px;
  line-height: 97px;
  font-style: normal;
  font-weight: 700;
  /* identical to box height */
  text-transform: uppercase;
  color: rgba(15, 27, 67, 0.06);
}

/* identical to box height */
.filter {
  margin-top: -20px;

  label {
    font-size: 24px;
    line-height: 29px;
    color: #0f1b43;
    font-weight: 700;
  }

  nav {
    display: inline-flex;
    gap: 24px;
    margin-left: 16px;

    a {
      font-size: 14px;
      line-height: 20px;
      @media (min-width: 768px) {
        font-size: 18px;
        line-height: 22px;
      }
      color: rgba(15, 27, 67, 0.6);
      position: relative;

      &.router-link-exact-active {
        color: #dc5674;

        &::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
          bottom: -8px;
          width: 88px;
          height: 2px;
          background: #dc5674;
          border-radius: 10px;
        }
      }
    }
  }
}

.agents {
  margin-top: 30px;
  .agents-list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
