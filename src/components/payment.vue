<template>
  <div>
    <header>
      <van-icon @click="backHandle" class="iconLeft" name="arrow-left" size="23px" />
      <p class="Vetit">华农统一收费</p>
    </header>
    <div class="containt-pay" style="margin-top:53px">
      <Head :parent-msg="this.list"></Head>
      <div class="main">
        <p class="mount-wrap">
          应付金额：
          <span class="mount">{{sumPermium}}</span>元
        </p>
        <!-- <img class="img" src="../assets/qr.jpg" alt /> -->
        <div class="home-container">
          <div class="banner-box">
            <canvas id="qrccode-canvas"></canvas>
          </div>
          <div class="btn-wrap">
            <img :src="this.bannerUrl" class="image" style="display:none" />

            <!-- <img class="img" :src="this.imgUrl" alt /> -->
            <!-- <button @click="createQrc">点击</button> -->
          </div>
        </div>
        <p class="instr">当地为支付实名制地区，请使用投保人本人账户支付</p>
        <div class="method">
          <div class="types">
            <span class="wx"></span>
            <span class="zfb"></span>
          </div>
          <p class="text">支持微信/支付宝扫码付款</p>
        </div>
        <p class="info">温馨提示：支付完成后，稍后可去我的订单查看支付状态</p>
        <div class="confirm">确认支付</div>
      </div>
    </div>
  </div>
</template>
<script>
var QRCode = require("qrcode");
var canvas = "";
import Head from "./module/head";
import { OfferPage } from "@/common/library/api";
export default {
  components: {
    Head
  },
  props: ["data"],
  data() {
    return {
      bannerUrl: "",
      orderNo: "",
      // plateNo: "",
      // name: "",
      sumPermium: "",
      list: []
    };
  },
  created() {
    this.bannerUrl = this.$route.params.imgUrl;
    this.orderNo = this.$route.params.orderNo;
    console.log(this.orderNo);
    console.log(this.bannerUrl);
    this.createQrc();
    console.log(this.bannerUrl);
    this.handle();
  },
  mounted() {
    this.$nextTick(function() {
      // DOM操作
      canvas = document.getElementById("qrccode-canvas");
    });
  },
  methods: {
    backHandle() {
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
        return false;
      } else {
        this.$router.go(-1);
      }
    },
    async handle() {
      const data = await OfferPage(this.orderNo);
      if (data.state === "200") {
        this.sumPermium = data.data.sumPermium;
        this.list = data.data;
        console.log(this.list);
      } else {
        alert("失败");
      }
    },
    createQrc() {
      console.log(12121);
      setTimeout(() => {
        if (!this.bannerUrl) {
          window.alert("链接不能为空");
          return false;
        }
        QRCode.toCanvas(canvas, this.bannerUrl, error => {
          if (error) {
            console.log(error);
          } else {
            console.log("success");
          }
        });
      });
    }
  }
};
</script>
<style lang="scss" scope>
@import "/style/head.scss";
.containt-pay {
  background: #fff;
  min-height: 100vh;
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .mount-wrap {
      font-size: 18px;
      color: #464646;
      .mount {
        color: #f68900;
      }
    }
    .img {
      width: 136px;
      height: 136px;
      margin: 18px 0;
    }
    .instr {
      font-size: 13px;
      line-height: 20px;
      color: #464646;
    }
    .method {
      margin-top: 24px;
      .types {
        display: flex;
        justify-content: space-around;
        .wx {
          width: 36px;
          height: 36px;
          background: url(../assets/wx.png) no-repeat;
          background-size: 100%;
        }
        .zfb {
          width: 36px;
          height: 36px;
          background: url(../assets/zfb.png) no-repeat;
          background-size: 100%;
        }
      }
      .text {
        font-size: 16px;
        color: #464646;
        margin-top: 20px;
      }
    }
    .confirm {
      width: 89%;
      margin: 20px 0 20px;
      border-radius: 5px;
      background: #568efc;
      font-size: 17px;
      color: #fff;
      line-height: 45px;
      text-align: center;
    }
    .info {
      padding-top: 15px;
      font-size: 12px;
      color: #464646;
    }
  }
}
</style>
