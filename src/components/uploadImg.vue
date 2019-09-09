<template>
  <div class="containt">
    <!-- 身份证识别 -->
    <div class="id-wrap">
      <div class="img-wrap">
        <div class="img" @click="LoadImg">
          <img class="img" src="../assets/driver-license.png" alt data-id />
        </div>
        <div class="center">上传照片</div>
        <van-uploader class="disabeld-file" :after-read="afterRead" />
      </div>
      <van-cell-group class="field-group">
        <van-field v-model="name" label="姓名" placeholder="请输入姓名" />
        <van-field
          v-model="IDType"
          readonly
          label="证件类型"
          right-icon="arrow-down"
          @click="choosePopup(typeList, 'IDType')"
        />
        <van-field v-model="ID" label="身份证号" placeholder="请输入身份证号" />
      </van-cell-group>
    </div>
    <!-- 间隔样式 -->
    <div class="line-wrapper"></div>
    <!-- 驾驶证识别 -->
    <div class="driver-license-wrap">
      <div class="img-wrap" @click="LoadImg">
        <div class="img">
          <img class="img" src="../assets/driver-license.png" alt />
        </div>
        <div class="center">上传照片</div>
        <van-uploader class="disabeld-file" :after-read="afterRead" />
      </div>
      <van-cell-group class="field-group">
        <van-field
          v-model="daiverIDType"
          readonly
          label="证件类型"
          right-icon="arrow-down"
          @click="choosePopup(typeList, 'IDType')"
        />
        <van-field v-model="licensePlateNumber" label="车牌号码" placeholder="请输入车牌号码" />
        <van-field v-model="vin" label="车架号" placeholder="请输入车架号" />
        <van-field
          v-model="car"
          readonly
          label="车辆类型"
          right-icon="arrow-down"
          @click="choosePopup(carList, 'car')"
        />
        <van-field v-model="card" readonly label="号牌种类" right-icon="arrow-down" />
        <van-field
          v-model="Properties"
          readonly
          label="使用性质"
          right-icon="arrow-down"
          @click="choosePopup(PropertiesList, 'Properties')"
        />
        <van-field v-model="registration" label="注册日期" />
        <van-field v-model="certification" label="发证日期" />
      </van-cell-group>
    </div>
    <!-- 间隔样式 -->
    <div class="line-wrapper"></div>
    <!-- 识别失败 -->
    <div class="failure-wrap">
      <div class="img-wrap">
        <div class="img">
          <img class="img" src="../assets/ID.png" alt />
        </div>
        <p class="remind" v-if="">
          <van-icon class="icon" name="warning"/>小农暂时无法识别此类图片，再试试看哟！
        </p>
      </div>
      <van-cell-group class="field-group">
        <van-field
          v-model="daiverIDType"
          readonly
          label="证件类型"
          right-icon="arrow-down"
          @click="choosePopup(typeList.title, 'IDType')"
        />
      </van-cell-group>
    </div>
    <div class="submit">
      <van-button class="btn" type="info" size="large">确认报价</van-button>
    </div>
    <!-- 选择器 公用-->
    <van-popup v-model="showPopup" position="bottom">
      <van-picker
        show-toolbar
        :columns="currentColumns"
        value-key="title"
        @confirm="confirm"
        @cancel="showPopup = false"
      />
    </van-popup>
  </div>
</template>
<script>
import { UploadImg } from "@/common/library/api";
export default {
  data() {
    return {
      name: "",
      imgList: [],
      ID: "",
      imgId: "",
      daiverIDType: "",
      IDType: "",
      typeList: ["车主证件-身份证正面", "车辆证件-行驶证"],
      showPopup: false,
      current: "",
      currentColumns: [],
      // 车牌号码
      licensePlateNumber: "",
      //车架号
      vin: "",
      //车辆类型
      car: "客车",
      carList: ["客车"],
      //号牌种类
      card: "",
      cardList: [],
      //使用性质
      Properties: "",
      PropertiesList: ["营业出租租赁", "家庭自用"],
      //注册日期
      registration: "",
      //初登日期
      certification: "",
      content:''
    };
  },
  created() {
    this.imgList = this.imgList.concat(this.$route.params.imgs);
    this.LoadImg();
  },
  methods: {
    // onChange(picker, value, index) {
    //   //此时返回的value就是个对象了
    //   var carCode = value.carCode;
    //   var carTitle = value.carTitle;
    //   console.log("当前值" + carCode + "当前索引" + carTitle);
    // },

    // 调用传图投保接口
    async LoadImg() {
      let list = [];
      for (let i = 0; i < this.imgList.length; i++) {
        list.push({ img: this.imgList[i].content, imgId: i + "" });
      }
      console.log(UploadImg);
      const data = await UploadImg({
        imgList: list
      });
      console.log(data);
      if (data.state === "200") {
        this.$toast.success("上传成功");
        if (data.data.customerInfo) {
          // this.IDType = data.data.customerInfo.identifyType;
          this.ID = data.data.customerInfo.identifyNumber;
          this.name = data.data.customerInfo.name;
        }
        if (data.data.carInfo) {
          this.licensePlateNumber = data.data.carInfo.plateNo;
          this.vin = data.data.carInfo.vIN;
        }
      } else {
        this.$toast.fail("上传失败");
      }
    },
   async afterRead() {
      let list = [];
      for (let i = 0; i < this.imgList.length; i++) {
        list.push({ img: this.imgList[i].content, imgId: i + "" });
      }
      console.log(UploadImg);
      const data = await UploadImg({
        imgList: list
      });
      console.log(data);
      if (data.state === "200") {
        this.$toast.success("上传成功");
        if (data.data.customerInfo) {
          // this.IDType = data.data.customerInfo.identifyType;
          this.ID = data.data.customerInfo.identifyNumber;
          this.name = data.data.customerInfo.name;
        }
      } else {
        this.$toast.fail("上传失败");
      }
    },
    choosePopup(list, type) {
      this.showPopup = true;
      this.current = type;
      this.currentColumns = list;
    },
    confirm(picker) {
      this.showPopup = false;
      this[this.current] = picker;
    }
  }
};
</script>
<style lang="scss" scope>
@import "/style/share.scss";
.containt {
  min-height: 100vh;
  background: #fff;
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
