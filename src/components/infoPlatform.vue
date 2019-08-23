<template>
  <div class="info-containt">
    <van-tabs
      v-model="active"
      color="#568EFC"
      title-active-color="#568EFC"
      title-inactive-color="#464646"
      line-height="2px"
      animated>
      <van-tab
        class="tabs"
        v-for="(item, index) in tabs"
        :key = "index"
        :title="item.title"
        :name="item.name">
        <div class="group">
            <div class="item">
              <p class="title">上年商业险信息</p>
              <van-cell-group>
                <van-field
                  value="上海市"
                  label="承保地区"
                  readonly />
                <van-field
                  value="华农财产保险股份有限公司"
                  label="承保公司"
                  readonly />
                <van-field
                  value="259000000"
                  label="保单号"
                  readonly />
                <van-field
                  value="2020.10.01"
                  label="保险到期时间"
                  readonly />
                <van-field
                  value="0.7"
                  label="商业险NCD分数"
                  readonly />
              </van-cell-group>
            </div>
            <div class="item">
              <p class="title">风险类型 01</p>
              <van-cell-group>
                <van-field
                  value="车主与上年保单不一致"
                  readonly />
              </van-cell-group>
            </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 1,
      tabs: [{
        title: '上年保单',
        name: 1
      },{
        title: '理赔/交通违法',
        name: 2
      },{
        title: '风险警示',
        name: 3
      }]
    }
  }
}
</script>
<style lang="scss" scope>
  .info-containt{
    min-height: 100vh;
    background: #F0F2F4;
    .tabs{
      background: #F0F2F4;
      .group{
        margin-top: 20px;
        .item{
          margin: 0 16px 15px;
          border-radius: 4px;
          background: #fff;
          padding-right: 16px;
          .title{
            font-size: 17px;
            color:#4A4A4A;
            font-weight: 600;
            line-height: 40px;
            padding: 0 0 0 16px;
          }
        }
      }
    }
  }
  .van-field__label{
    width: 120px;
  }
  .van-tabs__nav{
      background: #F0F2F4;
    }
</style>
