<template>
  <Modal v-model="visible" title="日志详情" footer-hide>
    <Form v-if="detail" :label-width="100">
      <FormItem label="账号">{{ detail.userName }}</FormItem>
      <FormItem label="地址">{{ detail.ipAddress }}</FormItem>
      <FormItem label="设备">{{ detail.device.browser }}({{ detail.device.system }})</FormItem>
      <FormItem label="时间">{{ $moment(detail.loginTime).format('YYYY-MM-DD HH:mm') }}</FormItem>
      <FormItem label="状态">{{ detail.isSucceed?'成功':'失败' }}</FormItem>
      <FormItem v-if="!detail.isSucceed" label="说明">{{ detail.note }}</FormItem>
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
    ...mapActions("sys/login_log", ["getDetail"]),
    init(id) {
      this.getDetail(id).then(res => {
        this.detail = res.info;
        this.visible = true;
      });
    }
  }
};
</script>