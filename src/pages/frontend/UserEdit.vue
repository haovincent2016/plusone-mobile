<template>
<!-- https://blog.csdn.net/weixin_43752765/article/details/104845724 -->
<!-- https://www.jianshu.com/p/1c073a5bc584 -->
  <div class="container">
    <TopPart :isLogin="true" />
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', marginTop: '46px' }"
    >
      头像
    </van-divider>
    <!-- 头像修改 -->
    <div class="avatar-wrapper">
      <input class="imageRead" ref="imageRead" @change="selectImage" accept="image/*" type="file" />
      <div class="photo-wrap mt20">
        <span class="f38 bold">头像</span>
        <span>
          <img @click="clickPhoto" class :src="userAvatar" alt />
        </span>
      </div>
      <van-overlay style="z-index:2;background-color:rgba(0,0,0,.85);" :show="showCrop">
        <div class="crop-wrapper" @click.stop>
          <div>
            <img id="cropImage" ref="cropImage" src alt />
          </div>
          <div class="crop-options">
            <van-button plain type="info" @click="cancelCrop">取消</van-button>
            <van-button plain type="info" @click="resetCrop">复位</van-button>
            <van-button plain type="info" @click="scaleCrop">反转</van-button>
            <van-button plain type="info" @click="rotateCrop">旋转</van-button>
            <van-button plain type="info" @click="submitCrop">确定</van-button>
          </div>
        </div>
      </van-overlay>
    </div>
    <div class="btn-wrapper">
      <!-- <van-button 
        id="pick-avatar" 
        round 
        class="upload-btn" 
        type="info">上传头像</van-button> -->
    </div>
    <!-- <avatar-cropper
      @uploaded="handleUploaded"
      trigger="#pick-avatar"
      upload-url="/files/upload" 
    /> -->
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      背景图
    </van-divider>
    <!-- 主页背景图添加 -->
    <div class="bg">
      <van-uploader 
        v-model="bg"
        :max-count="1"
        upload-text="限5MB"
        upload-icon="plus"
        :max-size="5*1024*1024" @oversize="onOversize" />
    </div>
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      个人信息
    </van-divider>
    <!-- 个人信息修改 -->
    <div class="info">
      <van-field v-model="nickname" label="昵称" />
      <van-field v-model="phone" type="tel" label="手机号" />
      <van-field v-model="description" label="个人描述" rows="2" autosize type="textarea" maxlength="100" show-word-limit />
    </div>
    <div class="action">
      <van-button 
        round
        class="upload-btn" 
        type="info">保存</van-button>
      <van-button 
        round 
        class="upload-btn" 
        type="default">取消</van-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TopPart from 'components/Home/TopPart'
import "cropperjs/dist/cropper.css"
import Cropper from "cropperjs"
import AvatarCropper from "vue-avatar-cropper"

export default {
  computed: mapState([ 'userInfo' ]),
  data() {
    return {
      userAvatar: undefined,
      nickname: undefined,
      phone: undefined,
      description: undefined,
      bg: undefined,

      showCrop: false,
      myCropper: "",
      flagX: false //裁剪的图片是否反转，默认false(不反转)
    }
  },
  mounted() {
    this.initInfo()
    this.initCropper()
  },
  methods: {
    initInfo() {
      this.userAvatar = this.userInfo.avatar
      this.nickname = this.userInfo.nickname
      this.phone = this.userInfo.phone
      this.description = this.userInfo.description
    },
    // 处理背景图超过限制大小
    onOversize(file) {
      this.$toast.fail("上传图片过大，最大为5MB")
    },

    initCropper() {
      // 创建实例，与展示裁剪的img标签绑定
      let cropImageDom = document.querySelector("#cropImage");
      this.myCropper = new Cropper(cropImageDom, {
        aspectRatio: 1 / 1,
        // viewMode: 0,
        // minContainerWidth: 100,
        // minContainerHeight: 100,
        // preview: ".previewBox",
        guides: false, // 裁剪框的虚线(九宫格)
        autoCropArea: 0.5, // 0-1之间的数值，定义自动剪裁区域的大小，默认0.8
        // movable: false, // 是否允许移动图片
        dragCrop: true, // 是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
        movable: true, // 是否允许移动剪裁框
        resizable: true, // 是否允许改变裁剪框的大小
        // zoomable: false, // 是否允许缩放图片大小
        mouseWheelZoom: false, // 是否允许通过鼠标滚轮来缩放图片
        touchDragZoom: true, // 是否允许通过触摸移动来缩放图片
        rotatable: true, // 是否允许旋转图片
        crop: function(e) {
          // 输出结果数据裁剪图像。
        }
      })
    },
    // 点击头像
    clickPhoto() {
      this.$refs["imageRead"].click();
    },
    // 选择图片
    selectImage(e) {
      let targetFile = e.target.files[0];
      console.log(targetFile);
      if (targetFile) {
        this.showCrop = true;
        this.flagX = false;
        let reader = new FileReader();
        /* readAsDataURL 方法会读取指定的 Blob 或 File 对象。
        读取操作完成的时候，readyState 会变成已完成DONE，
        并触发 loadend 事件，同时 result 属性将包含一个data:URL格式的字符串（base64编码）
        以表示所读取文件的内容。*/
        reader.readAsDataURL(targetFile);
        reader.onload = () => {
          let dataURL = reader.result;
          let cropImageDom = document.querySelector("#cropImage");
          cropImageDom.src = dataURL;
          this.myCropper.replace(dataURL);
        };
        // 避免下次选择同一图片不触发
        e.target.value = "";
      }
    },
    // 取消裁剪
    cancelCrop() {
      this.showCrop = false;
    },
    // 复位
    resetCrop() {
      this.flagX = false;
      this.myCropper.reset();
    },
    // 反转
    scaleCrop() {
      if (this.flagX) {
        this.myCropper.scaleX(1), (this.flagX = false);
      } else {
        this.myCropper.scaleX(-1), (this.flagX = true);
      }
    },
    // 旋转
    rotateCrop() {
      this.myCropper.rotate(45);
    },
    // 确定裁剪
    submitCrop() {
      let cas = this.myCropper.getCroppedCanvas();
      let base64 = cas.toDataURL("image/jpeg");
      this.userAvatar = base64;
      this.showCrop = false;
    }
  },
  components: {
    TopPart,
    AvatarCropper
  }
}
</script>

<style lang="stylus" scoped>
.avatar-wrapper
  display flex
  justify-content center
  align-items center
  .avatar-img
    max-width 100%
    width 100px
    height 100px
    border-radius 50%
.btn-wrapper 
  text-align center
  .upload-btn
    margin 15px
.bg 
  text-align center
.action
  margin-bottom 65px
  text-align center
</style>
<style lang="scss" scoped>
.crop-wrapper {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  & > div {
    width: 100%;
  }
  & > div:first-child {
    height: 70%;
    background: rgb(12, 12, 12);
  }
  & > div:last-child {
    text-align: center;
  }
}
.imageRead {
  display: none;
}
.photo-wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  & > span:last-child {
    width: px2rem(200);
    height: px2rem(200);
    border-radius: 50%;
    overflow: hidden;
    background: black;
    box-shadow: 0 0 px2rem(17) gray;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>