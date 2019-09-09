<template>
  <div class="containt-insured">
    <van-collapse
      v-model="activeNames">
      <van-collapse-item
        class="group"
        title="人员信息"
        name="owner">
        <div slot="right-icon" class="right-text" v-text="activeNames.indexOf('owner') > -1 ? '收起' : '展开'"></div>
        <van-cell-group class="item">
          <van-field
            v-model="owner.name"
            label="车主姓名"
            placeholder="请输入车主姓名"/>
          <van-field
            v-model="owner.IDType"
            readonly
            label="证件类型"
            right-icon="arrow-down"/>
          <van-field
            v-model="owner.ID"
            label="身份证号"
            placeholder="请输入身份证号"/>
          <van-field
            v-model="owner.phone"
            label="手机号码"
            maxlength="11"
            placeholder="请输入手机号码"/>
          <van-field
            type="textarea"
            rows="1"
            autosize
            v-model="owner.address"
            label="地址"
            maxlength="11"
            placeholder="请输入地址"/>
          <van-field
            v-model="owner.email"
            label="邮箱地址"
            maxlength="11"
            placeholder="请输入邮箱地址"/>
        </van-cell-group>
        <van-cell-group class="item">
          <div class="check-wrap">
            <van-field
              value="同车主"
              label="投保人"
              readonly/>
            <van-switch v-model="insuredOwner" size="24px"/>
          </div>
          <van-cell-group v-show="!insuredOwner">
            <van-field
              v-model="insured.name"
              label="车主姓名"
              placeholder="请输入车主姓名"/>
            <van-field
              v-model="insured.IDType"
              readonly
              label="证件类型"
              right-icon="arrow-down"/>
            <van-field
              v-model="insured.ID"
              label="身份证号"
              placeholder="请输入身份证号"/>
            <van-field
              v-model="insured.phone"
              label="手机号码"
              maxlength="11"
              placeholder="请输入手机号码"/>
            <van-field
              type="textarea"
              rows="1"
              autosize
              v-model="insured.address"
              label="地址"
              maxlength="11"
              placeholder="请输入地址"/>
            <van-field
              v-model="insured.email"
              label="邮箱地址"
              maxlength="11"
              placeholder="请输入邮箱地址"/>
          </van-cell-group>
        </van-cell-group>
        <van-cell-group class="item">
          <div class="check-wrap">
            <van-field
              value="被保险人"
              label="投保人"
              readonly/>
            <van-switch v-model="assuredOwner" size="24px"/>
          </div>
          <van-cell-group v-show="!assuredOwner">
            <van-field
              v-model="assured.name"
              label="车主姓名"
              placeholder="请输入车主姓名"/>
            <van-field
              v-model="assured.IDType"
              readonly
              label="证件类型"
              right-icon="arrow-down"/>
            <van-field
              v-model="assured.ID"
              label="身份证号"
              placeholder="请输入身份证号"/>
            <van-field
              v-model="assured.phone"
              label="手机号码"
              maxlength="11"
              placeholder="请输入手机号码"/>
            <van-field
              type="textarea"
              rows="1"
              autosize
              v-model="assured.address"
              label="地址"
              maxlength="11"
              placeholder="请输入地址"/>
            <van-field
              v-model="assured.email"
              label="邮箱地址"
              maxlength="11"
              placeholder="请输入邮箱地址"/>
          </van-cell-group>
        </van-cell-group>
      </van-collapse-item>
      <van-collapse-item
        class="group"
        title="影像上传"
        name="upload">
        <div slot="right-icon" class="right-text" v-text="activeNames.indexOf('upload') > -1 ? '收起' : '展开'">
        </div>
        <Screenage :imgs="imgs" @emitImgList="emitImgs"></Screenage>
      </van-collapse-item>
      <van-collapse-item
        class="group"
        title="保单获取方式"
        name="access">
        <div slot="right-icon" class="right-text" v-text="activeNames.indexOf('access') > -1 ? '收起' : '展开'"></div>
         <van-cell-group class="item">
          <van-field
            v-model="insurancePolicy"
            label="保单形式"
            readonly
            @click="checkPicker('insurancePolicy', insurancePolicyList)"
            right-icon="arrow-down"/>
          <van-field
            v-if="insurancePolicy == '纸质'"
            v-model="distribution"
            readonly
            label="配送方式"
            @click="checkPicker('distribution', distributionList)"
            right-icon="arrow-down"/>
          <van-field
            v-if="insurancePolicy == '电子'"
            v-model="email"
            label="邮箱地址"
            placeholder="请输入邮箱地址"/>
          <van-cell-group v-if="insurancePolicy == '纸质' && distribution == '邮寄'">
            <van-field
              v-model="mailInfo.name"
              label="收件人"
              placeholder="请输入收件人"/>
            <van-field
              v-model="mailInfo.phone"
              label="手机号"
              placeholder="请输入手机号"/>
            <Area
              :current-area="mailInfo.cityCode"
              @checkedArea="checkedArea"/>
            <van-field
              label=""
              type="textarea"
              v-model="mailInfo.address"
              rows="1"
              autosize
              placeholder="请填写具体路名、门牌地址" />
          </van-cell-group>
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>
    <div class="btn-group">
      <span class="confirm">确认投保</span>
    </div>
    <!-- 选择框统一 -->
    <van-popup position="bottom" v-model="showPopup">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPopup = false"
        @confirm="confirmPopup" />
    </van-popup>
  </div>
</template>
<script>
  import Area from './module/area';
  import Screenage from './module/screenage'
  export default {
    components: {
      Area,
      Screenage,
    },
    data() {
      return {
        activeNames: ['owner', 'upload', 'access'],
        // 车主
        owner: {
          name: '',
          IDType: '身份证',
          ID: '',
          phone: '',
          address: '',
          email: '',
        },
        // 投保人
        insured: {
          name: '',
          IDType: '身份证',
          ID: '',
          phone: '',
          address: '',
          email: '',
        },
        // 被保险人
        assured: {
          name: '',
          IDType: '身份证',
          ID: '',
          phone: '',
          address: '',
          email: '',
        },
        // 影像上传
        imgs: {
          idFront: '',
          idReverse: '',
          vehicleLicenseFront: '',
          vehicleLicenseReverse: '',
          carImgs: [],
          otherImgs: [],
        },
        insuredOwner: true,
        assuredOwner: true,
        showPopup: false,
        insurancePolicy: '电子',
        distribution: '网点自取',
        insurancePolicyList: ['电子', '纸质'],
        distributionList: ['网点自取', '邮寄'],
        columns: [],
        currentPop: '',
        email: '',
        mailInfo: {
          name: '',
          phone: '',
          city: '',
          address: '',
          // 城市code
          cityCode: '',
        }
      }
    },
    methods: {
      checkPicker(current, list) {
        this.currentPop = current;
        this.columns = list;
        this.showPopup = true;
      },
      confirmPopup(val) {
        this[this.currentPop] = val;
        this.showPopup = false;
      },
      checkedArea(code, city) {
        this.mailInfo.city = city;
        this.mailInfo.cityCode = code;
      },
      emitImgs(list) {
        this.imgs = list;
      },
    }
  }
</script>
<style lang="scss">
  .containt-insured{
    .group{
      margin-bottom: 15px;
      .van-collapse-item__title{
        .van-cell__title{
          font-size: 18px;
          line-height: 28px;
          color:#4a4a4a;
          
        }
      }
      .van-collapse-item__content{
        padding: 0;
      }
      .right-text{
        color:#568EFC;
      }
      .item{
        border-bottom: 8px solid #F0F2F4;
        &:last-child{
          border:none;
        }
        .check-wrap{
          display: flex;
          align-items: center;
          padding-right: 16px;
        }
      }
    }
    .btn-group{
      background: #fff;
      padding: 20px;
      .confirm{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        border-radius: 5px;
        height: 45px;
        font-size: 17px;
        color:#fff;
        background: #568EFC;
      }
    }
  }
</style>
