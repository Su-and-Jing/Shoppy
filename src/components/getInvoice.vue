<template>
  <div>
    <header>
      <van-icon @click="backHandle" class="iconLeft" name="arrow-left" size="23px" />
      <p class="Vetit">获取发票</p>
    </header>
    <div class="containt-invoice" style="margin-top:38px">
      <Head></Head>
      <div class="main">
        <div class="item">
          <p class="title">发票详情</p>
          <van-field
            label="发票抬头信息"
            readonly
            right-icon="arrow-down"
            v-model="roles"
            @click="choosePopup(roleList,'roles')"
          />
          <van-popup v-model="showRoleList" position="bottom">
            <van-picker
              show-toolbar
              :columns="columns"
              @confirm="confirmPicker"
              @cancel="showRoleList = false"
            />
          </van-popup>
          <van-cell-group class="cell-group">
            <div class="invoice-type van-hairline--bottom">
              <label class="label">发票类型</label>
              <van-radio-group v-model="invoiceType">
                <van-radio name="1">电子发票</van-radio>
                <van-radio name="2" v-show="paper">纸质增值税专票</van-radio>
              </van-radio-group>
            </div>
            <!-- <div class="rise-type van-hairline--bottom">
            <label class="label">抬头类型</label>
            <van-checkbox v-model="riseType">企业单位</van-checkbox>
            </div>-->
            <van-field label="发票抬头" v-model="rise" placeholder="请输入发票抬头" />
            <van-field v-if="riseType" label="税号" v-model="ein" placeholder="填写纳税人识别号" />
            <van-field label="更多内容" readonly @click="showPopup = true" placeholder="填写地址、电话等（非必填）" />
            <p class="title" style="font-size:14px;font-weight:400">开票金额</p>
            <van-field label="交强险发票" v-model="totalAmount" placeholder="填写纳税人识别号" />
            <van-field label="商业险发票" v-model="totalAmount" placeholder="填写纳税人识别号" />
            <p class="remarks">备注：车船税根据合规要求不在开票金额之内</p>
          </van-cell-group>
        </div>
        <div class="item">
          <p class="title">接收方式</p>
          <van-cell-group class="cell-group" v-if="invoiceType == 1">
            <van-field label="电子邮件" v-model="email" placeholder="请输入发票抬头" />
          </van-cell-group>
          <van-cell-group class="cell-group" v-else>
            <van-field
              v-if="riseType"
              label="配送方式"
              readonly
              v-model="distribution"
              right-icon="arrow-down"
            />
            <van-field label="收件人" v-model="recipients" placeholder="填写收件人姓名" />
            <van-field label="手机号" v-model="phone" placeholder="填写收件人手机号" />
            <!-- <van-field
            label="配送地址"
            v-model="address.city"
            readonly=""
            @click="checkArea = true"
            placeholder="请选择配送地址" />-->
            <Area :current-area="address.cityCode" @checkedArea="checkedArea" />
            <van-field
              label
              type="textarea"
              v-model="address.details"
              rows="1"
              autosize
              placeholder="请填写具体路名、门牌地址"
            />
          </van-cell-group>
        </div>
        <div class="comfirm">点击开具发票</div>
      </div>
      <!-- 添加更多发票信息 -->
      <van-popup v-model="showPopup" position="right">
        <div class="more-info">
          <div class="nav">
            <van-icon @click="closePopup" name="arrow-left" />
            <van-icon @click="closePopup" name="cross" />
            <p class="text">发票信息添加</p>
          </div>
          <van-cell-group>
            <van-field label="备注说明" v-model="descr" placeholder="请填写备注说明（非必填）" />
            <van-field label="单位地址" v-model="unitAddress" placeholder="请填写单位地址（非必填）" />
            <van-field label="电话号码" v-model="phoneNumber" placeholder="请填写电话号码（非必填）" />
            <van-field label="开户银行" v-model="depositBank" placeholder="请填写开户银行（非必填）" />
            <van-field label="银行账户" v-model="accountBank" placeholder="请填写银行账户（非必填）" />
            <div class="comfirm" @click="addMore">确定</div>
          </van-cell-group>
        </div>
      </van-popup>
      <!-- 配送地址 -->
      <!-- <van-popup position="bottom" v-model="checkArea">
      <van-area
        :area-list="areaList"
        :value="currentArea"
        @confirm="confirmArea"
        @cancel="checkArea = false"/>
      </van-popup>-->
    </div>
  </div>
</template>
<script>
import Head from "./module/head";
import Area from "./module/area";
export default {
  components: {
    Head,
    Area
  },
  data() {
    return {
      paper: false,
      currentPicker: "",
      showRoleList: false,
      roles: "个人",
      roleList: [{ code: "1", text: "个人" }, { code: "2", text: "单位" }],
      // 更多发票信息
      showPopup: false,
      // 地址选择
      checkArea: false,
      invoiceType: "1",
      riseType: 1,
      rise: "",
      ein: "",
      totalAmount: "",
      email: "",
      distribution: "免费邮寄",
      recipients: "",
      phone: "",
      address: {
        city: "",
        details: "",
        cityCode: ""
      },
      descr: "",
      unitAddress: "",
      phoneNumber: "",
      depositBank: "",
      accountBank: ""
    };
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
    // 选择器 共用
    choosePopup(list, name) {
      console.log(list, name);
      this.showRoleList = true;
      this.columns = list;
      this.currentPicker = name;
    },
    // 确定选择
    confirmPicker(picker, values) {
      picker = this.columns[values].text;
      this[this.currentPicker] = picker;
      this.showRoleList = false;
      if (this.columns[values].code === "2") {
        this.paper = true;
      } else {
        this.paper = false;
      }
    },
    closePopup() {
      this.showPopup = false;
    },
    // 添加更多发票信息
    addMore() {
      this.showPopup = false;
    },
    // 选择城市
    checkedArea(code, city) {
      this.address.cityCode = code;
      this.address.city = city;
    }
  }
};
</script>
<style lang="scss">
@import "/style/head.scss";
.remarks {
  height: 32px;
  font-size: 12px;
  padding: 5px 15px;
  font-weight: 400;
  color: rgba(245, 86, 86, 1);
  line-height: 32px;
}
.containt-invoice {
  min-height: 100vh;
  background: #fff;
  .main {
    .item {
      border-bottom: 15px solid #f0f2f4;
      .title {
        font-size: 18px;
        padding: 14px 16px;
        color: #4a4a4a;
        font-weight: 600;
      }
      .cell-group {
        .invoice-type,
        .rise-type {
          margin-left: 16px;
          line-height: 24px;
          padding: 10px 0;
          display: flex;
          align-items: center;
          .label {
            flex: 90px 0;
            color: #323233;
          }
          .checkbox {
            margin-right: 18px;
          }
          .van-radio-group {
            display: flex;
            .van-radio {
              &:first-child {
                margin-right: 18px;
              }
            }
          }
        }
      }
    }
  }
  .van-popup {
    width: 100%;
    .more-info {
      height: 100vh;
      background: #fff;
      .nav {
        height: 45px;
        display: flex;
        align-items: center;
        font-size: 20px;
        position: relative;
        border-bottom: 1px solid #e5e5e5;
        .van-icon {
          margin: 0 6px;
        }
        .text {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: transparent;
          text-align: center;
          line-height: 45px;
          font-size: 16px;
          color: #000;
          pointer-events: none;
        }
      }
      .comfirm {
        margin-top: 48px;
      }
    }
  }
  .comfirm {
    margin: 16px 20px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    color: #fff;
    background: #568efc;
    border-radius: 5px;
    font-size: 17px;
  }
}
</style>
