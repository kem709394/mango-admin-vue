<template>
  <Modal v-model="visible" title="资源详情" footer-hide>
    <Form v-if="detail" :label-width="100">
      <FormItem label="名称">{{ detail.name }}</FormItem>
      <FormItem label="代码">{{ detail.code }}</FormItem>
      <FormItem label="访问路径">{{ detail.path }}</FormItem>
      <FormItem label="请求方法">{{ $tranDictName("REQUEST_METHOD", detail.method) }}</FormItem>
      <FormItem v-if="detail.method==='GET'" label="映射类型">{{ detail.mapClass }}</FormItem>
      <FormItem v-if="detail.method==='GET'" label="可选字段">
        <Tag v-for="item in detail.attributes" :key="item">{{item}}</Tag>
      </FormItem>
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
    ...mapActions("sys/resource", ["getDetail"]),
    init(id) {
      this.getDetail(id).then(res => {
        this.detail = res.info;
        this.visible = true;
      });
    }
  }
};
</script>