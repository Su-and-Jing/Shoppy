<template>
  <van-popup v-model="showPopup" class="login-popup" :close-on-click-overlay="false" @close="close">
    <div class="login-wrap">
      <van-tabs
        class="login-tabs"
        animated
        swipeable
        v-model="currentType"
        color="#FEA23B"
        title-active-color="#464646"
        title-inactive-color="#464646"
        line-height="2px"
      >
        <van-tab title="用户名登录" name="2">
          <van-cell-group class="field-group">
            <van-field v-model="username" label="用户名" clearable placeholder="请输入用户名" />
            <van-field v-model="passwd" center clearable label="密码" placeholder="请输入密码"></van-field>
            <div class="submit" :class="{disabled:(!username || !passwd)}" @click="handleLogin">立即登录</div>
          </van-cell-group>
        </van-tab>
        <van-tab title="手机登录" name="1">
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
              <span class="code-btn" slot="button" @click="sendVCode" v-text="codeMessage"></span>
            </van-field>
            <div class="submit" :class="{disabled:(!phone || !sms)}" @click="iphoneHandle">立即登录</div>
          </van-cell-group>
        </van-tab>
      </van-tabs>
    </div>
  </van-popup>
</template>
<script>
import config from "../../common/http/config";
import Cookies from "js-cookie";
import { clearInterval } from "timers";
import { login, institution, iphoneLogin } from "@/common/library/api";
import { async } from "q";
export default {
  name: "login",
  props: {
    showLogin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      zhc: true,
      username: "44000020",
      passwd: "0000",
      phone: "13910653201",
      sms: "",
      showPopup: this.showLogin,
      codeDisabled: false,
      codeMessage: "发送验证码",
      currentType: "1",
      timer: null,
      times: 60,
      interval: 1000,
      res: ""
    };
  },
  watch: {
    showLogin(val) {
      this.showPopup = val;
      console.log(this.showPopup);
      if (this.showPopup == true) {
        this.zhc = true;
      }
    }
  },
  created() {
    // console.log(login);
  },
  methods: {
    close() {
      // this.closeLogin = false;
      // location.reload()
      console.log("00000000");
    },
    // 手机号登录
    async iphoneHandle() {
      const data = await iphoneLogin({
        phoneNo: this.phone,
        type: 1,
        vCode: this.sms
      });
      // console.log(data);
      if (data.state === "200") {
        this.res = data;
        this.$emit("closeLogin", this.res);
        window.sessionStorage.setItem("token", data.data.token);
        window.sessionStorage.setItem("carVerifyCode", data.data.carVerifyCode);
        window.sessionStorage.setItem("provinceName", data.data.provinceName);
        window.sessionStorage.setItem("carPlateSimple", data.data.carPlateSimple);
      } else {
        this.$toast.fail("手机号或验证码错误");
      }
    },
    // 用户名登录
    async handleLogin() {
      window.sessionStorage.removeItem("token");
      const data = await login({ userCode: this.username, pwd: this.passwd });
      if (data.state === "200") {
        this.res = data;
        this.$emit("closeLogin", this.res);
        console.log(data.data);

        window.sessionStorage.setItem("token", data.data.token);
        window.sessionStorage.setItem("carVerifyCode", data.data.carVerifyCode);
        window.sessionStorage.setItem("provinceName", data.data.provinceName);
        window.sessionStorage.setItem("carPlateSimple", data.data.carPlateSimple);
      } else {
        this.$toast.fail("用户名或密码错误");
      }
    },
    sendVCode() {
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
      //手机号登录

      const data = iphoneLogin({
        phoneNo: this.phone,
        vCode: this.msm,
        type: 0
      });
      // console.log(data);
      // if (data.state === "200") {
      //   this.$emit("closeLogin");
      //   window.localStorage.setItem("token", data.data.token);
      // } else {
      //   this.$toast.fail("用户名或密码错误");
      // }
      this.setCodeInterval();
    },
    // 发送验证码
    setCodeInterval() {
      const that = this;
      that.codeMessage = `${that.times}s`;
      that.timer = setInterval(() => {
        that.times--;
        that.codeMessage = `${that.times}s`;
        if (that.times <= 0) {
          that.codeDisabled = false;
          that.codeMessage = "发送验证码";
          window.clearInterval(that.timer);
          that.timer = null;
        }
      }, that.interval);
    },
    login() {
      let data = {};
      if (this.currentType === 1) {
        // 手机登录
        data = {
          phone: this.phone,
          sms: this.sms
        };
      } else {
        // 验证码登录
        data = {
          username: this.username,
          passwd: this.passwd
        };
      }
      this.$emit("closeLogin");
    }
  }
};
</script>
<style lang="scss" scope>
.login-popup {
  border-radius: 5px;
  .login-wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background: #3f7cf4 url("../../assets/login.png") no-repeat top center;
    background-size: 100%;
    .login-tabs {
      position: absolute;
      top: 40%;
      left: 0;
      right: 0;
      margin: 0 16px;
      padding: 8px 0 23px;
      border-radius: 5px;
      background: #fff;
      .field-group {
        .code-btn {
          color: #568efc;
          font-size: 13px;
        }
        .submit {
          width: 90%;
          margin: 17px auto 0;
          height: 38px;
          line-height: 38px;
          text-align: center;
          font-size: 16px;
          color: #fff;
          border-radius: 3px;
          background: #568efc;
          &.disabled {
            opacity: 0.5;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 768px) {
  .login-popup {
    width: 675px;
    height: 708px;
  }
}
@media screen and (max-width: 768px) {
  .login-popup {
    width: 90%;
    height: 0;
    padding-top: 110%;
  }
}
@media screen and (max-width: 320px) {
  .login-popup {
    width: 90%;
    height: 0;
    padding-top: 123%;
  }
}
</style>
 