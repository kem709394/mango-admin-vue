<template>
  <Modal v-model="visible" title="用户详情" footer-hide>
    <Form v-if="detail" :label-width="100">
      <FormItem label="头像"><Avatar size="large" :src="detail.avatar"/></FormItem>
      <FormItem label="昵称">{{ detail.nickName }}</FormItem>
      <FormItem label="账号">{{ detail.userName }}</FormItem>
      <FormItem label="角色">
        <Tag v-for="item in detail.roles" :key="item.id">{{item.name}}</Tag>
      </FormItem>
      <FormItem label="状态">{{ $tranDictName("USE_STATE", detail.state) }}</FormItem>
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
    ...mapActions("sys/user", ["getDetail"]),
    init(id) {
      this.getDetail(id).then(res => {
        this.detail = res.info;
        this.visible = true;
      });
    }
  }
};
</script>