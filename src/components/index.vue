<template>
  <div class="index-containt">
    <div class="bg"></div>
    <van-notice-bar
      class="notice-bar"
      color="#fff"
      background="rgba(0,0,0,0)"
      text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
      left-icon="volume-o"
    />
    <!-- 投保城市 -->
    <!-- <div class="address-select">
      <van-field
        v-model="adress"
        readonly
        label="投保城市"
        right-icon="arrow-down"
        placeholder="请输入投保城市"
        @click="chooseAddress"/>
    </div>-->
    <!-- 登录机构缩写 -->
    <div class="agency-abbrev" v-if="onLogin">
      <span class="text" v-text="provinceName"></span>
    </div>
    <div class="main" :class="{'unLogin': !onLogin}">
      <div class="tab">
        <span class="figure tab-item" :class="{'active': currentTab == 1}" @click="changeTab(1)">
          传图投保
          <b class="icon"></b>
        </span>
        <span class="manually tab-item" :class="{'active': currentTab == 2}" @click="changeTab(2)">
          手动输入
          <b class="icon"></b>
        </span>
      </div>
      <!-- 传图投保 -->
      <div class="figure-wrap" v-if="currentTab == 1">
        <p class="title">请上传投保车辆的行驶证、车主身份证</p>
        <div class="upload" @click="upload">
          <van-uploader
            class="disabeld-file"
            :multiple="true"
            :disabled="this.showLoginPop==true"
            :after-read="afterRead"
          />

          <div class="center">上传照片</div>
        </div>
      </div>
      <!-- 手动输入 -->
      <div class="manually-wrap" v-if="currentTab == 2">
        <p class="title">如您手头暂无证件图片，也可选择车牌号报价</p>
        <template>
          <van-cell-group>
            <div class="license-number van-hairline--bottom">
              <van-field
                class="city border-no"
                v-model="carPlateSimple"
                readonly
                label="车牌号"
                maxlength="6"
                right-icon="arrow-down"
                @click="choose"
              />
              <van-field
                class="plate-number border-no"
                v-model="plateNumber"
                maxlength="6"
                placeholder="车牌号"
                :disabled="noLicenseFlag==true"
                @input="carPaiNum(plateNumber)"
              />
              <van-checkbox class="checkbox border-no" v-model="noLicenseFlag" @click="bbb">未上牌</van-checkbox>
            </div>
            <van-field v-model="carlei" readonly label="号牌种类" v-if="!noLicenseFlag" />
            <!-- right-icon="arrow-down" -->
            <!-- @click="choosePopup(carleiList, 'carlei')" -->
            <van-field
              label="车架号"
              clearable
              placeholder="请输入车架号"
              maxlength="17"
              input="value=value.replace(/[^\d]/g,'')"
              v-model="VIN"
              @input="number(VIN)"
              v-if="noLicenseFlag"
            />
            <van-field
              v-if="noLicenseFlag"
              v-model="engine"
              label="发动机号"
              placeholder="请输入发动机号"
              input="value=value.replace(/[^\d]/g,'')"
              @input="faNum(engine)"
              clearable
            />
            <van-field v-model="vehicle" readonly label="车辆类型" />
            <!-- right-icon="arrow-down" -->
            <!-- @click="choosePopup(vehicleList, 'vehicle')" -->
            <van-field v-if="!noLicenseFlag" v-model="usingNature" readonly label="使用性质" />
            <!-- right-icon="arrow-down" -->
            <!-- @click="choosePopup(usingNatureList, 'usingNature')" -->
            <van-field readonly v-model="masterProperties" label="车主性质" />
            <!-- right-icon="arrow-down" -->
            <!-- @click="choosePopup(masterPropertiesList, 'masterProperties')" -->

            <van-field label="车主姓名" clearable placeholder="请输入车主姓名" v-model="name" />
            <van-field v-model="certificateType" readonly label="车主证件类型" v-show="type == 1" />
            <!-- right-icon="arrow-down" -->
            <!-- @click="choosePopup(certificateList, 'certificateType')" -->
            <van-field v-model="certificateType2" v-show="type == 2" readonly label="车主证件类型" />
            <!-- right-icon="arrow-down" -->
            <van-field
              label="证件号码"
              maxlength="18"
              clearable
              placeholder="请输入证件号码"
              v-model="identifyNo"
            />
            <van-cell title="贷款车" value class="loanCar">
              <van-switch-cell v-model="loanCar" class="year" @click="!loanCar" />
            </van-cell>
            <van-field
              label="第一受益人"
              clearable
              placeholder="请输入第一受益人"
              v-show="loanCar"
              v-model="beneficiary"
            />
            <span class="submit" type="info" @click="priceHandle">立即报价</span>
          </van-cell-group>
        </template>
      </div>
    </div>
    <!-- 我的订单 -->
    <div class="order-wrap">
      <span class="router" @click="toOrderList">我的订单</span>
      <p class="code" v-if="onLogin">当日验车码：{{this.carVerifyCode}}</p>
    </div>
    <div style="height: 20px"></div>
    <!-- 投保城市选择 选择器-->
    <!-- <van-popup v-model="areaShadow" position="bottom">
      <van-area
        :area-list="areaList"
        @confirm="areaConfirm"
        @cancel="areaCancel"/>
    </van-popup>-->
    <!-- 选择器 公用-->
    <van-popup v-model="showPopup" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="confirmPicker"
        @cancel="showPopup = false"
      />
    </van-popup>
    <!-- 城市选择框 -->
    <van-popup v-model="showPopupCity" position="bottom" :style="{ height: '48%' }">
      <div class="chooseCity">
        <p>
          <span>选择省份</span>
          <span class="wc" @click="success">完成</span>
        </p>
        <ul>
          <li v-for="(item,index) in cityList" :key="index" @click="country(item)">{{item}}</li>
        </ul>
      </div>
    </van-popup>
    <!-- 登录 -->
    <Login :show-login="showLoginPop" @closeLogin="closeLogin"></Login>
    <!-- 选择出单机构 -->
    <Institution :show-insitution="showInsitution"></Institution>
    <van-popup v-model="show" :style="{width:'90%'}">
      <div class="content">
        <div
          tag="div"
          class="banner"
          v-for="(item,index) in CarTypeArr"
          :key="index"
          @click="getValue(item)"
        >
          <div class="nav">
            <h3>{{item.carseriesname}}</h3>
            <P>{{item.modelname}}</P>
            <div class="nav_box">
              <span class="zid">{{item.transmissiontype}}</span>
              <p>{{item.caryear==""?"":"款 | "}}{{item.seatmax}}座</p>
            </div>
          </div>
          <div class="price">￥{{item.purchaseprice}}</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
// import Login from './login';
import Login from "./module/login.vue";
import Institution from "./module/institution";
import { price, institution } from "@/common/library/api";
export default {
  data() {
    return {
      CarTypeArr: "",
      show: false,
      provinceName: "",
      certificateType2: "组织机构代码证",
      carlei: "小型汽车",
      carleiCode: "02",
      carleiList: [
        { code: "02", text: "小型汽车" }
        // { code: "01", text: "大型汽车" },
        // { code: "52", text: "小型新能源汽车" },
        // { code: "51", text: "大型新能源汽车" },
        // { code: "06", text: "外籍汽车" }
      ],
      engine: "",
      Registrationagency: "",
      beneficiary: "",
      //贷款车
      loanCar: false,
      // 验车码
      carVerifyCode: "",
      // 车牌号
      plateNo: "",
      // 车架号
      VIN: "",

      // // 是否上牌
      // noLicenseFlag: 0,
      //使用性质

      //是否新车
      noLicenseFlag: false,
      //身份证号
      identifyNo: "",

      //姓名
      name: "",

      role: "3",
      // 登陆框
      showLoginPop: false,
      // 记录登录状态
      onLogin: false,
      // 机构名称 简写
      // institutions: "//",
      // 选择出单机构
      showInsitution: false,
      cityShadow: false,
      showPopup: false,
      columns: [],
      // 记录选择器对应name
      currentPicker: "",
      currentTab: 1,
      // 是否上牌
      noLicenseFlag: false,
      // 车辆所属城市
      carPlateSimple: "",
      cityList: [
        "京",
        "津",
        "冀",
        "鲁",
        "豫",
        "黑",
        "辽",
        "吉",
        "晋",
        "浙",
        "皖",
        "沪",
        "闽",
        "渝",
        "赣",
        "蒙",
        "鄂",
        "新",
        "湘",
        "宁",
        "粤",
        "藏",
        "琼",
        "桂",
        "川",
        "贵",
        "云",
        "陕",
        "甘",
        "青",
        "苏",
        "港",
        "澳",
        "台"
      ],
      //车辆类型
      motorTypeCode: "A0",
      vehicle: "小型普通客车",
      // vehicleList: [{ code: "A0", text: "小型普通客车" }],
      // 使用性质
      usingNature: "非营运",
      motorUsageTypeCode: "8A",
      // usingNatureList: [
      //   // { code: "8A", text: "非营运" },
      //   // { code: "9A", text: "营运" }
      // ],
      // 车主证件类型
      certificateType: "身份证",
      // /证件类型
      identifyType: "01",
      certificateList: [
        { code: "01", text: "身份证" },
        { code: "03", text: "护照" },
        { code: "99", text: "港澳台居民居住证" },
        { code: "553", text: "外国人永久居住证" }
      ],
      //城市弹框
      showPopupCity: false,
      //车主姓名
      masterName: "",
      //车主性质
      type: "1",
      masterProperties: "个人",
      res: "",
      plateNumber: ""
      // masterPropertiesList: [
      // { code: "1", text: "个人" }
      // { code: "2", text: "机构" }
      // ]
    };
  },
  components: {
    Login,
    Institution
  },
  created() {
    if (
      !(
        navigator.userAgent &&
        navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
      )
    ) {
      this.$router.push({ path: "/indexPc" });
    }
    var token = window.sessionStorage.getItem("token");
    console.log(token);
    if (token) {
      this.onLogin = true;
      this.carVerifyCode = window.sessionStorage.getItem("carVerifyCode");
      this.provinceName = window.sessionStorage.getItem("provinceName");
      this.carPlateSimple = window.sessionStorage.getItem("carPlateSimple");
    }
  },
  methods: {
    getValue(item) {
      this.modeln = item.modelname;
      this.modelc = item.modelcode;
      console.log(this.modeln, this.modelc);
      this.show = false;
    },
    //选择城市
    country(item) {
      this.carPlateSimple = item;
      this.showPopupCity = false;
    },
    // plateNo(value) {
    //   value = value.toUpperCase();
    //   this.plateNo = value;
    //   console.log(this.plateNo)
    // },
    number(value) {
      value = value.toUpperCase();
      var z = new RegExp(/[^QIO]/g);
      value = value.match(z);
      if (value !== null) {
        value = value.join("");
        value = value.replace(/[^\w\.\/]/gi, "");
        this.VIN = value;
      } else {
        this.VIN = "";
      }
    },
    carPaiNum(value) {
      value = value.toUpperCase();
      var q = new RegExp(/[^]/g);
      value = value.match(q);
      if (value !== null) {
        value = value.join("");
        value = value.replace(/[^\w\.\/]/gi, "");
        this.plateNumber = value;
      } else {
        this.plateNumber = "";
      }
    },
    faNum(value) {
      value = value.toUpperCase();
      var y = new RegExp(/[^QIO]/g);
      value = value.match(y);
      if (value !== null) {
        value = value.join("");
        value = value.replace(/[^\w\.\/]/gi, "");
        this.engine = value;
      } else {
        this.engine = "";
      }
    },
    bbb() {
      console.log(this.noLicenseFlag);
      this.noLicenseFlag = !this.noLicenseFlag;
      this.VIN = "";
      this.engine = "";
      // this.name = "";
      // this.identifyNo = "";
      this.plateNo = "";
      console.log(this.noLicenseFlag);
    },
    //调用报价接口
    async priceHandle() {
      window.sessionStorage.getItem("token");
      this.plateNo = this.carPlateSimple + this.plateNumber;
      console.log(this.plateNo);
      var car = {};
      car.modelname = this.modeln;
      car.modelcode = this.modelc;
      car.plateType = this.carleiCode;
      car.plateNo = this.plateNo;
      car.VIN = this.VIN;
      car.motorTypeCode = this.motorTypeCode;
      car.motorUsageTypeCode = this.motorUsageTypeCode;
      car.noLicenseFlag = this.noLicenseFlag;
      car.loanStatus = this.loanCar;
      car.firstBeneMan = this.beneficiary;
      car.engine = this.engine;
      var customer = {};
      customer.name = this.name;
      customer.identifyNo = this.identifyNo;
      if (this.type == 2 && this.certificateType2 == "组织机构代码证") {
        this.identifyType = "10";
      } else {
        this.identifyType = "01";
      }
      customer.identifyType = this.identifyType;
      customer.role = this.role;
      customer.type = this.type;
      const data = await price({
        car,
        customer
      });
      window.sessionStorage.setItem("data", JSON.stringify(data));
      if (data.state === "200") {
        this.$router.push({
          name: "price",
          query: {
            data: data,
            beneficiary: this.beneficiary
          }
        });
        console.log(data);
      } else if (data.state === "1") {
        console.log(this.beneficiary);
        this.$router.push({
          name: "price",
          query: {
            beneficiary: this.beneficiary
            // data: data
          }
        });
        this.$toast(data.message);
        // } else if (data.state === "3") {
        //   // var token = window.sessionStorage.getItem("token");
        //   // token = "";
        //   this.$router.push({
        //     name: "index"
        //   });
      } else if (data.state === "2") {
        this.show = true;
        this.CarTypeArr = data.data;
      } else {
        this.$toast(data.message);
      }
    },
    chooseAddress() {
      this.areaShadow = true;
    },
    // // 选择投保城市
    // areaConfirm(item) {
    //   this.adress = item[0].name + ' ' + item[1].name + ' ' +item[2].name;
    //   this.areaShadow = false;
    // },
    // areaCancel() {
    //   this.areaShadow = false;
    // },
    // 切换tab
    changeTab(type) {
      var token = window.sessionStorage.getItem("token");
      if (!token) {
        this.showLoginPop = true;
        return;
      }

      this.currentTab = type;
    },
    // 跳出订单列表
    toOrderList() {
      var token = window.sessionStorage.getItem("token");
      console.log(token);
      if (!token) {
        this.showLoginPop = true;
        return;
      }
      this.$router.push({ path: "orderList" });
    },
    upload() {
      var token = window.sessionStorage.getItem("token");
      if (!token) {
        this.showLoginPop = true;
        return;
      }
    },
    // 传图投保
    afterRead(item) {
      // console.log(121)
      console.log(item);
      this.$router.push({
        name: "uploadImg",
        params: {
          imgs: item
        }
      });
    },

    // // 选择车型
    // chooseChassis() {
    //   console.log("选择车型");
    // },
    // // 使用性质
    // chooseNature() {
    //   console.log("使用性质");
    // },
    // 选择器 共用
    choosePopup(list, name) {
      console.log(list, name);
      this.showPopup = true;
      this.columns = list;
      this.currentPicker = name;
    },
    choose() {
      // console.log(list, name);
      this.showPopupCity = true;
      // alert("12312")
    },
    success() {
      this.showPopupCity = false;
    },
    // 确定选择
    confirmPicker(picker, values) {
      console.log(picker, values);
      picker = this.columns[values].text;
      this[this.currentPicker] = picker;
      this.showPopup = false;
      console.log(values);
      this.identifyType = this.certificateList[values].code;
      this.carleiCode = this.carleiList[values].code;
      this.type = this.masterPropertiesList[values].code;
      this.motorTypeCode = this.vehicleList[values].code;
      this.motorUsageTypeCode = this.usingNatureList[values].code;
    },
    // 关闭登录框 登录成功
    async closeLogin(res) {
      this.onLogin = true;
      this.showInsitution = true;
      this.showLoginPop = false;
      var token = window.sessionStorage.getItem("token");
      console.log(token);
      if (token) {
        this.res = res;
        console.log(this.res);
        this.provinceName = this.res.data.provinceName;
        this.carPlateSimple = this.res.data.carPlateSimple;
        this.carVerifyCode = this.res.data.carVerifyCode;
      }
    }
  }
};
</script>
<style scoped lang="scss">
@import "/style/index.scss";
@import "/style/share.scss";
</style>
<style  lang="scss" scope>
.van-checkbox__icon {
  font-size: 16px;
  margin-right: -4px;
}
.border-no.van-cell:not(:last-child)::after {
  display: none;
}
.loanCar {
  .van-switch-cell {
    padding: 0;
  }
}
.chooseCity {
  // opacity: 0.5;
  p {
    margin: 15px 20px 0;
    .wc {
      float: right;
      color: #558ffc;
    }
  }
  ul {
    background: rgba(243, 243, 243, 0.918);
    display: flex;
    display: -webkit-flex;
    // padding-left:8px;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 15px 20px;
    padding-bottom: 20px;

    li {
      width: 8%;
      height: 30px;
      border-radius: 4px;
      border: 1px solid rgba(204, 204, 204, 1);
      color: rgba(51, 51, 51, 1);
      text-align: center;
      line-height: 30px;
      background: #fff;
      margin: 15px 0 0 11.5px;
    }
  }
}
.content {
  width: 100%;
  // margin-top:53px;
  // margin-top: 65px;
  background: #fff;
  .banner {
    padding-bottom: 10px;
    border-bottom: 1px solid #e5e5e5;
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    .nav {
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      & > h3:nth-child(1) {
        font-size: 17px;
        font-family: PingFangSC-Medium, PingFangSC;
        color: rgba(74, 74, 74, 1);
      }
      & > p:nth-child(1) {
        font-size: 30px;
        font-family: PingFangSC-Regular, PingFangSC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 25px;
      }
      .nav_box {
        display: flex;
        .zid {
          display: block;
          padding: 3px 5px;
          font-size: 12px;
          height: 25px;
          background: rgba(255, 234, 208, 1);
          border-radius: 12.5px;
          color: rgba(246, 137, 0, 1);

          line-height: 25px;
        }
        & > p {
          margin-left: 15px;
          line-height: 25px;
          color: #999999;
          font-size: 12px;
        }
      }
    }
    .price {
      line-height: 100px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFangSC;
      font-weight: 400;
      color: rgba(246, 137, 0, 1);
    }
  }
}
</style>
