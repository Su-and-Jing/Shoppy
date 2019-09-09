<template>
  <div class="area-wrapper">
    <van-field
      label="配送地址"
      v-model="city"
      readonly
      @click="checkArea = true"
      placeholder="请选择配送地址" />
    <!-- 配送地址 -->
    <van-popup position="bottom" v-model="checkArea">
      <van-area
        :area-list="areaList"
        :value="current"
        @confirm="confirmArea"
        @cancel="checkArea = false"/>
    </van-popup>
  </div>
</template>
<script>
import area from '@/common/library/area';
export default {
  props: ['currentArea'],
  data() {
    return {
      checkArea: false,
      areaList: area,
      current: this.currentArea,
      city: '',
    }
  },
  methods: {
    confirmArea(val) {
      this.current = val[2].code;
      this.city = `${val[0].name } ${val[1].name } ${val[2].name }`;
      this.checkArea = false;
      this.$emit('checkedArea', this.current, this.city);
    }
  }
}
</script>
