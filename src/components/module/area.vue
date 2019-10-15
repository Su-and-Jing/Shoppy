<template>
  <div class="area-wrapper">
    <van-field
      label="地址"
      v-model="cityValue"
      readonly
      @click="checkArea = true"
      placeholder="请选择地址"
    />

    <!-- 配送地址 -->
    <van-popup position="bottom" v-model="checkArea">
      <van-area
        :area-list="areaList"
        :value="current"
        @confirm="confirmArea"
        @cancel="checkArea = false"
      />
    </van-popup>
  </div>
</template>
<script>
import area from "@/common/library/area";
import { priceToConfirm } from "@/common/library/api";

export default {
  props: ["currentArea"],
  data() {
    return {
      checkArea: false,
      areaList: area,
      current: this.currentArea,
      cityValue: this.currentArea,
      cityValue0: "",
      cityValue1: "",
      cityValue2: ""
    };
  },

  created() {},
  mounted() {
    console.log(this.currentArea);
  },
  methods: {
    async confirmArea(val) {
      console.log(val);
      this.current0 = val[0].code;
      console.log(this.current0);
      this.current1 = val[1].code;
      this.current2 = val[2].code;
      this.cityValue = `${val[0].name} ${val[1].name} ${val[2].name}`;
      console.log(this.cityValue)
      this.current = `${val[0].code} ${val[1].code} ${val[2].code}`;
      this.cityValue0 = `${val[0].name}`;
      this.cityValue1 = `${val[1].name} `;
      this.cityValue2 = `${val[2].name} `;
      this.checkArea = false;

      // window.localStorage.setItem("current", this.current);
      // window.localStorage.setItem("current0", this.current0);
      // window.localStorage.setItem("current1", this.current1);
      // window.localStorage.setItem("current2", this.current2);
      // window.localStorage.setItem("cityValue0", this.cityValue0);
      // window.localStorage.setItem("cityValue1", this.cityValue1);
      // window.localStorage.setItem("cityValue2", this.cityValue2);
      this.$emit("checkedArea", this.current, this.cityValue);
    }
  }
};
</script>
