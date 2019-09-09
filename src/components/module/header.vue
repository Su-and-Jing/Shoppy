<template>
  <div class="header">
    <span>华农保险移动车险</span>
    <span v-text="msg"></span>
    <span class="logo"></span>
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
