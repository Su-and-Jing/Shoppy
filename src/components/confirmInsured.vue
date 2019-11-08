<template>
  <div>
    <header>
      <van-icon @click="backHandle" class="iconLeft" name="arrow-left" size="23px" />
      <p class="Vetit">确认投保</p>
    </header>
    <div class="containt-insured" style="margin-top:38px">
      <van-collapse v-model="activeNames">
        <van-collapse-item class="group" title="人员信息" name="owner">
          <div
            slot="right-icon"
            class="right-text"
            v-text="activeNames.indexOf('owner') > -1 ? '收起' : '展开'"
          ></div>
          <!-- 车主--个人 -->
          <van-cell-group class="item">
            <van-field v-model="one.name" label="车主姓名" placeholder="请输入车主姓名" />
            <van-field
              v-model="dentify"
              readonly
              label="证件类型"
              right-icon="arrow-down"
              @click="checkPicker('车主的证件类型',dentifyList)"
            />
            <van-field v-model="one.identifyNo" label="身份证号" placeholder="请输入身份证号" />
            <div class="Zjdate">
              <div class="datetit">证件有效期</div>
              <van-field
                class="field"
                readonly
                right-icon="notes-o"
                v-model="one.cervalidDate"
                @click="times=true"
              ></van-field>
              <van-field
                class="field"
                readonly
                right-icon="notes-o"
                v-model="one.creendDate"
                @click="times=true"
              ></van-field>
            </div>
            <van-popup v-model="times" position="bottom">
              <van-datetime-picker
                @confirm="confirmDate"
                @cancel="times=false"
                v-model="currentDate"
                type="date"
              />
            </van-popup>
            <van-field v-model="one.mobile" label="手机号码" maxlength="11" placeholder="请输入手机号码" />
            <Area :current-area="OneAddr,OneAddrCode" @checkedArea="checkedArea1" label="地址" />
            <van-field
              label
              type="textarea"
              v-model="one.addr"
              rows="1"
              autosize
              placeholder="请填写具体路名、门牌地址"
            />

            <van-field v-model="one.email" label="邮箱地址" placeholder="请输入邮箱地址" />
            <van-field
              v-model="OneOccupation"
              readonly
              label="职业"
              right-icon="arrow-down"
              @click="checkPicker('OneOccupation',occupationList)"
            />
          </van-cell-group>
          <!-- 投保人---个人 -->
          <van-cell-group class="item">
            <div class="check-wrap">
              <van-field value="同车主" label="投保人" readonly />
              <van-switch v-model="insuredOwner" size="24px" @click="insuredBtn"/>
            
            </div>

            <van-cell-group v-show="!insuredOwner">
              <van-field v-model="two.name" label="投保人" placeholder="请输入投保人姓名" />
              <van-field
                v-model="dentify"
                readonly
                label="证件类型"
                right-icon="arrow-down"
                @click="checkPicker('dentify',dentifyList)"
              />
              <van-field v-model="two.identifyNo" label="身份证号" placeholder="请输入身份证号" />

              <div class="Zjdate">
                <div class="datetit">证件有效期</div>
                <van-field
                  class="field"
                  readonly
                  right-icon="notes-o"
                  v-model="two.cervalidDate"
                  @click="times2=true"
                ></van-field>
                <van-field class="field" readonly right-icon="notes-o" v-model="two.creendDate"></van-field>
              </div>

              <van-popup v-model="times2" position="bottom">
                <van-datetime-picker
                  @confirm="confirmDate2"
                  @cancel="times2=false"
                  v-model="currentDate"
                  type="date"
                />
              </van-popup>

              <van-field v-model="two.mobile" label="手机号码" maxlength="11" placeholder="请输入手机号码" />
              <Area :current-area="TwoAddr,TwoAddrCode" @checkedArea="checkedArea3" label="地址" />

              <van-field
                label
                type="textarea"
                v-model="two.addr"
                rows="1"
                autosize
                placeholder="请填写具体路名、门牌地址"
              />
              <van-field v-model="two.email" label="邮箱地址" placeholder="请输入邮箱地址" />
              <van-field
                v-model="TwoOccupation"
                readonly
                label="职业"
                right-icon="arrow-down"
                @click="checkPicker('TwoOccupation',occupationList)"
              />
            </van-cell-group>
          </van-cell-group>
          <!-- 被保人---个人 -->
          <van-cell-group class="item">
            <div class="check-wrap">
              <van-field value="同车主" label="被保险人" readonly />
              <van-switch v-model="assuredOwner" size="24px" @click="assuredBtn"/>
           
            </div>

            <van-cell-group v-show="!assuredOwner">
              <van-field v-model="three.name" label="被保险人" placeholder="请输入被保险人姓名" />
              <van-field
                v-model="dentify"
                readonly
                label="证件类型"
                right-icon="arrow-down"
                @click="checkPicker('dentify',dentifyList)"
              />
              <van-field v-model="three.identifyNo" label="身份证号" placeholder="请输入身份证号" />

              <div class="Zjdate">
                <div class="datetit">证件有效期</div>
                <van-field
                  class="field"
                  readonly
                  right-icon="notes-o"
                  v-model="three.cervalidDate"
                  @click="times3=true"
                ></van-field>
                <van-field class="field" readonly right-icon="notes-o" v-model="three.creendDate"></van-field>
              </div>
              <van-popup v-model="times3" position="bottom">
                <van-datetime-picker
                  @confirm="confirmDate3"
                  @cancel="times3=false"
                  v-model="currentDate"
                  type="date"
                />
              </van-popup>
              <van-field v-model="three.mobile" label="手机号码" maxlength="11" placeholder="请输入手机号码" />
              <Area
                :current-area="ThreeAddr,ThreeAddrCode"
                @checkedArea="checkedArea5"
                label="地址"
              />
              <van-field
                label
                type="textarea"
                v-model="three.addr"
                rows="1"
                autosize
                placeholder="请填写具体路名、门牌地址"
              />
              <van-field v-model="three.email" label="邮箱地址" placeholder="请输入邮箱地址" />
              <van-field
                v-model="occupation"
                readonly
                label="职业"
                right-icon="arrow-down"
                @click="checkPicker('occupation',occupationList)"
              />
            </van-cell-group>   
            </van-cell-group>
          </van-cell-group>
        </van-collapse-item>
        <van-collapse-item class="group" title="影像上传" name="upload">
          <div
            slot="right-icon"
            class="right-text"
            v-text="activeNames.indexOf('upload') > -1 ? '收起' : '展开'"
          ></div>
          <Screenage :imgs="imgs" @emitImgList="emitImgs"></Screenage>
        </van-collapse-item>
        <van-collapse-item class="group" title="保单获取方式" name="access">
          <div
            slot="right-icon"
            class="right-text"
            v-text="activeNames.indexOf('access') > -1 ? '收起' : '展开'"
          ></div>
          <van-cell-group class="item">
            <van-field
              v-model="insurancePolicy"
              label="保单形式"
              readonly
              @click="checkPicker('insurancePolicy', insurancePolicyList)"
              right-icon="arrow-down"
            />
            <van-field
              v-if="insurancePolicy == '纸质'"
              v-model="distribution"
              readonly
              label="配送方式"
              @click="checkPicker('distribution', distributionList)"
              right-icon="arrow-down"
            />
            <van-field
              v-if="insurancePolicy == '电子'"
              v-model="mailAddr.email"
              label="邮箱地址"
              placeholder="请输入邮箱地址"
            />
            <van-cell-group v-if="insurancePolicy == '纸质' && distribution == '邮寄'">
              <van-field v-model="mailAddr.name" label="收件人" placeholder="请输入收件人" />
              <van-field v-model="mailAddr.mobile" label="手机号" placeholder="请输入手机号" />
              <Area :current-area="mail" @checkedArea="checkedArea7" />
              <van-field
                label
                type="textarea"
                v-model="mailAddr.addr"
                rows="1"
                autosize
                placeholder="请填写具体路名、门牌地址"
              />
            </van-cell-group>
          </van-cell-group>
        </van-collapse-item>
      </van-collapse>
      <div class="btn-group">
        <span class="confirm" @click="confirmInsure">确认投保</span>
      </div>
      <!-- 选择框统一 -->
      <van-popup position="bottom" v-model="showPopup">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPopup = false"
          @confirm="confirmPopup"
        />
      </van-popup>
      <van-popup v-model="passShow" class="people">
        <div>
          <van-icon name="cross" class="icon" @click="peopleClose" />
          <p class="info">提示</p>
          <p class="content">亲，此单自动核保不通过。您可至“我的订单-待处理”进行下一步操作</p>
          <div class="btn">
            <van-button type="default" @click="lookOrder">查看我的订单</van-button>
            <van-button type="default" @click="otherCar">投保其他车辆</van-button>
          </div>
        </div>
      </van-popup>
      <van-popup v-model="peopleShow" class="people">
        <div>
          <van-icon name="cross" class="icon" @click="peopleClose" />
          <p class="info">提示</p>
          <p class="content">亲，此单需要人工核保，请耐心等待5-10分钟。您可至“我的订单-待处理”进行下一步操作</p>
          <div class="btn">
            <van-button type="default" @click="lookOrder">查看我的订单</van-button>
            <van-button type="default" @click="otherCar">投保其他车辆</van-button>
          </div>
        </div>
      </van-popup>
      <!-- <van-popup v-model="show" class="showPopupPrice">
      <p>返回报价</p>
      <van-button plain color="#95c4fe" @click="cannelPrice">取消</van-button>
      <van-button type="info" @click="confirmSaleDiscount">确定</van-button>
      </van-popup>-->
      <van-popup v-model="loadShow" class="showIcon" :close-on-click-overlay="false">
      <img src="../assets/baijia.png" alt />
      <p style="padding-top:15px">投保中...</p>
    </van-popup>
    </div>
  </div>
</template>

<script>
import Area from "./module/area";

import aaaa from "@/common/library/area";
import Screenage from "./module/screenage";
import { confirmInsured, priceToConfirm, apply } from "@/common/library/api";
import dayjs from "dayjs";

export default {
  components: {
    Area,
    Screenage
  },
  data() {
    return {
      loadShow:false,
      imgUrl:'',
      passShow: false,
      peopleShow: false,
      one: [],
      two: [],
      three: [],
      mailAddr: [],
      customerVoList: [],
      show: false,
      currentDate: "",
      currentDateName: "",
      times: false,
      times2: false,
      times3: false,
      times4: false,
      times5: false,
      times6: false,
      times7: false,
      times8: false,
      times9: false,
      columns: "",
      // 订单号:''
      orderNo: "",
      activeNames: ["owner", "upload", "access"],
      OneOccupation: "工人",
      occupation: "",
      TwoOccupation: "工人",
      occupationList: [
        { code: "000101", text: "公务员．职员" },
        { code: "0402005", text: "工人" },
        { code: "1201002", text: "教师" },
        { code: "2103", text: "个体经营员" },
        { code: "210302", text: "无固定职业人员" },
        { code: "2105", text: "现役军人" },
        { code: "31", text: "学生" },
        { code: "410001", text: "文员白领" },
        { code: "410002", text: "农民" },
        { code: "410003", text: "公共服务" },
        { code: "410004", text: "专业技术人员" },
        { code: "410005", text: "商业、服务业人员" },
        { code: "410006", text: "生产、运输人员" },
        { code: "410007", text: "其他从业人员" }
      ],
      // 车主
      dentify: "身份证",
      dentifyList: [
        { code: "01", text: "身份证" },
        { code: "03", text: "护照" },
        { code: "553", text: "外国人永久拘留身份证" },
        { code: "10", text: "组织机构证" },
        { code: "B", text: "统一信用证" }
      ],
      type: "",
      role: "",
      owner: {
        // 证件有效期
        cervalidDate: "2019-09-19",
        creendDate: "",
        cardDate: "",
        name: "",
        // 证件类型
        dentifyType: "01",
        identifyNo: "",
        mobile: "",
        addr: "",
        email: "",
        // 市code
        city: "",
        cityValue: "",
        // type: "1",
        // 省code
        province: "",
        provinceValue: "",
        // 区code
        district: "",
        districtValue: "",
        //职业
        // 职业code
        job: "",

       
      },
      // 投保人
      insured: {
        // 证件有效期
        cervalidDate: "2019-09-19",
        creendDate: "",
        cardDate: "",
        name: "",
        // 证件类型
        dentifyType: "01",

        identifyNo: "",
        mobile: "",
        addr: "",
        email: "",
        // 市code
        city: "",
        cityValue: "",
        role: "3",
        // type: "1",
        // 省code
        province: "",
        provinceValue: "",
        // 区code
        district: "",
        districtValue: "",
        //职业
        // 职业code
        job: "",
      },
      // 被保险人
      assured: {
        role: "1",
        name: "",
        dentifyType: "01",
        identifyNo: "",
        mobile: "",
        addr: "",
        email: "",
        // 市code
        city: "",
        cityValue: "",
        role: "3",
        // type: "1",

        // 省code
        province: "",
        provinceValue: "",
        // 区code
        district: "",
        districtValue: ""
      },
      // 影像上传
      imgs: {
        idFront: "",
        idReverse: "",
        vehicleLicenseFront: "",
        vehicleLicenseReverse: "",
        carImgs: [],
        otherImgs: []
      },
      //车主性质
      type: "",
      insuredOwner: true,
      assuredOwner: true,
      showPopup: false,
      insurancePolicy: "电子",
      distribution: "网点自取",
      insurancePolicyList: [
        { code: 1, text: "电子" },
        { code: 2, text: "纸质" }
      ],
      distributionList: [
        { code: 1, text: "邮寄" },
        { code: 2, text: "网点自取" }
      ],
      columns: [],
      currentPop: "",
      email: "",
      city: "",
      cityCode: "",
      // mail: {
      //   // 配送方式
      //   expressType: "",
      //   //配送类型
      policyType: "",
      addressProps: [],
      OneAddr: "",
      OneAddrCode: "",
      TwoAddr: "",
      TwoAddrCode: "",
      ThreeAddr: "",
      ThreeAddrCode: "",
      mail: ""
    };
  },
  created() {},

  mounted() {
    this.confimHandle();
  },

  methods: {
    insuredBtn(){
      if(this.insuredOwner == true){
    
        this.two.name = "";
        this.two.cervalidDate = "";
        this.two.identifyNo = "";
      }
    },
    assuredBtn(){
       if(this.assuredOwner == true){
        this.three.name = "";
        this.three.cervalidDate = "";
        this.three.identifyNo = "";
      }
    },
    backHandle() {
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
        return false;
      } else {
        this.$router.go(-1);
      }
    },
    // 投保其他车辆
    otherCar() {
      this.$router.push({ path: "/" });
    },
    //跳到订单列表
    lookOrder() {
      this.orderType = "2";
      this.$router.push({
        name: "orderList",
        params: {
          orderType: this.orderType
        }
      });
    },
    // 确定选择
    // 车主日期
    confirmDate(picker) {
    
      if (this.one.role == "3") {

        let date1 = dayjs(picker).format("YYYY-MM-DD");
        // 车主
        this.one.cervalidDate = date1;
        console.log(date1, "1111111111");
        let dayy1 = new Date(this.one.cervalidDate); //日期
        dayy1.setFullYear(dayy1.getFullYear() + 20);
        let oneDate = dayjs(dayy1).format("YYYY-MM-DD");
        this.one.creendDate = oneDate;
      }
      this.times = false;
    },
    //    投保人日期
    confirmDate2(picker) {
      if (this.two.role == "1") {
        let date2 = dayjs(picker).format("YYYY-MM-DD");
        // 投保人
        this.two.cervalidDate = date2;
        let dayy2 = new Date(this.two.cervalidDate); //日期
        dayy2.setFullYear(dayy2.getFullYear() + 20);
        let twoDate = dayjs(dayy2).format("YYYY-MM-DD");
        this.two.creendDate = twoDate;
      }
      this.times2 = false;
    },
    //  被保人日期
    confirmDate3(picker) {
      if (this.three.role == "2") {
        let date3 = dayjs(picker).format("YYYY-MM-DD");
        this.three.cervalidDate = date3;
        let dayy3 = new Date(this.three.cervalidDate);
        console.log(dayy3)
        dayy3.setFullYear(dayy3.getFullYear() + 20);
        let threeDate = dayjs(dayy3).format("YYYY-MM-DD");
        this.three.creendDate = threeDate;
      }
      this.times3 = false;
    },
    // 确认报价
    async confimHandle() {
      var orderNo = this.$route.query.orderNo;
      const data = await priceToConfirm(orderNo);
      if (data.state === "200") {
        let ownerCar = data.data.customerVoList[0]; //车主
        let PolicyHolder = data.data.customerVoList[1]; //投保人
        let InsuredPerson = data.data.customerVoList[2]; //被保人
        let expressInfo = data.data.expressInfo;
        this.mailAddr = expressInfo;

        console.log(this.mailAddr);
        this.mail = `${expressInfo.provinceValue} ${expressInfo.cityValue} ${expressInfo.districtValue}`;

        if (ownerCar.role == "3") {
          // console.log(111111111111111);
          //车主
          this.OneAddr = `${ownerCar.provinceValue} ${ownerCar.cityValue} ${ownerCar.districtValue}`;
          this.OneAddrCode = `${ownerCar.province} ${ownerCar.city} ${ownerCar.district}`;
          this.one = ownerCar;
          console.log(this.one.type);
        }
        if (PolicyHolder.role == "1") {
          //投保人
          this.TwoAddr = `${PolicyHolder.provinceValue} ${PolicyHolder.cityValue} ${PolicyHolder.districtValue}`;
          this.TwoAddrCode = `${PolicyHolder.province} ${PolicyHolder.city} ${PolicyHolder.district}`;
          this.two = PolicyHolder;
          console.log(this.two)
        }
        if (InsuredPerson.role == "2") {
          this.ThreeAddr = `${InsuredPerson.provinceValue} ${InsuredPerson.cityValue} ${InsuredPerson.districtValue}`;
          this.ThreeAddrCode = `${InsuredPerson.province} ${InsuredPerson.city} ${InsuredPerson.district}`;
          this.three = InsuredPerson;
        }
      }
    },
    // 调用核保接口
    async confirmInsure() {
      this.loadShow = true;
      if (this.insuredOwner == true) {
        this.two = Object.assign({}, this.one);
        this.two.role = "1";
      }
      if (this.assuredOwner == true) {
        // this.three = this.one;
        this.three = Object.assign({}, this.one);
        this.three.role = "2";
      }
      var obj = [];
      (obj[0] = this.one), (obj[1] = this.two), (obj[2] = this.three);
      this.mailAddr = this.mailAddr;
      var orderNo = this.$route.query.orderNo;
      const data = await confirmInsured({
        customerVoList: obj,
        orderNo: orderNo,
        expressInfo: this.mailAddr,
        imageUrl:this.imgUrl
      });
      if (data.state === "200") {
        this.loadShow = false;
        var statusChild = data.data.status;
        if (data.data.status === "4" || data.data.status === "10") {
          this.passShow = true;
          this.orderType = "2";
          // this.$router.push({
          //   name: "orderList",
          //   params: {
          //     orderType: this.orderType
          //   }
          // });
          // alert("下发修改");
        } else if (data.data.status == "3") {
          this.loadShow = false;
          this.peopleShow = true;
          this.orderType = "1";

          // alert("人工核保");
        } else if (data.data.status == "5") {
          this.loadShow = false;
          // alert("待支付");
          this.pay();
        }
      } else if (data.state === "1") {
        this.loadShow = false;
        // this.$toast(data.message);
        this.$router.push({ path: "/price" });
      } else {
        this.loadShow = false;
        this.$toast(data.message);
      }
    },
    checkPicker(current, list) {
      console.log(current, list);
      console.log(current);
      this.currentPop = current;
      this.columns = list;
      console.log(this.columns);
      this.showPopup = true;
    },
    async pay() {
      var orderNo = this.$route.query.orderNo;
      console.log(orderNo)
      const data = await apply(orderNo);
      console.log(orderNo);
      if (data.state === "200") {
        var imgUrl = data.data;
        console.log(imgUrl);
        // window.localStorage.setItem(imgUrl,'data.data')
        this.$router.push({
          name: "payment",
          params: {
            imgUrl: imgUrl,
            orderNo:orderNo
          }
        });
      }
    },
    // 自动核保不通过按钮
    peopleClose() {
      this.peopleShow = false;
      this.$router.push({
        name: "orderList",
        params: {
          orderType: this.beneficiary
        }
      });
    },
    // 确定选择
    confirmPopup(picker, values) {
      console.log(picker, values);
      this.showPopup = false;
      if (picker.text) {
        this[this.currentPop] = picker.text;
      } else {
        this[this.currentPop] = picker;
        console.log(picker);
      }
      //职业
      for (var i = 0; i < this.occupationList.length; i++) {
        if (this.occupationList[i].text === picker.text) {
          if (this.one.role == "3") {
            console.log();
            this.OneOccupation = this.occupationList[i].text;
            this.one.job = this.occupationList[i].code;
          }
          if (this.two.role == "1") {
            this.TwoOccupation = this.occupationList[i].text;
            this.two.job = this.occupationList[i].code;
          }
        }
      }
      //证件类型
      for (var i = 0; i < this.dentifyList.length; i++) {
        if (this.dentifyList[i].text === picker.text) {
          this.dentify = this.dentifyList[i].text;
          this.owner.dentifyType = this.dentifyList[i].code;
          console.log(this.owner.dentifyType);
        }
      }
 
      //车主性质
 
      for (var i = 0; i < this.insurancePolicyList.length; i++) {
        if (this.insurancePolicyList[i].text === picker.text) {
          this.insurancePolicy = this.insurancePolicyList[i].text;
          this.mailAddr.policyType = this.insurancePolicyList[i].code;
        }
      }
      if (picker.text == "纸质"){
      this.mailAddr.email = "";
      }
      for (var i = 0; i < this.distributionList.length; i++) {
        if (this.distributionList[i].text === picker.text) {
          this.distribution = this.distributionList[i].text;
          this.mailAddr.expressType = this.distributionList[i].code;
        }
      }
    },
    checkedArea7(code, city) {
      console.log(code, city, "_----------------------------城市");
      this.city = city;
      this.cityCode = code;
      var bb = this.city.split(" ");
      var aa = this.cityCode.split(" ");
      this.mailAddr.province = aa[0];
      this.mailAddr.city = aa[1];
      this.mailAddr.district = aa[2];
      this.mailAddr.provinceValue = bb[0];
      this.mailAddr.cityValue = bb[1];
      this.mailAddr.districtValue = bb[2];
    },
    checkedArea1(code, city) {
      console.log(code, city, "_----------------------------城市");
      this.city = city;
      this.cityCode = code;
      var bb = this.city.split(" ");
      var aa = this.cityCode.split(" ");
      this.one.province = aa[0];
      this.one.city = aa[1];
      this.one.district = aa[2];
      this.one.provinceValue = bb[0];
      this.one.cityValue = bb[1];
      this.one.districtValue = bb[2];
    },
    checkedArea3(code, city) {
      console.log(code, city, "_----------------------------城市");
      this.city = city;
      this.cityCode = code;
    
      var bb = this.city.split(" ");
      var aa = this.cityCode.split(" ");
      this.two.province = aa[0];
      this.two.city = aa[1];
      this.two.district = aa[2];
      this.two.provinceValue = bb[0];
      this.two.cityValue = bb[1];
      this.two.districtValue = bb[2];
    },
    checkedArea5(code, city) {
      console.log(code, city, "_----------------------------城市");
      this.city = city;
      this.cityCode = code;
      var bb = this.city.split(" ");
      var aa = this.cityCode.split(" ");
      this.three.province = aa[0];
      this.three.city = aa[1];
      this.three.district = aa[2];
      this.three.provinceValue = bb[0];
      this.three.cityValue = bb[1];
      this.three.districtValue = bb[2];
    },
    emitImgs(list,list2) {
      this.imgs = list;
      this.imgUrl = list2;
    }
  }
};
</script>
<style lang="scss">
@import "./style/head.scss";
.people {
  width: 90%;
  padding: 20px 20px 30px;
  box-sizing: border-box;
  border-radius: 10px;
  .icon {
    float: right;
    font-size: 22px;
  }
  .info {
    text-align: center;
    height: 31px;
    font-size: 22px;
    font-family: PingFangSC-Medium, PingFangSC;
    font-weight: 500;
    color: rgba(70, 70, 70, 1);
    line-height: 31px;
    margin-bottom: 15px;
  }
  .content {
    width: 100%;
    height: 72px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFangSC;
    font-weight: 400;
    color: rgba(70, 70, 70, 1);
    line-height: 24px;
    margin-bottom: 17px;
  }
  .btn {
    display: flex;
    justify-content: space-around;
  }
}
.containt-insured {
  .group {
    margin-bottom: 15px;
    .van-collapse-item__title {
      .van-cell__title {
        font-size: 18px;
        line-height: 28px;
        color: #4a4a4a;
      }
    }
    .van-collapse-item__content {
      padding: 0;
    }
    .right-text {
      color: #568efc;
    }
    .item {
      .van-field__label {
        flex: 105px 0;
      }
      border-bottom: 8px solid #f0f2f4;
      &:last-child {
        border: none;
      }
      .check-wrap {
        display: flex;
        align-items: center;
        padding-right: 16px;
        position: relative;
        .van-field__control {
          text-align: right;
        }
        .every-btn {
          flex: 1;
          top: 35%;
          position: absolute;
          left: 33%;
        }
        .van-icon {
          position: absolute;
          top: 40%;
          left: 42%;
        }
      }
    }
  }
  .btn-group {
    background: #fff;
    padding: 20px;
    .confirm {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      border-radius: 5px;
      height: 45px;
      font-size: 17px;
      color: #fff;
      background: #568efc;
    }
  }
  .Zjdate {
    width: 100%;
    display: flex;

    .datetit {
      width: 105px;
      line-height: 34px;
      text-align: center;
      color: #323233;
      font-size: 14px;
    }
    .field {
      flex: 1;
    }
  }
}
.showIcon {
  background: rgba(0, 0, 0, 0.1);
  height: 100%;
  width: 100%;
  text-align: center;
  padding-top: 140%;
  color: #fff;
  font-size: 16px;
  // opacity: 0;
  // color: #fff;
  // opacity: ;
}
</style>
