<template>
  <div>
    <header>
      <van-icon @click="backHandle" class="iconLeft" name="arrow-left" size="23px" />
      <p class="Vetit">订单详情</p>
    </header>
    <div class="containt" style="margin-top:38px">
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
      <!-- 支付成功 -->
      <div class="success" v-if="successful">
        <div class="item policy">
          <span>投保单</span>
        </div>
        <div class="item upload">
          <span>电子保单</span>
        </div>
        <div class="item invoice">
          <span>发票获取</span>
        </div>
        <div class="item upload">
          <span>影像上传</span>
        </div>
        <div class="item distribution">
          <span>保单配送信息</span>
        </div>
      </div>
      <!-- 已退保、已退费 -->
      <div class="failure" v-else>
        <p class="type">该订单已完成退保</p>
        <div class="item">
          <p class="order-no">交强险退保单号：12343434</p>
          <p class="quit-time">退保时间：2019年10月01日10点10分</p>
        </div>
        <div class="item">
          <p class="order-no">商业险退保单号：12343434</p>
          <p class="quit-time">退保时间：2019年10月01日10点10分</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Head from "./module/head";
export default {
  // props: ["parentMsg"],
  components: {
    Head
  },
  data() {
    return {
      successful: true,
      list: "",
      riskList: "",
      name:'',
      plateNo:''
    };
  },
  created() {
    this.list = this.$route.params.data;
    this.riskList = this.list.data.riskList;
    this.plateNo = this.list.data.car.plateNo;
    this.name = this.list.data.customer.name;
    // this.sumTax2 = this.list.tax.sumTax;
  },
  methods: {
    backHandle() {
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
        return false;
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./style/head.scss";
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
  }
}
.containt {
  min-height: 100vh;
  background: #fff;
  .success {
    padding: 0 22px;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    .item {
      flex: 47% 0;
      height: 0;
      padding-top: 27%;
      position: relative;
      &.policy {
        background: url(../assets/01.png) no-repeat center;
        background-size: 100%;
        margin-right: 16px;
      }
      &.invoice {
        background: url(../assets/02.png) no-repeat center;
        background-size: 100%;
        margin-right: 16px;
      }
      &.upload {
        background: url(../assets/04.png) no-repeat center;
        background-size: 100%;
      }
      &.distribution {
        background: url(../assets/05.png) no-repeat center;
        background-size: 100%;
      }
      span {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #4080ff;
      }
    }
  }
  .failure {
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #464646;
    .type {
      font-size: 17px;
      margin: 12px 0 32px;
    }
    .item {
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 24px;
    }
  }
}
</style>
