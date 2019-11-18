<template>
  <div class="bottom">
    <div
      class="item"
      @click="clickItem('/')"
      :class="{ active: $route.path === '/' }"
    >
      <van-icon class="iconLeft" name="shop" size="23px" />
      <p>保险商城</p>
    </div>
    <div
      class="item"
      @click="clickItem('/myhome')"
      :class="{ active: $route.path === '/myhome' }"
    >
      <van-icon class="iconLeft" name="orders-o" size="23px" />
      <p>我的订单</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "bottom",
  methods: {
    clickItem: function(path) {
      var token = window.sessionStorage.getItem("token");
      // console.log("111" + token);
      this.$router.push(path);
    }
  }
};
</script>
<style lang="scss" scope>
//   @import "./../icon/iconfont.css";
.bottom {
  position: fixed;
  bottom: 0;
  box-shadow: 0px -4px 10px rgba(140, 175, 222, 0.18);
  background-color: #fff;
  width: 100%;
  height: 3rem;
  z-index: 2;
}
.item {
  width: 50%;
  text-align: center;
  padding-top: 0.35rem;
  float: left;
}
.item p {
  margin: 0;
  font-size: 0.5rem;
}
.active {
  color: #2f80ed;
}
</style>
 