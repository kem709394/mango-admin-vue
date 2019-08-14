<template>
  <Modal v-model="visible" title="参数详情" footer-hide>
    <Form v-if="detail" :label-width="100">
      <FormItem label="名称">{{ detail.name }}</FormItem>
      <FormItem label="代码">{{ detail.code }}</FormItem>
      <FormItem label="说明">{{ detail.note }}</FormItem>
      <FormItem label="内容">{{ detail.content }}</FormItem>
      <FormItem label="修改"
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
    ...mapActions("sys/config", ["getDetail"]),
    init(id) {
      this.getDetail(id).then(res => {
        this.detail = res.info;
        this.visible = true;
      });
    }
  }
};
</script>