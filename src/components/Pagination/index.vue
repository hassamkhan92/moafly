<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from '@/util/scroll-to';

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number,
      default: 100
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50];
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit('update:page', val);
      }
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit('update:limit', val);
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('handleSizeChange', { page: this.currentPage, limit: val, val: val });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', { page: val, limit: this.pageSize });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    }
  }
};
</script>

<style scoped lang="less">
.pagination-container {
  background: #fff;
  padding: 10px 16px;
  /deep/.el-pagination {
    // height: 245px;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-pager {
      .number.active {
        background-color: #353f62;
      }
      li:not(.disabled):not(.active):hover {
        color: #353f62;
      }
    }
  }
}
.pagination-container.hidden {
  display: none;
}
</style>
