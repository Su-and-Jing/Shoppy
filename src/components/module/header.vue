<template>
  <div class="header" style="font-size:12px;height:40px;">
    <span>华农保险移动车险</span>
    <span v-text="msg"></span>
    <span class="logo" style="width:30px;height:30px;top:6px;"></span>
  </div>
</template>
<script>
export default {
  props: ['message'],
  data() {
    return {
      msg: this.message,
    }
  }
}
</script>
