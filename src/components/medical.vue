<template>
  <div>
    <!-- 头部导航 -->
    <header>
      <van-icon
        @click="backHandle"
        class="iconLeft"
        name="arrow-left"
        size="23px"
      />
      <van-icon @click="backHandle" class="iconLeft" name="cross" size="23px" />
      <p class="Vetit" style="margin-left:-1rem">产品详情</p>
    </header>
    <!-- 头部导航 -->
    <div class="wrapper">
      <div class="medical-top">
        <img src="../assets/file.png" alt="" />
      </div>
      <div class="main">
        <div class="tab">
          <span
            class="tab-item"
            :class="{ active: currentTab == 1 }"
            @click="changeTab(1)"
          >
            基础型118.00元起
          </span>
          <span
            class="tab-item"
            :class="{ active: currentTab == 2 }"
            @click="changeTab(2)"
          >
            升级版180.00元起
          </span>
        </div>
        <!-- 传图投保 -->
        <div v-if="currentTab == 1">
          <van-cell title="一般医疗保险金" value="100万元" :border="false" />
          <van-cell
            title="重大疾病（100种）医疗保险金"
            value="100万元"
            :border="false"
          />
          <van-cell
            title="肿瘤特药加油包（可选）"
            value="100万元"
            :border="false"
          />
          <van-cell
            title="质子重离子医疗保险金"
            value="100万元"
            :border="false"
          />
          <van-cell
            title="住院费用垫付直赔（不限次）"
            value=""
            :border="false"
          />
          <van-cell title="重大疾病VIP绿色通道" value="" :border="false" />
          <div style="height:1px;background:#DBDBDB;margin-top:5px;"></div>
        </div>
        <!-- 手动输入 -->
        <div v-if="currentTab == 2">
          <van-cell
            title="质子重离子医疗保险金"
            value="100万元"
            :border="false"
          />
          <van-cell
            title="住院费用垫付直赔（不限次）"
            value=""
            :border="false"
          />
          <div style="height:1px;background:#DBDBDB;margin-top:5px;"></div>
        </div>
      </div>
      <router-link to="/" class="bz">查看保障详情 ></router-link>
      <div class="looklist">
        查看<router-link to="">《赔率表》</router-link>
        <router-link to="">《保险条款》</router-link>
        <router-link to="">《特别职业表》</router-link>
        <router-link to="">《健康管理介绍》</router-link>
         <router-link to="">癌症特药服务介绍</router-link>
          <router-link to="">《医院网络清单》</router-link>和
           <router-link to="">《癌症特定药品清单》</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      currentTab: 1
    };
  },
  methods: {
    backHandle() {},
    changeTab(type) {
      this.currentTab = type;
    }
  }
};
</script>
<style lang="scss" scope>
@import "/style/head.scss";
.router-link-active {
  text-decoration: none;
  color: #2f80ed;  
}
.wrapper {
  height: 100vh;
  background: #fff;
  .medical-top {
    width: 100%;
    height: 14rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .main {
    padding: 23px 0 15px;
    background: #fff;
    border-radius: 8rem;
    .tab {
      text-align: center;
      padding-bottom: 20px;
      font-size: 0;
      .tab-item {
        display: inline-block;
        width: 8rem;
        height: 2.3rem;
        border-radius: 23px;
        position: relative;
        font-size: 0.5rem;
        color: #2f80ed;
        text-align: center;
        line-height: 2.5rem;
        background-color: #dfedff;
        overflow: hidden;
        &.active {
          background-color: #2f80ed;
          color: #fff;
          z-index: 3;
          transform: scaleX(1.2);
          transition: 0.15s linear;
        }
      }
    }
    .van-cell {
      padding: 3px 16px;
    }
    .van-cell__title {
      flex: 70% 0;
    }
    .van-cell__value {
      color: #f2994f;
    }
  }
  .bz{
    padding-left:38%;   
  }
}
</style>
 