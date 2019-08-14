<template>
  <Modal v-model="visible" title="任务详情" footer-hide>
    <Form v-if="detail" :label-width="100">
      <FormItem label="名称">{{ detail.name }}</FormItem>
      <FormItem label="Bean">{{ detail.bean }}</FormItem>
      <FormItem label="Cron">{{ detail.cron }}</FormItem>
      <FormItem label="参数">{{ detail.params }}</FormItem>
      <FormItem label="状态">{{ $tranDictName("TASK_STATE", detail.state) }}</FormItem>
      <FormItem label="说明">{{ detail.note }}</FormItem>
      <FormItem label="创建">{{ $moment(detail.createTime).format('YYYY-MM-DD HH:mm') }}</FormItem>
      <FormItem
        v-if="detail.modifyTime"
        label="修改"
      >{{ $moment(detail.modifyTime).format('YYYY-MM-DD HH:mm') }}</FormItem>
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
    ...mapActions("sys/task", ["getDetail"]),
    init(id) {
      this.getDetail(id).then(res => {
        this.detail = res.info;
        this.visible = true;
      });
    }
  }
};
</script>