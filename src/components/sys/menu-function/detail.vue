<template>
  <Modal v-model="visible" title="菜单详情" footer-hide>
    <Form v-if="detail" :label-width="100">
      <FormItem label="名称">{{ detail.name }}</FormItem>
      <FormItem label="代码">{{ detail.code }}</FormItem>
      <FormItem label="类型">{{ $tranDictName("MENU_TYPE", detail.type) }}</FormItem>
      <FormItem v-if="detail.parent" label="上级">{{ detail.parent.name }}</FormItem>
      <FormItem label="状态">{{ $tranDictName("USE_STATE", detail.state) }}</FormItem>
      <FormItem label="优先级">{{ detail.priority }}</FormItem>
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
    ...mapActions("sys/menu_function", ["getDetail"]),
    init(id) {
      this.getDetail(id).then(res => {
        this.detail = res.info;
        this.visible = true;
      });
    }
  }
};
</script>