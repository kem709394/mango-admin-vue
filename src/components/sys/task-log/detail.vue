<template>
  <Modal v-model="visible" title="日志详情" width="800" footer-hide>
    <Form v-if="detail" :label-width="100">
      <FormItem label="Bean">{{ detail.bean }}</FormItem>
      <FormItem label="参数">{{ detail.params }}</FormItem>
      <FormItem label="说明">{{ detail.note }}</FormItem>
      <FormItem label="执行">{{ detail.isSucceed?'成功':'失败' }}</FormItem>
      <FormItem label="时间">{{ $moment(detail.createTime).format('YYYY-MM-DD HH:mm') }}</FormItem>
      <FormItem v-if="!detail.isSucceed" label="异常">
        <div style="width: 600px;word-break: break-all;word-wrap: break-word;">{{ detail.message }}</div>
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
    ...mapActions("sys/task_log", ["getDetail"]),
    init(id) {
      this.getDetail(id).then(res => {
        this.detail = res.info;
        this.visible = true;
      });
    }
  }
};
</script>