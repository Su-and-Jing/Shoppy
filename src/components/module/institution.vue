<template>
  <div>
    <van-popup
      v-model="showInsitutionPopup"
      class="insitution-popup"
      :close-on-click-overlay="false"
    >
      <van-cell-group class="insitution-group">
        <p class="title van-hairline--bottom">选择出单机构</p>
        <van-field
          label="登记机构"
          readonly
          v-model="loginComName"
          right-icon="arrow-down"
          @click="choosePopup1(loginList,'loginComName')"
        />
        <van-field
          label="归属机构"
          readonly
          right-icon="arrow-down"
          ref="aa"
          v-model="comName"
          @click="choosePopup2(comList,'comName')"
        />
        <!-- ownershipInstitutionList:所有的name，ownershipInstitutionCode：对象，ownershipInstitution：显示的name，a = 'v'：标记   -->
        <van-field
          label="渠道类型"
          readonly
          right-icon="arrow-down"
          v-model="producerName"
          @click="choosePopup3(producerList,'producerName')"
        />

        <van-field
          label="代理人"
          readonly
          right-icon="arrow-down"
          v-model="agentName"
          @click="choosePopup4(agentList,'agentName')"
        />
        <van-field
          label="业务员"
          readonly
          v-model="handlerName"
          right-icon="arrow-down"
          @click="choosePopup5(handlerList,'handlerName')"
        />
        <van-field label="维护人员" v-model="salesman" />
        <span class="confirm" type="info" @click="confirm">确定</span>
      </van-cell-group>
    </van-popup>
    <!-- 下拉公共组件 -->
    <van-popup v-model="showPopup1" position="bottom" :close-on-click-overlay="false">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="confirmPicker1"
        @cancel="showPopup1 = false"
      />
    </van-popup>
    <van-popup v-model="showPopup2" position="bottom" :close-on-click-overlay="false">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="confirmPicker2"
        @cancel="showPopup2 = false"
      />
    </van-popup>
    <van-popup v-model="showPopup3" position="bottom" :close-on-click-overlay="false">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="confirmPicker3"
        @cancel="showPopup3 = false"
      />
    </van-popup>
    <van-popup v-model="showPopup4" position="bottom" :close-on-click-overlay="false">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="confirmPicker4"
        @cancel="showPopup4= false"
      />
    </van-popup>
    <van-popup v-model="showPopup5" position="bottom" :close-on-click-overlay="false">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="confirmPicker5"
        @cancel="showPopup5= false"
      />
    </van-popup>
  </div>
</template>
<script>
import { institution } from "@/common/library/api";
export default {
  name: "institution",
  props: {
    showInsitution: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      columns: "",
      submit: "1",
      Salesman: "",
      // interCompanyCode: "",
      // // agentName: "",
      // Registrationagencycode: "",
      // ownershipInstitutionCode: "",
      showPopup: false,
      showInsitutionPopup: false,
      // 登录机构\
      loginComCode: "",
      loginComName: "",
      loginList: "",
      showPopup1: false,
      // 归属机构
      comList: "",
      comCode: "",
      comName: "",
      showPopup2: false,
      // 渠道类型
      producerList: "",
      producerName: "",
      producerCode: "",
      showPopup3: false,
      //代理人
      agentList: "",
      agentName: "",
      agentCode: "",
      showPopup4: false,
      // 业务员
      handlerList: "",
      handlerName: "",
      handlerCode: "",
      showPopup5: false,
      //维护人员
      salesman: "",

      result: ""
    };
  },
  watch: {
    showInsitution(val) {
      this.showInsitutionPopup = val;
      if (val) {
        this.Sell();
      }
    }
  },
  methods: {
    //调用出单机构接口
    async Sell() {
      const data = await institution({
        loginComCode: this.loginComCode,
        comCode: this.comCode,
        agentCode: this.agentCode,
        handlerCode: this.handlerCode,
        producerCode: this.producerCode
      });
      // var data = JSON.stringify(data);
      if (data.state === "200") {
        console.log(1212121);
        //登陆机构
        this.loginList = data.data.loginComList;
        if (this.loginList !== "") {
          for (var i = 0; i < this.loginList.length; i++) {
            if (this.loginList[i].isFlag == true) {
              this.loginComName = this.loginList[i].loginComName;
              this.loginComCode = this.loginList[i].loginComCode;
            }
          }
        }
        //归属机构
        this.comList = data.data.comList;
        if (this.comList !== "") {
          for (var i = 0; i < this.comList.length; i++) {
            if (this.comList[i].isFlag == true) {
              this.comName = this.comList[i].comName;
              this.comCode = this.comList[i].comCode;
            }
          }
        }
        console.log(this.comList);
        //渠道类型
        this.producerList = data.data.producerList;
        if (this.producerList !== "") {
          for (var i = 0; i < this.producerList.length; i++) {
            if (this.producerList[i].isFlag == true) {
              this.producerName = this.producerList[i].producerName;
              this.producerCode = this.producerList[i].producerCode;
            }
          }
        }
        console.log(this.producerList);
        //代理人
        this.agentList = data.data.agentList;

        for (var i = 0; i < this.agentList.length; i++) {
          if (this.agentList[i].isFlag == true) {
            this.agentName = this.agentList[i].agentName;
            this.agentCode = this.agentList[i].agentCode;
          }
        }

        console.log(this.agentList);
        //业务员
        this.handlerList = data.data.handlerList;
        if (this.handlerList !== "") {
          for (var i = 0; i < this.handlerList.length; i++) {
            if (this.handlerList[i].isFlag == true) {
              this.handlerName = this.handlerList[i].handlerName;
              this.handlerCode = this.handlerList[i].handlerCode;
            }
          }
        }
        this.defendName = data.data.defendName;
      } else {
        this.$toast(data.message);
        this.showInsitutionPopup = true;
        //登陆机构
        this.loginList = data.data.loginComList;
        if (this.loginList) {
          for (var i = 0; i < this.loginList.length; i++) {
            if (this.loginList[i].isFlag == true) {
              this.loginComName = this.loginList[i].loginComName;
              this.loginComCode = this.loginList[i].loginComCode;
            }
          }
        }

        //归属机构
        this.comList = data.data.comList;
        if (this.comList !== "" && this.comList.length > 0) {
          for (var i = 0; i < this.comList.length; i++) {
            if (this.comList[i].isFlag == true) {
              this.comName = this.comList[i].comName;
              this.comCode = this.comList[i].comCode;
            }
          }
        } else {
          this.comName = "";
          this.comCode = "";
        }

        //渠道类型
        this.producerList = data.data.producerList;
        if (this.producerList !== "" && this.producerList.length > 0) {
          for (var i = 0; i < this.producerList.length; i++) {
            if (this.producerList[i].isFlag == true) {
              this.producerName = this.producerList[i].producerName;
              this.producerCode = this.producerList[i].producerCode;
            }
          }
        } else {
          this.producerName = "";
          this.producerCode = "";
        }

        //代理人
        this.agentList = data.data.agentList;

        if (this.agentList !== "" && this.agentList.length > 0) {
          // alert(this.agentList);
          for (var i = 0; i < this.agentList.length; i++) {
            if (this.agentList[i].isFlag == true) {
              this.agentName = this.agentList[i].agentName;
              this.agentCode = this.agentList[i].agentCode;
            }
          }
        } else {
          this.agentName = "";
          this.agentCode = "";
        }

        //业务员
        this.handlerList = data.data.handlerList;
        if (this.handlerList !== "" && this.handlerList.length > 0) {
          // alert(2342);
          for (var i = 0; i < this.handlerList.length; i++) {
            if (this.handlerList[i].isFlag == true) {
              this.handlerName = this.handlerList[i].handlerName;
              this.handlerCode = this.handlerList[i].handlerCode;
            }
          }
        } else {
          this.handlerName = "";
          this.handlerCode = "";
        }

        console.log(this.handlerList);
        this.defendName = data.data.defendName;
      }
    },
    async confirm() {
      // 确定
      const data = await institution({
        loginComCode: this.loginComCode,
        comCode: this.comCode,
        agentCode: this.agentCode,
        handlerCode: this.handlerCode,
        producerCode: this.producerCode,
        submit: this.submit
      });
      if (data.state === "200") {
        // alert("成功");
        this.showInsitutionPopup = false;
      } else {
        this.showInsitutionPopup = true;
        this.$toast(data.message);
      }
      // this.$router.go(0);
    },
    // 选择器 共用
    choosePopup1(list, name) {
      console.log(this.loginList);
      console.log(list, name);
      this.showPopup1 = true;
      this.columns = list;
      let bb = [];
      for (var i = 0; i < this.columns.length; i++) {
        let aa = {};
        aa.code = this.columns[i].loginComCode;
        aa.text = this.columns[i].loginComName;
        bb.push(aa);
        console.log(this.loginList);
        this.currentPicker = name;
      }
      this.columns = bb;
    },
    choosePopup2(list, name) {
      this.showPopup2 = true;
      this.columns = list;
      let bb = [];
      for (var i = 0; i < this.columns.length; i++) {
        let aa = {};
        aa.code = this.columns[i].comCode;
        aa.text = this.columns[i].comName;
        bb.push(aa);
        this.currentPicker = name;
      }
      this.columns = bb;
    },
    choosePopup3(list, name) {
      this.showPopup3 = true;
      this.columns = list;
      let bb = [];
      for (var i = 0; i < this.columns.length; i++) {
        let aa = {};
        aa.code = this.columns[i].producerCode;
        aa.text = this.columns[i].producerName;
        bb.push(aa);
        this.currentPicker = name;
      }
      this.columns = bb;
    },
    choosePopup4(list, name) {
      this.showPopup4 = true;
      this.columns = list;
      let bb = [];
      for (var i = 0; i < this.columns.length; i++) {
        let aa = {};
        aa.code = this.columns[i].agentCode;
        aa.text = this.columns[i].agentName;
        bb.push(aa);
        this.currentPicker = name;
      }
      this.columns = bb;
    },
    choosePopup5(list, name) {
      this.showPopup5 = true;
      this.columns = list;
      console.log(this.columns);
      let bb = [];
      for (var i = 0; i < this.columns.length; i++) {
        let aa = {};
        aa.code = this.columns[i].handlerCode;
        aa.text = this.columns[i].handlerName;
        bb.push(aa);
        this.currentPicker = name;
      }
      this.columns = bb;
    },
    // 确定选择
    confirmPicker1(picker, values) {
      this.showPopup1 = false;
      this.loginComCode = picker.code;
      this.loginComName = picker.text;
      this.Sell();
    },
    // 确定选择
    confirmPicker2(picker, values) {
      this.showPopup2 = false;
      this.comCode = picker.code;
      this.comName = picker.text;
      console.log(this.comCode);
      console.log(this.comName);
      this.Sell();
    },
    // 确定选择
    confirmPicker3(picker, values) {
      this.showPopup3 = false;
      this.producerCode = picker.code;
      this.producerName = picker.text;
      console.log(this.producerCode);
      console.log(this.producerName);
      this.Sell();
    },
    // 确定选择
    confirmPicker4(picker, values) {
      this.showPopup4 = false;
      this.agentCode = picker.code;
      this.agentName = picker.text;
      console.log(this.agentCode);
      console.log(this.agentName);
      this.Sell();
    },
    // 确定选择
    confirmPicker5(picker, values) {
      this.showPopup5 = false;
      this.handlerCode = picker.code;
      this.handlerName = picker.text;
      console.log(this.handlerCode);
      console.log(this.handlerName);
      this.Sell();
    }
  }
};
</script>
<style lang="scss" scope>
.insitution-popup {
  width: 80%;
  border-radius: 5px;
  .insitution-group {
    .title {
      font-size: 18px;
      color: #464646;
      line-height: 54px;
      text-align: center;
    }
    .confirm {
      display: block;
      margin: 20px 46px;
      border-radius: 5px;
      background: #558ffc;
      text-align: center;
      line-height: 40px;
      font-size: 17px;
      color: #fff;
    }
  }
}
</style>
