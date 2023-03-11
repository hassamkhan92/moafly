<template>
  <div v-cloak class="ycc-third-four-main">
    <div class="third-four-center">
      <div class="four-stepBox collCommon">
        <el-select v-if="!cqgs" v-model="titlecompany" class="select-type" size="medium" placeholder="Select Escrow Company" @change="selectCompany">
          <el-option v-for="item in hometype" :key="item.userid" :label="item.agentName" :value="item.userid"> </el-option>
        </el-select>
        <!-- 未选取第三方公司 -->
        <el-collapse v-show="CollapseItemList.length && !cqgs" class="four-steps" accordion>
          <transition-group>
            <el-collapse-item v-for="item in CollapseItemList" :key="item.requireId" class="collapse-step">
              <template slot="title">
                <i class="iconfont icon-duihao icons"></i>
                <!-- <i v-else class="iconfont icon-wenhao icons"></i> -->
                <span class="step-name">{{ item.requireTitle }}</span>
              </template>
              <div v-if="item.requireDescribed" type="textarea" class="describe-ipt1">{{ item.requireDescribed }}</div>
              <el-button v-if="item.viekPdf" @click="doView(item.viekPdf)" class="view text-hover" type="text"><i class="iconfont icon-xiazai icons" />Document</el-button>
              <div v-else class="add-btn">
                <el-button type="text" class="document addButs text-hover" @click="doCument(item.pdfUrl)"><i class="iconfont icon-wenjian icons"></i>Document 01</el-button>
                <!-- <el-upload ref="upload" :limit="1" :on-change="uploadChange" class="upload-demo" action="/api/moafly/hose/uploadpdf" :auto-upload="false" :file-list="fileList" multiple>
                  <el-button type="text" class="another addButs text-hover"><i class="iconfont icon-untitled icons" />Upload Document</el-button>
                </el-upload> -->
              </div>
            </el-collapse-item>
          </transition-group>
        </el-collapse>
        <!-- 已选取第三方公司 -->
        <el-collapse v-if="CollapseItemList1.length && cqgs" class="four-steps" accordion>
          <el-collapse-item v-for="item in CollapseItemList1" :key="item.requireId" class="collapse-step">
            <template slot="title">
              <i v-if="item.finish == '1' ? true : false" class="iconfont icon-duihao icons"></i>
              <i v-else-if="item.pdfAddress && item.finish !== '1'" class="iconfont icon-duihao iconPdf  icons"></i>
              <i v-else class="iconfont icon-yuan icons"></i>
              <span class="step-name">{{ item.pdfTitle }}</span>
            </template>
            <div type="textarea" class="describe-ipt1">{{ item.content }}</div>
            <!-- <el-button v-if="item.viekPdf" @click="doView(item.viekPdf)" class="view text-hover" type="text"><i class="iconfont icon-xiazai icons" />Document</el-button> -->
            <div class="add-btn">
              <el-button v-if="item.pdfAddress1" type="text" class="document addButs text-hover" @click="doCument(item.pdfAddress1)"><i class="iconfont icon-wenhao icons"></i>Explain</el-button>
              <el-button v-if="item.pdfAddress" type="text" class="document addButs text-hover" @click="doCument(item.pdfAddress)"><i class="iconfont icon-wenjian icons"></i>Document</el-button>
              <el-upload
                v-if="item.finish == '1' ? false : true"
                ref="upload"
                :limit="1"
                :on-change="
                  (file, fileList) => {
                    uploadChange(file, fileList, item);
                  }
                "
                class="upload-demo"
                :action="titleViewUrl"
                :auto-upload="false"
                :file-list="fileList"
              >
                <el-button type="text" class="another addButs text-hover"><i class="iconfont icon-untitled icons" />Upload Document</el-button>
              </el-upload>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div v-if="CollapseItemList1.length == 0 && cqgs" class="no-result" style="font-size:30px;color:#fff">
          No Task
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { titleCompanyList, titleSearch, serchTitleUpload } from '@/api/other';
import { checkFile1 } from '@/util/index';
import { titleView } from '@/api/upload';
export default {
  components: {},
  props: ['titleName', 'hoseId', 'cqgs'],
  data() {
    return {
      titleViewUrl: titleView,
      // 附件列表
      fileList: [],
      // 允许的文件类型
      fileType: ['pdf'],
      // 运行上传文件大小，单位 M
      fileSize: 5,
      iconShow: true,
      imgUrl: process.env.VUE_APP_IMGURL,
      accollName: '',
      stepName: '',
      stepNameShow: true,
      titlecompany: '',
      hometype: [],
      CollapseItemList: [],
      CollapseItemList1: [],
      titleId: ''
    };
  },
  created() {
    if (this.cqgs) {
      this.getSellVeeklist(this.cqgs);
    } else {
      this.getcompanyList();
    }
  },
  methods: {
    //获取第三方步骤条
    selectCompany(val) {
      this.titleId = val;
      this.$emit('selectCompany', val);
      titleSearch({ userId: val }).then(res => {
        if (res.code === 200) {
          this.CollapseItemList = res.data;
        }
      });
    },
    //获取卖家任务
    getSellVeeklist(cqgs) {
      serchTitleUpload({ HoseId: this.hoseId, CenterId: cqgs }).then(res => {
        if (res.code == 200) {
          this.CollapseItemList1 = res.rows;
        }
      });
    },
    //上传文件
    uploadChange(file, fileList, item) {
      if (checkFile1(file, this.fileType, this.fileSize)) {
        const formData = new FormData();
        formData.append('hoseId', this.hoseId);
        formData.append('pdfId', item.pdfId);
        formData.append('pdf', file.raw);
        axios.post(titleView, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
          if (res.data.code === 200) {
            this.getSellVeeklist(this.cqgs);
          }
        });
      } else {
        fileList.splice(-1, 1);
      }
    },
    //查看链接
    doCument(item) {
      window.open(this.imgUrl + item);
    },
    //获取第三方公司
    getcompanyList() {
      let data = {
        agentTypes: [1, 2].join(',')
      };
      titleCompanyList(data).then(res => {
        if (res.code === 200) {
          this.hometype = res.rows;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.icon-duihao {
  .iconSize();
  color: #ef4873;
}
.icon-xiazai {
  .iconSize();
  color: #ef4873;
}
.icon-wenjian {
  .iconSize();
  color: #ef4873;
}
.icon-wenhao {
  .iconSize();
  color: #ef4873;
}
.iconPdf {
  color: #48ef48;
}
.icon-yuan {
  .iconSize();
  color: #0b132e;
}
.icon-jiahao {
  .iconSize();
}
.icon-untitled {
  .iconSize();
}
.icons {
  // color: red;
  margin-right: 20px;
  height: 100%;
}
#__nuxt,
#__layout,
.ycc-third-four-main {
  width: 345px;
  overflow: hidden;
  .third-four-center {
    margin: auto;
    .four-stepBox {
      margin-top: 20px;
      .select-type {
        width: 100%;
        height: 40px;
        .text(@size:18px, @color:#DEDEDE, @family: 'Lato-Medium', @weight:400, @align:left, @height:22px);
      }
      /deep/.collapse-step {
        .border-radius(10px);
        .describe-ipt1 {
          margin-top: 15px;
          padding: 2px 5px;
          .text(@size:14px, @color:#DEDEDE, @family: 'Lato-Medium', @weight:400, @align: '', @height:27px);
          height: 107px;
          .border-radius(10px);
          .bg(@color:#2f395d);
        }
        .view {
          background: #0f1b43;
          .clearbtn();
          .text(@size:22px, @color:#DEDEDE, @family: 'Lato-Medium', @weight:400, @align: '', @height:27px);
        }
        .text-hover:hover {
          color: #ef4873;
        }
        .add-btn {
          width: 100%;
          margin-top: 30px;
          .upload-demo {
            .el-upload {
              text-align: left;
            }
          }
          /deep/.addButs {
            width: 40%;
            height: 100%;
            margin-right: 10px;
            background: #0f1b43;
            .clearbtn();
            .text(@size:22px, @color:#DEDEDE, @family: 'Lato-Medium', @weight:400, @align: '', @height:27px);
          }
        }
        .el-collapse-item__header {
          width: 345px;
          height: 50px;
          .border-radius(10px);
          .bg(@color:#2f395d);
          .flex();
          justify-content: flex-start;
          .step-name {
            // margin-left: 20px;
            .text(@size:18px, @color:#ffffff, @family: 'Lato-Medium', @weight:400, @align: '', @height:50px);
          }
        }
      }

      .stepName {
        width: 200px;
        height: 50px;
        color: #fff;
        .clearbtn();
        .border-radius(10px);
        .bg(@color:#2f395d);
      }
      .stepName::-webkit-input-placeholder {
        /* placeholder颜色  */
        color: #fff;
        /* placeholder字体大小  */
        font-size: 18px;
        padding-left: 10px;
      }
    }
  }
  .submit-box {
    width: 100%;
    height: 40px;
    margin-top: 54px;
    display: flex;
    justify-content: center;
    .submit-btn {
      width: 229px;
      height: 40px;
      background: #ef4873;
      .text(@size:22px, @color:#ffffff, @family: 'Lato-Medium', @weight:400, @align: '', @height:27px);
      .clearbtn();
      .border-radius(10px);
    }
  }
}
</style>
