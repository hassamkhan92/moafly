<template>
  <div class="view_proposal1_main">
    <div class="view_proposal1_left">
      <div class="proposal1_left_top">
        <div class="proposal1_left_top_left">
          <p class="proposal1_left_top_left_text1">Posted 1 minute ago</p>
          <p class="proposal1_left_top_left_text2"><i class="el-icon-location-outline icon_right"></i>Los Angeles, California</p>
        </div>
        <div class="proposal1_left_top_right">
          <p class="proposal1_left_top_right_text1"><i class="el-icon-time icon_right"></i>$6.00-$12.00</p>
          <p class="proposal1_left_top_right_text1">Hourly</p>
        </div>
      </div>
      <div class="proposal1_left_center">Our team is looking for UI help. Preferably ongoing/long-term help.</div>
      <div class="proposal1_left_bottom">
        <div class="proposal1_left_bottom_left">
          <p class="proposal1_left_bottom_left_text1">Skills and Languages</p>
          <p class="proposal1_left_bottom_left_text2">Languages preferred</p>
          <ul class="options_box">
            <li v-for="item in language_optoins" :key="item.value">{{ item.label }}</li>
          </ul>
        </div>
        <div class="proposal1_left_bottom_right">
          <p class="proposal1_left_bottom_right_text1">Skills required</p>
          <ul class="options_box">
            <li v-for="item in skills_options" :key="item.value">{{ item.label }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="view_proposal1_right">
      <ul>
        <li class="view_proposal1_right_li" v-for="(item, idx) in iconsTitles" :key="idx">
          <span><i class="yello_icon" :class="item.icon"></i></span>
          <span class="yello_icon view_proposal1_right_text">{{ item.text }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
          label: 'Graphic Design',
          isSelect: false
        },
        {
          value: 2,
          label: 'English',
          isSelect: false
        },
        {
          value: 3,
          label: 'Content Writing',
          isSelect: false
        },
        {
          value: 4,
          label: 'HTML',
          isSelect: false
        },
        {
          value: 5,
          label: 'Writing',
          isSelect: false
        },
        {
          value: 6,
          label: 'Web Design',
          isSelect: false
        }
      ],
      iconsTitles: [
        // {
        //   icon: 'el-icon-edit-outline',
        //   text: 'Edit posting'
        // },
        // {
        //   icon: 'el-icon-view',
        //   text: 'View posting'
        // },
        {
          icon: 'el-icon-delete',
          text: 'Remove posting'
        },
        {
          icon: 'el-icon-lock',
          text: 'Make private'
        },
        {
          icon: 'el-icon-takeaway-box',
          text: 'View hires'
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.view_proposal1_main {
  margin-top: 32px;
  width: 100%;
  height: 397px;
  border: 1px solid #afafaf;
  .flex();
  .icon_right {
    margin-right: 8px;
  }
  .view_proposal1_left {
    width: calc(100% - 283px);
    height: 100%;
    .proposal1_left_top {
      .flex();
      border-bottom: 1px solid #afafaf;
      .proposal1_left_top_left {
        width: 50%;
        height: 100%;
        padding: 32px 24px;
        .proposal1_left_top_left_text1 {
          font-size: 14px;
          font-family: LibreFranklin-Regular, LibreFranklin;
          font-weight: 400;
          color: #999999;
          line-height: 17px;
        }
        .proposal1_left_top_left_text2 {
          font-size: 14px;
          font-family: LibreFranklin-Regular, LibreFranklin;
          font-weight: 400;
          color: #333333;
          line-height: 17px;
        }
      }
      .proposal1_left_top_right {
        width: 50%;
        height: 100%;
        padding: 32px 24px;
        .proposal1_left_top_right_text1 {
          font-size: 16px;
          font-family: LibreFranklin-SemiBold, LibreFranklin;
          font-weight: 600;
          color: #333333;
          line-height: 19px;
        }
        .proposal1_left_top_right_text2 {
          font-size: 14px;
          font-family: LibreFranklin-Regular, LibreFranklin;
          font-weight: 400;
          color: #333333;
          line-height: 17px;
        }
      }
    }
    .proposal1_left_center {
      width: 100%;
      height: 81px;
      border-bottom: 1px solid #afafaf;
      .flex();
      justify-content: flex-start;
      padding-left: 24px;
      font-size: 14px;
      font-family: LibreFranklin-Regular, LibreFranklin;
      font-weight: 400;
      color: #333333;
      line-height: 17px;
    }
    .proposal1_left_bottom {
      .flex();
      height: 202px;
      .options_box {
        width: 100%;
        .flex();
        justify-content: flex-start;
        flex-wrap: wrap;
        li {
          min-width: 70px;
          height: 23px;
          background: #f2f2f2;
          border-radius: 29px;
          font-size: 12px;
          font-family: LibreFranklin-Regular, LibreFranklin;
          font-weight: 400;
          color: #353f62;
          line-height: 15px;
          text-align: center;
          margin-top: 8px;
          margin-right: 8px;
          transition: all ease 0.5s;
          padding: 4px 12px;
          cursor: pointer;
        }
      }
      .proposal1_left_bottom_left {
        width: 50%;
        height: 100%;
        padding: 32px 24px;
        .proposal1_left_bottom_left_text1 {
          font-size: 16px;
          font-family: LibreFranklin-SemiBold, LibreFranklin;
          font-weight: 600;
          color: #333333;
          line-height: 19px;
          margin-bottom: 24px;
        }
        .proposal1_left_bottom_left_text2 {
          font-size: 14px;
          font-family: LibreFranklin-SemiBold, LibreFranklin;
          font-weight: 600;
          color: #333333;
          line-height: 17px;
        }
      }
      .proposal1_left_bottom_right {
        width: 50%;
        height: 100%;
        padding: 75px 24px 0 24px;
        .proposal1_left_bottom_right_text1 {
          font-size: 14px;
          font-family: LibreFranklin-SemiBold, LibreFranklin;
          font-weight: 600;
          color: #333333;
          line-height: 17px;
        }
      }
    }
  }
  .view_proposal1_right {
    width: 283px;
    height: 100%;
    border-left: 1px solid #afafaf;
    padding: 32px 24px;
    .view_proposal1_right_li {
      margin-bottom: 21px;
    }
    .view_proposal1_right_text {
      margin-left: 8px;
    }
    .yello_icon {
      color: #ff9a1c;
      font-size: 16px;
      font-family: LibreFranklin-SemiBold, LibreFranklin;
      font-weight: 600;
      color: #ff9a1c;
      line-height: 19px;
    }
  }
}
</style>
