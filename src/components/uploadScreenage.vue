<template>
  <div class="screenage-containt">
    <Head></Head>
    <Screenage :imgs="imgs" @emitImgList="emitImgs"></Screenage>
    <div class="foot">
      <span class="submit">上传</span>
    </div>
  </div>
</template>
<script>
  import Head from './module/head'
  import Screenage from './module/screenage'
  export default {
    components: {
      Head,
      Screenage,
    },
    data () {
      return {
        imgs: {
          idFront: '',
          idReverse: '',
          vehicleLicenseFront: '',
          vehicleLicenseReverse: '',
          carImgs: [],
          otherImgs: [],
        },
      }
    },
    methods: {
      emitImgs(list) {
        this.imgs = list;
      }
    }
  }
</script>
<style lang="scss" scope>
  .screenage-containt{
    min-height: 100vh;
    background: #fff;
    .foot{
      border-top: 15px solid #F0F2F4;
      padding: 20px 20px 24px;
      .submit{
        border-radius: 5px;
        background: #568EFC;
        color: #fff;
        height: 45px;
        font-size: 17px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>
