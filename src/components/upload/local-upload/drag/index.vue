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
      :show-upload-list="false"
      :default-file-list="value"
      :on-exceeded-size="handleMaxSize"
      :on-format-error="handleFormatError"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
    >
      <Button icon="md-cloud-upload" :disabled="list.length>=maxLength">上传文件</Button>
    </Upload>
    <div class="ivu-upload">
      <ul class="ivu-upload-list">
        <template v-for="(file, index) in list">
          <li :key="index"
            class="ivu-upload-list-file ivu-upload-list-file-finish"
            draggable="true"
            @dragstart="handleDrag(file,$event)"
            @dragover="$event.preventDefault()"
            @drop="handleDrop(file,$event)"
          >
            <span>
              <Icon type="md-document"></Icon>
              {{file.name}}
            </span>
            <i
              class="ivu-icon ivu-icon-ios-close ivu-upload-list-remove"
              @click="handleRemove(file)"
            ></i>
            <transition name="fade">
              <i-progress
                v-if="file.showProgress"
                :stroke-width="2"
                :percent="parseInt(file.percentage, 10)"
                :status="file.status === 'finished' && file.showProgress ? 'success' : 'normal'"
              ></i-progress>
            </transition>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
<script>
import config from '@/config'
import { getToken } from '@/libs/util'

export default {
  name: 'local-upload-drag',
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
    self.list = []
    setTimeout(function () {
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
    handleDrag (file, event) {
      event.dataTransfer.setData('index', this.list.indexOf(file))
    },
    handleDrop (file, event) {
      let index = event.dataTransfer.getData('index')
      let item = JSON.parse(JSON.stringify(this.list[index]))
      this.list.splice(index, 1)
      this.list.splice(this.list.indexOf(file), 0, item)
      this.updateValue()
    },
    handleRemove (file) {
      this.list.splice(this.list.indexOf(file), 1)
      this.updateValue()
    },
    handleSuccess (res, file) {
      if (res.errcode === 0) {
        file.uuid = res.file.uuid
        file.name = res.file.name
        file.url = res.file.url
        this.list.push(file)
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
      if (file || fileList) {
        this.$Notice.warning({
          title: '文件格式错误',
          desc: `本上传不支持‘${file.type}’的文件`
        })
      }
    }
  }
}
</script>
