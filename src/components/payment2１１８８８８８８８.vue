<template>
  <div>
    <header>
      <van-icon @click="backHandle" class="iconLeft" name="arrow-left" size="23px" />
      <p class="Vetit">华农统一收费</p>
    </header>
    <div class="containt-pay" style="margin-top:38px">
      <div class="head-containt">
        <div class="instr">
          <div class="left">
            <div class="item">
              <span class="plate">{{plateNo}}</span>
              <span class="name">{{name}}</span>
              <!-- <span class="name">{{ this.parentMsg.tax.sumTax}}</span> -->
            </div>
          </div>
          <div class="right">
            <div
              class="item"
              v-for="(item,index) in this.riskList"
              :key="index"
              style="margin-bottom:30px;"
            >
              <p class="insurance-type">
                {{item.riskName}}
                <span>{{item.startDate}}-{{item.endDate}}</span>
              </p>
              <p style="padding-top:8px;" class="pre">
                <span>保费：{{item.premium}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <!-- <span class="tax">车船税：</span> -->
                <span v-show="item.riskCode == '507'">车船税：{{sumTax2}}</span>
              </p>
              <!-- <p class="insurance-no">保单号：W20175609988</p> -->
            </div>
          </div>
          <!-- <span class="tax2">车船税：{{this.parentMsg.tax.sumTax}}</span> -->
        </div>
      </div>
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
      sumTax2:'',
      bannerUrl: "",
      orderNo: "",
      plateNo:'',
      // plateNo: "",
      name: "",
      sumPermium: "",
      list: []
    };
  },
  created() {
    this.res = this.$route.params.res;
    // this.orderNo = this.$route.params.orderNo;
    // console.log(this.orderNo);
    this.bannerUrl = this.res.payUrl;
    this.sumPermium = this.res.sumPermium;
    this.riskList = this.res.riskList;
    this.plateNo = this.res.car.plateNo;
    this.name = this.res.customer.name;
    this.sumTax2 = this.res.tax.sumTax;
    this.createQrc();
  },
  mounted() {
    this.$nextTick(function() {
      // DOM操作
      canvas = document.getElementById("qrccode-canvas");
    });
  },
  methods: {
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
.pre {
  position: relative;
}
.tax {
  position: absolute;
  float: left;
  top: 71%;
  left: 70%;
}
.head-containt {
  width: 100%;
  height: 0;
  padding-top: 50%;
  background: #fff url("../assets/head.png") no-repeat center;
  background-size: 100%;
  position: relative;
  .instr {
    position: absolute;
    top: 18px;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    color: #fff;
    .left {
      flex: 40% 0;
      display: flex;
      justify-content: center;
      .item {
        display: flex;
        flex-direction: column;
        .plate {
          font-size: 20px;
          margin-bottom: 10px;
        }
        .name {
          font-size: 17px;
        }
      }
    }
    .right {
      flex: 60% 0;
      .item {
        &:last-child {
          margin-top: 15px;
          position: relative;
          &::before {
            content: " ";
            position: absolute;
            left: 0;
            top: -15px;
            right: 12px;
            height: 1px;
            background: #fff;
            opacity: 0.5;
          }
        }
        .insurance-type {
          font-size: 15px;
          display: flex;
          align-items: center;
          span {
            margin-left: 7px;
            font-size: 10px;
            color: rgba(256, 256, 256, 0.7);
          }
        }
        .insurance-no {
          font-size: 12px;
          line-height: 32px;
        }
      }
    }
  }}
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