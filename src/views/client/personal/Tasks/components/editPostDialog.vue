<template>
  <MoaflyDialog class="post-dialog" :visible.sync="PostVisible" title="Edit posting">
    <el-form class="post-form" label-position="top" :model="postForm" ref="ruleForm" label-width="200px">
      <el-form-item label="Write a title for your task post">
        <MoaflyInput v-model="postForm.taskTitle" width="430" height="32"></MoaflyInput>
      </el-form-item>
      <el-form-item label="Language preferred">
        <MoaflySelect multiple v-model="languages" width="430" height="32">
          <el-option v-for="item in language_optoins" :key="item.value" :label="item.label" :value="item.value"></el-option
        ></MoaflySelect>
      </el-form-item>
      <el-form-item label="Skills required">
        <MoaflySelect multiple v-model="skills" width="430" height="32"> <el-option v-for="item in skills_options" :key="item.value" :label="item.label" :value="item.value"></el-option></MoaflySelect>
      </el-form-item>
      <el-form-item label="Describe your job">
        <MoaflyInput type="textarea" v-model="postForm.taskDetail" width="430" height="67"></MoaflyInput>
      </el-form-item>
      <el-form-item class="form-radio" label-width="0" label="">
        <el-radio-group fill="#DC5674" v-model="postForm.payType">
          <el-radio :label="1">Hourly rate</el-radio>
          <el-radio :label="2">Task budget</el-radio>
        </el-radio-group>
      </el-form-item>
      <template>
        <el-form-item v-if="postForm.payType === 1" class="form-item" label="From">
          <div>
            <MoaflyInput @input="onInput('minHourPrice')" v-model="postForm.minHourPrice" class="form-input" width="113" height="32"></MoaflyInput>
            <p class="hour-title">/hour</p>
          </div>
          <div>
            <MoaflyInput @input="onInput('maxHourPrice')" class="form-input" v-model="postForm.maxHourPrice" width="113" height="32"></MoaflyInput>
            <p class="hour-title">/hour</p>
          </div>
        </el-form-item>
        <el-form-item v-else label="Maximum project budget (USD)">
          <MoaflyInput @input="onInput('projectPrice')" v-model="postForm.projectPrice" width="430" height="32"></MoaflyInput>
        </el-form-item>
      </template>

      <div class="btn-box">
        <WButton
          class="btn cursor"
          border="1px solid #DC5674"
          bgColor="#FFFFFF"
          text="Cancel"
          width="120px"
          height="32px"
          size="16px"
          radius="6px"
          color="#DC5674"
          :iconShow="false"
          @handleClick="handlerColse"
        ></WButton>
        <WButton
          class="btn cursor"
          v-loading="btnLoad"
          bgColor="#DC5674"
          text="Confirm"
          width="120px"
          height="32px"
          size="16px"
          radius="6px"
          color="#FFFFFF"
          :iconShow="false"
          @handleClick="handlerSubmit"
        ></WButton>
      </div>
    </el-form>
  </MoaflyDialog>
</template>

<script>
import { numberFormat, numberParse } from '@/util/index';
import MoaflyDialog from '@/components/MoaflyDialog';
import MoaflyInput from '@/components/MoaflyInput';
import MoaflySelect from '@/components/MoaflySelect';
import WButton from '@/components/Button';
import * as api from '@/api';
export default {
  name: 'editPostDialog',
  components: {
    WButton,
    MoaflyDialog,
    MoaflyInput,
    MoaflySelect
  },
  data() {
    return {
      PostVisible: false,
      btnLoad: false,
      skills: [],
      languages: [],
      postForm: {
        taskId: '',
        taskTitle: '',
        skills: [],
        languages: [],
        description: '',
        taskDetail: '',
        payType: '',
        minHourPrice: '',
        maxHourPrice: '',
        projectPrice: ''
      },
      rules: [],
      language_optoins: [
        {
          value: 1,
          label: 'Chinese',
          isSelect: false
        },
        {
          value: 2,
          label: 'English',
          isSelect: false
        },
        {
          value: 3,
          label: 'French',
          isSelect: false
        },
        {
          value: 4,
          label: 'Japanese',
          isSelect: false
        },
        {
          value: 5,
          label: 'Korean',
          isSelect: false
        },
        {
          value: 6,
          label: 'Spanish',
          isSelect: false
        }
      ],
      skills_options: [
        {
          value: 1,
          label: 'Contracting',
          isSelect: false
        },
        {
          value: 2,
          label: 'House touring',
          isSelect: false
        },
        {
          value: 3,
          label: 'Price negotiation',
          isSelect: false
        },
        {
          value: 4,
          label: 'Staging',
          isSelect: false
        },
        {
          value: 5,
          label: 'Escrow',
          isSelect: false
        },
        {
          value: 6,
          label: 'Title',
          isSelect: false
        },
        {
          value: 7,
          label: 'Photographing',
          isSelect: false
        },
        {
          value: 8,
          label: 'List my home',
          isSelect: false
        }
      ]
    };
  },
  methods: {
    onInput(name) {
      this.postForm[name] = numberFormat(this.postForm[name]);
    },
    init(item) {
      this.postForm.taskTitle = item.taskTitle;
      this.skills = this.initSelectData(item.skills);
      this.languages = this.initSelectData(item.languages);
      this.postForm.taskId = item.taskId;
      this.postForm.taskDetail = item.taskDetail;
      this.postForm.payType = item.payType;
      this.postForm.minHourPrice = numberFormat(item.minHourPrice);
      this.postForm.maxHourPrice = numberFormat(item.maxHourPrice);
      this.postForm.projectPrice = numberFormat(item.projectPrice);
    },
    handlerColse() {
      this.PostVisible = false;
    },
    handlerSubmit() {
      let languages = this.getSelectData(this.language_optoins, this.languages);
      let skills = this.getSelectData(this.skills_options, this.skills);
      this.postForm.skills = JSON.stringify(skills);
      this.postForm.languages = JSON.stringify(languages);
      this.postForm.minHourPrice = numberParse(this.postForm.minHourPrice);
      this.postForm.maxHourPrice = numberParse(this.postForm.maxHourPrice);
      this.postForm.projectPrice = numberParse(this.postForm.projectPrice);
      this.btnLoad = true;
      api.task
        .UserUpdateTask(this.postForm)
        .then(res => {
          if (res.code == 'K-000000') {
            this.btnLoad = false;
            this.$message.success('Congratulations on your new task post!');
            this.handlerColse();
            this.$emit('initData');
          } else {
            this.$message.error(res.message);
            this.btnLoad = false;
          }
        })
        .catch(error => {
          this.btnLoad = false;
          this.$message.error('Something went wrong with our server');
        });
    },
    //初始化选择框数据
    initSelectData(data) {
      let selectData = JSON.parse(data);
      if (selectData && selectData.length) {
        return selectData.map(item => {
          return item.id;
        });
      } else {
        return [];
      }
    },
    //格式化选择框数据
    getSelectData(Arayy, data) {
      let selectData = [];
      Arayy.forEach(item => {
        data.forEach(select => {
          if (item.value === select) {
            let obj = {
              id: item.value,
              value: item.label
            };
            selectData.push(obj);
          }
        });
      });
      return selectData;
    }
  }
};
</script>
<style lang="less"></style>
<style lang="less" scoped>
/deep/.el-dialog {
  width: 500px;
  height: 636px;
  border-radius: 16px;
  .el-dialog__body {
    padding: 24px;
  }
}
/deep/.post-form {
  .el-form-item {
    margin-bottom: 12px;
    .el-form-item__content {
      line-height: 30px;
    }
    .el-form-item__label {
      .MoaflyText(500, 14px, 17px, #0f1b43);
    }
  }
  .form-item {
    .el-form-item__content {
      .flex();
      justify-content: flex-start;
      .form-input {
        margin-right: 24px;
      }
    }
  }
}
.post-dialog {
  p {
    margin: 0;
  }
  .hour-title {
    width: 113px;
    margin-top: 4px;
    text-align: right;
    .MoaflyText(500, 12px, 15px, rgba(15, 27, 67, 0.6));
  }
  .btn-box {
    margin-top: 44px;
    width: 100%;
    .flex();
    justify-content: center;
    .btn {
      margin-right: 16px;
    }
  }
}
</style>
