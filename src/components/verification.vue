<template>
<div>
 <header>
          <van-icon class="iconLeft" name="arrow-left" size="23px"/>
          <p class="Vetit">身份验证</p>
      </header>
          <p class="title">根据监管要求，请发送验证码验证身份</p>
  <div class="login-wrap">
        <van-cell-group class="field-group">
         <van-field
              v-model.trim="phone"
              label="手机号"
              clearable
              maxlength="11"
              placeholder="请输入手机号"
            />
            <van-field
              v-model="sms"
              center
              clearable
              maxlength="6"
              label="验证码"
              placeholder="请输入验证码"
            >
              <span class="code-btn" slot="button" @click="sendVCode"    v-text="codeMessage"></span>
          </van-field> 
          <van-button type="info" @click="confirmHandle">确定</van-button>
        </van-cell-group>
      </van-tab>
    </van-tabs>
  </div>
</div>
</template> 
<script>
 import {SendCode ,RealCode} from "@/common/library/api";
import { clearInterval } from "timers";
export default {
  data() {
    return {
      phone: "",
      sms: "",
      codeDisabled: false,
      codeMessage: "获取验证码",
      currentType: "1",
      timer: null,
      times: 60,
      interval: 1000,
      token:'',
      orderNo:'',
      res:''
    };
  },
  created(){
      this.phone = this.$route.query.mobile;
      this.token = this.$route.query.token;
      this.orderNo = this.$route.query.orderNo;
  },
  methods: {
      //验证身份
     async confirmHandle(){
          const data =await RealCode({
        mobile: this.phone,
        code: this.sms,
        token: this.token,
        orderNo:this.orderNo
      });
      console.log(data)
      if(data.state == '200'){
        this.res = data.data;
         this.$router.push({
          name: "payment2",
          params: {
            res: this.res
          }
        });
      }else{
          this.$toast(data.message)
      }
      },
      //发送验证码
    async   sendVCode() {
      if (this.codeDisabled) {
        return;
      }
      this.codeDisabled = true;
      const phone = this.phone;
      const reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
      if (!phone) {
        this.$toast("请输入手机号");
        this.codeDisabled = false;
        return;
      } else if (!reg.test(phone)) {
        this.$toast("手机号格式有误");
        this.codeDisabled = false;
        return;
      }
      const  data =   await SendCode({
        mobile: this.phone,
        token: this.token,
        orderNo: this.orderNo
      });
      console.log(data)
      if (data.state == "200"){
        this.setCodeInterval();
      }else{
        this.$toast(data.message)
      }
    },
    // 发送验证码
    setCodeInterval() {
      const that = this;
      that.codeMessage = `${that.times}s`;
      that.timer = setInterval(() => {
          // console.log(that.times)
        that.times--;
        that.codeMessage = `${that.times}s`;
        if (that.times <= 0) {
          that.codeDisabled = false;
          that.codeMessage = "发送验证码";
          window.clearInterval(that.timer);
          that.timer = null;
        }
      }, that.interval);
    }
  }}
</script> 
<style lang="scss" scope>
@import "/style/head.scss";
.title{
    margin-top: 38px;
    background: #E5EEFF;
    text-align: center;
    height: 38px;
    width: 110%;
font-size:13px;
font-weight:400;
color:rgba(86,142,252,1);
line-height:40px;
padding: 0 !important;

}
.login-wrap {
  background: #fff;
  width: 100%;
  height: 100vh;
  padding: 0 15px;
  padding-top:38px;
}
.code-btn {
  color: #568efc;
}
.van-button {
  margin-top: 53px;
  width: 100%;
}
</style>