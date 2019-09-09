<template>
  <div class="price">
    <!-- 人工核保意见 -->
    <div class="art-Nuclear container">
      <van-cell title="人工核保意见" class="item">
        <van-button class="btn" v-show="!isShowArt" @click="isShowArt=true">展开</van-button>
        <van-button class="btn" v-show="isShowArt" @click="isShowArt=false">收起</van-button>
      </van-cell>
      <div v-show="isShowArt" class="pre-verification-txt">
        123
      </div>
    </div>
    <!-- 预核保意见 -->
    <div class="pre-verification container">
      <van-cell title="预核保意见" class="item">
        <van-button class="btn" v-show="!isShow" @click="isShow=true">展开</van-button>
        <van-button class="btn" v-show="isShow" @click="isShow=false">收起</van-button>
      </van-cell>
      <div v-show="isShow" class="pre-verification-txt">
        1、预核保意见预核保意见预核保意见预核保意见预核保意见预核保意见预核保意见预核保意见预核保意见
        2、预核保意见预核保意见预核保意见预核保意见预核保意见预核保意见
        3、预核保意见预核保意见预核保意见预核保意见预核保意见
        4、预核保意见预核保意见预核保意见预核保意见预核保意见预核保意见预核保意见预核保意见预核保意见
        5、预核保意见预核保意见预核保意见预核保意见预核保意见预核保意见预核保意见预核保意见预核保意见
      </div>
    </div>
    <!-- 车辆信息 -->
    <div class="car-msg container">
      <van-cell title="车辆信息" class="item">
        <van-button class="btn" v-show="!isShowCar" @click="isShowCar=true">展开</van-button>
        <van-button class="btn" v-show="isShowCar" @click="isShowCar=false">收起</van-button>
      </van-cell>
      <div class="car-msgInfo cells">
        <van-cell
          v-show="isShowCar"
          title="证件类型"
          is-link
          v-model="credentials"
          arrow-direction="down"
          @click="choosePopup(credentialsList,'credentials')"
        />
        <van-cell class="carNumber" title="车牌号码">
          <span>京</span>
          <van-icon name="arrow-down"></van-icon>
          <input type="text" placeholder="A456455" disabled />
        </van-cell>
       
        <div v-show="isShowCar">
          <van-cell
            title="车辆类型"
            is-link
            v-model="car"
            arrow-direction="down"
            @click="choosePopup(carList,'car')"
          />
          <van-cell
            title="使用性质"
            is-link
            arrow-direction="down"
            v-model="useCharacter"
            @click="choosePopup(useCharacterList,'useCharacter')"
          />

          <van-field v-model="value" label="品牌型号" readonly placeholder="大众高尔夫" />

          <van-field v-model="value" label="车辆识别代号" readonly placeholder="360281029" />
          <van-field v-model="value" label="发动机号码" placeholder="360281029" />
          <van-field
            label="注册日期"
            v-model="registerDate"
            right-icon="notes-o"
            @click="dateShow('registerDate')"
            readonly
          />
          <van-popup v-model="showPopupDate" position="bottom">
            <van-datetime-picker
              @confirm="confirmDate"
              @cancel="showPopupDate=false"
              v-model="currentDate"
              type="date"
            />
          </van-popup>
          <van-field
            label="发证日期"
            v-model="certificateDate"
            right-icon="notes-o"
            @click="dateShow('certificateDate')"
            readonly
          />
          <van-popup v-model="showPopupDate" position="bottom">
            <van-datetime-picker
              @confirm="confirmDate"
              @cancel="showPopupDate=false"
              v-model="currentDate"
              type="date"
            />
          </van-popup>
        </div>

        <van-cell title="一年内过户" value>
          <van-switch-cell v-model="open" class="year" />
        </van-cell>
      </div>
    </div>
    <!-- 车主信息 -->
    <div class="carMaster-msg container">
      <van-cell title="车主信息" class="item">
        <van-button class="btn" v-show="!isShowCarMaster" @click="isShowCarMaster=true">展开</van-button>
        <van-button class="btn" v-show="isShowCarMaster" @click="isShowCarMaster=false">收起</van-button>
      </van-cell>
      <div class="carMaster-msgInfo cells">
        <van-field v-model="value" label="车主姓名" readonly placeholder="黄雪芩" />
        <div v-show="isShowCarMaster">
          <van-cell
            title="证件类型"
            is-link
            v-model="card"
            arrow-direction="down"
            @click="choosePopup(cardList,'card')"
          />
          <van-field v-model="value" label="身份证号" readonly placeholder="360281199012108029" />
        </div>
      </div>
    </div>
    <!-- 投保方案 -->
    <div class="insurance-scheme container">
      <van-cell title="投保方案" class="item">
        <van-button class="btn" v-show="!isShowScheme" @click="isShowScheme=true">展开</van-button>
        <van-button class="btn" v-show="isShowScheme" @click="isShowScheme=false">收起</van-button>
      </van-cell>
      <!-- 交强险 -->
      <div class="com-insurance">
        <div class="com-title">
          <div class="left">
            <van-checkbox v-model="checked" shape="squre">交强险</van-checkbox>
          </div>
          <div class="right">
            <span>合计</span>
            <span class="money">￥1990</span>
          </div>
        </div>
        <van-divider />
        <div class="insurance-msg cells">
          <van-field
            label="起保日期"
            v-model="insRegDate"
            right-icon="notes-o"
            @click-right-icon="dateShow('insRegDate')"
            readonly
          >
            <van-button slot="button" size="small" color="#3F7CF5" plain>即时起保</van-button>
          </van-field>
          <van-popup v-model="showPopupDate" position="bottom">
            <van-datetime-picker
              @confirm="confirmDate"
              @cancel="showPopupDate=false"
              v-model="currentDate"
              type="date"
            />
          </van-popup>
          <van-cell title="交强险">
            <span style="float:right;color:#4a4a4a">￥1000</span>
          </van-cell>
          <van-cell title="车船税" v-show="checked">
            <span style="float:right;color:#4a4a4a">￥990</span>
          </van-cell>
          <van-cell
            title="缴税类型"
            is-link
            v-model="payTax"
            arrow-direction="down"
            @click="choosePopup(payTaxList,'payTax')"
          >
            <span slot="label" v-show="payTax==='减税'||payTax==='正常缴税'">(含往年补缴xx元，滞纳金xx元)</span>
          </van-cell>
          <!-- 已完税 -->
          <van-cell-group v-if="payTax==='已完税'">
            <van-field v-model="value" label="完税凭证号码" placeholder="请输入" />
            <van-field v-model="value" label="税务机关代码" placeholder="请输入" />
            <van-field v-model="value" label="税务机关名称" placeholder="请输入" />
            <van-field v-model="value" label="完税凭证填发日期" placeholder="请输入"></van-field>
            <van-field v-model="value" label="开税凭证地区代码" placeholder="请输入" />
          </van-cell-group>
          <!-- 免税 -->
          <van-cell-group v-if="payTax==='免税'">
            <van-field v-model="value" label="免税车型" placeholder="请输入" />
            <van-field v-model="value" label="减免税方案代码" placeholder="请输入" />
            <van-field v-model="value" label="减免比例" placeholder="请输入" />
            <van-field v-model="value" label="减免税凭证号" placeholder="请输入"></van-field>
            <van-field v-model="value" label="税务机关名称" placeholder="税务机关代码" />
          </van-cell-group>
          <!-- 减税 -->
          <van-cell-group v-if="payTax==='减税'">
            <van-field v-model="value" label="免税车型" placeholder="请输入" />
            <van-field v-model="value" label="减免税方案代码" placeholder="请输入" />
            <van-field v-model="value" label="减免比例" placeholder="请输入" />
            <van-field v-model="value" label="减免税凭证号" placeholder="请输入"></van-field>
            <van-field v-model="value" label="税务机关名称" placeholder="税务机关代码" />
          </van-cell-group>
          <!-- 不征 -->
          <van-cell-group v-if="payTax==='不征'">
            <van-field v-model="value" label="减免税凭证号" placeholder="请输入"></van-field>
            <van-field v-model="value" label="税务机关名称" placeholder="税务机关代码" />
          </van-cell-group>
        </div>
      </div>
      <!-- 商业险 -->
      <div class="buss-insurance cells">
        <div class="com-title">
          <div class="left">
            <van-checkbox v-model="bussines" shape="squre">商业险</van-checkbox>
          </div>
          <div class="right">
            <span>合计</span>
            <span class="money">￥2866</span>
          </div>
        </div>
        <van-divider />
        <div class="bussines-msg">
          <van-field
            label="起保日期"
            v-model="busRegisterDate"
            right-icon="notes-o"
            @click-right-icon="dateShow('busRegisterDate')"
            readonly
          >
            <van-button slot="button" size="small" color="#888" plain>即时起保</van-button>
          </van-field>
          <van-popup v-model="showPopupDate" position="bottom">
            <van-datetime-picker
              @confirm="confirmDate"
              @cancel="showPopupDate=false"
              v-model="currentDate"
              type="date"
            />
          </van-popup>
          <van-field
            label="终保日期"
            v-model="RegDate"
            right-icon="notes-o"
            @click-right-icon="dateShow('RegDate')"
            readonly
          ></van-field>
          <van-popup v-model="showPopupDate" position="bottom">
            <van-datetime-picker
              @confirm="confirmDate"
              @cancel="showPopupDate=false"
              v-model="currentDate"
              type="date"
            />
          </van-popup>
        </div>
        <van-divider />
        <div class="second">
          <span class="s2">车辆损失保险</span>
          <van-checkbox v-model="carChecked" shape="squre">不计免赔</van-checkbox>
          <van-switch v-model="carSwitch" size="24px" />
        </div>
        <van-divider />
        <div class="coverage">
          <span>保额</span>
          <input type="text" />
          <span class="money">￥990</span>
        </div>
        <!-- <van-cell
            title="保额"
            v-model="payTax"
            value="￥990"
          >
            <template slot="label">(请输入的保额区间在XXX- -XXX区间)</template>
        </van-cell>-->
        <van-divider />
        <div class="more" v-show="!moreShow" @click="moreShow =true">
          <van-button color="#568EFC" plain>添加更多商业险种</van-button>
        </div>
        <div class="moreInsure" v-show="moreShow">
          <div class="second insures">
            <span class="s2">第三者责任险</span>
            <van-checkbox v-model="secondChecked" shape="squre">不计免赔</van-checkbox>
            <div class="insures-right">
              <span>{{second}}</span>
              <van-icon name="arrow-down" @click="choosePopup(secondList,'second')"></van-icon>
              <span class="money">￥990</span>
            </div>
          </div>
          <van-divider />
          <div class="second insures">
            <span class="s2">司机座位险</span>
            <van-checkbox v-model="driverChecked" shape="squre">不计免赔</van-checkbox>
            <div class="insures-right">
              <span>{{driver}}</span>
              <van-icon name="arrow-down" @click="choosePopup(driverList,'driver')"></van-icon>
              <span class="money">￥100</span>
            </div>
          </div>
          <van-divider />
          <div class="second insures">
            <span class="s2">乘客座位险</span>
            <van-checkbox v-model="fareChecked" shape="squre">不计免赔</van-checkbox>
            <div class="insures-right">
              <span>{{fare}}</span>
              <van-icon name="arrow-down" @click="choosePopup(fareList,'fare')"></van-icon>
              <span class="money">￥100</span>
            </div>
          </div>
          <van-divider />
          <div class="second">
            <span class="s2">全车盗抢险</span>
            <van-checkbox v-model="robbingChecked" shape="squre">不计免赔</van-checkbox>
            <van-switch v-model="robbingSwitch" size="24px" />
          </div>
          <van-divider />
          <div class="second">
            <span style="padding-top:12px">车损无法找到第三方险</span>
            <van-switch v-model="damageSwitch" size="24px" />
          </div>
          <van-divider />
          <div class="second">
            <span class="s2" style="margin-right:35px">玻璃单独破碎险</span>
            <div class="import-btn">
              <span>{{import1}}</span>
              <van-icon name="arrow-down" @click="choosePopup(importList,'import1')"></van-icon>
            </div>
            <van-switch v-model="importSwitch" size="24px" />
          </div>
          <van-divider />
          <div class="second">
            <span class="s2" style="margin-right:35px">指定修理厂险</span>
            <div class="import-btn">
              <span>{{domestic}}</span>
              <van-icon name="arrow-down" @click="choosePopup(domesticList,'domestic')"></van-icon>
            </div>
            <van-switch v-model="domesticSwitch" size="24px" />
          </div>
          <van-divider />
          <div class="second insures">
            <span class="s2">划痕险</span>
            <van-checkbox v-model="scratchChecked" shape="squre">不计免赔</van-checkbox>
            <div class="insures-right">
              <span>{{scratch}}</span>
              <van-icon name="arrow-down" @click="choosePopup(scratchList,'scratch')"></van-icon>
              <span class="money">￥100</span>
            </div>
          </div>
          <van-divider />
          <div class="second insures">
            <span class="s2">精神损害险</span>
            <van-checkbox v-model="spiritChecked" shape="squre">不计免赔</van-checkbox>
            <div class="insures-right">
              <span>{{spirit}}</span>
              <van-icon name="arrow-down" @click="choosePopup(spiritList,'spirit')"></van-icon>
              <span class="money">￥990</span>
            </div>
          </div>
          <van-divider />
          <div class="second">
            <span class="s2">新增设备损失险</span>
            <van-checkbox v-model="facilityChecked" shape="squre">不计免赔</van-checkbox>
            <van-switch v-model="facilitySwitch" size="24px" />
          </div>
          <van-divider />
          <div class="second">
            <span class="s2">自然损失险</span>
            <van-checkbox v-model="natureChecked" shape="squre">不计免赔</van-checkbox>
            <van-switch v-model="natureSwitch" size="24px" />
          </div>
          <van-divider />
          <div class="second">
            <span class="s2">节假日限额翻倍险</span>
            <van-checkbox v-model="holidayChecked" shape="squre">不计免赔</van-checkbox>
            <van-switch v-model="holidaySwitch" size="24px" />
          </div>
          <van-divider />
          <div class="second">
            <span class="s2">涉水行驶损失险</span>
            <van-checkbox v-model="wadeChecked" shape="squre">不计免赔</van-checkbox>
            <van-switch v-model="wadeSwitch" size="24px" />
          </div>
          <van-divider />
        </div>
        <div class="close">
          <van-button color="#568EFC" plain v-show="moreShow" @click="moreShow=false">点击收起</van-button>
        </div>
      </div>
    </div>
    <!-- 保单信息 -->
    <div class="warranty">
      <p>中保信平台未返回上年保单信息</p>
      <div class="warranty-btn">
        <van-button plain color="#568EFC" style="margin-right:31px">平台参考信息</van-button>
        <van-button plain color="#568EFC">报价单</van-button>
      </div>
    </div>
    <div class="offer">
      <div class="offer-left">
        <p class="p1">￥14988.99</p>
        <div class="insures">
          <p>
            商业险 ￥1990
            <span class="money">3.5折</span>
          </p>
          <p>
            交强险 ￥1990
            <span class="money">2.5折</span>
          </p>
          <p>车船税 990</p>
        </div>
        <van-icon></van-icon>
      </div>

      <div class="offer-right">
        <van-button type="info">确认报价</van-button>
      </div>
    </div>
    <!-- <div class="offer" v-show="!bussines">
      <div class="offer-left">
        <p class="p1">￥--</p>
        <div class="insures">
          <p>
            商业险 ￥--
            <span class="money">-折</span>
          </p>
          <p>
            交强险 ￥--
            <span class="money">-折</span>
          </p>
          <p>车船税 ￥--</p>
        </div>
      </div>
       <div class="offer-left2">
        <span>￥--</span>
    </div>-->
    <!-- <div class="offer-right">
        <van-button type="info">确认报价</van-button>
      </div>
    </div>-->
    <!-- 下拉公共组件 -->
    <van-popup v-model="showPopup" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="confirmPicker"
        @cancel="showPopup = false"
      />
    </van-popup>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { cpus } from "os";
export default {
  data() {
    return {
      // 总价格
      sumShow: false,
      //添加更多保险
      moreShow: false,
      value: "",
      //涉水行驶损失险
      wadeChecked: true,
      wadeSwitch: true,
      //节假日限额翻倍
      holidayChecked: true,
      holidaySwitch: true,
      //自然损失险
      natureChecked: true,
      natureSwitch: true,
      //新增设备险
      facilityChecked: true,
      facilitySwitch: true,
      //精神损害险
      spiritChecked: true,
      //划痕险
      scratchChecked: true,
      // 指定修理厂险
      domesticSwitch: true,
      //玻璃单独破碎险
      importSwitch: true,
      // 车损第三方
      damageSwitch: true,
      //全车盗抢险
      robbingChecked: true,
      robbingSwitch: true,
      //乘客座位险
      fareChecked: true,
      //司机座位险
      driverChecked: true,
      //第三者责任险
      secondChecked: true,
      carSwitch: true,
      //车辆损失保险
      carChecked: true,
      //商业险按钮
      bussines: true,
      //显示车船税
      shipShow: false,
      //交强险按钮
      checked: true,
      //投保方案
      isShowScheme: false,
      //车主信息
      isShowCarMaster: false,
      // 车辆信息按钮
      isShowCar: false,
      // 人工核保按钮
      isShowArt: false,
      // 预核保按钮
      isShow: false,
      //一年内过户
      open: false,
      //证件类型下拉框
      columns: "",
      // 记录选择器对应name
      currentPicker: "",
      showPopup: false,
      //车牌号
     licensePlateNumber:'',
       // 车辆所属城市
      city: '京',
      cityList: ['京', '津', '冀', '鲁', '豫', '黑', '辽', '吉', '晋', '浙', '皖', '沪', '闽', '渝', '赣', '蒙', '鄂', '新', '湘', '宁', '粤', '藏', '琼', '桂', '川', '贵', '云', '陕', '甘', '青', '苏', '港', '澳', '台'],
      //证件类型
      credentials: "驾驶证",
      credentialsList: ["驾驶证"],
      //   车辆类型
      car: "小型普通客车",
      carList: ["小型普通客车", "货车"],
      //使用性质
      useCharacter: "营运",
      useCharacterList: ["营运", "非营运"],
      //   注册日期
      currentDate: "",
      currentDateName: "",
      // currentDate:'',
      // 默认不显示日期组件
      showPopupDate: false,
      //车主信息-证件类型
      card: "",
      cardList: ["身份证", "护照", "港澳台居民居住证", "外国人永久居住证"],
      payTax: "正常缴税",
      payTaxList: [
        { code:'1',text: "正常缴税"},
        { code:'2',text: "已完税" },
        { code:'3',text: "免税" },
        { code:'4',text: "减税" },
        { code:'5',text: "拒缴", disabled: true },
        { code:'6',text: "不征" }
      ],
      //第三者责任险
      second: "5万元",
      secondList: [
        "5万元",
        "10万元",
        "15万元",
        "20万元",
        "30万元",
        "50万元",
        "100万元",
        "150万元",
        "200万元",
        "250万元",
        "300万元",
        "350万元",
        "400万元",
        "450万元",
        "500万元",
        "550万元",
        "600万元",
        "650万元",
        "700万元",
        "750万元",
        "800万元",
        "850万元",
        "900万元",
        "950万元",
        "1000万元"
      ],
      //司机座位险
      driver: "5000元",
      driverList: ["", "", ""],
      //乘客座位险
      fare: "5000元",
      fareList: ["", "", ""],
      // 玻璃单独破碎险
      import1: "进口",
      importList: ["", "", ""],
      //指定修理厂险
      domestic: "国产",
      domesticList: ["", "", ""],
      //划痕险
      scratch: "2000元",
      scratchList: ["2000元", "5000元", "1万元", "2万元"],
      // 精神损害险
      spirit: "5万",
      spiritList: ["", "", ""],
      // 日期
      date1: "",
      registerDate: "",
      certificateDate: "",
      busRegisterDate: "",
      RegDate: "",
      insRegDate: ""
    };
  },
  created() {
    console.log(dayjs().add(1,'day').format("YYYY-MM-DD"))
    console.log(dayjs().add(1,'year').format("YYYY-MM-DD"))
  },
  methods: {
    // 选择器 共用
    choosePopup(list, name) {
      console.log(list, name);
      this.showPopup = true;
      this.columns = list;
      this.currentPicker = name;
    },
    // 确定选择
    confirmPicker(picker, values) {
      // console.log(picker, values);
      if (picker.text) {
        this[this.currentPicker] = picker.text;
      } else {
        this[this.currentPicker] = picker;
      }
      this.showPopup = false;
    },
    //显示注册日期
    dateShow(name) {
      this.showPopupDate = true;
      this.currentDateName = name;
      console.log(this.currentDateName);
    },
    // 确定选择
    confirmDate(picker) {
      this.currentDate = this[this.currentDateName];
      let date = dayjs(picker).format("YYYY-MM-DD");
      console.log(date, this.currentDateName);
      this[this.currentDateName] = date;
      this.showPopupDate = false;
    }
  }
};
</script>
<style lang="scss" scope>
.price {
  color: #4a4a4a;
  font-size: 14px;
  //添加更多商业品种
  .more,
  .close {
    .van-button {
      border: 0;
      font-size: 15px;
      font-family: PingFangSC;
      font-weight: 500;
      color: rgba(86, 142, 252, 1);
      line-height: 21px;
    }
    text-align: center;
  }
  // 日期统一样式
  // 即时起保按钮
  .van-button--small {
    position: absolute;
    right: 165px;
    top: 8px;
    border-radius: 4px;
  }
  .van-field__right-icon {
    position: absolute;
    right: 0px;
    top: 12px;
    font-size: 22px;
  }
  .van-field__control {
    position: absolute;
    left: 140px;
    top: 12px;
    color: #f68900;
  }
  //钱
  .money {
    color: #f68900;
  }
  //复选框按钮
  .van-icon-success {
    border-radius: 3px;
  }
  //标题统一样式
  .container {
        font-family: PingFangSC;
    .van-cell__title {
      color: #4a4a4a;
      font-size: 18px;
      font-weight: 500;
      color: rgba(74, 74, 74, 1);
      line-height: 25px;
      padding: 12px 0;
      float: left;
    }
    .btn {
      font-size: 15px;
      font-weight: 500;
      color: rgba(86, 142, 252, 1);
      line-height: 21px;
      float: right;
      border: 0;
      padding: 12px 0;
    }
  }
  .van-icon-arrow-down {
    line-height: 44px;
  }
  .item {
    padding: 2px 15px;
  }
  //内容统一样式
  input {
    border: 0;
  }
  .van-cell__title {
    margin-right: 15px;
  }
  // 预核保意见
  .container {
    margin-bottom: 15px;
    background: #fff;
    .pre-verification-txt {
      background: #fff;
      font-size: 14px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(74, 74, 74, 1);
      line-height: 24px;
      padding: 13px 15px;
      text-align: justify;
    }
  }
  //单元格格式
  .cells {
    font-family: PingFangSC;
    .van-cell {
      font-size: 15px;
      font-weight: 400;
      color: rgba(70, 70, 70, 1);
      line-height: 21px;
      padding: 0 15px;
    }
    .van-cell__title {
      font-size: 15px;
      font-weight: 400;
      color: rgba(70, 70, 70, 1);
      line-height: 21px;
      flex: 160px 0;
    }
    .van-cell__value {
      text-align: left;
      margin-left: -70px;
      padding-top: 12px;
    }
    .s1 {
      margin-right: 22px;
    }
  }
  //车辆信息
  .car-msgInfo {
    .van-field__control {
      margin-left: -140px;
    }
    .carNumber {
      padding-top: 0;
      line-height: 21px;
      .van-cell__value {
        padding-top: 0;
      }
      input {
        background: #fff;
      }
      .van-icon {
        margin-right: 10px;
      }
    }
    //开关按钮
    .year {
      padding-right: 0;
    }
    .van-icon-notes-o {
      font-size: 22px;
    }
  }
  //日期图标
  .van-icon-notes-o {
    font-size: 22px !important;
    float: right;
  }
  .van-cell__value--alone {
    padding: 0 !important;
  }
  //车主信息
  .carMaster-msg {
    .van-field__control {
      margin-left: -140px;
    }
  }
  //投保方案
  .insurance-scheme {
    font-family: PingFangSC;
    .van-switch {
      margin-top: 12px;
    }
    color: #464646;
    .com-title {
      overflow: hidden;
      padding: 13px 15px;
      .van-checkbox {
        background: rgba(255, 255, 255, 1);
        font-size: 16px;
        font-weight: 500;
        color: rgba(70, 70, 70, 1);
        line-height: 22px;
      }
      .left {
        float: left;
        font-size: 16px;
        font-weight: 500;
        color: rgba(70, 70, 70, 1);
        line-height: 24px;
        padding-top: 3px;
      }
      .right {
        float: right;
        .money {
          font-size: 17px;
          font-weight: 500;
          color: rgba(246, 137, 0, 1);
          line-height: 24px;
        }
      }
    }
    //交强险
    //起保日期
    .insurance-msg {
      .van-field__control{
        // padding-right:px !important;
      }
      .van-field {
        position: relative;
      }
      // 起保日期
      .van-field__body {
        text-align: left;
      }
      //已完税弹出信息
      .van-field__label {
        flex: 120px 0 !important;
      }
      //正常缴税提示信息
      .van-cell__label {
        color: red;
        width: 120%;
      }
      .van-cell {
        .title-style {
          size: large;
        }
        span{
          flex: 120px;
        }
        // padding: 0 15px;
        .van-icon-notes-o {
          padding-top: 15px;
        }
        .van-button {
        
          padding: 4px 12px;
          margin-left: 20px;
          line-height: 1;
        }
        .van-icon-notes-o {
          padding-top: 0;
        }
      }
    }
    //保额
    .coverage {
      .money {
        padding-right: 0 !important;
      }
    }
  }
  //商业险
  .buss-insurance {
    .bussines-msg {
      .van-field__label {
        flex: 120px 0;
      }
      .van-field__control {
        left: 140px;
      }
      .van-button--plain {
        padding: 0 12px;
        margin-left: 100px;
      }
      .van-button::before{

      }
    }
    .s2 {
      flex: 125px 0 !important;
      padding-top: 12px !important;
    }
    .second {
      box-sizing: border-box;
      display: flex;
      padding: 0 15px 7px 15px;
      font-size: 15px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(70, 70, 70, 1);
      line-height: 21px;
      span {
        flex: 1;
        padding-top: 2px;
        position: relative;
      }
      .van-checkbox {
        flex: 1;
      }
    }
    .coverage {
      padding: 0 15px;
      .money {
        float: right;
        padding: 17px 17px 0 0;
        font-size: 17px;
      }
      input {
        border: 1px solid #c7c7cc;
        margin: 8px 0 8px 15px;
        padding: 5px 0 5px 19px;
        width: 35%;
        border-radius: 4px;
      }
    }
    .insures {
      padding-top: 0;
      // vertical-align: middle;
      .van-checkbox {
        line-height: 21px;
        padding: 12px 0 20px 0;
      }
      .insures-right {
        position: relative;
        .money {
          position: absolute;
          top: 36px;
          right: 17px;
        }
      }
    }
    .import-btn {
      // position: absolute;
      // top: 12px;
      // left: 12px;
      flex: 1;
      padding-top: 0;
    }
  }
  .van-divider {
    margin: 0;
    padding: 0 15px;
  }
  //确认报价
  .offer {
    padding: 15px 15px 22px;
    background: #fff;
    .offer-left {
      float: left;
      .p1 {
        font-size: 23px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(70, 70, 70, 1);
        line-height: 33px;
      }
      .insures {
        p {
          font-size: 12px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(70, 70, 70, 1);
          line-height: 16px;
        }
      }
    }
    .offer-right {
      float: right;
      margin: 20px 5px 0 0;
      .van-button__text {
        padding: 0 32px;
      }
    }
  }
  //保单信息
  .warranty {
    padding: 15px 15px;
    background: #fff;
    margin-bottom: 15px;
    p {
      font-size: 12px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(245, 86, 86, 1);
      line-height: 26px;
    }
    .van-button__text {
      padding-top: 10px;
    }
    .warranty-btn {
      display: flex;
      padding: 0 7px;

      .van-button {
        flex: 1;
        height: 30px;
        line-height: 30px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        border: 1px solid rgba(86, 142, 252, 1);
      }
    }
  }
}
</style>