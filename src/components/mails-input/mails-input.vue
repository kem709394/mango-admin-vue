<template>
  <div>
    <Tag v-for='(tag, index) in tags' :key='index' closable @on-close="del">{{tag}}</Tag>
    <Input ref='input' style="width: 200px;" placeholder="请输入后按回车键"
      @on-enter="add"
      v-model='current'/>
  </div>
</template>

<script>
export default {
  props: {
    value: Array,
    required: true,
    default: () => []
  },
  data () {
    return {
      current: ''
    }
  },
  computed: {
    tags () {
      return this.value.slice()
    }
  },
  methods: {
    add (e) {
      const val = e.target.value
      if (!val){
        this.$Message.error('邮箱地址不能为空')
        return
      }
      if (this.tags.indexOf(val) > -1) {
        this.$Message.error('邮箱地址重复')
        return
      }
      if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(val)) {
        this.$Message.error('邮箱地址格式错误')
        return
      }
      this.tags.push(val)
      this.$emit('input', this.tags)
      this.current = ''
    },
    del (event, name) {
        const index = this.tags.indexOf(name)
        this.tags.splice(index, 1)
        this.$emit('input', this.tags)
    }
  }
}
</script>

<style lang='less'>
</style>