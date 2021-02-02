<template>
  <div>
    <!-- 操作栏 -->
    <sticky :z-index="20" :class-name="'operation'">
      <el-button v-loading="loading" plain round icon="el-icon-plus" type="primary" @click="submitArticle">
        提交
      </el-button>
      <el-button v-loading="loading" plain round icon="el-icon-folder-opened" type="warning" @click="saveDraft">
        草稿
      </el-button>
    </sticky>
    <!-- 编辑表单 -->
    <el-form ref="articleForm" :model="articleForm" :rules="rules" class="form-wrapper">
      <!-- 文章顶部图片 -->
      <el-form-item>
        <single-upload v-model="articleForm.imageUrl" />
      </el-form-item>
      <!-- 标题 -->
      <el-form-item prop="title" style="padding:0 10px">
        <MDinput v-model="articleForm.title" :maxlength="100" name="name" required>
          文章标题
        </MDinput>
      </el-form-item>
      <!-- 内容 -->
      <el-form-item prop="content">
        <tinymce v-model="articleForm.content" :height="350" />
      </el-form-item>
    </el-form>
    <!-- 实时预览 -->
    <div class="preview-text">预览：</div>
    <div class="preview" v-html="articleForm.content"></div> 
  </div>
</template>

<script>
import Tinymce from '@/components/Editor'
import Sticky from '@/components/Fixed'
import MDinput from '@/components/MD'
import SingleUpload from '@/components/Upload/single'

export default {
  data() {
    //表单验证
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        if(rule.field == 'title') {
          this.$message({
            message: '文章标题为必填项',
            type: 'error'
          })
          callback(new Error('请填写文章标题'))
        } else {
          this.$message({
            message: '文章内容为必填项',
            type: 'error'
          })
          callback(new Error('请填写文章内容'))
        }
        
      } else {
        callback()
      }
    }
    return {
      loading: false,
      //表单
      articleForm: {
        imageUrl: '',
        title: '',
        content: `<h3>这是一段示例文字</h3>`
      },
      rules: {
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }]
      },
    }
  },
  methods: {
    saveDraft() {

    },
    submitArticle() {

    }
  },
  components: {
    Tinymce,
    Sticky,
    MDinput,
    SingleUpload
  }
}
</script>

<style lang="scss" scoped>
.preview-text {
  margin: 10px;
}
.preview {
  border: 1px solid #f1f1f1;
  margin: 10px;
  padding: 10px;
}
</style>