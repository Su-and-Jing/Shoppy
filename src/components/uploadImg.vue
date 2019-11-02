<template>
  <div>
    <header>
      <van-icon @click="backHandle" class="iconLeft" name="arrow-left" size="23px" />
      <p class="Vetit">传图投保</p>
    </header>
    <div class="containt">
      <!-- 身份证识别 -->
      <div class="id-wrap">
        <van-icon name="close" v-show="close1" class="close1" @click="closes1"></van-icon>
        <div class="img-wrap" @click="oneHandle">
          <div class="img">
            <img class="img" :src="imgData" alt :onerror="errorImg01" />
          </div>
          <!-- <div >上传照片</div> -->
          <van-uploader class="disabeld-file" :after-read="afterRead" />
        </div>
        <van-cell-group class="field-group">
          <van-field v-model="name" label="姓名" placeholder="请输入姓名" />
          <van-field v-model="IDType" readonly label="证件类型" />
          <!-- right-icon="arrow-down"  -->
          <!-- @click="choosePopup(typeList, 'IDType')" -->
          <van-field v-model="identifyNumber" label="身份证号" placeholder="请输入身份证号" />
          <van-field v-model="addr" label="地址" placeholder="请输入地址" />
        </van-cell-group>
      </div>
      <!-- 间隔样式 -->
      <div class="line-wrapper"></div>
      <!-- 驾驶证识别 -->
      <div class="driver-license-wrap">
        <van-icon name="close" v-show="close2" class="close2" @click="closes2"></van-icon>
        <div class="img-wrap">
          <div class="img">
            <img class="img" :src="imgUrl" alt :onerror="errorImg02" />
          </div>
          <!-- <div class="center" >上传照片</div> -->
          <van-uploader class="disabeld-file" :after-read="afterRead2" :before-read="this.LoadImg" />
        </div>
        <van-cell-group class="field-group">
          <van-field v-model="daiverIDType" readonly label="证件类型" placeholder="请选择" />
          <!-- right-icon="arrow-down" -->
          <!-- @click="choosePopup(typeList, 'IDType')" -->
          <van-field v-model="licensePlateNumber" label="车牌号码" placeholder="请输入车牌号码" />
          <van-field v-model="vin" label="车架号" placeholder="请输入车架号" />
          <van-field
            v-model="car"
            readonly
            label="车辆类型"
            right-icon="arrow-down"
            @click="choosePopup(carList, 'car')"
            placeholder="请选择"
          />
          <van-field
            v-model="card"
            readonly
            label="号牌种类"
            right-icon="arrow-down"
            @click="choosePopup(cardList, 'card')"
            placeholder="请选择"
          />
          <van-field
            v-model="Properties"
            readonly
            label="使用性质"
            right-icon="arrow-down"
            @click="choosePopup(PropertiesList, 'Properties')"
            placeholder="请选择"
          />
          <van-field v-model="registration" label="注册日期" />
          <van-field v-model="certification" label="发证日期" />
        </van-cell-group>
      </div>
      <!-- 间隔样式 -->
      <div class="line-wrapper"></div>
      <!-- 识别失败 -->
      <div class="failure-wrap" v-show="errorShow">
        <van-icon class="close3" name="close" v-show="close3" @click="closes3"></van-icon>
        <div class="img-wrap">
          <div class="img">
            <img class="img" :src="errImg" alt :onerror="errorImg03" />
          </div>
          <p class="remind" v-show="errorShow">
            <van-icon class="icon" name="warning" />小农暂时无法识别此类图片，再试试看哟！
          </p>
        </div>
        <van-cell-group class="field-group">
          <van-field
            v-model="daiverIDType"
            readonly
            label="证件类型"
            right-icon="arrow-down"
            @click="choosePopup(typeList, 'IDType')"
          />
        </van-cell-group>
      </div>
      <div class="submit">
        <van-button class="btn" type="info" size="large" @click="confirmHandle">确认报价</van-button>
      </div>
      <!-- 选择器 公用-->
      <van-popup v-model="showPopup" position="bottom">
        <van-picker
          show-toolbar
          :columns="currentColumns"
          @confirm="confirm"
          @cancel="showPopup = false"
        />
      </van-popup>
      <van-popup v-model="showsc" class="showIcon" :close-on-click-overlay="false">
        <img src="../assets/fenlei.png" alt />
        <!-- <p>正在上传</p> -->
      </van-popup>
      <!-- 显示遮罩层 -->
      <!-- <van-overlay :show="showupload">
      <div>cklsfj;lask</div>
      <img src="../assets/fenlei.png" alt="">
      </van-overlay>-->
    </div>
  </div>
</template>
<script>
import { UploadImg, price } from "@/common/library/api";
import { stringify } from "querystring";
export default {
  data() {
    return {
      showsc: false,
      addr: "",
      engine: "",
      noLicenseFlag: "1",
      close1: false,
      close2: false,
      close3: false,
      list2: "",
      list1: [],
      errorShow: false,
      errorImg01: 'this.src="' + require("../assets/upload/sfz.png") + '"',
      errorImg02: 'this.src="' + require("../assets/upload/xsz.png") + '"',
      errorImg03: 'this.src="' + require("../assets/ID.png") + '"',
      errImg: "",
      imgUrl: "",
      imgData: "",
      name: "",
      imgList: [],
      identifyNumber: "",
      imgId: "",
      daiverIDType: "车辆证件-行驶证",
      IDType: "车主证件-身份证正面",
      // typeList: [
      //   { code: "01", text: "车主证件-身份证正面" },
      //   { code: "02", text: "车辆证件-行驶证" }
      // ],
      showPopup: false,
      current: "",
      currentColumns: [],
      // 车牌号码
      licensePlateNumber: "",
      //车架号
      vin: "",
      //车辆类型
      car: "客车",
      carCode: "A0",
      carList: [{ code: "A0", text: "客车" }],
      //号牌种类
      cardCode: "",
      card: "小型汽车",
      cardList: [
        { code: "02", text: "小型汽车" },
        { code: "01", text: "大型汽车" },
        { code: "52", text: "小型新能源汽车" },
        { code: "51", text: "外籍汽车" }
      ],
      //使用性质
      Properties: "",
      PropertiesCode: "",
      PropertiesList: [
        { code: "9A", text: "营业出租租赁" },
        { code: "8A", text: "家庭自用" }
      ],
      //注册日期
      registration: "",
      //发证日期
      certification: "",
      content: "",
      aaa: "",
      img: "",
      list3: [],
      list4: [],
      bbb: "",
      // showupload: true,
      identifyType: "",
      imgList2: []
    };
  },
  created() {
    this.imgList = this.imgList.concat(this.$route.params.imgs);
    this.list2 = [];
    this.LoadImg();
    // this.confirmHandle();
  },
  methods: {
    backHandle() {
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
        return false;
      } else {
        this.$router.go(-1);
      }
    },
    // onChange(picker, value, index) {
    //   //此时返回的value就是个对象了
    //   var carCode = value.carCode;
    //   var carTitle = value.carTitle;
    //   console.log("当前值" + carCode + "当前索引" + carTitle);
    // },

    // 调用传图投保接口
    async LoadImg() {
      if (this.imgList.length > 2) {
        this.$toast("最多上传两张噢");
        this.imgList = "";
        return;
      }
      this.showsc = true;
      // console.log("==================");
      // this.showupload = true;
      let list = [];
      // console.log(this.imgList[0].content);
      for (let i = 0; i < this.imgList.length; i++) {
        list.push({ img: this.imgList[i].content, imgId: i + "" });
      }
      console.log(this.imgList.length);

      const data = await UploadImg({
        imgList: list
      });
      // let data = JSON.parse(sessionStorage.getItem("data"));
      if (data.state === "200") {
        this.showsc = false;
        // this.$toast.success("上传成功");
        // this.showupload = false;
        this.imgList2 = data.data.imgList;
        if (data.data.customerInfo) {
          this.close1 = true;
          // console.log(imgData)
          // this.IDType = data.data.customerInfo.identifyType;
          this.addr = data.data.customerInfo.addr;
          this.identifyNumber = data.data.customerInfo.identifyNumber;
          this.name = data.data.customerInfo.name;
          this.identifyType = data.data.customerInfo.identifyType;
          for (let i = 0; i < data.data.imgList.length; i++) {
            if (data.data.imgList[i].imgType === "1") {
              this.IDType = "车主证件-身份证正面";
              this.imgData = data.data.imgList[i].imgUrl;
            } else if (data.data.imgList[i].imgType === "2") {
              console.log(this.daiverIDType);
              this.daiverIDType = "车辆证件-行驶证";
              this.imgUrl = data.data.imgList[i].imgUrl;
            }
          }
        }
        if (data.data.carInfo) {
          this.close2 = true;
          this.engine = data.data.carInfo.engine;
          this.licensePlateNumber = data.data.carInfo.plateNo;
          this.motorTypeCode = data.data.carInfo.motorTypeCode;
          this.vin = data.data.carInfo.vIN;
          this.registration = data.data.carInfo.registerDate;
          this.certification = data.data.carInfo.issueDate;
          this.PropertiesCode = data.data.carInfo.motorUsageTypeCode;
          if (data.data.carInfo.motorUsageTypeCode === "9A") {
            this.Properties = "家庭自用";
          } else {
            this.Properties = "营业出租租赁";
          }
        }
        for (let i = 0; i < data.data.imgList.length; i++) {
          if (data.data.imgList[i].imgType === "1") {
            // this.IDType = "车主证件-身份证正面";
            this.imgData = data.data.imgList[i].imgUrl;
          } else if (data.data.imgList[i].imgType === "2") {
            // this.daiverIDType = "车辆证件-行驶证";
            this.imgUrl = data.data.imgList[i].imgUrl;
          }
        }
        if (data.data.carInfo === null && data.data.customerInfo === null) {
          this.errorShow = true;
          this.close3 = true;
          this.errImg = data.data.imgList[0].imgUrl;
        }
        for (var i = 0; i < this.cardList.length; i++) {}
      } else {
        // this.$toast.fail("上传失败");
      }
    },

    oneHandle() {},
    async afterRead(item) {
      this.showsc = true;
      this.list2 = this.list2.concat(JSON.stringify(item));
      this.aaa = item.content;
      this.list1.push({
        img: this.aaa,
        imgId: 0 + "",
        imgType: "1"
      });
      const data = await UploadImg({
        imgList: this.list1
      });
      // this.$toast.loading({
      //   mask: true,
      //   message: "正在上传..."
      // });
      if (data.state === "200") {
        this.showsc = false;
        // this.$toast.success("上传成功");
        if (data.data.customerInfo) {
          this.close1 = true;
          // console.log(imgData)
          this.identifyType = data.data.customerInfo.identifyType;
          // this.IDType = data.data.customerInfo.identifyType;
          this.addr = data.data.customerInfo.addr;
          this.identifyNumber = data.data.customerInfo.identifyNumber;
          this.name = data.data.customerInfo.name;
          for (let i = 0; i < data.data.imgList.length; i++) {
            if (data.data.imgList[i].imgType === "1") {
              // this.IDType = "车主证件-身份证正面";
              this.imgData = data.data.imgList[i].imgUrl;
            } else if (data.data.imgList[i].imgType === "2") {
              console.log(this.daiverIDType);
              // this.daiverIDType = "车辆证件-行驶证";
              this.imgUrl = data.data.imgList[i].imgUrl;
            }
          }
        } else {
          this.errorShow = true;
          this.close3 = true;
          this.errImg = data.data.imgList[0].imgUrl;
        }
      }
    },
    async afterRead2(item) {
      this.list3 = this.list3.concat(JSON.stringify(item));
      this.bbb = item.content;
      this.list4.push({
        img: this.bbb,
        imgId: 0 + "",
        imgType: "2"
      });
      const data = await UploadImg({
        imgList: this.list4
      });
      window.sessionStorage.setItem("data", JSON.stringify(data));

      this.showsc = true;
      if (data.state === "200") {
        // this.$toast.success("上传成功88888");
        if (data.data.carInfo) {
          this.showsc = false;
          this.close2 = true;
          this.licensePlateNumber = data.data.carInfo.plateNo;
          this.vin = data.data.carInfo.vIN;
          this.registration = data.data.carInfo.registerDate;
          this.certification = data.data.carInfo.issueDate;
          this.plateType = data.data.carInfo.plateType;
          this.PropertiesCode = data.data.carInfo.motorUsageTypeCode;
          if (data.data.carInfo.motorUsageTypeCode === "9A") {
            this.Properties = "家庭自用";
          } else {
            this.Properties = "营业出租租赁";
          }
          for (let i = 0; i < data.data.imgList.length; i++) {
            if (data.data.imgList[i].imgType === "1") {
              // this.IDType = "车主证件-身份证正面";
              this.imgData = data.data.imgList[i].imgUrl;
            } else if (data.data.imgList[i].imgType === "2") {
              // this.daiverIDType = "车辆证件-行驶证";
              this.imgUrl = data.data.imgList[i].imgUrl;
            }
          }
        } else {
          this.errorShow = true;
          this.close3 = true;
          this.errImg = data.data.imgList[0].imgUrl;
        }
      } else {
        // this.$toast.fail("上传失败");
      }
    },
    async confirmHandle() {
      window.sessionStorage.getItem("token");
      var car = {};

      car.plateNo = this.licensePlateNumber;
      car.VIN = this.vin;
      car.plateType = this.cardCode;
      car.motorTypeCode = this.carCode;
      car.motorUsageTypeCode = this.PropertiesCode;
      car.noLicenseFlag = this.noLicenseFlag;
      car.engine = this.engine;
      var customer = {};
      customer.name = this.name;
      customer.identifyNo = this.identifyNumber;
      customer.identifyType = this.identifyType;
      customer.role = this.role;
      customer.type = this.type;
      const data = await price({
        car,
        customer,
        imgList: this.imgList2
      });
      window.sessionStorage.setItem("data", JSON.stringify(data));
      if (data.state === "200") {
        this.$router.push({
          name: "price",
          params: p
        });
      }
      if (data.state === "1") {
        this.$router.push({ name: "price" });
        this.$toast("请手动把信息补全");
      } else {
        this.$toast.fail("跳转失败");
      }
    },
    choosePopup(list, name) {
      console.log(list, name);
      this.showPopup = true;
      this.currentColumns = list;
      this.current = name;
    },
    confirm(picker, values) {
      picker = this.currentColumns[values].text;
      this[this.current] = picker;
      this.showPopup = false;
      this.PropertiesCode = this.PropertiesList[values].code;
      this.cardCode = this.cardList[values].code;
    },
    closes1() {
      this.close1 = false;
      this.imgData = "";
      this.name = "";
      this.identifyNumber = "";
      this.addr = "";
    },
    closes2() {
      this.close2 = false;
      this.licensePlateNumber = "";
      this.vin = "";
      this.registration = "";
      this.certification = "";
      this.Properties = "";
      this.imgUrl = "";
      this.car = "";
      this.card = "";
    },
    closes3() {
      this.close3 = true;
      this.errImg = "";
      this.errorShow = false;
    }
  }
};
</script>
<style lang="scss" scope>
@import "/style/share.scss";
@import "/style/head.scss";
.showIcon {
  background: rgba(0, 0, 0, 0.1);
  height: 100%;
  width: 100%;
  text-align: center;
  padding-top: 140%;
  // opacity: 0;
  // color: #fff;
  // opacity: ;
}
.containt {
  margin-top: 53px;
  min-height: 100vh;
  background: #fff;
  .id-wrap {
    position: relative;

    .close1 {
      position: absolute;
      height: 30px;
      top: 25px;
      right: 30px;
      font-size: 24px;
    }
  }
  .id-wrap,
  .driver-license-wrap,
  .failure-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #fff;
    .img-wrap {
      width: 67.2%;
      height: 0;
      padding-top: 58.7%;
      position: relative;
      .img {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          max-width: 100%;
          max-height: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }

    // .van-uploader {
    //   position: relative;
    // }

    .field-group {
      width: 100%;
    }
    .remind {
      display: flex;
      align-items: center;
      .icon {
        font-size: 16px;
        margin-right: 2px;
      }
      font-size: 12px;
      color: #f55656;
      position: relative;
      z-index: 9;
      bottom: 12px;
    }
  }
  .driver-license-wrap {
    position: relative;

    .close2 {
      position: absolute;
      height: 30px;
      top: 25px;
      right: 30px;
      font-size: 24px;
    }
  }
  .failure-wrap {
    position: relative;
    .close3 {
      position: absolute;
      height: 30px;
      top: 25px;
      right: 30px;
      font-size: 24px;
    }
  }

  .submit {
    margin: 24px 16px;
    .btn {
      border-radius: 4px;
      height: 45px;
      line-height: 45px;
      background: #568efc;
      border-color: #568efc;
      font-size: 17px;
    }
  }
}
</style>
