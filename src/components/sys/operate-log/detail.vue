<template>
  <Modal v-model="visible" title="操作详情" width="800" footer-hide>
    <Form v-if="detail" :label-width="100">
      <FormItem label="路径">{{ detail.path }}</FormItem>
      <FormItem label="方法">{{ detail.method }}</FormItem>
      <FormItem label="参数">{{ detail.parameters }}</FormItem>
      <FormItem label="地址">{{ detail.ipAddress }}</FormItem>
      <FormItem label="设备">{{ detail.device.browser }}({{ detail.device.system }})</FormItem>
      <FormItem label="用户">
        <Avatar :src="detail.user.avatar"></Avatar>
        <span>{{ detail.user.userName }}</span>
      </FormItem>
      <FormItem label="时间">{{ $moment(detail.createTime).format('YYYY-MM-DD HH:mm') }}</FormItem>
      <FormItem label="鉴权">{{ detail.isAgreed?'通过':'拒绝' }}</FormItem>
      <FormItem label="返回">
        <div style="width: 600px;word-break: break-all;word-wrap: break-word;">{{ detail.response }}</div>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      visible: false,
      detail: null
    };
  },
  methods: {
    ...mapActions("sys/operate_log", ["getDetail"]),
    init(id) {
      this.getDetail(id).then(res => {
        this.detail = res.info;
        this.visible = true;
      });
    }
  }
};
</script>