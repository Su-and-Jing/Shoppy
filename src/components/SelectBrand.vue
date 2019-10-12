<template>
  <div class="contain"> 
      <header>
          <van-icon class="iconLeft" name="arrow-left" size="23px"/>
          <p class="Vetit">选择品牌</p>
      </header>
      <div class="content">
        <van-search
            class="search-wrap"
            
            show-action
            placeholder="请输入品牌车型或车型代码搜索"
           
            >
             <!-- @search="onSearch" -->
            <div class="btn" slot="action" >搜索</div>
            <!-- @click="onSearch" -->
        </van-search>
      </div>
      <footer>

      </footer>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>