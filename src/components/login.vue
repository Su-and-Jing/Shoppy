<template>
  <van-popup v-model="showPopup" class="login-popup" @click-overlay="closeLogin">
    <div class="login-wrap">
      <van-cell-group class="field-group" v-if="loginTyep == 0">
        <van-field
          v-model.trim="phone"
          label="手机号"
          clearable
          maxlength="11"
          placeholder="请输入手机号"/>
        <van-field
          v-model="sms"
          center
          clearable
          maxlength="6"
          label="验证码"
          placeholder="请输入验证码">
          <span class="code-btn" slot="button" @click="sendVCode" v-text="codeMessage"></span>
        </van-field>
        <div class="submit" :class="{disabled:(!phone || !sms)}">立即登录</div>
    </van-cell-group>
    <van-cell-group class="field-group" v-if="loginTyep == 1">
        <van-field
          v-model="username"
          label="用户名"
          clearable
          placeholder="请输入用户名"/>
        <van-field
          v-model="passwd"
          center
          clearable
          label="密码"
          placeholder="请输入密码">
        </van-field>
        <div class="submit" :class="{disabled:(!username || !passwd)}">立即登录</div>
    </van-cell-group>
    </div>
  </van-popup>
</template>
<script>
import { clearInterval } from 'timers';
export default {
  name: 'login',
  props: {
    showLogin: {
      type: Boolean,
      default: false,
    },
    channel: {
      type: Number,
    }
  },
  data() {
    return {
      username: '',
      passwd: '',
      phone: '',
      sms: '',
      loginTyep: this.channel,
      showPopup: this.showLogin,
      codeDisabled: false,
      codeMessage: '发送验证码',
    }
  },
  methods: {
    closeLogin() {
      this.$emit('closeLogin')
    },
    sendVCode() {
      if (this.codeDisabled) {
        return
      }
      this.codeDisabled = true;
      const phone = this.phone;
      const reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
      if (!phone) {
        this.$toast('请输入手机号');
        this.codeDisabled = false;
        return
      } else if (!reg.test(phone)) {
        this.$toast('手机号格式有误');
        this.codeDisabled = false;
        return
      }
      this.setCodeInterval();
    },
    // 发送验证码
    setCodeInterval() {
      const that = this;
      let timer = null;
      let times = 60;
      this.codeMessage = `${times}s`;
      timer = setInterval(() => {
        times--;
        this.codeMessage = `${times}s`;
        if (times <= 0) {
          this.codeDisabled = false;
          this.codeMessage = '发送验证码';
          clearInterval(timer);
          timer = null;
        }
      }, 1000);
    },
  }
}
</script>
<style lang="scss" scope>
.login-popup{
  width: 90%;
  border-radius: 5px;
  .login-wrap{
    padding: 124px 0 16px;
    background:#3F7CF4 url('../assets/login.png') no-repeat top center;
    background-size: 100%;
    .field-group{
      margin: 0 16px;
      padding:8px 0 23px;
      border-radius: 5px;
      .code-btn{
        color:#568EFC;
        font-size: 13px;
      }
      .submit{
        width: 90%;
        margin: 17px auto 0;
        height: 38px;
        line-height: 38px;
        text-align: center;
        font-size: 16px;
        color: #fff;
        border-radius: 3px;
        background: #568EFC;
        &.disabled{
          opacity: .5;
        }
      }
    }
  }
}
</style>
