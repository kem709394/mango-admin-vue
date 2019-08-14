<template>
  <Modal v-model="visible" title="消息详情" footer-hide>
    <Form v-if="detail" :label-width="100">
      <FormItem label="标题">{{ detail.title }}</FormItem>
      <FormItem label="内容">{{ detail.content }}</FormItem>
      <FormItem label="类型">{{ $tranDictName("MESSAGE_TYPE", detail.type) }}</FormItem>
      <FormItem label="接收">
        <Avatar :src="detail.user.avatar"></Avatar>
        <span>{{ detail.user.userName }}</span>
      </FormItem>
      <FormItem label="状态">
        {{ $tranDictName("MESSAGE_STATE", detail.state) }}
        <template v-if="detail.state==='1'">{{ $moment(detail.readTime).format('YYYY-MM-DD HH:mm') }}</template>
      </FormItem>
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
    ...mapActions("sys/message", ["getDetail"]),
    init(id) {
      this.getDetail(id).then(res => {
        this.detail = res.info;
        this.visible = true;
      });
    }
  }
};
</script>