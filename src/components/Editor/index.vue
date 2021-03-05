<template>
  <div class="tinymce-container">
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <div class="upload-container">
      <el-button type="primary" plain icon="el-icon-upload2" size="mini" @click="uploadImage">上传图片</el-button>
      <el-button type="primary" plain icon="el-icon-folder-opened" size="mini" @click="selectResource">选择资源</el-button>
    </div>
    <!-- 上传 -->
    <single-upload
      ref="upload" 
      :allowedNumber="3" 
      @uploaded="insertUploaded"
    ></single-upload>
    <!-- 资源管理器 -->
    <resource
      ref="resource"
      style="display:none"
      @confirm="insertFile"
    ></resource>
  </div>
</template>

<script>
import load from './dynamicLoad'
import SingleUpload from '@/components/Upload/single'
import Resource from '@/components/Upload/resource'

const plugins = ['advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount']
const toolbar = ['searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample', 'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen']
const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'

export default {
  props: {
    id: {
      type: String,
      default: function() {
        return 'tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 350
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    init() {
      // dynamic load tinymce from cdn
      load(tinymceCDN, (err) => {
        if (err) {
          this.$message.error(err.message)
          return
        }
        this.initTinymce()
      })
    },
    initTinymce() {
      const _this = this
      window.tinymce.init({
        language: 'zh_CN',
        selector: `#${this.tinymceId}`,
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        },
        convert_urls: false
      })
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    //打开图片上传
    uploadImage() {
      this.$refs.upload.openDialog()
    },
    //打开资源管理
    selectResource() {
      this.$refs.resource.openDialog()
    },
    //插入上传的图片
    insertUploaded(data) {
      data.forEach(d => {
         window.tinymce.get(this.tinymceId).insertContent(`<img alt="Smiley face" class="content-img" src="${d}" >`)
      })
    },
    //插入资源管理选择的图片
    insertFile(data) {
      let count = 0
      data.forEach(v => {
        //只插入图片类型
        if(v.type === 0) {
          window.tinymce.get(this.tinymceId).insertContent(`<img alt="Smiley face" class="content-img" src="${v.link}" >`)
        } else {
          count++
        }
      })
      if(count > 0) {
        this.$message.warning('当前只支持插入图片类型~')
      }
    } 
  },
  components: {
    SingleUpload,
    Resource
  }
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  padding: 20px 10px;
  .upload-container {
    position: absolute;
    right: 12px;
    top: 17px;
  }
}
</style>