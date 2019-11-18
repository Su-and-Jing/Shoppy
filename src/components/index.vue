<template>
  <div>
    <!-- 头部导航 -->
    <header>
      <van-icon
        @click="backHandle"
        class="iconLeft"
        name="cross"
        size="23px"
      />
      <p class="Vetit">华农保险</p>
    </header>
     <!-- 头部导航 -->
     <!-- content -->
    <div class="index-containt" style="margin-top:38px;">
      <!-- 登录 -->
      <Login :show-login="showLoginPop" @closeLogin="closeLogin"></Login>
      <!-- 选择出单机构 -->
      <Institution :show-insitution="showInsitution"></Institution>
      <div class="partnerSwiper">
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide v-for="(item, index) in list" :key="index"
            ><img :src="item.img"
          /></swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="list-show">
       <div class="list-child">
         <div class="list-left">
            <img src="../assets/02.png" alt="">
         </div>
         <div class="list-right">
          <p class="right-font">百万医疗险</p>
          <span>超低保费</span><span>|</span><span>100种重疾</span><span>|</span><span>0免赔</span><br/>
          <span>医疗垫付</span><span>|</span><span>重疾绿通</span><span>|</span><span>多种加油包</span><br/>
          <span class="money-left">118.00</span><span class="money-right">元起</span>
         </div>
       </div>
       </div>
      <div class="list-show">
       <div class="list-child">
         <div class="list-left">
            <img src="../assets/01.png" alt="">
         </div>
         <div class="list-right">
          <p class="right-font">驾车无忧-驾乘人员以外伤害险</p>
          <span>定车不定人</span><span>|</span><span>2万意外医疗</span><br/>
          <span>多个座位一个价格</span><br/>
          <span class="money-left">180.00</span><span class="money-right">元/车</span>
         </div>
       </div>
       </div>
             <div class="list-show">
       <div class="list-child">
         <div class="list-left">
            <img src="../assets/01.png" alt="">
         </div>
         <div class="list-right">
          <p class="right-font">驾车无忧-驾乘人员以外伤害险</p>
          <span>定车不定人</span><span>|</span><span>2万意外医疗</span><br/>
          <span>多个座位一个价格</span><br/>
          <span class="money-left">180.00</span><span class="money-right">元/车</span>
         </div>
       </div>
       </div>
    </div>
     <!-- content -->
     <!-- 底部导航 -->     
       <bottom></bottom>  
     <!-- 底部导航 -->
  </div>
</template>

<script>
import Login from "./module/login.vue";
import Bottom from "./module/bottom.vue"
import Institution from "./module/institution";
import { institution } from "@/common/library/api";
export default {
  data() {
    return {
      // 登陆框
      showLoginPop: false,
      // 记录登录状态
      onLogin: false,
      // 选择出单机构
      showInsitution: false,
      list: [
        { img: require("../assets/01.png") },
        { img: require("../assets/02.png") },
        { img: require("../assets/03.png") }
      ],
      swiperOption: {
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true, //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
          hideOnClick: true //默认分页器会一直显示。这个选项设置为true时点击Swiper会隐藏/显示分页器。
        },
        notNextTick: true, // 如果需要自动播放
        autoplay: {
          delay: 5000,
          disableOnInteraction: false //用户操作swiper之后，是否禁止autoplay。 // reverseDirection: true,   //开启反向自动轮播。
        },
        loop: true,
        // effect:"coverflow",
        grabCursor: true,
        setWrapperSize: true,
        mousewheelControl: true,
        observeParents: true
      }
    };
  },
  components: {
    Login,
    Institution,
    Bottom
  },
  created() {
    var token=window.sessionStorage.getItem(token)
    console.log(token)
  },
  methods: {
    backHandle() {},
    // 关闭登录框 登录成功
    async closeLogin(res) {
      this.onLogin = true;
      this.showInsitution = true;
      this.showLoginPop = false;
    }
  }
};
</script>
<style  lang="scss" scoped>
@import "/style/head.scss";
.index-containt {
  min-height: 100vh;
  background: #fff;
  .partnerSwiper {  
    padding: 10px 15px 10px;
    img {
      width: 100%;
      box-shadow: 0px 15px 10px -15px #ccc;
    }
  }
  .list-show{
   height:8rem;
   padding:15px 0px 15px 15px;   
   border-bottom:1px solid #DBDBDB;
   .list-child{
     height:100%;
     width:100%;
     .list-left{
       height:100%;
       width:8rem;
       float:left;
       margin-right:10px;
      img{
        width:100%;
        height:100%;        
      }
     }
     .list-right{   
     width:100%;
     .right-font{
       font-size:1rem;
       padding-top:0.3rem;
       margin-bottom:15px;
     }
     span{
       display: inline-block;
       font-size:0.6rem;
       color:#999999;
       margin-right:5px;
       margin-bottom:0.5rem;
     }
     .money-left{     
       font-size:1rem;
       color:#F2994A;
       margin-top:0.7rem;
     }
     .money-right{
       font-size:0.4rem;
       color:#F2994A;
       font-size:9px;
       margin-left:-5px;
     }
     }
   }
  }
}
</style>
