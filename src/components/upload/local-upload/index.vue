<style scoped lang="less">
</style>
<template>
  <div>
    <input type="hidden" :value="value">
    <Upload
      ref="upload"
      :action="action"
      :headers="headers"
      :multiple="multiple"
      :type="type"
      :format="format"
      :max-size="maxSize"
      :show-upload-list="showUploadList"
      :on-exceeded-size="handleMaxSize"
      :on-format-error="handleFormatError"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
    >
      <Button icon="md-cloud-upload" :disabled="list.length>=maxLength">上传文件</Button>
    </Upload>
  </div>
</template>
<script>
import config from '@/config'
import { getToken } from '@/libs/util'
export default {
  name: 'local-upload',
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    multiple: {
      type: Boolean,
      default () {
        return false
      }
    },
    type: {
      type: String,
      default () {
        return 'select'
      }
    },
    format: {
      type: Array,
      default () {
        return []
      }
    },
    maxSize: {
      type: Number,
      default () {
        return 51200
      }
    },
    showUploadList: {
      type: Boolean,
      default () {
        return true
      }
    },
    maxLength: {
      type: Number,
      default () {
        return 10
      }
    }
  },
  data () {
    return {
      list: [],
      action: '',
      headers: {}
    }
  },
  created () {
    this.headers.Authorization = 'Bearer ' + getToken()
    this.action = config.upload.url
  },
  mounted () {
    let self = this
    self.list = self.$refs.upload.fileList
    setTimeout(function () {
      if (self.value.length > 0) {
        for (let i = 0; i < self.value.length; i++) {
          self.list.push({
            uid: new Date() + 1,
            uuid: self.value[i].uuid,
            name: self.value[i].name,
            url: self.value[i].url,
            percentage: 100,
            status: 'finished'
          })
        }
      } else {
        if (self.list.length > 0) {
          self.$refs.upload.fileList.splice(0, self.list.length)
        }
      }
    }, 500)
  },
  methods: {
    updateValue () {
      let array = []
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].status === 'finished') {
          array.push({
            uuid: this.list[i].uuid,
            name: this.list[i].name,
            url: this.list[i].url
          })
        }
      }
      this.$emit('input', array)
    },
    handleRemove (file, fileList) {
      this.updateValue()
    },
    handleSuccess (res, file) {
      if (res.errcode === 0) {
        file.uuid = res.file.uuid
        file.name = res.file.name
        file.url = res.file.url
        this.updateValue()
      } else {
        this.$Message.error(res.errmsg)
      }
    },
    handleError (error, file, fileList) {
      if (error || file || fileList) {
        this.$Message.error('上传失败！')
      }
    },
    handleMaxSize (file, fileList) {
      if (file || fileList) {
        this.$Message.error('文件太大！')
      }
    },
    handleFormatError (file, fileList) {
      this.$Notice.warning({
        title: '文件格式错误',
        desc: `本上传不支持‘${file.type}’的文件`
      })
    }
  }
}
</script>
