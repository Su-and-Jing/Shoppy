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
          v
          right-icon="arrow-down"
          @click="choosePopup(registrationOrganList,Registrationagency, 'registrationOrgan')"
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
          @click="choosePopup(channelList,ownership,'channelType')"
        />
        <van-field
          label="中介公司"
          readonly
          right-icon="arrow-down"
          v-model="interCompany"
          @click="choosePopup(interCompanyList,interCompanyCode,'interCompany')"
        />

        <van-field
          label="业务员"
          clearable
          v-model="maintPersonnel"
          right-icon="arrow-down"
          @click="choosePopup(maintPersonnelList,Salesman, 'maintPersonnel')"
        />
        <van-field label="维护人员" readonly v-model="salesman" />
        <span class="confirm" type="info" @click="confirm">确定</span>
      </van-cell-group>
    </van-popup>
    <!-- 下拉公共组件 -->
    <van-popup v-model="showPopup" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="confirmPicker"
        @cancel="showPopup = false"
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
      showPopup: false,
      showInsitutionPopup: true,
      // 登录机构\
      ID: "529",
      registrationOrgan: "",
      registrationOrganCode: "",
      registrationOrganList: [],
      // 归属机构
      ownershipInstitutionCode: "",
      ownershipInstitution: "",
      ownershipInstitutionList: [],
      // 渠道类型
      channelType: "专业代理",
      channelList: [
        "专业代理",
        "经纪业务",
        "其他兼业代理",
        "传统直销",
        "个人代理",
        "车商业务"
      ],
      //中介公司
      interCompanyCode: "",
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
      // 归属机构
      Ownershipagency: "",
      //渠道类型
      Channeltype: "",
      //中介公司
      agency: "",
      //业务员
      Salesman: "",
      //维护人员
      Maintenancepersonnel: "",

      // 存储标记
      storage: "",

      // 暂时存储code
      storagecode: ""
    };
  },
  watch: {
    showInsitution(val) {
      this.showInsitutionPopup = val;
    },
    channelType: {
      async handler(newValue, oldValue) {
        //调用出单机构接口
        if (this.showInsitutionPopup == true) {
          const data = await institution({
            producerName: this.channelType,
            producerCode: this.ID
          });
          console.log(data);
          if (data.state === "200") {
            this.$toast.success("成功22");

            //中介公司
            this.interCompanyList = data.data.agentList;
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
            //业务员
            this.maintPersonnelList = data.data.handlerList;
            var main = this.maintPersonnelList.map(item => {
              return item.handlerName;
            });
            console.log(main);
            this.maintPersonnelList = main;
            this.maintPersonnel = data.data.handlerList[0].handlerName;
          } else {
            this.$toast.fail("失败");
          }
        }
      }
    }
  },
  created() {
    this.Sell();
  },
  methods: {
    // 点击弹框确定
    // onChange() {
    //   // console.log(this.result.data.comList)
    //   // console.log(this.columns)

    // },

    //调用出单机构接口
    async Sell() {
      if (this.showInsitutionPopup == true) {
        const data = await institution({
          loginComName: this.registrationOrgan
        });
        if (data.state === "200") {
          this.$toast.success("成功");

          this.result = data;
          //登录机构
          this.registrationOrganList = this.result.data.loginComList;
          var reg = this.registrationOrganList.map(item => {
            return item.loginComName;
          });
          var code = this.registrationOrganList.map(item => {
            return item;
          });
          console.log(456456)
          console.log(code)
          this.registrationOrganList = reg;
          this.Registrationagency = code;
          this.registrationOrgan = this.result.data.loginComList[0].loginComName;
          this.data = this.result.data.comList;
          // ----------------------循环------------
          let a = [];
          for (let key in this.result.data.comList) {
            a.push(this.result.data.comList[key].comName);
          }
          this.columns = a;
          console.log(this.columns);
          // --------------------------------------

          // 归属机构
          this.ownershipInstitutionList = this.result.data.comList;
          var own = this.ownershipInstitutionList.map(item => {
            return item.comName;
          });
          var code = this.ownershipInstitutionList.map(item => {
            return item;
          });
          console.log(code);
          this.ownershipInstitutionList = own;
          this.ownershipInstitutionCode = code;
          // console.log(this.ownershipInstitutionList);
          this.ownershipInstitution = this.result.data.comList[0].comName;

          this.date = this.result.data.comList;

          // ----------------------循环------------
          let b = [];
          for (let key in this.result.data.comList) {
            b.push(this.result.data.comList[key].comName);
          }
          this.columns = b;
          console.log(this.columns);
          // --------------------------------------
        } else {
          this.$toast.fail("失败");
        }
      }
    },

    async confirm() {
      // 关闭弹框
      this.showInsitutionPopup = false;

      // 确定
      const data = await institution({
        comCode: this.Registrationagency,
        comCode: this.Registrationagency
      });
    },
    // 选择器 共用
    choosePopup(list, cod, name, b) {
      this.storage = b;
      console.log(list);
      this.code = cod;
      this.showPopup = true;
      this.columns = list;
      this.currentPicker = name;
    },

    onChange(picker, value, index) {
      if (this.code != null) {
        for (let key in this.code) {
          if (value == this.code[key].comName) {
            this.storagecode = this.code[key].comCode;
          }
        }
      }
    },

    // 确定选择
    confirmPicker(picker, values) {
      if (picker.text) {
        this[this.currentPicker] = picker.text;
      } else {
        this[this.currentPicker] = picker;
      }

      // 判断标记
      if (this.storage == "v") {
        this.Ownershipagency = this.storagecode;
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
