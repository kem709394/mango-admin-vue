<style scoped lang="less">
</style>
<template>
  <div>
    <input type="hidden" :value="value">
    <Upload
      ref="upload"
      action=""
      :multiple="multiple"
      :type="type"
      :format="format"
      :max-size="maxSize"
      :show-upload-list="showUploadList"
      :before-upload="customUpload"
      :on-exceeded-size="handleMaxSize"
      :on-format-error="handleFormatError"
      :on-remove="handleRemove"
    >
      <Button icon="md-cloud-upload" :disabled="list.length>=maxLength">上传文件</Button>
    </Upload>
  </div>
</template>
<script>
import config from '@/config'
export default {
  name: 'cos-upload',
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
      cos: null,
      list: []
    }
  },
  created () {
    this.cos = this.$root.cos
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
    customUpload (file) {
      let self = this
      self.cos.putObject({
        Bucket: config.upload.cos.bucket,
        Region: config.upload.cos.region,
        Key: file.name,
        StorageClass: 'STANDARD',
        Body: file
      }, (err, data) => {
        if (err) {
          console.log(err)
        } else {
          if (data.statusCode === 200) {
            self.cos.getObjectUrl({
              Bucket: config.upload.cos.bucket,
              Region: config.upload.cos.region,
              Key: file.name,
              Sign: false
            }, function (err, data) {
              if (!err) {
                self.list.push({
                  uid: file.uid,
                  name: file.name,
                  url: data.Url,
                  percentage: 100,
                  status: 'finished'
                })
                self.updateValue()
              }
            })
          }
        }
      })
      return false
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
