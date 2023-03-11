<template>
  <div class="list-container">
    <el-row type="flex" class="list-item" :class="'el-row-' + item.id" :gutter="40">
      <el-col :xs="12" :sm="12" :lg="5" class="item-col1">
        <div class="agentTitle">
          <!-- {{ item.taskTitle }} -->
          <VueText :value="item.taskTitle" style="width:150px"></VueText>
        </div>
        <div class="agentText">Proposals：{{ item.proposalNum }}</div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="5" class="item-col2">
        <div class="agentTitle">{{ parseTime(new Date(item.createTime), '{y}-{m}-{d}') }}</div>
        <div class="agentText">Hired：{{ item.hireNum }}</div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="5" class="item-col3">
        <div class="agentTitle agentTitle-col3 ">Public task</div>
      </el-col>
      <el-col :xs="0" :sm="1" :lg="1" class="item-col4"> </el-col>
      <el-col :push="1" :xs="24" :sm="11" :lg="7" class="item-col5">
        <div class="btn-text-box">
          <span @click="handlerView(item)" class="btn-task-text cursor">View task</span>
          <span @click="handlerEdit(item)" class="btn-Edit-text cursor">Edit </span>
          <span @click="handlerRemove(item)" class="btn-Edit-text cursor">Delete</span>
        </div>
        <div class="btn-box">
          <WButton
            class="btn cursor"
            bgColor="rgba(220, 86, 116, 0.3)"
            @handleClick="handlerToPathViewProposals(item.taskId)"
            text="VIEW PROPOSALS"
            width="154px"
            height="28px"
            size="12px"
            radius="6px"
            color="#DC5674"
            :iconShow="false"
          ></WButton>
        </div>
      </el-col>
    </el-row>
    <editPostDialog @initData="initData" ref="editPostDialog"></editPostDialog>
  </div>
</template>
<script>
import { parseTime } from '@/util/util';
import WButton from '@/components/Button';
import editPostDialog from './editPostDialog.vue';
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: { WButton, editPostDialog },
  data() {
    return {
      isView: true,
      totalHours: 0,
      totalMoney: 0,
      disabled: true,
      quesPopIsShow: false,
      form: {
        orderCode: this.item.orderCode,
        workOrderContext: ''
      },
      loading: true,
      timer: null,
      ruleForm: {
        workOrderContext: [{ required: true, message: 'Please enter the context', trigger: 'blur' }]
      }
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.timer = setTimeout(() => {
      this.loading = false;
    }, 1000 * 1);
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  methods: {
    parseTime,
    initData() {
      this.$emit('initData', 1);
    },
    handlerEdit(item) {
      this.$refs.editPostDialog.PostVisible = true;
      this.$refs.editPostDialog.init(item);
    },
    handlerView(item) {
      this.$emit('handlerView', item);
    },
    handlerRemove(item) {
      this.$emit('handlerRemove', item);
    },
    handlerToPathViewProposals(taskId) {
      this.$router.push(`/task/proposals?taskId=${taskId}`);
    }
  }
};
</script>
<style scoped lang="less">
.agentTitle {
  .MoaflyText(400, 14px, 17px, #0f1b43);
}
.agentText {
  .MoaflyText(400, 14px, 17px, rgba(15, 27, 67, 0.6));
  margin-top: 16px;
}
.list-container {
  width: 100%;
  margin-bottom: 16px;
  .el-row {
    width: 100%;
    min-height: 110px;
    background: rgba(15, 27, 67, 0.02);
    border-radius: 8px;
    margin: 0 !important;
    padding: 24px;
    flex-wrap: wrap;
    gap: 30px 0;
    .el-col {
      box-sizing: border-box;
      padding: 0 !important;
    }
    .item-col3 {
      .agentTitle-col3 {
        padding-left: 10px;
      }
    }

    .item-col5 {
      box-sizing: border-box;
      .btn-text-box {
        .btn-task-text {
          .MoaflyText(400, 14px, 17px, #dc5674);
        }
        .btn-Edit-text {
          .MoaflyText(400, 14px, 17px, #5268dc);
          margin-left: 8px;
        }
      }
      .btn-box {
        margin-top: 16px;
        width: 100%;
      }
    }
    .item-col4 {
      width: 2px;
      height: 59.54px;
      background: #f1f1f1;
    }
    .view-detail-title {
      .MoaflyText(400, 14px, 17px, #dc5674);
    }
  }
  .el-row-0 {
    margin-top: 60px;
  }
  .question-popups {
    /deep/.el-dialog-content {
      padding: 60px 80px;
      box-sizing: border-box;
    }
    .title {
      .MoaflyText(bold, 24px, 34px, #333333);
      height: 19px;
    }
    .content {
      margin-top: 20px;
    }
    .handle {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
  }
  /deep/.el-textarea {
    .el-textarea__inner:focus {
      border-color: #353f62;
    }
  }
}
</style>
