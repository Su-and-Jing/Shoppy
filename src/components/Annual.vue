<template>
    <div class="contain">
        <header>
          <van-icon class="iconLeft" name="arrow-left" size="23px"/>
          <p class="Vetit">选择年款</p>
        </header>
        <div class="content"> 
          <div class=""> 

          </div>
          <div class="price">

          </div>
        </div>
    </div>
</template>

<script>
export default {


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
                padding: 13px 0 0 15px;
            }
            .Vetit{
                width:100%;
                line-height: 53px;
                text-align: center;
                margin: 0 20px 0 0;
                font-size:17px;
                font-weight:500;
                color:rgba(51,51,51,1);
            }
          }

            .content{
              width: 100%;
              margin-top:53px; 
              background:#fff;

           
            }
  }
</style>