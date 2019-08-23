<template>
  <div class="containt">
    <!-- 身份证识别 -->
    <div class="id-wrap">
      <div class="img-wrap">
        <div class="img">
          <img class="img" src="../assets/ID.png" alt="">
        </div>
        <div class="center">上传照片</div>
        <van-uploader class="disabeld-file" :after-read="afterRead" />
      </div>
      <van-cell-group class="field-group">
        <van-field
          v-model="IDType"
          readonly
          label="证件类型"
          right-icon="arrow-down"
          @click="choosePopup(typeList, 'IDType')"/>
        <van-field
          v-model="ID"
          label="身份证号"
          placeholder="请输入身份证号" />
      </van-cell-group>
    </div>
    <!-- 间隔样式 -->
    <div class="line-wrapper"></div>
    <!-- 驾驶证识别 -->
    <div class="driver-license-wrap">
      <div class="img-wrap">
        <div class="img">
          <img class="img" src="../assets/driver-license.png" alt="">
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
          @click="choosePopup(typeList, 'IDType')"/>
        <van-field
          v-model="licensePlateNumber"
          label="车牌号码"
          placeholder="请输入车牌号码" />
      </van-cell-group>
    </div>
    <!-- 间隔样式 -->
    <div class="line-wrapper"></div>
    <!-- 识别失败 -->
    <div class="failure-wrap">
      <div class="img-wrap">
        <div class="img">
          <img class="img" src="../assets/ID.png" alt="">
        </div>
        <p class="remind">
          <van-icon class="icon" name="warning" />
          小农暂时无法识别此类图片，再试试看哟！
        </p>
      </div>
       <van-cell-group class="field-group">
        <van-field
          v-model="daiverIDType"
          readonly
          label="证件类型"
          right-icon="arrow-down"
          @click="choosePopup(typeList, 'IDType')"/>
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
        @confirm="confirm"
        @cancel="showPopup = false" />
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgList: [],
      ID: '',
      daiverIDType: '',
      IDType: '身份证',
      typeList: ['车主证件-身份证正面', '车辆证件-行驶证'],
      showPopup: false,
      current: '',
      currentColumns: [],
      // 车牌号码
      licensePlateNumber: '',
    }
  },
  created() {
    this.imgList = this.$route.params.imgs;
  },
  methods: {
    afterRead() {
      console.log('upload')
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
}
</script>
<style lang="scss" scope>
  @import '/style/index.scss';
  .containt{
    min-height: 100vh;
    background: #fff;
    .id-wrap,
    .driver-license-wrap,
    .failure-wrap{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background: #fff;
      .img-wrap{
        width: 67.2%;
        height: 0;
        padding-top:58.7%;
        position: relative;
        .img{
          position: absolute;
          top:0;
          left: 0;
          bottom:0;
          right: 0;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          img{
            max-width: 100%;
            max-height: 100%;
            position: absolute;
            top:50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
      .field-group{
        width: 100%;
      }
      .remind{
        display: flex;
        align-items: center;
        .icon{
          font-size: 16px;
          margin-right: 2px;
        }
        font-size: 12px;
        color:#f55656;
        position: relative;
        z-index: 9;
        bottom: 12px;
      }
    }
    .submit{
      margin: 24px 16px;
      .btn{
        border-radius: 4px;
        height: 45px;
        line-height: 45px;
        background: #568EFC;
        border-color: #568EFC;
        font-size: 17px;
      }
    }
  }

</style>
