<template>
    <div class="contain">
        <header>
          <van-icon @click="backHandle" class="iconLeft" name="arrow-left" size="23px"/>
          <p class="Vetit">选择年款</p>
        </header>
        <div class="content">
          <router-link tag="div"  :to="{name:'price',query:{name:item.modelname}}" class="banner" v-for="(item,index) in CarTypeArr" :key="index"> 
              <div class="nav">
                <h3>{{item.carseriesname}}</h3>
                <P>{{item.modelname}}</P>
                <div class="nav_box"> 
                  <span class="zid">{{item.transmissiontype}}</span>
                  <p> {{item.caryear}}款  |  {{item.seatmax}}座</p>
                </div>
              </div>
              <div class="price"> ￥{{item.purchasepricetax}}</div>
          </router-link>
        </div>
    </div>
</template>

<script>
import {CarType} from "@/common/library/api";
export default {
    data(){
        return{
            carSeries:'',
            CarTypeArr:[]
        }
    },
    mounted(){
        this.carHanlk()
    },
    methods:{
        async carHanlk(){
            this.carSeries=this.$route.query.name
            var seies=this.carSeries
            const data=await CarType(seies)
            if (data.state === "200") {
                this.CarTypeArr=data.data
            }
        },
        // 点击返回按钮,如果没有上一页,则返回首页
        backHandle(){
            if (window.history.length <= 1) {
                this.$router.push({path:'/'})
                return false
            } else {
                this.$router.go(-1)
            }
        }
    }
}
</script>

<style lang="scss"  scope>
  .contain{
        width:100%;
         header{
            width: 100%;
            height:53px;
            background: #fff;
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            z-index:1;
            border-bottom: 1px solid #E5E5E5;
            .iconLeft{
                padding: 15px 0 0 15px;
            }
            .Vetit{
                width:100%;
                line-height: 53px;
                text-align: center;
                margin: 0 60px 0 0;
                font-size:17px;
                font-weight:500;
                color:rgba(51,51,51,1);
            }
          }

           .content{
              width: 100%;
              // margin-top:53px; 
              margin-top: 65px;
              background:#fff;
                .banner{
                  padding-bottom:10px;
                  border-bottom:1px solid #E5E5E5; 
                  margin-top:10px; 
                  width:100%;
                  display: flex;
                  justify-content: space-around;
                  .nav{
                    height: 100px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    &>h3:nth-child(1){
                      font-size:17px;
                      font-family:PingFangSC-Medium,PingFangSC;
                      color:rgba(74,74,74,1);
                      
                    }
                    &>p:nth-child(1){
                      font-size:30px;
                      font-family:PingFangSC-Regular,PingFangSC;
                      font-weight:400;
                      color:rgba(51,51,51,1);
                      line-height:25px;
                      
                    }
                    .nav_box{
                     
                      display: flex;
                      .zid{
                        display: block;
                        padding:3px 5px;
                        font-size: 12px;
                        height:25px;
                        background:rgba(255,234,208,1);
                        border-radius:12.5px;
                        color:rgba(246,137,0,1);
                        
                        line-height: 25px;
                        }
                        &>p{
                          margin-left: 15px;
                          line-height: 25px;
                          color: #999999;
                          font-size: 12px;
                        }
                    }
                  }
                  .price{
                   line-height: 100px;
                   font-size:16px;
                   font-family:PingFangSC-Regular,PingFangSC;
                   font-weight:400;
                   color:rgba(246,137,0,1);
                  }
                }
           
            }
  }
</style>