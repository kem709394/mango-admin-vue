<template>
  <div>
    <Tag v-for='(tag, index) in tags' :key='index' closable @on-close="del">{{tag}}</Tag>
    <Input ref='input' style="width: 120px;" placeholder="请输入后按回车键"
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
      if (!val) return
      if (this.tags.indexOf(val) > -1) return
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