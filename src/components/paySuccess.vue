<template>
  <div class="content-pay">
    <div class="pay-top">
      <img class="pay-image" src="../assets/pay.png" />
      <h2 class="pay-txt">支付成功</h2>
      <p>感谢选择华农保险</p>
    </div>
    <!-- 内容区域 -->
    <div class="pay-center">
      <p>
        <span>车牌号</span>
        <span>京2312323</span>
      </p>
      <p>
        <span>车架号</span>
        <span>ADFGKHJJK</span>
      </p>
      <p>
        <span>投保人姓名</span>
        <span>黄雪琴</span>
      </p>
      <span class="line"></span>
      <div class="pay-money" style="margin:0 0 25px 11px">
        <p>交强险 2019.0822-2020.0821</p>
        <p>
          <span>保费：1990元 &nbsp; &nbsp;车船费：1000元</span>
        </p>
        <p>商业险 2019.0822-2020.0821</p>
        <p>
          <span>保费：1990元 &nbsp; &nbsp;车船费：1000元</span>
        </p>
      </div>
    </div>
    <div class="pay-bottom">
      <a href="#">
        保单正在生成中，5秒后将跳转到订单详情
        您也可至“我的订单”-已完成 中查询您的保单
      </a>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scope>
* {
  padding: 0;
  margin: 0;
}
.content-pay {
  width: 100%;
  text-align: center;
  background: #fff;
  .pay-top {
    position: relative;
    background: #f1f3f4;
    p {
      font-size: 13px;
      color: #444;
      padding-bottom: 130px;
    }
    .pay-image {
      padding: 20px 0 0;
      width: 64px;
    }
    h2 {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(68, 68, 68, 1);
      line-height: 35px;
    }
  }
  .pay-center {
    float: left;
    position: absolute;
    top: 146px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0px 4px 10px 0px rgba(36, 87, 193, 0.1);
    border-radius: 10px;
    color: #4a4a4a;
    font-size: 14px;
    background: #fff;
    padding: 28px 30px 0;
    width: 70%;
    opacity:0.8;

    .line {
      display: block;
      height: 1px;
      background: #f2f2f2;
      margin-bottom: 15px;
    }
    p {
      display: flex;
      span {
        flex: 1;
        text-align: left;
        margin-left: 11px;
        padding-bottom: 19px;
      }
    }
    .pay-money {
      text-align: left;
      p {
        margin-bottom: 8px;
        span {
          margin: 0;
        }
      }
    }
  }
}
.pay-bottom {
  padding: 400px 48px 100px;
  a {
    display: inline-block;
    color: #568efc;
    line-height: 1.5;
    position: absolute;
    left: 48px;
    top: 460px;
    margin-right: 48px;
  }
}
</style>
