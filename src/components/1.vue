<template>
  <van-picker :columns="columns" @change="onChange" />
</template>

<script>
export default {
  data() {
    return {
    //改一下
      columns: [
	      {"keyId":2,"text":"测试1"},
	      {"keyId":10,"text":"测试2"},
	      {"keyId":31,"text":"测试3"}
      ],
      
    };
  },
  methods: {
    onChange(picker, value, index) {
	    //此时返回的value就是个对象了
	    var keyId = value.keyId;
	    var text= value.text;
      console.log('当前值'+keyId + '当前索引'+text);
    }
  }
};

</script>

<style>

</style>