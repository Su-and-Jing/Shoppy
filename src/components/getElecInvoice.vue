<template>
  <div class="containt-elec">
    <Head></Head>
    <div class="main">
      <p class="instr">点击下载pdf格式电子保单</p>
      <div class="group">
        <div class="item">
          <span @click="checkFile(1)">商业险电子保单</span>
        </div>
        <div class="item">
          <span @click="checkFile(2)">交强险电子保单</span>
        </div>
        <div class="item">
          <span @click="checkFile(3)">交强险电子标志</span>
        </div>
      </div>
    </div>
    <van-popup
      class="pdfPopup"
      position="right"
      v-model="showPdf">
      <p class="mate">
        <van-icon class="icon" @click="showPdf = false" name="arrow-left" />
      </p>
      <pdf
        :src="pdfSrc">
      </pdf>
    </van-popup>
  </div>
</template>
<script>
import pdf from 'vue-pdf'
import Head from './module/head'
export default {
  components: {
    Head,
    pdf,
  },
  data() {
    return {
      // 服务器端pdf文件地址
      pdfSrc: '',
      showPdf: false,
    }
  },
  methods: {
    checkFile(type) {
      // type 对应pdf文件类型
      this.showPdf = true;
    }
  }
}
</script>
<style lang="scss" scope>
  .containt-elec{
    min-height: 100vh;
    background: #fff;
    .main{
      .instr{
        font-size: 18px;
        color: #4a4a4a;
        margin: 8px 0 24px 16px;
        line-height: 25px;
      }
      .group{
        display: flex;
        margin: 0 18px;
        display: flex;
        flex-wrap: wrap;
        .item{
          margin-bottom: 15px;
          flex: 50% 0;
          height: 0;
          padding-top: 25%;
          position: relative;
          span{
            border: 1px solid #568EFC;
            border-radius: 4px;
            position: absolute;
            top: 0;
            right: 7px;
            bottom: 0;
            left: 7px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 17px;
            color: #568efc;
          }
        }
      }
    }
    .pdfPopup{
      width: 100%;
      min-height: 100vh;
      .mate{
        font-size: 24px;
        line-height: 40px;
        background: rgba(0,0,0,.3);
        padding-left: 16px;
        .icon{
          position: relative;
          z-index: 1;
        }
      }
    }
  }
</style>
