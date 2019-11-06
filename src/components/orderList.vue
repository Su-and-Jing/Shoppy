<template>
  <div>
    <header>
      <van-icon @click="backHandle" class="iconLeft" name="arrow-left" size="23px" />
      <p class="Vetit">我的订单</p>
    </header>
    <div class="containt">
      <van-search
        class="search-wrap"
        v-model="search"
        show-action
        placeholder="请输入车牌号/车架号/车主姓名"
        @search="onSearch"
      >
        <div class="btn" slot="action" @click="onSearch">搜索</div>
      </van-search>
      <van-tabs
        class="tabs-list"
        v-model="active"
        animated
        swipeable
        color="#568EFC"
        title-active-color="#568EFC"
        title-inactive-color="#464646"
        line-height="2px"
        @click="handle"
      >
        <van-tab v-for="(item,index) in tabList" :key="index" :title="item.title" :name="item.name">
          <!-- 暂存单 -->

          <div class="list van-hairline--top" v-for="(item,index) in list" :key="index">
            <div class="item">
              <div class="sign">
                <p class="type">{{item.orderStatusName}}</p>
                <p class="times">{{item.createDate}}</p>
                <van-button plain color="#2EBE8D">下载投保单</van-button>
              </div>

              <div class="content">
                <div class="left">
                  <p class="plate-number">{{item.plateNo}}</p>
                  <p class="car-owner">{{item.name}}</p>
                </div>
                <div class="right">
                  <div class="ritem" v-for="(item,index) in list[index].riskInfoList" :key="index">
                    <p class="top">
                      <span class="insurance">{{item.riskName}}</span>
                      <span class="amount">{{item.premium}}元</span>
                    </p>
                    <p class="time">{{item.startDate}}-{{item.endDate}}</p>
                    <span
                      class="commission"
                      style="padding-right:22px"
                      v-show="detailShow"
                    >手续费{{item.commissionAmount}}元</span>
                  </div>
                </div>
              </div>
              <div class="status van-hairline--top">
                <span class="chassis-number">车架号：{{item.vin}}</span>
                <span class="type" v-show="changeShow" @click="insert(index)">修改投保方案</span>
                   
                <span class="pay" v-show="showPay" @click="pay(index)">
                  去支付
                  <van-icon name="arrow" />
                </span>
                <span class="pay" v-show="detailShow" @click="detail(index)">
                  查看订单详情
                  <van-icon name="arrow" />
                </span>
              </div>
            </div>
          </div>
          <!-- 已完成 -->
          <!-- <div class="list van-hairline--top" v-show="item.name ==4">
          <div class="item" v-for="(item,index) in list" :key="index">
            {{item}}
            <div class="sign">
              <p class="type">{{item.orderStatusName}}</p>
              <p class="times">{{item.createDate}}</p>
              <van-button plain color="#2EBE8D">下载投保单</van-button>
            </div>

            <div class="content">
              <div class="left">
                <p class="plate-number">{{item.plateNo}}</p>
                <p class="car-owner">{{item.name}}</p>
              </div>
              <div class="right">
                <div class="ritem" v-for="(item,index) in riskInfoList" :key="index">
                  <p class="top">
                    <span class="insurance">{{item.riskName}}</span>
                    <span class="amount">{{item.premium}}元</span>
                  </p>
                  <p class="time">{{item.startDate}}-{{item.endDate}}</p>
                  <span class="commission" style="padding-right:22px">手续费{{item.commissionAmount}}元</span>
                </div>
              </div>
            </div>
            <div class="status van-hairline--top">
              <span class="chassis-number">车架号：{{item.vin}}</span>
              <span class="type">查看订单详情</span>
            </div>
          </div>
          </div>-->
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { orderInfoList, OfferPage, apply } from "@/common/library/api";
import { async } from "q";

export default {
  data() {
    return {
      list2: [],
      orderNo: "",
      list: [],
      riskInfoList: "",
      id: "",
      orderType: "",
      active: "1",
      search: "",
      tabList: [
        {
          title: "暂存单",
          name: "1"
        },
        {
          title: "待处理",
          name: "2"
        },
        {
          title: "待支付",
          name: "3"
        },
        {
          title: "已完成",
          name: "4"
        }
      ],
      statusName: [],
      status: "",
      statusList: [
        { code: 0, name: "草稿" },
        { code: 1, name: "待核保" },
        { code: 2, name: "待修改" },
        { code: 3, name: "核保中（人工核保）" },
        { code: 4, name: "待支付" },
        { code: 5, name: "已支付" },
        { code: 6, name: "投保失败" },
        { code: 7, name: "拒保" },
        { code: 8, name: "退保" }
      ],
      showPay: false,
      detailShow: false,
      changeShow: false
    };
  },
  mounted() {
    this.orderListHandle();
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
    onSearch() {},
    async orderListHandle() {
      // 这有个问题（核保跳过来）
      // this.active = this.$route.query.orderType;
      for (var i = 0; i < this.tabList.length; i++) {}
      const data = await orderInfoList({
        id: this.id,
        orderType: this.active
      });
      console.log(data);
      if (data.state === "200") {
        this.list = data.data;
        if (this.active === "3") {
          this.showPay = true;
        } else {
          this.showPay = false;
        }
        if (this.active == 4) {
          this.detailShow = true;
        } else {
          this.detailShow = false;
        }
        if (this.active == 1 || this.active == 2) {
          this.changeShow = true;
        } else {
          this.changeShow = false;
        }

        // this.riskInfoList = data.data.riskInfoList;
        // console.log(this.list);
        // for (var i = 0; i < this.list.length; i++) {
        //   this.riskInfoList = this.list[i].riskInfoList;
        //   console.log(this.riskInfoList);
        // }
      } else if (data.state == "0" || data.state == "1") {
        // this.$router.push({ name: "price" });
        // this.$toast("跳转报价页");
      } 
      else if (data.state == "3") {
        var token = window.sessionStorage.getItem("token");
        token = "";
        this.$router.push({
          path: "/"
        });
      }
      else {
        this.$toast.fail("失败");
      }
    },
    handle() {
      this.orderListHandle();
    },

    //这有问题
    async insert(index) {
      this.orderNo = this.list[index].orderNo;

      const data = await OfferPage(this.orderNo);
      window.sessionStorage.setItem("data", JSON.stringify(data));
      console.log(data);
      if (data.state === "200") {
        this.$router.push({
          name: "price"
          // params: { data: data }
        });
      }
    },
    async pay(index) {
      this.orderNo = this.list[index].orderNo;
      const data = await apply(this.orderNo);
      console.log(this.orderNo);
      if (data.state === "200") {
        // window.localStorage.setItem(imgUrl,'data.data')
        this.$router.push({
          name: "payment",
          params: {
            imgUrl: data.data,
            orderNo: this.orderNo
          }
        });
      }
    },
    async detail(index) {
      this.orderNo = this.list[index].orderNo;
      const data = await OfferPage(this.orderNo);
      console.log(this.orderNo);
      console.log(data)
      this.$router.push({
        name: "orderDetails",
        params: {
          data: data
        }
      });
    }
  }
};
</script>
<style lang="scss">
@import "/style/head.scss";
.containt {
  margin-top: 53px;
  background: #f3f3f3;
  min-height: 100vh;
  .search-wrap {
    .btn {
      flex: 34px 0;
      margin: 0 13px;
      color: #568efc;
      font-size: 16px;
    }
  }
  .list {
    .item {
      margin-top: 10px;
      padding-top: 30px;
      background: #fff;
      position: relative;
      .sign {
        position: absolute;
        top: 0;
        left: 15px;
        background: #568efc;
        padding: 5px 13px;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        .times {
          margin-top: 5px;
        }
        .van-button {
          position: absolute;
          padding: 0 6px;
          line-height: 25px;
          height: 25px;
          left: 0;
          top: 115px;
        }
      }
      .content {
        display: flex;
        height: 126px;
        align-items: center;
        padding-bottom: 10px;
        .left {
          flex: 115px 0;
          padding-left: 25px;

          .car-owner {
            margin-top: 10px;
            margin-bottom: 18px;
          }
        }
        .right {
          // flex: 1;
          margin-right: 24px;
          width: 70% !important;
          .ritem {
            padding-top: 14px;
            margin-bottom: 10px;
            .top {
              display: flex;
              justify-content: space-between;
              color: #464646;
              font-size: 14px;
              margin-bottom: 10px;
              .amount {
                font-size: 13px;
                color: #4a4a4a;
                position: relative;
              }
            }
            .commission {
              position: absolute;
              right: 0;
              font-size: 12px;
            }
            .time {
              font-size: 11px;
              color: #4a4a4a;
            }
          }
        }
      }
      .status {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px 14px 17px;
        font-size: 12px;
        color: #4a4a4a;
        .type {
          padding: 6px 9px;
          color: #538bfb;
          background: rgba(83, 139, 251, 0.1);
          border-radius: 2px;
        }
        .pay {
          color: #538bfb;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
