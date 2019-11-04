<template>
  <div>
    <header>
      <van-icon @click="backHandle" class="iconLeft" name="arrow-left" size="23px" />
      <p class="Vetit">订单详情</p>
    </header>
    <div class="containt" style="margin-top:38px">
      <Head></Head>
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
      list: ""
    };
  },
  created() {
    // this.list= this.$route.params.data;
    // console.log(this.list);
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
@import "/style/head.scss";
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
