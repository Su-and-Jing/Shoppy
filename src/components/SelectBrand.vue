<template>
  <div class="contain">
    <header>
      <van-icon @click="backHandle" class="iconLeft" name="arrow-left" size="23px" />
      <p class="Vetit">选择品牌</p>
    </header>
    <div class="content">
      <van-search class="search-wrap" show-action placeholder="请输入品牌车型或车型代码搜索">
        <!-- @search="onSearch" -->
        <div class="btn" slot="action">搜索</div>
        <!-- @click="onSearch" -->
      </van-search>

      <div class="Car">
        <p class="cartit">{{CarBrands}}</p>
        <ul>
          <router-link
            :to="{name:'Annual',query:{name:item}}"
            tag="li"
            v-for="(item,index) in carPai"
            :key="index"
          >{{item}}</router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { CarPai } from "@/common/library/api";
export default {
  data() {
    return {
      CarBrands: "",
      carPai: []
    };
  },
  created() {},
  mounted() {
    console.log(this.$route);
    this.Select();
  },
  methods: {
    async Select() {
      this.CarBrands = this.$route.query.name;
      var brands = this.CarBrands;
      const data = await CarPai(brands);
      if (data.state === "200") {
        this.carPai = data.data;
      }
    },
    // 点击返回按钮,如果没有上一页,则返回首页
    backHandle() {
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
        return false;
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style lang="scss" scope>
@import "./style/head.scss";
.contain {
  // width:100%;


  .content {
    // flex:1;
    width: 100%;
    margin-top: 53px;
    .search-wrap {
      .btn {
        flex: 34px 0;
        margin: 0 13px;
        color: #568efc;
        font-size: 16px;
      }
    }
    .Car {
      width: 100%;
      .cartit {
        background: rgba(240, 242, 244, 1);
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFangSC;
        font-weight: 500;
        color: rgba(74, 74, 74, 1);
        padding: 11.5px 0 11px 15px;
      }
      ul {
        width: 100%;
        li {
          padding-left: 15.5px;
          line-height: 45px;
          height: 45px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 1px 0px 0px rgba(229, 229, 229, 0.6);
        }
      }
    }
  }
}
</style>