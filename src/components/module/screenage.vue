<template>
  <div class="screenage-wrapper">
    <div class="item">
      <p class="meta">人员证件</p>
      <div class="list">
        <div class="litem">
          <div class="img-wrap">
            <img class="img" v-if="!imgList.idFront" src="../../assets/upload/ID-front.png" alt />
            <img class="img sample" else :src="imgList.idFront.content" alt />
            <span class="camera"></span>
            <van-uploader
              name="idFront"
              class="file"
              :after-read="afterRead"
              :max-size="4194304"
              @oversize="overSize"
            />
          </div>
          <p class="instr">点击上传带头像的一面</p>
        </div>
        <div class="litem">
          <div class="img-wrap">
            <img class="img" v-if="!imgList.idReverse" src="../../assets/upload/ID-reverse.png" alt />
            <img class="img sample" else :src="imgList.idReverse.content" alt />
            <span class="camera"></span>
            <van-uploader
              class="file"
              :after-read="afterRead"
              name="idReverse"
              :max-size="4194304"
              @oversize="overSize"
            />
          </div>
          <p class="instr">点击上传带国徽的一面</p>
        </div>
      </div>
    </div>
    <div class="item">
      <p class="meta">车辆证件</p>
      <div class="list">
        <div class="litem">
          <div class="img-wrap">
            <img
              class="img"
              v-if="!imgList.vehicleLicenseFront"
              src="../../assets/upload/vehicle-license.png"
              alt
            />
            <img class="img sample" else :src="imgList.vehicleLicenseFront.content" alt />
            <span class="camera"></span>
            <van-uploader
              class="file"
              :after-read="afterRead"
              name="vehicleLicenseFront"
              :max-size="4194304"
              @oversize="overSize"
            />
          </div>
          <p class="instr">请上传行驶证正本</p>
        </div>
        <div class="litem">
          <div class="img-wrap">
            <img
              class="img"
              v-if="!imgList.vehicleLicenseReverse"
              src="../../assets/upload/vehicle-license.png"
              alt
            />
            <img class="img sample" else :src="imgList.vehicleLicenseReverse.content" alt />
            <span class="camera"></span>
            <van-uploader
              class="file"
              :after-read="afterRead"
              name="vehicleLicenseReverse"
              :max-size="4194304"
              @oversize="overSize"
            />
          </div>
          <p class="instr">请上传行驶证副本</p>
        </div>
      </div>
    </div>
    <div class="item">
      <p class="meta">
        <span>验车照</span>
        <span class="demo" @click="showDemo = true">查看示例</span>
      </p>
      <div class="list">
        <div class="litem" v-for="(item, index) in imgList.carImgs" :key="index">
          <div class="img-wrap">
            <img class="img" :src="item.content" alt />
            <van-icon name="clear" class="delete" @click="deleteCurrentImg('carImgs', index)"></van-icon>
          </div>
        </div>
        <div class="litem">
          <div class="img-wrap">
            <img class="img" src="../../assets/upload/car.png" alt />
            <span class="camera"></span>
            <van-uploader
              class="file"
              multiple
              :after-read="afterRead"
              name="carImgs"
              :max-size="4194304"
              @oversize="overSize"
            />
          </div>
          <p class="instr">
            请上传车辆右前侧
            <br />45度照片
          </p>
        </div>
      </div>
    </div>
    <div class="item">
      <p class="meta">其他资料</p>
      <div class="list">
        <div class="litem" v-for="(item, index) in imgList.otherImgs" :key="index">
          <div class="img-wrap">
            <img class="img" :src="item.content" alt />
            <van-icon name="clear" class="delete" @click="deleteCurrentImg('otherImgs', index)"></van-icon>
          </div>
        </div>
        <div class="litem">
          <div class="img-wrap">
            <img class="img" src="../../assets/upload/rest.png" alt />
            <span class="camera"></span>
            <van-uploader
              class="file"
              multiple
              :after-read="afterRead"
              name="otherImgs"
              :max-size="4194304"
              @oversize="overSize"
            />
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="showDemo" @click.self="showDemo = false" class="showDemoImg">
      <img src="../../assets/demo.png" alt />
    </van-popup>
  </div>
</template>
<script>
import { UploadInsureImg } from "@/common/library/api";
export default {
  props: ["imgs"],
  data() {
    return {
      showDemo: false,
      imgList: this.imgs,
      imgPath: "",
      imgurl: []
    };
  },
  methods: {
    overSize() {
      this.$toast("图片太大了");
    },
    async afterRead(file, detail) {
      console.log(file);
      const name = detail.name;
      if (name == "carImgs" || name == "otherImgs") {
        this.imgList[name] = this.imgList[name].concat(file);
      } else {
        this.imgList[name] = file;
      }
      this.emitImgList();
      // 调用影响上传接口
      let list = [];
      // alert(file.length);
      if (file.length) {
        for (let i = 0; i < file.length; i++) {
          list.push({ img: file[i].content });
        }
      } else {
        list.push({ img: file.content });
      }
      const data = await UploadInsureImg({ imgList: list });
      console.log(data);
      if (data.state == 200) {
        this.imgPath = data.data.imgPath;
        for (var i = 0; i < this.imgPath.length; i++) {
          this.imgurl.push(this.imgPath[i]);
        }
      }
    },
    deleteCurrentImg(name, index) {
      this.imgList[name].splice(index, 1);
      this.emitImgList();
    },
    emitImgList() {
      this.$emit("emitImgList", this.imgList,this.imgurl);
    }
  }
};
</script>
<style lang="scss">
.screenage-wrapper {
  margin: 0 16px;
  background: #fff;
  .item {
    .meta {
      font-size: 16px;
      color: #464646;
      height: 52px;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .demo {
        font-size: 15px;
        color: #568efc;
        font-weight: 500;
      }
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      .litem {
        width: 120px;
        margin-right: 12px;
        margin-bottom: 16px;
        .img-wrap {
          width: 120px;
          height: 0;
          padding-top: 66%;
          position: relative;
          .img {
            position: absolute;
            top: 50%;
            right: 0;
            bottom: 0;
            left: 50%;
            max-width: 100%;
            max-height: 100%;
            transform: translate(-50%, -50%);
            &.sample {
              z-index: 9;
              width: 100%;
            }
          }
          .camera {
            position: absolute;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.5) url(../../assets/camera.png)
              no-repeat center center;
            background-size: 20px 17px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 101;
            pointer-events: none;
          }
          .delete {
            position: absolute;
            top: -8px;
            right: -8px;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.6);
          }
        }
        .instr {
          text-align: center;
          margin: 8px 0;
          font-size: 11px;

          line-height: 15px;
          color: #4a4a4a;
        }
        .file {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          opacity: 0;
          z-index: 109;
        }
      }
    }
  }
  .showDemoImg {
    width: 88%;
    height: 100vh;
    background: transparent;
    display: flex;
    align-items: center;
    img {
      width: 100%;
    }
  }
}
</style>
