<template>
<!-- 一次上传一张图片，有总上传图片数量限制 -->
<!-- 应用场景：文章图片 -->
  <div class="upload-container">
    <el-upload
      :action="`${uploadUrl}`+'/admin/uploadSingle'"
      :multiple="false"
      :limit="allowedNumber"
      :show-file-list="allowedNumber > 1 ? true : false"
      list-type="text"
      :before-upload="beforeImageUpload"
      :on-success="handleImageSuccess"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      name="image"
      class="image-uploader"
      drag
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖拽至此处，或<em>点击上传</em>
      </div>
      <div>
        <span v-if="fileSize" class="upload-tip">
          上传大小不超过<b style="color:#f56c6c">{{ fileSize }}MB</b>
        </span>
        <span v-if="fileType" class="upload-tip">
          ，格式需为<b style="color:#f56c6c">{{ fileType.join("/") }}</b>
        </span>
      </div>
    </el-upload>
    <div class="image-preview">
      <span class="demonstration">点击进行预览</span>
      <el-popover
        placement="left"
        trigger="hover"
        :disabled="!imageUrl">
        <img :src="imageUrl" style="">
        <el-image slot="reference" :src="imageUrl" fit="scare-down" class="preview">
          <div slot="error" class="error-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </el-popover>
    </div>
  </div>
</template>

<script>
import baseUrl from '@/utils/setting'

export default {
  props: {
    //允许上传个数
    allowedNumber: {
      type: Number,
      default: 1
    },
    fileSize: {
      type: Number,
      default: 5
    },
    fileType: {
      type: Array,
      default: () => ['jpg', 'jpeg', 'png', 'gif']
    }
  },
  data() {
    return {
      tempUrl: '',
      //是否打开预览
      showPreview: false,
      imageUrl: '',
      //上传成功文件列表
      tempList: []
    }
  },
  computed: {
    uploadUrl() {
      return baseUrl
    }
  },
  methods: {
    //上传前检测
    beforeImageUpload(file) {
      const len = this.tempList.length
      if (len > this.allowedNumber) {
        this.$message.error(`最多添加${this.allowedNumber}张图片!`)
        return
      }
      const fileType = file.type

      const verifyList = [
        {
          text: "上传图片格式需为png、jpg、gif!",
          result: fileType.indexOf('image') != -1
        },
        {
          text: "上传图片大小需小于10MB",
          result: file.size / 1024 / 1024 < 10
        }
      ]

      for (let item of verifyList) {
        if (!item.result) {
          this.$message.error(item.text)
          return
        }
      }
    },
    //上传成功
    handleImageSuccess(res, file) {
      if(res.code === '0') {
        this.$message({
            message: res.desc,
            type: 'success'
        })
        this.imageUrl = this.serverUrl + '/articles/' + res.filename
        this.tempList.push(this.imageUrl)
      } else {
        this.$message({
          message: '上传失败，请重试~',
          type: 'error'
        })
      }
    },
    //预览图片
    handlePreview(file) {
      this.imageUrl = this.serverUrl + '/articles/' + file.response.filename
      this.showPreview = true
    },
    //删掉图片
    handleRemove(file) {
      this.showPreview = false
      //预览删除完的上一个图片
      if(this.tempList.length > 0) {
        this.tempList.pop()
        let index = this.tempList.length - 1
        if(index >= 0) {
          this.imageUrl = this.tempList[index]
        } else {
          this.imageUrl = ''
        }
      }
      this.$message({
        message: '图片已删掉',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss">
.el-upload-list__item {
  width: 360px;
}
.el-upload-list {
  margin-left: 405px;
}
.error-slot {
  height: 140px;
  width: 348px;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    font-size: 40px;
    color: #d1d1d1;
  }
}
</style>
<style lang="scss" scoped>
.upload-tip {
  color: #606266;
  font-size: 14px;
}

.demonstration {
  font-size: 15px;
  display: flex;
  justify-content: center;
  background-color: #f2f2f2;
}

.upload-container {
  margin-top: 20px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  .image-uploader {
    width: 360px;
  }
  .image-preview {
    position: relative;
    border: 1px dashed #d9d9d9;
    margin-left: 50px;
    height: 178px;
    width: 348px;
    .preview {
      height: 138px;
      width: 100%;
      cursor: pointer;
    }
  }
}
</style>
