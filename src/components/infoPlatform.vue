<template>
  <div class="info-containt">
    <van-tabs
      v-model="active"
      color="#568EFC"
      title-active-color="#568EFC"
      title-inactive-color="#464646"
      line-height="2px"
      animated
    >
      <van-tab
        class="tabs"
        v-for="(item, index) in tabs"
        :key="index"
        :title="item.title"
        :name="item.name"
      >
        <div class="group" v-show="item.name === 1">
          <div class="item" v-for="(item,index) in historyList" :key="index">
            <p class="title">{{item.riskTitle}}</p>
            <van-cell-group>
              <van-cell title="承保公司">{{item.insurerName}}</van-cell>
              <van-cell title="保单号">{{item.policyNo}}</van-cell>
              <van-cell title="保险到期时间">{{item.expiryDate}}</van-cell>
              <van-cell title="商业险NCD分数">{{item.ajustRatae}}</van-cell>
            </van-cell-group>
          </div>
        </div>
        <div class="group" v-show="item.name === 2">
          <div class="item" v-for="(item,index) in accidentList" :key="index">
            <p class="title">{{item.riskTitle}}</p>
            <van-cell-group>
              <van-cell title="出险时间" readonly>{{item.lossTime}}</van-cell>
              <van-cell title="结案时间" readonly>{{item.claimCloseTime}}</van-cell>
              <van-cell title="赔付金额" readonly>{{item.claimAmount}}</van-cell>
              <van-cell title="投保保险公司" readonly>{{item.insurerName}}</van-cell>
              <van-cell title="保单号" readonly>{{item.policyNo}}</van-cell>
            </van-cell-group>
          </div>
          <div class="item" v-for="(item,index) in violationList" :key="index">
            <p class="title">{{item.riskTitle}}</p>
            <van-cell-group>
              <van-cell title="违法编号" readonly>{{item.violationCode}}</van-cell>
              <van-cell title="违法发生日期" readonly>{{item.violationTime}}</van-cell>
              <van-cell title="违法处理时间" readonly>{{item.recognitionDate}}</van-cell>
              <van-cell title="违法行为" readonly>{{item.violationRecordTypeEsc}}</van-cell>
            </van-cell-group>
          </div>
        </div>
        <div class="group" v-show="item.name === 3">
          <div class="item" v-for="(item,index) in riskWarnList" :key="index">
            <p class="title">{{item.title}}</p>
            <van-cell-group>
              <van-cell>{{item.warningType}}</van-cell>
            </van-cell-group>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { TerracePage } from "@/common/library/api";
export default {
  data() {
    return {
      his: "",
      //风险警示
      riskWarnList:[],
      // 违法信息
      violationList: [],
      // 理赔
      accidentList: [],
      // 历史
      historyList: [],
      orderNo: "",
      active: 1,
      tabs: [
        {
          title: "上年保单",
          name: 1
        },
        {
          title: "理赔/交通违法",
          name: 2
        },
        {
          title: "风险警示",
          name: 3
        }
      ]
    };
  },
  mounted() {
    this.TerraceHandle();
  },
  methods: {
    async TerraceHandle() {
      this.orderNo = this.$route.params.orderNo;
      const data = await TerracePage(this.orderNo);
      console.log(this.orderNo);
      if (data.state === "200") {
        // alert("成功");
        this.historyList = data.data.historyList;
        this.accidentList = data.data.accidentList;
        this.riskWarnList = data.data.riskWarnList;
        //   console.log(this.historyList)
        //   this.historyList.forEach(v => {
        //       this.his = v
        //   });
      }
    }
  }
};
</script>
<style lang="scss" scope>
.info-containt {
  min-height: 100vh;
  background: #f0f2f4;
  .tabs {
    background: #f0f2f4;
    .group {
      margin-top: 20px;
      .item {
        margin: 0 16px 15px;
        border-radius: 4px;
        background: #fff;
        // padding-right: 16px;
        .title {
          font-size: 17px;
          color: #4a4a4a;
          font-weight: 600;
          line-height: 40px;
          padding: 0 0 0 16px;
        }
      }
    }
  }
}
.van-field__label {
  width: 120px;
}
.van-tabs__nav {
  background: #f0f2f4;
}
</style>
