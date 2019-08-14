<template>
  <Modal v-model="visible" title="文件详情" footer-hide>
    <Form v-if="detail" :label-width="100">
      <FormItem label="uuid">{{ detail.uuid }}</FormItem>
      <FormItem label="名称">{{ detail.name }}</FormItem>
      <FormItem label="类型">{{ detail.type }}</FormItem>
      <FormItem label="地址">
        <a :href="detail.url">
          <span>{{ detail.url }}</span>
        </a>
      </FormItem>
      <FormItem label="大小">{{ detail.size }}B</FormItem>
      <FormItem label="存储">{{ $tranDictName("STORE_MODE", detail.store) }}</FormItem>
      <FormItem label="上传">{{ $moment(detail.createTime).format('YYYY-MM-DD HH:mm') }}</FormItem>
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
    ...mapActions("sys/file", ["getDetail"]),
    init(id) {
      this.getDetail(id).then(res => {
        this.detail = res.info;
        this.visible = true;
      });
    }
  }
};
</script>