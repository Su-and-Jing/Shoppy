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
      <span class="text" v-text="institutions"></span>
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
        <div class="upload">
          <van-uploader class="disabeld-file" multiple :after-read="afterRead" />
          <div class="center">上传照片</div>
        </div>
      </div>
      <!-- 手动输入 -->
      <div class="manually-wrap" v-if="currentTab == 2">
        <p class="title">如您手头暂无证件图片，也可选择车牌号报价</p>
        <van-cell-group>
          <div class="license-number van-hairline--bottom">
            <van-field
              class="city border-no"
              v-model="city"
              readonly
              label="车牌号"
              maxlength="6"
              right-icon="arrow-down"
              @click="choosePopup(cityList, 'city')"
            />
            <van-field
              class="plate-number border-no"
              v-model="licensePlateNumber"
              maxlength="6"
              placeholder="车牌号"
            />
            <van-checkbox class="checkbox border-no" v-model="registration">未上牌</van-checkbox>
          </div>
          <van-field label="车架号" clearable placeholder="请输入车架号" v-model="chassisNumber" />
          <van-field
            v-if="!registration"
            v-model="vehicleType"
            readonly
            label="车辆类型"
            right-icon="arrow-down"
            @click="choosePopup(vehicleList, 'vehicleType')"
          />
          <van-field
            v-if="!registration"
            v-model="usingNature"
            readonly
            label="使用性质"
            right-icon="arrow-down"
            @click="choosePopup(usingNatureList, 'usingNature')"
          />
          <van-field
            v-model="certificateType"
            readonly
            label="车主证件类型"
            right-icon="arrow-down"
            @click="choosePopup(certificateList, 'certificateType')"
          />
          <van-field label="证件号码" clearable placeholder="请输入证件号码" v-model="idNumber" />
          <span class="submit" type="info">立即报价</span>
        </van-cell-group>
      </div>
    </div>
    <!-- 我的订单 -->
    <div class="order-wrap">
      <span class="router" @click="toOrderList">我的订单</span>
      <p class="code" v-if="onLogin">当日验车码：080913</p>
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
    <!-- 登录 -->
    <Login :show-login="showLoginPop" @closeLogin="closeLogin"></Login>
    <!-- 选择出单机构 -->
    <Institution :show-insitution="showInsitution" ></Institution>
  </div>
</template>

<script>
// import Login from './login';
import Login from "./module/login.vue";
import Institution from "./module/institution";

export default {
  data() {
    return {
      // 登陆框
      showLoginPop: false,
      // 记录登录状态
      onLogin: false,
      // 机构名称 简写
      institutions: "北京",
      // 选择出单机构
      showInsitution: false,
      cityShadow: false,
      showPopup: false,
      columns: [],
      // 记录选择器对应name
      currentPicker: "",
      currentTab: 1,
      // 是否上牌
      registration: 0,
      // 车辆所属城市
      city: "京",
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
      // 车牌号
      licensePlateNumber: "",
      // 车架号
      chassisNumber: "",
      // 车辆类型
      vehicleType: "小型普通客车",
      vehicleList: ["小型普通客车"],
      // 使用性质
      usingNature: "非营运",
      usingNatureList: ["非营运", "营运"],
      // 车主证件类型
      certificateType: "身份证",
      certificateList: [
        "身份证",
        "护照",
        "港澳台居民居住证",
        "外国人永久居住证"
      ],
      // 证件号码
      idNumber: ""
    };
  },
  components: {
    Login,
    Institution
  },
  mounted() {
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
  },
  methods: {

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
      if (!this.onLogin) {
        this.showLoginPop = true;
        return;
      }

      this.currentTab = type;
    },
    // 跳出订单列表
    toOrderList() {
      if (!this.onLogin) {
        this.showLoginPop = true;
        return;
      }
      this.$router.push({ path: "orderList" });
    },
    // 传图投保
    afterRead(item) {
      this.$router.push({
        name: "uploadImg",
        params: {
          imgs: item
        }
      });
    },
    // 选择车型
    chooseChassis() {
      console.log("选择车型");
    },
    // 使用性质
    chooseNature() {
      console.log("使用性质");
    },
    // 选择器 共用
    choosePopup(list, name) {
      console.log(list, name);
      this.showPopup = true;
      this.columns = list;
      this.currentPicker = name;
    },
    // 确定选择
    confirmPicker(picker, values) {
      this[this.currentPicker] = picker;
      this.showPopup = false;
    },
    // 关闭登录框 登录成功
    closeLogin() {
      this.showInsitution = true;
      this.onLogin = true;
      this.showLoginPop = false;
    }
  }
};
</script>

<style scoped lang="scss">
@import "/style/index.scss";
@import "/style/share.scss";
</style>
<style>
.van-checkbox__icon {
  font-size: 16px;
  margin-right: -4px;
}
.border-no.van-cell:not(:last-child)::after {
  display: none;
}
</style>
