<template>
  <div class="head-containt">
    <div class="instr">
      <div class="left">
        <div class="item">
          <span class="plate">沪A78990</span>
          <span class="name">黄雪芹</span>
        </div>
      </div>
      <div class="right">
        <div class="item">
          <p class="insurance-type">交强险<span>2018.7.30-2019.8.30</span></p>
          <p class="insurance-no">保单号：W20175609988</p>
        </div>
        <div class="item">
          <p class="insurance-type">交强险<span>2018.7.30-2019.8.30</span></p>
          <p class="insurance-no">保单号：W20175609988</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scope>
  .head-containt{
    width: 100%;
    height: 0;
    padding-top: 50%;
    background:#fff url('../../assets/head.png') no-repeat center;
    background-size: 100%;
    position: relative;
    .instr{
      position: absolute;
      top: 18px;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      color: #fff;
      .left{
        flex: 44% 0;
        display: flex;
        justify-content: center;
        .item{
          display: flex;
          flex-direction: column;
          .plate{
            font-size: 20px;
            margin-bottom: 10px;
          }
          .name{
            font-size: 17px;
          }
        }
      }
      .right{
        flex: 56% 0;
        .item{
          &:last-child{
            margin-top: 15px;
            position: relative;
            &::before{
              content: ' ';
              position: absolute;
              left: 0;
              top: -15px;
              right: 12px;
              height: 1px;
              background: #fff;
              opacity: .5;
            }
          }
          .insurance-type{
            font-size: 15px;
            display: flex;
            align-items: center;
            span{
              margin-left: 7px;
              font-size: 10px;
              color: rgba(256,256,256,.7);
            }
          }
          .insurance-no{
            font-size: 12px;
            line-height: 32px;
          }
        }
      }
    }
  }
</style>
