<template>
  <div class="contact">
    <!-- banner -->
    <div class="contact-banner">
      <img class="banner-img1" :src="require('@/assets/images/contact.png')" alt="" />
      <div class="title1">Let's Connect</div>
      <div class="title2">- Let's Connect -</div>
    </div>
    <!--  特色服务-->
    <div class="contact-service">
      <div class="service-center">
        <div class="service-item">
          <p class="service-icon">
            <img class="icon-img1" :src="service_icon4ImageUrl" alt="" />
            <img :src="service_icon1ImageUrl" alt="" />
          </p>
          <p class="service-title">General Inquiries</p>
          <p class="service-iphone">888.383.6881</p>
          <p class="service-email">noreply@moafly.com</p>
        </div>
        <div class="service-item">
          <p class="service-icon">
            <img class="icon-img1" :src="service_icon4ImageUrl" alt="" />
            <img :src="service_icon2ImageUrl" alt="" />
          </p>
          <p class="service-title">Technical Inquiries</p>
          <p class="service-email">help@moafly.com</p>
        </div>
        <div class="service-item">
          <p class="service-icon">
            <img class="icon-img1" :src="service_icon4ImageUrl" alt="" />
            <img :src="service_icon3ImageUrl" alt="" />
          </p>
          <p class="service-title">Complaints</p>
          <p class="service-email">wecare@moafly.com</p>
        </div>
      </div>
    </div>
    <bottonFooter></bottonFooter>
  </div>
</template>

<script>
import contact_us_01 from '@/assets/images/contact-us-01.png';
import contact_us_02 from '@/assets/images/contact-us-02.png';
import service_icon1 from '@/assets/images/general.png';
import service_icon2 from '@/assets/images/technical.png';
import service_icon3 from '@/assets/images/complaint.png';
import service_icon4 from '@/assets/images/contact-us-icon.png';
import bottonFooter from '@/components/footer/index';
export default {
  name: 'contact',
  components: {
    bottonFooter
  },
  data() {
    return {
      contact01ImageUrl: contact_us_01,
      contact02ImageUrl: contact_us_02,
      service_icon1ImageUrl: service_icon1,
      service_icon2ImageUrl: service_icon2,
      service_icon3ImageUrl: service_icon3,
      service_icon4ImageUrl: service_icon4
    };
  }
};
</script>

<style lang="less" scoped>
.contact {
  width: 100%;
  height: 100%;
  padding-top: 80px;
  .contact-banner {
    max-width: 1200px;
    width: 100%;
    height: 250px;
    position: relative;
    margin: 0 auto 50px;
    .flex();
    @media (min-width: 992px) {
      height: 500px;
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      object-fit: contain;
      object-position: center;
    }
    .title1 {
      position: absolute;
      height: 48px;
      top: 42%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: 'Libre Franklin';
      font-style: normal;
      font-weight: 700;
      color: rgba(55, 64, 95, 0.1);
      z-index: 2;
      width: 100%;
      text-align: center;
      font-size: 50px;
      line-height: 56px;
      @media (min-width: 992px) {
        font-size: 80px;
        line-height: 86px;
      }
    }
    .title2 {
      position: absolute;
      height: 48px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: 'Libre Franklin';
      font-style: normal;
      font-weight: 700;
      font-size: 30px;
      line-height: 36px;
      color: #37405f;
      z-index: 3;
      width: 100%;
      text-align: center;
      @media (min-width: 992px) {
        font-size: 40px;
        line-height: 48px;
      }
    }
  }
  .contact-service {
    width: 100%;
    padding: 24px 0 55px;
    .service-center {
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      .flex();
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 30px 0;
      .service-item {
        box-sizing: border-box;
        padding-left: 15px;
        padding-right: 15px;
        flex: 0 0 100%;
        @media (min-width: 768px) {
          flex: 0 0 calc(33.3333% - 30px);
        }
        .service-icon {
          img {
            width: 24px;
            height: 24px;
          }
          .icon-img1 {
            width: 18px;
            height: 18px;
            margin-right: -10px;
            transform: translateY(-10px);
          }
        }

        p {
          width: 100%;
          text-align: center;
          margin-bottom: 6px;
        }
        .service-title {
          font-family: 'Libre Franklin';
          font-style: normal;
          font-weight: 700;
          font-size: 18px;
          line-height: 24px;
          color: #0f1b43;
        }
        .service-iphone {
          font-family: 'Libre Franklin';
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          color: rgba(15, 27, 67, 0.8);
        }
        .service-email {
          font-family: 'Libre Franklin';
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          color: rgba(15, 27, 67, 0.8);
        }
      }
    }
  }
}
</style>
