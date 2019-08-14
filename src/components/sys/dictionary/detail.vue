<template>
  <Modal v-model="visible" title="字典详情" width="800" footer-hide>
    <Form v-if="detail" :label-width="100">
      <FormItem label="名称">{{ detail.name }}</FormItem>
      <FormItem label="代码">{{ detail.code }}</FormItem>
      <FormItem label="类型">{{ $tranDictName("DICT_TYPE", detail.type) }}</FormItem>
      <FormItem label="选项" style="margin-left: 1px;">
        <Table border :columns="columns" :data="detail.options"></Table>
      </FormItem>
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
import { getDictOptions, tranDictName } from "@/libs/util";
export default {
  data() {
    return {
      visible: false,
      detail: null,
      columns: [
        {
          title: "名称",
          align: "center",
          key: "name"
        },
        {
          title: "代码",
          align: "center",
          key: "code"
        }
      ]
    };
  },
  methods: {
    ...mapActions("sys/dictionary", ["getDetail"]),
    init(id) {
      this.getDetail(id).then(res => {
        this.detail = res.info;
        this.visible = true;
      });
    }
  }
};
</script>