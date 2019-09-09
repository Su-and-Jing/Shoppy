<template>
  <div class="containt">
    <van-search
      class="search-wrap"
      v-model="search"
      show-action
      placeholder="请输入车牌号/车架号/车主姓名"
      @search="onSearch">
      <div class="btn" slot="action" @click="onSearch">搜索</div>
    </van-search>
    <van-tabs
      class="tabs-list"
      v-model="active"
      animated swipeable
      color="#568EFC"
      title-active-color="#568EFC"
      title-inactive-color="#464646"
      line-height="2px">
      <van-tab v-for="(item,index) in tabList" :key="index" :title="item.title" :name="item.name">
        <div class="list van-hairline--top">
          <div class="item">
            <div class="sign">
              <p class="type">待核保</p>
              <p class="times">08-09 10:01</p>
            </div>
            <div class="content">
              <div class="left">
                <p class="plate-number">沪A78990</p>
                <p class="car-owner">杨晓易</p>
              </div>
              <div class="right">
                <div class="ritem">
                  <p class="top">
                    <span class="insurance">交强险</span>
                    <span class="amount">329.99元</span>
                  </p>
                  <p class="time">2018.7.30-2019.8.30</p>
                </div>
                <div class="ritem van-hairline--top">
                  <p class="top">
                    <span class="insurance">商业险</span>
                    <span class="amount">329.99元</span>
                  </p>
                  <p class="time">2018.7.30-2019.8.30</p>
                </div>
              </div>
            </div>
            <div class="status van-hairline--top">
              <span class="chassis-number">车架号：09876543211098765</span>
              <span class="type">修改投保方案</span>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return{
      active: 1,
      search: '',
      tabList: [{
          title: '暂存单',
          name: 1,
        },{
          title: '待处理',
          name: 2,
        },{
          title: '待支付',
          name: 3,
        },{
          title: '已完成',
          name: 4,
      }]
    }
  },
  methods: {
    onSearch() {
      console.log('999')
    },
  }
}
</script>
<style lang="scss">
.containt{
  background: #f3f3f3;
  min-height: 100vh;
  .search-wrap{
    .btn{
      flex: 34px 0;
      margin: 0 13px;
      color:#568EFC;
      font-size: 16px;
    }
  }
  .list{
    .item{
      margin-top: 10px;
      padding-top: 30px;
      background: #fff;
      position: relative;
      .sign{
        position: absolute;
        top:0;
        left: 15px;
        background: #568EFC;
        padding:5px 10px;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        .times{
          margin-top: 5px;
        }
      }
      .content{
        display: flex;
        align-items: center;
        padding-bottom: 10px;
        .left{
          flex: 115px 0;
          padding-left: 25px;
          .car-owner{
            margin-top: 10px;
          }
        }
        .right{
          flex: 1;
          margin-right: 24px;
          .ritem{
            padding-top: 14px;
            margin-bottom: 10px;
            .top{
              display: flex;
              justify-content: space-between;
              color:#464646;
              font-size: 14px;
              margin-bottom: 10px;
              .amount{
                font-size: 13px;
                color:#4a4a4a;
              }
            }
            .time{
              font-size: 11px;
              color:#4a4a4a;
            }
          }
        }
      }
      .status{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px 14px 17px;
        font-size: 12px;
        color:#4a4a4a;
        .type{
          padding: 6px 9px;
          color: #538BFB;
          background: rgba(83,139,251,.1);
          border-radius: 2px;
        }
      }
    }
  }
}
</style>
