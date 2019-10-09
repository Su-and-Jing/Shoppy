<template>
  <div class="price">
    <!-- 人工核保意见 -->
    <div class="art-Nuclear container">
      <van-cell title="人工核保意见" class="item">
        <van-button class="btn" v-show="!isShowArt" @click="isShowArt=true">展开</van-button>
        <van-button class="btn" v-show="isShowArt" @click="isShowArt=false">收起</van-button>
      </van-cell>
      <div v-show="isShowArt" class="pre-verification-txt">123</div>
    </div>
    <!-- 预核保意见 -->
    <div class="pre-verification container">
      <van-cell title="预核保意见" class="item">
        <van-button class="btn" v-show="!isShow" @click="isShow=true">展开</van-button>
        <van-button class="btn" v-show="isShow" @click="isShow=false">收起</van-button>
      </van-cell>
      <div v-show="isShow" class="pre-verification-txt">{{iLogPreUdwMess}}</div>
    </div>
    <!-- 车辆信息 -->
    <div class="car-msg container">
      <van-cell title="车辆信息" class="item">
        <van-button class="btn" v-show="!isShowCar" @click="isShowCar=true">展开</van-button>
        <van-button class="btn" v-show="isShowCar" @click="isShowCar=false">收起</van-button>
      </van-cell>
      <div class="car-msgInfo cells">
        <div v-show="isShowCar">
          <van-cell
            title="车辆类型"
            is-link
            v-model="car"
            arrow-direction="down"
            @click="choosePopup(carList,'car')"
            @change="changeHandle"
          />
          <van-field v-model="VIN" label="车架号" @change="changeHandle" />
          <van-field v-model="engine" label="发动机号" @change="changeHandle" />
          <van-field
            label="初登日期"
            v-model="registerDate"
            right-icon="notes-o"
            @click="dateShow('registerDate')"
            readonly
            @change="changeHandle"
          />
          <van-field v-model="model" label="品牌型号" @change="changeHandle" />
          <van-cell title="一年内过户" value @change="changeHandle">
            <van-switch-cell v-model="open" class="year" />
          </van-cell>
          <van-cell title="贷款车" value @change="changeHandle">
            <van-switch-cell v-model="loanCar" class="year" />
          </van-cell>
          <van-cell-group v-show="loanCar">
            <van-cell
              title="如需搜索特约库或手动添加特约，请点击右侧按钮"
              is-link
              arrow-direction="down"
              id="loanCar"
              @click="loanCarButton"
            />
            <van-cell title="特约1："></van-cell>
          </van-cell-group>
          <van-popup v-model="loanCarPopup" position="bottom"  closeable>
            <div class="contributing">
              <div class="top">
                <span>特别约定</span>
                <!-- <van-icon name="cross"></van-icon> -->
              </div>
              <div class="content">
                <div class="title">
                  <van-checkbox v-model="checked1">手工历史特约内容</van-checkbox>
                </div>
                <div class="child">
                  <van-checkbox v-model="checked2">本保单第一受益人是上海租赁公司</van-checkbox>
                  <van-checkbox v-model="checked3">本保单第一受益人是北京租赁公司</van-checkbox>
                </div>
                <div class="title">
                  <van-checkbox v-model="checked4">手工添加特约</van-checkbox>
                </div>
              </div>
              <van-button type="info">确定</van-button>
            </div>
          </van-popup>
          <van-popup v-model="showPopupDate" position="bottom">
            <van-datetime-picker
              @confirm="confirmDate"
              @cancel="showPopupDate=false"
              v-model="currentDate"
              type="date"
              @change="changeHandle"
            />
          </van-popup>
        </div>
      </div>
    </div>
    <!-- 车主信息 -->
    <div class="carMaster-msg container">
      <van-cell title="车主信息" class="item">
        <van-button class="btn" v-show="!isShowCarMaster" @click="isShowCarMaster=true">展开</van-button>
        <van-button class="btn" v-show="isShowCarMaster" @click="isShowCarMaster=false">收起</van-button>
      </van-cell>
      <div class="carMaster-msgInfo cells">
        <van-field v-model="carName" label="车主姓名" @change="changeHandle" />
        <div v-show="isShowCarMaster">
          <van-cell
            title="证件类型"
            is-link
            v-model="card"
            arrow-direction="down"
            @click="choosePopup(cardList,'card')"
            @change="changeHandle"
          />
          <van-field v-model="identifyNo" label="身份证号" @change="changeHandle" />
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
            <van-checkbox v-model="checked" shape="squre" @change="changeHandle">交强险</van-checkbox>
          </div>
          <div class="right">
            <span>合计</span>
            <span class="money">￥{{insuranceNum}}</span>
          </div>
        </div>
        <van-divider />
        <div class="insurance-msg cells">
          <van-field
            class="insurance-data"
            label="起保日期"
            v-model="insRegDate"
            right-icon="notes-o"
            @click-right-icon="dateShow('insRegDate')"
            readonly
            @change="changeHandle"
          >
            <van-button slot="button" size="small" color="#3F7CF5" plain>即时起保</van-button>
          </van-field>
          <van-popup v-model="showPopupDate" position="bottom">
            <van-datetime-picker
              @confirm="confirmDate"
              @cancel="showPopupDate=false"
              v-model="currentDate"
              type="date"
              @change="changeHandle"
            />
          </van-popup>
          <van-cell title="交强险">
            <span
              style="float:right;color:#4a4a4a"
              v-show="this.insuranceMoney!=0"
            >￥{{this.insuranceMoney}}</span>
          </van-cell>
          <div class="ship" v-show="checked">
            <van-cell title="车船税">
              <span style="float:right;color:#4a4a4a">￥{{shipNum}}</span>
            </van-cell>
            <van-cell
              title="缴税类型"
              is-link
              v-model="payTax"
              arrow-direction="down"
              @click="choosePopup(payTaxList,'payTax')"
              @change="changeHandle"
            >
              <span
                slot="label"
                v-show="payTax==='减税'||payTax==='正常缴税'"
              >(含往年补缴{{sumTaxDefault}}元，滞纳金{{sumOverdue}}元)</span>
            </van-cell>
            <!-- 已完税 -->
            <van-cell-group v-if="payTax==='已完税'">
              <van-field v-model="documentNumber" label="完税凭证号码" @change="changeHandle" />
              <van-field v-model="taxDepartmentCode" label="税务机关代码" @change="changeHandle" />
              <van-field v-model="taxDepartment" label="税务机关名称" @change="changeHandle" />
              <van-field
                label="完税凭证填发日期"
                v-model="taxDocumentDate"
                right-icon="notes-o"
                @click-right-icon="dateShow('taxDocumentDate')"
                readonly
                @change="changeHandle"
              ></van-field>
              <van-cell
                class="cityCode"
                title="开具完税凭证地区代码"
                is-link
                v-model="taxLocation"
                arrow-direction="down"
                @click="choosePopup(taxLocationList,'taxLocation')"
                @change="changeHandle"
              />
            </van-cell-group>
            <!-- 免税 -->
            <van-cell-group v-if="payTax==='免税'">
              <van-cell
                class="cityNumber"
                title="免税车型"
                is-link
                v-model="deductionDue"
                arrow-direction="down"
                @click="choosePopup(deductionDueList,'deductionDue')"
                @change="changeHandle"
              />

              <van-cell
                class="deductionDueType"
                title="减免税方案代码"
                is-link
                v-model="deductionDueType"
                arrow-direction="down"
                @click="choosePopup(deductionDueTypeList,'deductionDueType')"
                @change="changeHandle"
              />
              <van-field v-model="deductionDueProportion" label="减免比例" @change="changeHandle" />
              <van-field v-model="documentNumber" label="减免税凭证号" @change="changeHandle"></van-field>
              <van-field v-model="taxDepartment" label="税务机关名称" @change="changeHandle" />
            </van-cell-group>
            <!-- 减税 -->
            <van-cell-group v-if="payTax==='减税'">
              <van-cell
                class="cityNumber"
                title="免税车型"
                is-link
                @change="changeHandle"
                v-model="deductionDue"
                arrow-direction="down"
                @click="choosePopup(deductionDueList,'deductionDue')"
              />
              <van-cell
                class="cityNumber"
                title="减免税方案代码"
                is-link
                v-model="deductionDueType"
                arrow-direction="down"
                @click="choosePopup(deductionDueTypeList,'deductionDueType')"
                @change="changeHandle"
              />
              <van-field v-model="deductionDueProportion" label="减免比例" @change="changeHandle" />
              <van-field v-model="documentNumber" label="减免税凭证号" @change="changeHandle"></van-field>
              <van-field v-model="taxDepartment" label="税务机关名称" @change="changeHandle" />
            </van-cell-group>
            <!-- 不征 -->
            <van-cell-group v-if="payTax==='不征'">
              <van-field v-model="documentNumber" label="减免税凭证号" @change="changeHandle"></van-field>
              <van-field v-model="taxDepartment" label="税务机关名称" @change="changeHandle" />
            </van-cell-group>
          </div>
        </div>
      </div>
      <!-- 商业险 -->
      <div class="buss-insurance cells">
        <div class="com-title">
          <div class="left">
            <van-checkbox v-model="bussines" shape="squre" @change="changeHandle">商业险</van-checkbox>
          </div>
          <div class="right">
            <span>合计</span>
            <span class="money">￥{{bussinesNum}}</span>
          </div>
        </div>
        <van-divider />
        <div class="bussines-msg">
          <van-field
            class="bussines-data"
            label="起保日期"
            v-model="busRegisterDate"
            right-icon="notes-o"
            @click-right-icon="dateShow('busRegisterDate')"
            readonly
            @change="changeHandle"
          >
            <van-button slot="button" size="small" color="#888" plain>即时起保</van-button>
          </van-field>
          <van-popup v-model="showPopupDate" position="bottom">
            <van-datetime-picker
              @confirm="confirmDate"
              @cancel="showPopupDate=false"
              v-model="currentDate"
              type="date"
              @change="changeHandle"
            />
          </van-popup>
          <van-field
            label="终保日期"
            v-model="RegDate"
            right-icon="notes-o"
            @click-right-icon="dateShow('RegDate')"
            readonly
            @change="changeHandle"
          ></van-field>
          <van-popup v-model="showPopupDate" position="bottom">
            <van-datetime-picker
              @confirm="confirmDate"
              @cancel="showPopupDate=false"
              v-model="currentDate"
              type="date"
              @change="changeHandle"
            />
          </van-popup>
        </div>
        <van-divider />
        <div class="second">
          <span class="s2">{{this.typesList[0].text}}</span>
          <!-- <van-field class="s2" readonly label="{{this.typesList.text}}"></van-field> -->
          <van-checkbox v-model="carChecked" shape="squre">不计免赔</van-checkbox>
          <van-switch v-model="carSwitch" size="24px" />
        </div>
        <van-divider />
        <div class="coverage">
          <span>保额</span>
          <input type="text" v-model="carAmount" @change="changeHandle" />
          <span class="money">￥{{coveragePremium}}</span>
          <span
            style="float:left;color:red;font-size:12px"
          >(请输入的保额区间在{{minAmount}}-{{maxAmount }}之间)</span>
        </div>
        <van-divider />
        <div class="second insures">
          <span class="s2">{{this.typesList[1].text}}</span>
          <van-checkbox v-model="secondChecked" shape="squre" @change="changeHandle">不计免赔</van-checkbox>
          <div class="insures-right">
            <span @change="changeHandle">{{second}}</span>
            <van-icon name="arrow-down" @click="choosePopup(secondList,'second')"></van-icon>
            <span class="money">￥{{secondAmount}}</span>
          </div>
        </div>
        <van-divider />
        <div class="more" v-show="!moreShow" @click="moreShow =true">
          <van-button color="#568EFC" plain>添加更多商业险种</van-button>
        </div>
        <div class="moreInsure" v-show="moreShow">
          <div class="second insures">
            <span class="s2">{{this.typesList[2].text}}</span>
            <van-checkbox v-model="driverChecked" shape="squre" @change="changeHandle">不计免赔</van-checkbox>
            <div class="insures-right">
              <span>{{driver}}</span>
              <van-icon name="arrow-down" @click="choosePopup(driverList,'driver')"></van-icon>
              <span class="money">￥100</span>
            </div>
          </div>
          <van-divider />
          <div class="second insures">
            <span class="s2">{{this.typesList[3].text}}</span>
            <van-checkbox v-model="fareChecked" shape="squre">不计免赔</van-checkbox>
            <div class="insures-right">
              <span>{{fare}}</span>
              <van-icon name="arrow-down" @click="choosePopup(fareList,'fare')"></van-icon>
              <span class="money">￥100</span>
            </div>
          </div>
          <van-divider />
          <div class="second" :id="this.typesList[4].code">
            <span class="s2">{{this.typesList[4].text}}</span>
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
              <span>{{import1}}</span>
              <van-icon name="arrow-down" @click="choosePopup(importList,'import1')"></van-icon>
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
        <van-button plain color="#568EFC" style="margin-right:31px" @click="terrace">平台参考信息</van-button>
        <van-button plain color="#568EFC" @click="offer">报价单</van-button>
      </div>
    </div>
    <div class="offer" v-show="state === '200'">
      <div class="offer-left">
        <p class="p1">￥{{totalPremium}}</p>
        <div class="insures">
          <p>
            商业险 ￥{{bussinesNum}}
            <span
              class="money"
              v-show="this.saleDiscount!=0"
            >{{this.saleDiscount}}折</span>
          </p>
          <p>交强险 ￥{{insuranceMoney}}</p>
          <p>车船税 ￥{{shipNum}}</p>

          <van-icon name="edit" class="icon" @click="showPopupSale"></van-icon>
        </div>
        <van-icon></van-icon>
      </div>

      <div class="offer-right">
        <van-button type="info" ref="confirmSale" @click="confimHandle" v-show="aaa=true">确认报价</van-button>
      </div>
    </div>
    <div v-show="off">
      <div class="offer" v-show="state === '1' || !bussines">
        <div class="offer-left">
          <p class="p1">￥--</p>
          <div class="insures">
            <p>
              商业险 ￥--
              <span class="money" v-show="this.saleDiscount!=0">{{this.saleDiscount}}折</span>
            </p>
            <p>交强险 ￥--</p>
            <p>车船税 ￥--</p>
            <van-icon name="edit" class="icon" @click="showPopupSale"></van-icon>
          </div>
        </div>

        <div class="offer-right">
          <van-button
            color="#C7C7CC"
            ref="confirmReset"
            :class="{active2:isActives}"
            @click="resetHandle"
          >重新算价</van-button>
        </div>
        <!-- v-show="this.aaa === true" -->
      </div>
    </div>
    <van-popup v-model="show" class="showPopupSale">
      <h2>修改商业折扣</h2>
      <p>请确保输入值在{{this.lowestDiscount}}-{{this.policyDiscount}}范围之内</p>
      <input type="text" v-model="Discount" />
      <span
        class="number"
        v-show="this.Discount<this.lowestDiscount || this.Discount>this.policyDiscount"
      >
        <van-icon name="info-o"></van-icon>已超过输入值范围，请重新输入
      </span>
      <van-button plain color="#95c4fe" @click="cannelSale">取消</van-button>
      <van-button type="info" @click="confirmSaleDiscount">确定</van-button>
    </van-popup>
    <!-- 下拉公共组件 -->
    <van-popup v-model="showPopup" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="confirmPicker"
        @cancel="showPopup = false"
        @change="changeHandle"
      />
    </van-popup>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { cpus } from "os";
import { price, priceToConfirm, TerracePage } from "@/common/library/api";
export default {
  data() {
    return {
      dataObj: "",
      aaa: false,
      // 险别
      typesList: [
        { code: "A", text: "车辆损失保险" },
        { code: "B", text: "第三者责任险" },
        { code: "D3", text: "司机座位险" },
        { code: "D4", text: "乘客座位险" },
        { code: "G", text: "全车盗抢险" }
      ],
      state: "",
      //车损险最大保额
      maxAmount: "",
      //车损险最小保额
      minAmount: "",
      //车损险保费
      coveragePremium: "",
      //车辆损失险保额
      carAmount: "",
      //总保费
      totalPremium: "",
      //折扣
      Discount: "",
      //一年内过户
      open: true,
      // 往年补缴
      sumTaxDefault: "",
      // 滞纳金
      sumOverdue: "",
      // 车船税合计
      shipNum: "",
      //交强险合计
      insuranceNum: "",
      //商业险合计
      bussinesNum: "",
      taxStartDate: "",
      documentNumber: "",
      deductionDueCode: "",
      //开税凭证地区代码
      taxLocation: "北京市",
      taxLocationList: [
        {
          code: "110000",
          text: "北京市"
        },
        {
          code: "120000",
          text: "天津市"
        },
        {
          code: "130000",
          text: "河北省"
        },
        {
          code: "140000",
          text: "山西省"
        },
        {
          code: "150000",
          text: "内蒙古自治区"
        },
        {
          code: "210000",
          text: "辽宁省"
        },
        {
          code: "220000",
          text: "吉林省"
        },
        {
          code: "230000",
          text: "黑龙江省"
        },
        {
          code: "310000",
          text: "上海市"
        },
        {
          code: "320000",
          text: "江苏省"
        },
        {
          code: "330000",
          text: "浙江省"
        },
        {
          code: "340000",
          text: "安徽省"
        },
        {
          code: "350000",
          text: "福建省"
        },
        {
          code: "360000",
          text: "江西省"
        },
        {
          code: "370000",
          text: "山东省"
        },
        {
          code: "410000",
          text: "河南省"
        },
        {
          code: "420000",
          text: "湖北省"
        },
        {
          code: "430000",
          text: "湖南省"
        },
        {
          code: "440000",
          text: "广东省"
        },
        {
          code: "450000",
          text: "广西壮族自治区"
        },
        {
          code: "460000",
          text: "海南省"
        },
        {
          code: "500000",
          text: "重庆市"
        },
        {
          code: "510000",
          text: "四川省"
        },
        {
          code: "520000",
          text: "贵州省"
        },
        {
          code: "530000",
          text: "云南省"
        },
        {
          code: "540000",
          text: "西藏自治区"
        },
        {
          code: "610000",
          text: "陕西省"
        },
        {
          code: "620000",
          text: "甘肃省"
        },
        {
          code: "630000",
          text: "青海省"
        },
        {
          code: "640000",
          text: "宁夏回族自治区"
        },
        {
          code: "650000",
          text: "新疆维吾尔自治区"
        },
        {
          code: "710000",
          text: "台湾省"
        },
        {
          code: "810000",
          text: "香港特别行政区"
        },
        {
          code: "820000",
          text: "澳门特别行政区"
        }
      ],

      //减免方案
      deductionDueType: "比例减免",
      deductionDueTypeList: [
        { code: "P", text: "比例减免" },
        { code: "A", text: "金额减免" }
      ],
      //免税车型
      deductionDue: "具备减免税证明",
      deductionDueList: [
        { code: "M1", text: "具备减免税证明" },
        { code: "M2", text: "拖拉机" },
        { code: "M3", text: "军队、武警专用车" },
        { code: "M4", text: "警车" },
        { code: "M5", text: "外国使领馆、国际组织及其人员" },
        { code: "M6", text: "能源减免" },
        { code: "M8", text: "机场、港口、铁路内部行驶或者作业车辆" },
        { code: "M9", text: "其他" }
      ],
      //完税凭证填发日期
      taxDocumentDate: "",
      //减免比例
      deductionDueProportion: "",
      //纳税地区代码
      taxLocationCode: "",
      // 税务机关代码
      taxDepartmentCode: "",
      // 税务机关名称
      taxDepartment: "",
      insuranceMoney: "",
      //身份证号
      identifyNo: "",
      //车主姓名
      carName: "",
      //发动机号
      engine: "JT456F3G75",
      //车架号
      VIN: "",
      //车牌号
      plateNo: "",
      // 总价格
      sumShow: false,
      //添加更多保险
      moreShow: false,
      value: "",
      //涉水行驶损失险
      wadeChecked: false,
      wadeSwitch: false,
      //节假日限额翻倍
      holidayChecked: false,
      holidaySwitch: false,
      //自然损失险
      natureChecked: false,
      natureSwitch: false,
      //新增设备险
      facilityChecked: false,
      facilitySwitch: false,
      //精神损害险
      spiritChecked: false,
      //划痕险
      scratchChecked: false,
      // 指定修理厂险
      domesticSwitch: false,
      //玻璃单独破碎险
      importSwitch: false,
      // 车损第三方
      damageSwitch: false,
      //全车盗抢险
      robbingChecked: false,
      robbingSwitch: false,
      //乘客座位险
      fareChecked: false,
      //司机座位险
      driverChecked: false,
      //第三者责任险
      secondChecked: false,

      //车辆损失保险
      carChecked: false,
      carSwitch: false,
      //商业险按钮
      bussines: false,
      //显示车船税
      shipShow: false,
      //交强险按钮
      checked: false,
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
      //证件类型下拉框
      columns: "",
      // 记录选择器对应name
      currentPicker: "",
      showPopup: false,
      //   车辆类型
      car: "小型普通客车",
      carList: [
        { code: "A0", text: "小型普通客车" },
        { code: "H0", text: "货车" }
      ],
      //   初登日期
      currentDate: "",
      currentDateName: "",
      // currentDate:'',
      // 默认不显示日期组件
      showPopupDate: false,
      //车主信息-证件类型
      card: "身份证",
      cardList: [
        { code: "01", text: "身份证" },
        { code: "03", text: "护照" },
        { code: "553", text: "外国人永久居住证" }
      ],
      payTax: "正常缴税",
      payTaxList: [
        { code: "1N", text: "正常缴税" },
        { code: "2W", text: "已完税" },
        { code: "3M", text: "免税" },
        { code: "4J", text: "减税" },
        { code: "5H", text: "拒缴", disabled: true },
        { code: "6B", text: "不征" }
      ],
      //第三者责任险
      second: "不投保",
      secondList: [
        "不投保",
        "50000",
        "100000",
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
      driver: "不投保",
      driverList: [
        "不投保",
        "0.5万",
        "1万",
        "2万",
        "3万",
        "4万",
        "5万",
        "10万",
        "15万",
        "20万",
        "30万"
      ],
      //乘客座位险
      fare: "不投保",
      fareList: [
        "不投保",
        "0.5万",
        "1万",
        "2万",
        "3万",
        "4万",
        "5万",
        "10万",
        "15万",
        "20万",
        "30万"
      ],
      // 玻璃单独破碎险
      import1: "进口",
      importList: [{ code: 1, text: "进口" }, { code: 1, text: "国产" }],

      //划痕险
      scratch: "不投保",
      scratchList: ["不投保", "2000元", "5000元", "1万元", "2万元"],
      // 精神损害险
      spirit: "不投保",
      spiritList: ["不投保", "", ""],
      // 日期
      date1: "",
      registerDate: "",
      certificateDate: "",
      busRegisterDate: "",
      RegDate: "",
      insRegDate: "",
      aa: "",
      // 品牌型号
      model: "轩逸DFL7162MCB轿车",
      // 使用性质
      motorUsageTypeCode: "",
      motorTypeCode: "",
      // 证件类型编号
      identifyType: "",
      // 免税车型编号
      deductionDueCode: "",
      // 缴税类型编号
      taxConditionCode: "",
      // 订单号
      orderNo: "",
      //险种数组长度
      riskListLength: "",
      kindCode: "",
      datas: "",
      //确认报价
      confirm: false,
      //重新算价
      off: true,
      newCarSign: false,
      isActives: false,
      // 折扣
      secondAmount: "0",
      // 折扣弹出层
      show: false,
      // 商业险最低折扣
      lowestDiscount: "",
      //商业险最高折扣
      policyDiscount: "",
      saleDiscount: "",
      // 预核保信息
      iLogPreUdwMess: "",
      data2: "",
      // 贷款车标识
      loanCar: false,
      // 特别约定
      loanCarPopup: false,
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,

    };
  },
  mounted() {
    this.handle();
    // console.log(dayjs().add(1,'day').format("YYYY-MM-DD"))
    // console.log(dayjs().add(1,'year').format("YYYY-MM-DD"))
  },
  created() {},
  watch: {},
  methods: {
    // 特别约定
    loanCarButton() {
      this.loanCarPopup = true;
    },
    confirmloanCar() {},
    //平台信息参考
    async terrace() {
      var data = JSON.parse(localStorage.getItem("data"));
      var orderNo = data.data.orderNo;
      this.$router.push({
        name: "infoPlatform",
        params: { orderNo }
      });
    },
    //报价单
    offer() {
      var data = JSON.parse(localStorage.getItem("data"));
      var orderNo = data.data.orderNo;
      this.$router.push({
        name: "offer",
        params: { orderNo }
      });
      console.log(orderNo);
    },
    //折扣弹出层
    showPopupSale() {
      console.log(123);
      this.show = true;
    },
    changeHandle() {
      this.confirm = true;
      this.isActives = !this.isActives;
      // this.isActives = true;
      // if (this.isActives == false) {
      //   this.isActives = true;
      // }
      // console.log("66666666666666666666");
      // console.log(this.isActives);
    },
    //渲染页面
    handle() {
      this.aaa = false;
      var data = JSON.parse(localStorage.getItem("data"));
      console.log(data);
      this.state = data.state;
      //车牌号
      this.plateNo = data.data.car.plateNo;
      //初登日期
      this.registerDate = data.data.car.registerDate;
      for (var i = 0; i < this.carList.length; i++) {
        if (this.carList[i].code === data.data.car.motorTypeCode) {
          this.motorTypeCode = this.carList[i].code;
          this.car = this.carList[i].text;
        }
      }
      //订单号
      this.orderNo = data.data.orderNo;
      // console.log(this.orderNo);

      //是否过户
      this.open = data.data.car.newCarSign;
      //使用性质
      this.motorUsageTypeCode = data.data.car.motorUsageTypeCode;
      //车架号
      this.VIN = data.data.car.vin;
      this.engine = data.data.car.engine;
      this.currentDate = data.data.car.registerDate;
      this.carName = data.data.customer.name;
      //身份证号
      this.identifyNo = data.data.customer.identifyNo;
      //证件类型
      for (var i = 0; i < this.cardList.length; i++) {
        // console.log(this.cardList[i].code)
        // console.log(data.data.customer.identifyType)
        if (this.cardList[i].code === data.data.customer.identifyType) {
          this.identifyType = this.cardList[i].code;
          this.card = this.cardList[i].text;
        }
      }
      // console.log("5465466878798798");
      //交强险
      for (var i = 0; i < data.data.riskList.length; i++) {
        this.riskListLength = data.data.riskList.length;
        if (data.data.riskList[i].riskCode === "0507") {
          this.riskCode = data.data.riskList[i].riskCode;
          this.checked = true;
          this.insuranceNum = data.data.riskList[i].amount;
          this.insuranceMoney = data.data.riskList[i].premium;
          this.insRegDate = data.data.riskList[i].startDate;
          //车船税
          for (var i = 0; i < this.payTaxList.length; i++) {
            if (this.payTaxList[i].code === data.data.tax.taxConditionCode) {
              this.taxConditionCode = this.payTaxList[i].code;
              this.payTax = this.payTaxList[i].text;
            }
          }
          //纳税地区代码
          for (var i = 0; i < this.taxLocationList.length; i++) {
            if (
              this.taxLocationList[i].code === data.data.tax.taxLocationCode
            ) {
              this.taxLocationCode = this.taxLocationList[i].code;
              this.taxLocation = this.taxLocationList[i].text;
            }
          }
          // 往年补缴
          this.sumTaxDefault = data.data.tax.sumTaxDefault;
          //滞纳金
          this.sumOverdue = data.data.tax.sumOverDue;
          //车船税合计
          this.shipNum = data.data.tax.sumTax;
          //完税凭证号码
          this.documentNumber = data.data.tax.documentNumber;
          //税务机关代码
          this.taxDepartmentCode = data.data.tax.taxDepartmentCode;
          //税务机关名称
          this.taxDepartment = data.data.tax.taxDepartment;
          //  完税凭证填发日期
          this.taxDocumentDate = data.data.tax.taxDocumentDate;
          //免税车型
          for (var i = 0; i < this.deductionDueTypeList.length; i++) {
            if (
              this.deductionDueList[i].code === data.data.tax.deductionDueCode
            ) {
              this.deductionDueCode = this.deductionDueList[i].code;
              this.deductionDue = this.deductionDueList[i].text;
            }
          }
          //减免方案
          for (var i = 0; i < this.deductionDueTypeList.length; i++) {
            if (
              this.deductionDueTypeList[i].code ===
              data.data.tax.deductionDueType
            ) {
              this.deductionDueType = this.deductionDueTypeList[i].code;
              this.deductionDueType = this.deductionDueList[i].text;
              //减免比例
              this.deductionDueProportion =
                data.data.tax.deductionDueProportion;
            }
          }
        } else {
          this.busRiskCode = "0520";
          this.bussines = true;
          this.bussinesNum = data.data.riskList[i].premium;
          this.busRegisterDate = data.data.riskList[i].startDate;
          this.RegDate = data.data.riskList[i].endDate;
        }
      }
      //车辆损失险
      for (var i = 0; i < data.data.kindList.length; i++) {
        this.kindCode = data.data.kindList[i].kindCode;

        // if (this.kindCode=== data.data.kindList[i].kindCode) {
        this.carChecked = data.data.kindList[i].notDeductibleFlag;
        // console.log("===================================");
        // console.log(data.data.kindList[i].notDeductibleFlag);
        this.carSwitch = true;
        if (this.kindCode === this.typesList[0].code) {
          this.carChecked = true;
          this.carSwitch = true;
        } else if (this.kindCode === this.typesList[1].code) {
          this.secondChecked = true;
        }
        this.coveragePremium = data.data.kindList[i].coveragePremium;
        this.carAmount = data.data.kindList[i].amount;
        this.maxAmount = data.data.maxAmount;
        this.minAmount = data.data.minAmount;
        // }
      }
      //第三者责任险

      // 折扣
      this.saleDiscount = data.data.saleDiscount;
      //总保费
      this.totalPremium = data.data.sumPermium;
    },
    //重新算价
    async resetHandle() {
      window.localStorage.getItem("token");
      // console.log([56465])
      //车辆信息
      var car = new Object();
      car.engine = this.engine;
      car.vin = this.VIN;
      car.plateNo = this.plateNo;
      car.model = "奥迪FV7148LADWG轿车";
      car.motorTypeCode = this.motorTypeCode;
      car.motorUsageTypeCode = this.motorUsageTypeCode;
      car.registerDate = this.registerDate;
      car.transferFlag = this.open;
      car.newCarSign = this.newCarSign;
      //车主信息
      var customer = new Object();
      customer.identifyNo = this.identifyNo;
      customer.identifyType = this.identifyType;
      customer.name = this.carName;
      //车船税
      var tax = new Object();
      tax.deductionDueCode = this.deductionDueCode;
      tax.deductionDueProportion = this.deductionDueProportion;
      tax.documentNumber = this.documentNumber;
      tax.sumOverDue = this.sumOverdue;
      tax.sumTax = this.shipNum;
      tax.sumTaxDefault = this.sumTaxDefault;
      tax.taxConditionCode = "1";
      tax.taxDepartment = this.taxDepartment;
      tax.taxDepartmentCode = this.taxDepartmentCode;
      tax.taxLocationCode = this.taxLocationCode;
      //险种
      var riskList = [];
      var risk1 = {};
      risk1.amount = this.insuranceNum;
      // kind1.endDate = this.endDate;
      risk1.premium = this.insuranceMoney;
      risk1.riskCode = this.riskCode;
      risk1.startDate = this.insRegDate;
      riskList.push(risk1);
      var risk2 = {};
      // kind2.amount = this.insuranceNum;
      risk2.endDate = this.RegDate;
      risk2.premium = this.bussinesNum;
      risk2.riskCode = this.busRiskCode;
      risk2.startDate = this.busRegisterDate;
      riskList.push(risk2);

      //险别
      var kindList = [];
      var kind1 = {};
      kind1.amount = this.carAmount;
      kind1.coveragePremium = this.coveragePremium;
      kind1.kindCode = this.typesList[0].code;
      kind1.notDeductibleFlag = this.carChecked;
      kindList.push(kind1);
      // var kind2 = {};
      // kind2.amount = this.second;
      // kind2.coveragePremium = this.secondAmount;
      // kind2.kindCode = this.typesList[1].code;
      // kind2.notDeductibleFlag = this.secondChecked;
      // kindList.push(kind2);
      const data = await price({
        car,
        customer,
        tax,
        saleDiscount: this.saleDiscount,
        orderNo: this.orderNo,
        riskList,
        kindList
      });
      window.localStorage.setItem("data", JSON.stringify(data));

      if (data.state === "200") {
        this.aaa = true;
        this.$toast("成功");
        this.iLogPreUdwMess = data.data.iLogPreUdwMess;
        this.lowestDiscount = data.data.lowestDiscount;
        this.policyDiscount = data.data.policyDiscount;
        this.saleDiscount = data.data.saleDiscount;
        this.maxAmount = data.data.maxAmount;
        this.minAmount = data.data.minAmount;
        this.orderNo = data.data.orderNo;
        this.totalPremium = data.data.sumPermium;
        this.state = data.state;
        //车牌号
        this.plateNo = data.data.car.plateNo;
        //初登日期
        this.registerDate = data.data.car.registerDate;
        for (var i = 0; i < this.carList.length; i++) {
          if (this.carList[i].code === data.data.car.motorTypeCode) {
            this.motorTypeCode = this.carList[i].code;
            this.car = this.carList[i].text;
          }
        }
        //订单号
        this.orderNo = data.data.orderNo;
        //是否过户
        this.open = data.data.car.newCarSign;
        //使用性质
        this.motorUsageTypeCode = data.data.car.motorUsageTypeCode;
        //车架号
        this.VIN = data.data.car.vin;
        this.engine = data.data.car.engine;
        this.currentDate = data.data.car.registerDate;
        this.carName = data.data.customer.name;
        //身份证号
        this.identifyNo = data.data.customer.identifyNo;
        //证件类型
        for (var i = 0; i < this.cardList.length; i++) {
          if (this.cardList[i].code === data.data.customer.identifyType) {
            this.identifyType = this.cardList[i].code;
            console.log(154646868);
            console.log(this.identifyType);
            this.card = this.cardList[i].text;
          }
        }
        //交强险
        for (var i = 0; i < data.data.riskList.length; i++) {
          this.riskListLength = data.data.riskList.length;
          if (data.data.riskList[i].riskCode === "0507") {
            this.riskCode = data.data.riskList[i].riskCode;
            this.checked = true;
            this.insuranceNum = data.data.riskList[i].amount;
            this.insuranceMoney = data.data.riskList[i].premium;
            this.insRegDate = data.data.riskList[i].startDate;
            //车船税
            for (var i = 0; i < this.payTaxList.length; i++) {
              if (this.payTaxList[i].code === data.data.tax.taxConditionCode) {
                this.taxConditionCode = this.payTaxList[i].code;
                this.payTax = this.payTaxList[i].text;
              }
            }
            //纳税地区代码
            for (var i = 0; i < this.taxLocationList.length; i++) {
              if (
                this.taxLocationList[i].code === data.data.tax.taxLocationCode
              ) {
                this.taxLocationCode = this.taxLocationList[i].code;
                this.taxLocation = this.taxLocationList[i].text;
              }
            }
            // 往年补缴
            this.sumTaxDefault = data.data.tax.sumTaxDefault;
            //滞纳金
            this.sumOverdue = data.data.tax.sumOverDue;
            //车船税合计
            this.shipNum = data.data.tax.sumTax;
            //完税凭证号码
            this.documentNumber = data.data.tax.documentNumber;
            //税务机关代码
            this.taxDepartmentCode = data.data.tax.taxDepartmentCode;
            //税务机关名称
            this.taxDepartment = data.data.tax.taxDepartment;
            //  完税凭证填发日期
            this.taxDocumentDate = data.data.tax.taxDocumentDate;
            //免税车型
            for (var i = 0; i < this.deductionDueTypeList.length; i++) {
              if (
                this.deductionDueList[i].code === data.data.tax.deductionDueCode
              ) {
                this.deductionDueCode = this.deductionDueList[i].code;
                this.deductionDue = this.deductionDueList[i].text;
              }
            }
            //减免方案
            for (var i = 0; i < this.deductionDueTypeList.length; i++) {
              if (
                this.deductionDueTypeList[i].code ===
                data.data.tax.deductionDueType
              ) {
                this.deductionDueType = this.deductionDueTypeList[i].code;
                this.deductionDueType = this.deductionDueList[i].text;
                //减免比例
                this.deductionDueProportion =
                  data.data.tax.deductionDueProportion;
              }
            }
          } else {
            this.busRiskCode = "0520";
            this.bussines = true;
            this.bussinesNum = data.data.riskList[i].premium;
            this.busRegisterDate = data.data.riskList[i].startDate;
            this.RegDate = data.data.riskList[i].endDate;
          }
        }
        //车辆损失险
        for (var i = 0; i < data.data.kindList.length; i++) {
          this.kindCode = data.data.kindList[i].kindCode;
          console.log("5468======");
          console.log(this.kindCode);
          // if (this.kindCode=== data.data.kindList[i].kindCode) {
          //   this.carChecked = data.data.kindList[i].notDeductibleFlag;
          //   this.carSwitch = true;
          if (this.kindCode === this.typesList[0].code) {
            console.log(
              "=========================================================================="
            );
            console.log(data.data.kindList[i].notDeductibleFlag);
            this.carChecked = data.data.kindList[i].notDeductibleFlag;
            this.carSwitch = true;
          } else if (this.kindCode === this.typesList[1].code) {
            this.secondChecked = true;
          }
          this.coveragePremium = data.data.kindList[i].coveragePremium;
          this.carAmount = data.data.kindList[i].amount;
          this.maxAmount = data.data.maxAmount;
          this.minAmount = data.data.minAmount;
          // }
        }
        //第三者责任险

        // 折扣
        this.saleDiscount = data.data.saleDiscount;
        //总保费
        this.totalPremium = data.data.sumPermium;
      } else {
        this.$toast(data.message);
      }
    },

    confirmSaleDiscount() {
      this.show = false;
      this.saleDiscount = this.Discount;
      // this.$refs.confirmSale.innerHTML = "重新算价";
      // this.$refs.confirmSale.style.width = "150px";
    },
    // 确认报价
    async confimHandle() {
      window.localStorage.setItem("orderNo", this.orderNo);
      console.log(this.orderNo);
      this.$router.push({
        path: "ConfirmInsured"

        // params: {
        //   orderNo: this.orderNo
        // }
      });
      // if (this.$refs.confirmSale.innerHTML === "重新算价") {
      //   this.resetHandle();
      //   this.$refs.confirmSale.innerHTML = "确认报价";
      // } else {
      //   // window.localStorage.setItem("data2", JSON.stringify(data));
      //   this.$router.push({ path: "ConfirmInsured" });
      // }
    },
    cannelSale() {
      this.show = false;
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
      // var values = this.value;
      // console.log(5648487)
      // console.log(values)
      // console.log(picker, values);//
      if (picker.text) {
        this[this.currentPicker] = picker.text;
      } else {
        this[this.currentPicker] = picker;
      }
      var bbb = (this[this.currentPicker.values] = values);
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
@import "/style/price.scss";
#loanCar {
  .van-cell__title {
    flex: 88% 0 !important;
    font-size: 12px;
    color: #568efc;
  }
}
.contributing {
  .van-button{
    width: 100%;
    border-radius: 8px;
  }
  padding: 20px;
  .top {
    padding-bottom: 40px;
    font-size: 18px;
    .van-icon {
      float: right;
    }
  }
  .content {
    .van-checkbox {
      margin-bottom: 15px;
    }
    .child{
      .van-checkbox{
        padding-left: 15px;
      }
    }
  }
}
</style>