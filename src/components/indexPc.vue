<template>
  <div class="index-containt">
    <div class="bj">
      <div class="main">
        <van-notice-bar
          class="notice-bar"
          color="#fff"
          background="rgba(0,0,0,0)"
          text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
          left-icon="volume-o"
        />
        <div class="content">
          <div class="tab">
            <span
              class="figure tab-item"
              :class="{'active': currentTab == 1}"
              @click="changeTab(1)"
            >传图投保</span>
            <span
              class="manually tab-item"
              :class="{'active': currentTab == 2}"
              @click="changeTab(2)"
            >手动输入</span>
          </div>
          <!-- 传图投保 -->
          <div class="figure-wrap" v-if="currentTab == 1">
            <p class="title">请上传投保车辆的行驶证、车主身份证</p>
            <div class="upload">
              <!-- <v-uploader :multiple="true" :item-limit = 2 preview-img="../assets/sc.png"></v-uploader> -->
              <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
                list-type="picture-card"
              >
                <div class="el-upload__text">拖拽图片到这里上传</div>
              </el-upload>
            </div>
            <div class="el-upload__tip" slot="tip">共0张，还能上传2张</div>
            <!-- <p class="title">请上传投保车辆的行驶证、车主身份证</p>
            <div class="upload">
              <v-uploader :multiple="true" :item-limit = 2 preview-img="../assets/sc.png"></v-uploader>
            </div>-->
            <!-- <div class="images">
              <img src="../assets/sc.png" alt="">
            </div>-->
            <div class="btn">
              <van-button color="#568EFC">立即报价</van-button>
              <van-button color="#FEA23B">我的订单</van-button>
              <p>当日验车码：080913</p>
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
              <span class="submit" type="info" @click="priceHandle">立即报价</span>
            </van-cell-group>
          </div>
        </div>
      </div>
    </div>
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
    <Institution :show-insitution="showInsitution"></Institution>
  </div>
</template>

<script>
// import Login from './login';
// import Upload from "./module/upload";
import Login from "./module/login.vue";
import Institution from "./module/institution";
import { async } from "q";
export default {
  components: {
    Login,
    Institution
  },
  created() {
    // if (navigator.userAgent && navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
    //   this.$router.push({ path: "/index" });
    // }
  },
  data() {
    return {
      // 登陆框
      showLoginPop: false,
      // 记录登录状态
      onLogin: false,
      // 机构名称 简写
      institutions: "北京",
      // 选择出单机构
      showInsitution: true,
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

  methods: {
    //拖拽上传
    // uploadDone(files) {
    //   if (files && Array.isArray(files) && files.length) {
    //     // do something...
    //   }
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

<style lang="scss" scope>
@import "/style/share.scss";
// .qq-upload-fail {
//   display: none !important;
// }
// .qq-upload-status-text-selector {
//   display: none;
// }
// .info-show {
//   display: none;
// }
// .qq-upload-button-selector {
//   display: none !important;
// }
.index-containt {
  .manually {
    padding-right: 0 !important;
    margin-right: 65px;
    padding-bottom: 11px;
    &:hover {
      border-bottom: 3px solid #5c81ff;
    }
  }
  .figure {
    padding-right: 0 !important;
    margin-right: 65px;
    padding-bottom: 11px;
    &:hover {
      border-bottom: 3px solid #5c81ff;
    }
  }
  .bj {
    background: #417bf4;
    background: url("../assets/bg2.png") no-repeat;
    background-size: 100%;
    // height: 900px;
    padding: 0 0 70px;
    width: 100%;
  }

  .main {
    margin: 0 auto;
    // height: 600px;
    width: 1024px;
  }
  .content {
    background: #fff;
    // height: 700px;
    margin-top: 320px;
    padding: 30px 170px;
    .tab {
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      span {
        padding-right: 65px;
        line-height: 44px;
      }
    }
    .figure-wrap,
    .manually-wrap {
      .title {
        background: url("../assets/clock.png") no-repeat left center;
        background-size: 20px 20px;
        padding-left: 30px;
        line-height: 50px;
        font-size: 14px;
        color: #4a4a4a;
      }
    }
    .figure-wrap {
      .el-upload-list__item-actions {
        margin-top: 100px
      }
      position: relative;
      .el-upload__text {
        color: #fff;
        width: 170px;
        height: 25px;
        line-height: 25px;
        background: rgba(0, 0, 0, 1);
        opacity: 0.5;
        border-radius: 2px;
        position: absolute;
        top: 90px;
        left: 32%;
        text-align: center !important;
      }
      .upload {
        border: 1px dashed #4a4a4a;
        width: 500px !important;
        height: 400px !important;
      }
      .el-upload-dragger {
        width: 478px !important;
        height: 377px !important;
        background: url("../assets/upl.png") no-repeat;
        background-size: 100% !important;
        padding-bottom: 100px !important;
        position: relative;
        border: 0;
      }
      .qq-upload-list {
        position: absolute;
        left: 0;
        bottom: 0;
      }
      .v-uploader {
        width: 478px;
        height: 377px;
        box-sizing: border-box;
        opacity: 1;
        // background: red;
        position: relative;
      }
      .v-uploader {
        height: 377px;
        .txt {
          position: absolute;
          font-size: 14px;
          left: 150px;
          top: 95px;
          color: #fff;
          width: 170px;
          text-align: center;
          border-radius: 5px;
          opacity: 0.8;
          height: 36px;
          line-height: 36px;
          background: rgba(70, 70, 70, 1);
        }
      }
      .num {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(86, 142, 252, 1);
      }
      .img {
        margin: 20px 20px 40px 0;
      }
      .btn {
        padding-bottom: 50px;
        margin-top: 130px;
        .van-button {
          width: 160px;
          height: 40px;
          border-radius: 6px;
          margin-right: 20px;
        }
        p {
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(70, 70, 70, 1);
          line-height: 40px;
          padding-left: 190px;
        }
      }
    }
  }
}
.border-no.van-cell:not(:last-child)::after {
  display: none;
}
</style>