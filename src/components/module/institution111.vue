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
          label="代理人"
          readonly
          right-icon="arrow-down"
          v-model="interCompany"
          @click="choosePopup(interCompanyList,interCompanyCode,'interCompany',a = 'd')"
        />

        <van-field
          label="业务员"
          readonly
          v-model="maintPersonnel"
          right-icon="arrow-down"
          @click="choosePopup(maintPersonnelList,Salesman, 'maintPersonnel',a = 'e')"
        />
        <van-field label="维护人员" v-model="salesman" />
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
      submit: "1",
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
      agentPermitNo: "",
      certificateNo: ""
      // agentName:''
    };
  },
  watch: {
    showInsitution(val) {
      this.showInsitutionPopup = val;
      if (val) {
        // this.Sell();
        this.Sell();
      }
    }
  },
  methods: {
    //调用出单机构接口
    async Sell() {
      const data = await institution({
        loginComCode: this.Registrationagency,
        comCode: this.Ownershipagency,
        agentCode: this.agency,
        handlerCode: this.Salesma,
        producerCode: this.channelCode
      });
      if (data.state === "200") {
      }
    },

    async confirm() {
      // 确定
      const data = await institution({
        loginComCode: this.Registrationagency,
        comCode: this.Ownershipagency,
        agentCode: this.agency,
        handlerCode: this.Salesma,
        producerCode: this.channelCode,
        submit: this.submit
      });
      if (data.state === "200") {
        // alert("成功");
        this.showInsitutionPopup = false;
      } else {
        this.showInsitutionPopup = true;
        this.$toast(data.message);
      }
      this.$router.go(0);
    },
    // 选择器 共用
    choosePopup(list,name) {
      this.storage = b;
      console.log(cod);
      this.code = cod;
      this.showPopup = true;
      this.columns = list;
      this.currentPicker = name;
      // this.Sell();
    },
    // 确定选择
    confirmPicker(picker, values) {
      // this.Sell();
      console.log(picker, values);
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
