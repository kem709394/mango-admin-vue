<style scoped>
</style>

<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="ios-list-box"></Icon>接口文档
      </p>
      <iframe ref="iframe" frameborder=0 :height="height" width="100%" :src="url"></iframe>
    </Card>
  </div>
</template>
<script>

export default {
  name: 'swagger',
  data () {
    return {
      url: "http://localhost:8080/swagger-ui.html",
      height: window.innerHeight - 235
    }
  },
  mounted(){
    let self = this;
    window.onresize = () => {
      self.height = window.innerHeight - 235;
    }
  }
}
</script>
