<style scoped>
</style>

<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="ios-list-box"></Icon>系统监控
      </p>
      <iframe ref="iframe" frameborder=0 :height="height" width="100%" :src="url"></iframe>
    </Card>
  </div>
</template>
<script>
import request from '@/libs/request'
import { getToken, getApiBaseUrl } from "@/libs/util";
export default {
  name: 'swagger',
  data () {
    return {
      url: `${getApiBaseUrl()}/other/druid/login?token=${getToken()}`,
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
