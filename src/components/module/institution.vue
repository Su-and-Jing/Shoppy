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
          v-model="registrationOrgan"
          right-icon="arrow-down"
          @click="choosePopup(registrationOrganList,Registrationagencycode, 'registrationOrgan',a='a')"
        />
        <van-field
          label="归属机构"
          readonly
          right-icon="arrow-down"
          ref="aa"
          v-model="ownershipInstitution"
          @click="choosePopup(ownershipInstitutionList,ownershipInstitutionCode,'ownershipInstitution',a = 'v')"
        />
        <!-- ownershipInstitutionList:所有的name，ownershipInstitutionCode：对象，ownershipInstitution：显示的name，a = 'v'：标记   -->
        <van-field
          label="渠道类型"
          readonly
          right-icon="arrow-down"
          v-model="channelType"
          @click="choosePopup(channelList,ownership,'channelType',a = 'c')"
        />
        <van-field
          label="中介公司"
          readonly
          right-icon="arrow-down"
          v-model="interCompany"
          @click="choosePopup(interCompanyList,interCompanyCode,'interCompany',a = 'd')"
        />

        <van-field
          label="业务员"
          clearable
          v-model="maintPersonnel"
          right-icon="arrow-down"
          @click="choosePopup(maintPersonnelList,Salesman, 'maintPersonnel',a = 'e')"
        />
        <van-field label="维护人员" readonly v-model="salesman" />
        <span class="confirm" type="info" @click="confirm">确定</span>
      </van-cell-group>
    </van-popup>
    <!-- 下拉公共组件 -->
    <van-popup v-model="showPopup" position="bottom" :close-on-click-overlay="false">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="confirmPicker"
        @cancel="heihie"
        @change="onChange"
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
      // agentName: "永保保险代理有限公司河南分公司",
      Salesman: "",
      interCompanyCode: "",
      // agentName: "",
      Registrationagencycode: "",
      ownershipInstitutionCode: "",
      showPopup: false,
      showInsitutionPopup: false,
      // 登录机构\
      // ID: "53",
      registrationOrgan: "",
      registrationOrganList: [],
      // 归属机构
      ownershipInstitution: "",
      ownershipInstitutionList: [],
      // 渠道类型
      channelType: "请选择",
      channelCode: "",
      channelList: [
        { code: "53", text: "专业代理" },
        { code: "54", text: "经纪业务" },
        { code: "529", text: "其他兼业代理" },
        { code: "11", text: "传统直销" },
        { code: "51", text: "个人代理" },
        { code: "521", text: "车商业务" }
      ],
      //中介公司
      interCompany: "",
      interCompanyList: [],
      //维护人员
      salesman: "",
      //业务员
      maintPersonnelCode: "",
      maintPersonnel: "",
      maintPersonnelList: [],
      columns: null,
      result: "",
      date: null,
      // 选择之后的code
      code: null,
      // 如果没有code就填他
      ownership: null,
      // 下面时每一个选择的code
      // 登记机构
      Registrationagency: "",
      Registrationagen: "",
      // 归属机构
      Ownershipagency: "",
      Ownershipagen: "",
      //渠道类型
      //中介公司
      agency: "",
      agen: "",
      //业务员
      Salesma: "",
      Sales: "",
      //维护人员
      Maintenancepersonnel: "",
      // 存储标记
      storage: "",
      // 暂时存储code
      storagecode: "",
      agentCode: "",
      agreementNo: "",
      agentPermitNo: ""
      // agentName:''
    };
  },
  watch: {
    showInsitution(val) {
      this.showInsitutionPopup = val;
      if (val) {
        this.Sell();
        // this.Sell();
      }
    },
    channelType: {
      async handler(newValue, oldValue) {
        //调用出单机构接口
        console.log(this.Channelt);
        if (this.showInsitutionPopup == true) {
          const data = await institution({
            comCode: this.Ownershipagency,
            producerName: this.channelType,
            producerCode: this.channelCode,
            agentName: this.agentName
          });
          console.log(data);
          if (data.state === "200") {
            this.$toast.success("成功22");
            this.agentPermitNo = data.data.agentList[0].agentPermitNo;
            console.log(this.agentPermitNo);
            this.agreementNo = data.data.handlerList[0].agreementNo;
            //中介公司
            this.interCompanyList = data.data.agentList;
            console.log(data);
            var inter = this.interCompanyList.map(item => {
              return item.agentName;
            });
            var inte = this.interCompanyList.map(item => {
              return item;
            });
            // 添加code
            console.log(inte);
            this.interCompanyList = inter;
            this.interCompanyCode = inte;
            this.interCompany = data.data.agentList[0].agentName;
            this.agency = data.data.agentList[0].agentCode;
            this.agen = data.data.agentList[0].agentCode;

            this.Channeltyp = data.data.agentList[0].agentName;
            this.Channelt = data.data.agentList[0].agentName;
            console.log("==============");
            console.log(this.Channelt);
            //业务员
            this.maintPersonnelList = data.data.handlerList;
            var main = this.maintPersonnelList.map(item => {
              return item.handlerName;
            });
            console.log(main);
            this.maintPersonnelList = main;
            this.maintPersonnel = data.data.handlerList[0].handlerName;
            this.Salesma = data.data.handlerList[0].handlerCode;
            this.Sales = data.data.handlerList[0].handlerCode;
          } else {
            this.$toast.fail("失败");
          }
        }
        for (var i = 0; i < this.channelList.length; i++) {}
      }
    }
  },
  methods: {
    //调用出单机构接口
    async Sell() {
      const data = await institution({
        loginComName: this.registrationOrgan
      });
      console.log(2);
      if (data.state === "200") {
        console.log(2);
        this.showInsitutionPopup = true;
        this.result = data;
        console.log(data);

        // this.agentCode = data.data.agentList[0].agentCode;
        //登录机构
        this.registrationOrganList = this.result.data.loginComList;
        var reg = this.registrationOrganList.map(item => {
          return item.loginComName;
        });
        var code = this.registrationOrganList.map(item => {
          return item;
        });
        // this.agentName = data.date.
        this.Registrationagency = code[0].loginComCode;
        this.Registrationagen = code[0].loginComCode;
        this.registrationOrganList = reg;
        this.Registrationagencycode = code;
        this.registrationOrgan = this.result.data.loginComList[0].loginComName;
        this.data = this.result.data.loginComList;
        // ----------------------循环------------
        let a = [];
        for (let key in this.result.data.loginComList) {
          a.push(this.result.data.loginComList[key].loginComName);
        }
        console.log(a);
        this.columns = a;
        console.log(this.columns);
        // --------------------------------------

        // 归属机构
        this.ownershipInstitutionList = this.result.data.comList;
        // 获取name
        var own = this.ownershipInstitutionList.map(item => {
          return item.comName;
        });
        // 获取一个对象
        var code = this.ownershipInstitutionList.map(item => {
          return item;
        });
        console.log(code);
        this.Ownershipagency = code[0].comCode;
        this.Ownershipagen = code[0].comCode;
        this.ownershipInstitutionList = own;
        this.ownershipInstitutionCode = code;
        this.ownershipInstitution = this.result.data.comList[0].comName;
        this.date = this.result.data.comList;
        // ----------------------循环------------
        let b = [];
        for (let key in this.result.data.comList) {
          b.push(this.result.data.comList[key].comName);
        }

        this.columns = b;
      } else {
        this.$toast.fail("失败");
      }
    },

    async confirm() {
      // 关闭弹框
      this.showInsitutionPopup = false;

      // 确定
      const data = await institution({
        loginComCode: this.Registrationagency,
        comCode: this.Ownershipagency,
        agentCode: this.agency,
        handlerCode: this.Salesma,
        producerCode: this.channelCode,
        agreementNo: this.agreementNo,
        agentPermitNo: this.agentPermitNo,
        agentName: this.interCompany,
        handlerName: this.maintPersonnel,
        producerName: this.channelType,
        loginComName: this.registrationOrgan,
        comName: this.ownershipInstitution
      });
      if (data.state === "200") {
        // alert("成功");
      }
    },
    // 选择器 共用
    choosePopup(list, cod, name, b) {
      this.storage = b;
      console.log(cod);
      this.code = cod;
      this.showPopup = true;
      this.columns = list;
      this.currentPicker = name;
    },

    onChange(picker, value, index) {
      console.log(value);

      let thit = this;

      function a(name, code, jh) {
        if (thit.code != null) {
          for (let key in thit.code) {
            console.log(value, thit.code[key][name]);
            if (value == thit.code[key][name]) {
              console.log(thit.code[key][code]);
              thit[jh] = thit.code[key][code];
            }
          }
        }
      }

      if (this.storage == "v") {
        a("comName", "comCode", "Ownershipagency");
      }

      if (this.storage == "a") {
        a("loginComName", "loginComCode", "Registrationagency");
      }

      if (this.storage == "d") {
        a("agentName", "agentCode", "agency");
      }

      if (this.storage == "e") {
        a("handlerName", "handlerCode", "Salesma");
      }

      console.log(this.Registrationagency);
      //
      //
      //
      // if (this.storage == "a") {
      //     var name = 'loginComName';
      //     var code = 'loginComCode';
      // }
    },

    // 确定选择
    confirmPicker(picker, values) {
      if (picker.text) {
        this[this.currentPicker] = picker.text;
      } else {
        this[this.currentPicker] = picker;
      }
      this.showPopup = false;
      for (var i = 0; i < this.channelList.length; i++) {
        if (this.channelList[i].text === picker.text) {
          this.channelType = this.channelList[i].text;
          this.channelCode = this.channelList[i].code;
        }
      }
      console.log("1111111111111111111111");
      console.log(this.channelType);
      console.log(this.channelCode);
    },

    heihie() {
      if (this.storage == "a") {
        this.Registrationagency = this.Registrationagen;
      }

      if (this.storage == "v") {
        this.Ownershipagency = this.Ownershipagen;
      }

      if (this.storage == "d") {
        this.agency = this.agen;
      }

      if (this.storage == "e") {
        this.Salesma = this.Sales;
      }
      this.showPopup = false;
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
