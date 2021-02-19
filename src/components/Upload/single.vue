<template>
<!-- 一次上传一张图片，有总上传图片数量限制 -->
<!-- 应用场景：文章图片 -->
  <el-dialog
    title="上传资源"
    :visible.sync="uploadVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    width="700px">
    <div class="upload-container">
      <el-upload
        :action="`${uploadUrl}`+'/admin/uploadSingle'"
        :multiple="false"
        :limit="allowedNumber"
        :show-file-list="allowedNumber > 1 ? true : false"
        list-type="text"
        :before-upload="beforeImageUpload"
        :on-exceed="handleExceed"
        :on-success="handleImageSuccess"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        name="image"
        class="upload-image"
        drag
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          将文件拖拽至此处，或<em>点击上传</em>
        </div>
        <div v-if="fileSize" class="upload-tip">
          上传大小不超过<b style="color:#f56c6c">{{ fileSize }}MB</b>
        </div>
        <div v-if="fileType" class="upload-tip">
          格式需为<b style="color:#f56c6c">{{ fileType.join("/") }}</b>
        </div>
      </el-upload>
      <div class="image-preview">
        <span class="demonstration">鼠标移入预览</span>
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
    <div slot="footer" class="dialog-footer">
      <el-button @click="uploadVisible = false">关闭</el-button>
    </div>
  </el-dialog>
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
      uploadVisible: false,
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
    openDialog() {
      this.uploadVisible = true
    },
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
    //上传超过限制
    handleExceed() {
      this.$message.error('最多只能上传'+this.allowedNumber+'张图片')
    },
    //上传成功
    handleImageSuccess(res, file) {
      if(res.code === '0') {
        this.$message({
            message: res.desc,
            type: 'success'
        })
        this.imageUrl = this.uploadUrl + '/articles/' + res.filename
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
      this.imageUrl = this.uploadUrl + '/articles/' + file.response.filename
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
.el-upload-dragger {
  width: 250px;
  height: 225px;
}
.el-upload-list__item {
  width: 250px;
}
.el-upload-list {
  margin-left: 265px;
}
.error-slot {
  height: 185px;
  width: 250px;
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
  background-color: #f4f4f4;
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
  .upload-image {
    width: 250px;
  }
  .image-preview {
    position: relative;
    border: 1px dashed #d9d9d9;
    margin-left: 20px;
    height: 223px;
    width: 250px;
    .preview {
      height: 138px;
      width: 100%;
      cursor: pointer;
    }
  }
}
.dialog-footer {
  text-align: center;
}
</style>
