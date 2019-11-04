<template>
<div>
  <header>
      <van-icon @click="backHandle" class="iconLeft" name="arrow-left" size="23px" />
      <p class="Vetit">车险报价单</p>
    </header>
    <div class="containt" style="margin-top:38px">
    <Header :message="headMsg"></Header>
    <div class="content">
      <div class="item">
        <label class="label">车牌号：</label>
        <span class="value">{{this.plateNo}}</span>
      </div>
      <div class="item">
        <label class="label">使用性质(车座数)：</label>
        <span class="value">{{this.motorUsageType}}{{approvedPassengersCapacity}}</span>
      </div>
      <div class="item">
        <label class="label">车主：</label>
        <span class="value">{{this.name}}</span>
      </div>
      <div class="item">
        <label class="label">初次登记日期：</label>
        <span class="value">{{this.registerDate}}</span>
      </div>
      <div class="item">
        <label class="label">厂牌车型：</label>
        <span class="limit">{{this.model}}</span>
      </div>
      <div class="item">
        <label class="label">交强险保险期：</label>
        <span class="limit">{{this.startDate}} 至 {{this.endDate}}</span>
      </div>
      <div class="item">
        <label class="label">商业险保险期：</label>
        <span class="limit">{{this.startDate}} 至 {{this.endDate}}</span>
      </div>
    </div>
    <!-- 间隔样式 -->
    <div class="line-wrapper" style="height:5px;"></div>
    <div class="business-risks">
      <p class="title">商业险报价单</p>
      <div class="group">
        <div class="t-head">
          <span class="th span3">险别</span>
          <span class="th span2">保额</span>
          <span class="th span2">保费</span>
          <span class="th span2">相关说明</span>
        </div>
        <div class="t-body">
          <!-- <div class="tr">
            <span class="td span3">{{this.kindName}}</span>
            <span class="td span2">{{this.amount}}元</span>
            <span class="td span2">{{this.coveragePremium}}元</span>
            <span class="td span2">
              <span class="reg-fran">不计免赔</span>
              <span>175.65元</span>
            </span>
          </div>-->
          <div class="tr" v-for="(item,index) in this.kindList" :key="index">
            <span class="td span3">{{item.kindName}}</span>
            <span class="td span2">{{item.amount}}</span>
            <span class="td span2">{{item.coveragePremium}}</span>
            <span class="td span2">
              <span class="reg-fran" v-show="notDeductibleFlag">不计免赔</span>
              <!-- <span>175.65元</span> -->
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 间隔样式 -->
    <div class="line-wrapper" style="height:5px;"></div>
    <div class="statistical">
      <div class="total">
        <span class="text">您需要支付的保费及税款合计</span>
        <span class="mount">{{this.sumPermium}}元</span>
      </div>
      <div class="instr">
        <div class="item">
          <span class="label" style="font-size:12px">商业保险费</span>
          <span style="font-size:12px">{{this.insurance}}元</span>
        </div>
        <div class="item">
          <span class="label" style="font-size:12px">交强险保费</span>
          <span style="font-size:12px">{{this.compulsory}}元</span>
        </div>
        <div class="item">
          <span class="label" style="font-size:12px">车船税税款</span>
          <span style="font-size:12px">{{this.sumTax}}元</span>
        </div>
      </div>
    </div>
    <div class="btn-group" v-if="from != 'copy'">
      <span class="back" @click="goBack" style="font-size:12px">返回</span>
      <span class="copy" @click="copyUrl" style="font-size:12px">复制报价单链接</span>
    </div>
    <input type="text" :value="copycode" id="copy" />

    <div
      class="remind" style="font-size:12px"
    >友情提示：此报价试算结果为根据您提供的各项信息生成，生成时间为{{this.createDate }}。正式投保时的报价结果可能会根据车辆、车主和保险方案等的情况产生变化。此报价试算结果仅供参考，您投保时需要支付的保费及税款等均应当以正式投保时的报价结果为准。</div>
    <!-- 复制链接 -->
    <van-popup v-model="showShare" class="popup-wrap" :close-on-click-overlay="false">
      <div class="share-link">
        <div class="main">
          <p class="title">您的报价单链接已生成</p>
          <p class="instr">{{this.info}}</p>
          <span class="paste" @click="copyUrl">去粘贴</span>
        </div>
      </div>
    </van-popup>
    <!-- 报价单已失效 -->
    <van-popup v-model="showFailure" class="popup-wrap" :close-on-click-overlay="false">
      <div class="order-failure">
        <div class="main">
          <p class="title">您的报价单已失效</p>
          <span class="paste" @click="showFailure = false">关闭</span>
        </div>
      </div>
    </van-popup>
  </div>
</div>

</template>
<script>
import { Offer } from "@/common/library/api";
import { OfferPage } from "@/common/library/api";
import Header from "./module/header";
export default {
  data() {
    return {
      // 座位数
      approvedPassengersCapacity: "",
      //创建日期
      createDate: "",
      //起保日期
      startDate: "",
      //截止日期
      endDate: "",
      // 险别数组
      kindList: [],
      //不计免赔标识
      notDeductibleFlag: false,
      //险别名称
      kindName: "",
      // 险别代码
      kindCode: "",
      //险别保额
      amount: "",
      // 险别保费
      coveragePremium: "",
      //总保费
      sumPermium: "",
      //商业险保费
      insurance: "",
      //交强险保费
      compulsory: "",
      //车船税合计
      sumTax: "",
      plateNo: "",
      name: "",
      registerDate: "",
      model: "",
      showShare: false,
      showFailure: false,
      headMsg: "报价单",
      copycode: "",
      from: "",
      orderNo: "",
      info: "",
      //使用性质
      motorUsageType: ""
    };
  },
  components: {
    Header
  },
  created() {
    this.from = this.$route.query.from;
    this.orderNo = this.$route.params.orderNo;
    console.log(this.orderNo)
    if (this.from != "copy") {
      this.offerHandle();
    } else {
      var str = window.location.href;
      this.orderNo = this.$route.query.orderNo;
      this.offerHandle();
    }
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
    // // 调用报价单接口
    async offerHandle() {
      const data = await OfferPage(this.orderNo);
      if (data.state === "200") {
        this.plateNo = data.data.car.plateNo;
        this.name = data.data.customer.name;
        this.registerDate = data.data.car.registerDate;
        this.model = data.data.car.model;
        this.sumTax = data.data.tax.sumTax;
        this.createDate = data.data.createDate;
        this.approvedPassengersCapacity =
          data.data.car.approvedPassengersCapacity;
        //使用性质
        if (data.data.car.motorUsageTypeCode === "8A") {
          this.motorUsageType = "非营运";
        } else {
          this.motorUsageType = "营运";
        }
        // 险别
        this.kindList = data.data.kindList;
        for (var i = 0; i < this.kindList.length; i++) {
          if (this.kindList[i].kindCode === "A") {
            this.kindList[i].kindName = "机动车损失险";
            // this.coveragePremium = this.kindList[i].coveragePremium;
            // this.amount = this.kindList[i].amount;
            console.log("===============");
            console.log(this.kindList[i].notDeductibleFlag);
            this.notDeductibleFlag = this.kindList[i].notDeductibleFlag;
            console.log(this.notDeductibleFlag);
          }
        }
        // 险种
        for (var i = 0; i < data.data.riskList.length; i++) {
          if (data.data.riskList[i].riskCode === "0520") {
            this.insurance = data.data.riskList[i].premium;
            this.endDate = data.data.riskList[i].endDate;
            this.startDate = data.data.riskList[i].startDate;
          } else {
            this.compulsory = data.data.riskList[i].premium;
            this.endDate = data.data.riskList[i].endDate;
            this.startDate = data.data.riskList[i].startDate;
          }
        }
        this.sumPermium = data.data.sumPermium;
      } else {
      }
    },

    // 复制报价单链接
    async copyUrl() {
      // 调用报价单接口
      const data = await Offer(this.orderNo);
      if (data.state === "200") {
        this.info = data.data.message;
        this.copycode = data.data.url;
        document.execCommand("Copy");
        let copy = document.getElementById("copy");
        copy.select();
        console.log(copy.select());
        document.execCommand("Copy");
        this.showShare = !this.showShare;
      } else {
      }
    },
    goBack() {
      this.$router.push({ path: "/price" });
    }
  }
};
</script>
<style lang="scss" scope>
@import "/style/share.scss";
@import "/style/head.scss";
.containt {
  background: #fff;
  min-height: 100vh;
  .content {
    padding: 0 16px;
    .item {
      padding: 2px 0;
      font-size: 12px;
      line-height: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #f0f2f4;
      &:first {
        border: none;
      }
      .label {
        flex: 132px 0;
        color: #4a4a4a;
      }
      .value {
        text-align: right;
        color: #999;
      }
      .limit {
        flex: 1 0;
        color: #999;
      }
    }
  }
  .business-risks {
    .title {
      font-size: 12px;
      line-height: 30px;
      color: #4a4a4a;
      font-weight: 600;
      padding-left: 16px;
    }
    .group {
      font-size: 12px;
      color: #4a4a4a;
      line-height: 20px;
      .t-head {
        border-top: 1px solid #f0f2f4;
        display: flex;
        text-align: center;
        padding: 5px 16px;
      }
      .span3 {
        flex: 31% 0;
      }
      .span2 {
        flex: 23% 0;
      }
      .t-body {
        .tr {
          border-top: 1px solid #f0f2f4;
          display: flex;
          align-items: center;
          padding: 10px 16px;
          .td {
            display: flex;
            flex-direction: column;
            align-items: center;
            .reg-fran {
              display: block;
              border: 1px solid #568efc;
              line-height: 18px;
              border-radius: 18px;
              font-size: 12px;
              color: #568efc;
              padding: 0 5px;
            }
          }
        }
      }
    }
  }
  .statistical {
    padding: 0 16px;
    margin-bottom: 16px;
    .total {
      text-align: center;
      padding: 10px 0;
      display: flex;
      flex-direction: column;
      .text {
        font-size: 12px;
        color: #000;
        margin-bottom: 5px;
      }
      .mount {
        font-size: 12px;
        font-weight: 600;
        color: #f68900;
      }
    }
    .instr {
      padding-top: 8px;
      border-top: 1px solid #f0f2f4;
      border-bottom: 1px solid #f0f2f4;
      .item {
        display: flex;
        justify-content: space-between;
        // font-size: 12x;
        color: #999;
        margin-bottom: 8px;
        .label {
          color: #4a4a4a;
        }
      }
    }
  }
  .btn-group {
    margin: 0 16px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .back,
    .copy {
      flex: 48% 0;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border: 1px solid #568efc;
      color: #568efc;
      border-radius: 5px;
      // font-size: 16px;
      &.copy {
        background: #568efc;
        color: #fff;
      }
    }
  }
  .remind {
    margin: 10px 16px 10px;
    font-size: 12px;
    color: #568efc;
    line-height: 16px;
  }
  #copy {
    opacity: 0;
    z-index: -1;
    position: absolute;
    top: 0;
  }
  .popup-wrap {
    width: 100%;
    background: transparent;
    .share-link,
    .order-failure {
      width: 72%;
      height: 0;
      padding-top: 62%;
      position: relative;
      margin-left: 14%;
      background: url("../assets/share.png") no-repeat top center;
      background-size: 100%;
      &.order-failure {
        padding-top: 56%;
        background: url("../assets/failure.png") no-repeat top center;
        background-size: 100%;
        .main {
          top: 43%;
          .paste {
            margin-top: 12%;
          }
        }
      }
      .main {
        position: absolute;
        top: 32%;
        right: 0;
        bottom: 0;
        left: 0;
        .title {
          text-align: center;
          font-size: 15px;
          line-height: 24px;
          color: #464646;
          font-weight: 600;
        }
        .instr {
          font-size: 13px;
          color: #666;
          line-height: 24px;
          margin: 12px 20px;
        }
        .paste {
          margin: 0 32px;
          height: 38px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: #fff;
          background: #568efc;
        }
      }
    }
  }
}
</style>

