<template>
  <div class="section-footer">
    <div class="content">
      <el-row class="row" type="flex">
        <el-col class="logo" :md="8">
          <img src="@/assets/images/index/logo-white.png" />
        </el-col>
        <el-col :md="8">
          <h4 style="color:#fff">Join us</h4>
          <ul>
            <li>
              <router-link to="/contact" class="router-link">Be a Moafly Agent</router-link>
            </li>
            <li>
              <router-link to="/contact" class="router-link">Get referrals</router-link>
            </li>
          </ul>
        </el-col>
        <el-col :md="8">
          <h4 style="color:#fff">Find us</h4>
          <ul>
            <li><router-link to="/contact" class="router-link">Contact Us</router-link></li>
            <li><router-link to="/contact" class="router-link">Help</router-link></li>
            <li>DRE #02168410</li>
          </ul>
        </el-col>
      </el-row>
      <div class="split-line"></div>
      <p class="copyright">Copyright © Moafly. All rights reserved. Patent pending.</p>
      <p class="copyright">
        By using moafly.com and Site Services, you agree to <a href="https://moaflytest.s3.us-east-2.amazonaws.com/Moafly+Terms+of+Use.pdf" class="router-link text-decoration">Terms of Use, </a>
        <a href="https://moaflytest.s3.us-east-2.amazonaws.com/moafly+privacy+policy.pdf" class="router-link text-decoration">Private Policy, </a>
        <a href="https://moaflytest.s3.us-east-2.amazonaws.com/Moafly+Fee+and+ACH+Disclosure.pdf" class="router-link text-decoration">Fee and ACH Authorization.</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      input: ''
    };
  }
};
</script>

<style scoped lang="less">
.section-footer {
  padding: 50px 30px;
  position: relative;
  background-color: rgba(16, 28, 66, 0.95);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url('~@/assets/images/index/footer-mask.png');
    z-index: -1;
  }
  .content {
    max-width: 1440px;
    width: 100%;
    margin: auto;

    font-family: 'Poppins';
    font-style: normal;
    color: #ffffff;

    .row {
      padding-bottom: 22px;
      flex-wrap: wrap;

      .logo {
        display: flex;
        justify-content: start;
        align-items: center;
        img {
          @media (max-width: 991.99px) {
            max-width: 180px;
          }
        }
      }

      h4 {
        font-weight: 600;
        font-size: 36px;
        line-height: 54px;
      }

      ul {
        margin-top: 4px;

        li {
          font-weight: 400;
          font-size: 22px;
          line-height: 33px;
          list-style-type: disc;
          list-style-position: inside;
        }
      }
    }
    .router-link {
      color: #fff;
    }
    .text-decoration {
      text-decoration: underline;
    }
    .split-line {
      max-width: 1440px;
      width: 100%;
      height: 1px;
      border: 1px solid rgba(255, 255, 255, 0.4);
    }
    .copyright {
      text-align: center;
      margin: 0;
      padding: 16px 0;
      font-weight: 400;
      font-size: 22px;
      line-height: 33px;
    }
  }
}
</style>
