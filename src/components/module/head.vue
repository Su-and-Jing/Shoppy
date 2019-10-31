<template>
  <div class="head-containt">
    <div class="instr">
      <div class="left">
        <div class="item">
          <span class="plate">{{this.parentMsg.car.plateNo}}</span>
          <span class="name">{{ this.parentMsg.customer.name}}</span>
          <!-- <span class="name">{{ this.parentMsg.tax.sumTax}}</span> -->
        </div>
      </div>
      <div class="right">
        <div
          class="item"
          v-for="(item,index) in this.parentMsg.riskList"
          :key="index"
          style="margin-bottom:30px;"
        >
          <p class="insurance-type">
            {{item.riskName}}
            <span>{{item.startDate}}-{{item.endDate}}</span>
          </p>
          <p style="padding-top:8px;" class="pre">
            <span>保费：{{item.premium}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <!-- <span v-show="item.riskCode == '507'">车船税：</span> -->
          </p>
          <!-- <p class="insurance-no">保单号：W20175609988</p> -->
        </div>
      </div>
      <span class="tax">车船税：{{this.parentMsg.tax.sumTax}}</span>
      <!-- <span class="tax2">车船税：{{this.parentMsg.tax.sumTax}}</span> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["parentMsg"],
  watch: {},
  data() {
    return {};
  },
  created() {}
};
</script>

<style>
</style>
<style lang="scss" scope>
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
  background: #fff url("../../assets/head.png") no-repeat center;
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
</style>
