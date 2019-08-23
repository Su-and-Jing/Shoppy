<template>
  <div class="containt">
    <div class="head">报价单</div>
    <div class="content">
      <div class="item">
        <label class="label">车牌号：</label>
        <span class="value">沪A78123</span>
      </div>
      <div class="item">
        <label class="label">使用性质(车座数)：</label>
        <span class="value">非营业个人(5)</span>
      </div>
      <div class="item">
        <label class="label">车主：</label>
        <span class="value">龚公园</span>
      </div>
      <div class="item">
        <label class="label">初次登记日期：</label>
        <span class="value">2017-01-01</span>
      </div>
      <div class="item">
        <label class="label">厂牌车型：</label>
        <span class="limit ">2017款途观L 380TSL自动四驱旗舰版</span>
      </div>
      <div class="item">
        <label class="label">交强险保险期：</label>
        <span class="limit">2018年01月16日 00时00分00秒 至2019年01月15日 23时59分59秒</span>
      </div>
      <div class="item">
        <label class="label">商业险保险期：</label>
        <span class="limit">2018年01月16日 00时00分00秒 至2019年01月15日 23时59分59秒</span>
      </div>
    </div>
    <!-- 间隔样式 -->
    <div class="line-wrapper"></div>
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
          <div class="tr">
            <span class="td span3">机动车损失保险</span>
            <span class="td span2">68800元</span>
            <span class="td span2">1170.97</span>
            <span class="td span2">
              <span class="reg-fran">不计免赔</span>
              <span>175.65元</span>
            </span>
          </div>
          <div class="tr">
            <span class="td span3">机动车损失保险</span>
            <span class="td span2">68800元</span>
            <span class="td span2">1170.97</span>
            <span class="td span2">
              <span class="reg-fran">不计免赔</span>
              <span>175.65元</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 间隔样式 -->
    <div class="line-wrapper"></div>
    <div class="statistical">
      <div class="total">
        <span class="text">您需要支付的保费及税款合计</span>
        <span class="mount">3888.66元</span>
      </div>
      <div class="instr">
        <div class="item">
          <span class="label">商业保险费</span>
          <span>2776.55元</span>
        </div>
        <div class="item">
          <span class="label">交强险保费</span>
          <span>950元</span>
        </div>
        <div class="item">
          <span class="label">车船税税款</span>
          <span>240元</span>
        </div>
      </div>
    </div>
    <div class="btn-group" v-if="from != 'copy'">
      <span class="back">返回</span>
      <span class="copy" @click="copyUrl">复制报价单链接</span>
    </div>
    <input type="text" :value="copycode" id="copy">
  </div>
</template>
<script>
export default {
  data() {
    return {
      copycode: '',
      from: '',
    }
  },
  created() {
    this.from = this.$route.query.from;
  },
  methods: {
    copyUrl() {
      this.copycode = window.location + '?from=copy';
      document.execCommand("Copy");
      let copy=document.getElementById("copy");
	    copy.select();
      document.execCommand("Copy");
    }
  }
}
</script>
<style lang="scss" scope>
@import '/style/index.scss';
  .containt{
    background: #fff;
    .head{
      width: 100%;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background:#5189FB;
      font-size: 17px;
      color: #fff;
      border-bottom: 5px solid #F0F2F4;
    }
    .content{
      padding: 0 16px;
      .item{
        padding: 10px 0;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid #F0F2F4;
        &:first{
          border: none;
        }
        .label{
          flex: 132px 0;
          color:#4a4a4a;
        }
        .value{
          text-align: right;
          color:#999;
        }
        .limit{
          flex: 1 0;
          color:#999;
        }
      }
    }
    .business-risks{
      .title{
          
        font-size: 17px;
        line-height: 45px;
        color: #4a4a4a;
        font-weight: 600;
        padding-left: 16px;
      }
      .group{
        font-size: 14px;
        color: #4a4a4a;
        line-height: 20px;
        .t-head{
          border-top: 1px solid #F0F2F4;
          display: flex;
          text-align: center;
          padding: 10px 16px;
        }
        .span3{
          flex: 31% 0;
        }
        .span2{
          flex: 23% 0;
        }
        .t-body{
          .tr{
            border-top: 1px solid #F0F2F4;
            display: flex;
            align-items: center;
            padding: 10px 16px;
            .td{
              display: flex;
              flex-direction: column;
              align-items: center;
              .reg-fran{
                display: block;
                border: 1px solid #568EFC;
                line-height: 18px;
                border-radius: 18px;
                font-size: 12px;
                color:#568EFC;
                padding: 0 5px;
              }
            }
          }
        }
      }
    }
    .statistical{
      padding: 0 16px;
      margin-bottom: 16px;
      .total{
        text-align: center;
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        .text{
          font-size: 16px;
          color:#000;
          margin-bottom: 12px;
        }
        .mount{
          font-size: 18px;
          font-weight: 600;
          color: #F68900;
        }
      }
      .instr{
        padding-top: 16px;
        border-top: 1px solid #F0F2F4;
        border-bottom: 1px solid #F0F2F4;
        .item{
          display: flex;
          justify-content: space-between;
          font-size: 14x;
          color:#999;
          margin-bottom: 16px;
          .label{
            color: #4a4a4a;
          }
        }
      }
    }
    .btn-group{
      margin:0 16px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .back,
      .copy{
        flex: 48% 0;
        height: 38px;
        text-align: center;
        line-height: 38px;
        border: 1px solid #568EFC;
        color: #568EFC;
        border-radius: 5px;
        font-size: 16px;
        &.copy{
          background: #568EFC;
          color:#fff;
        }
      }
    }
    #copy{
      opacity: 0;
      z-index: -1;
      position: absolute;
      top:0;
    }
  }
</style>

