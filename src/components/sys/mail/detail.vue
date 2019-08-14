<template>
  <Modal v-model="visible" title="消息详情" footer-hide>
    <Form v-if="detail" :label-width="100">
      <FormItem label="主题">{{ detail.subject }}</FormItem>
      <FormItem label="内容">{{ detail.content }}</FormItem>
      <FormItem label="接收">
        <Tag v-for="item in detail.toSite" :key="item">{{item}}</Tag>
      </FormItem>
      <FormItem v-if="detail.ccSite.length>0" label="抄送">
        <Tag v-for="item in detail.ccSite" :key="item">{{item}}</Tag>
      </FormItem>
      <FormItem label="状态">
        {{ $tranDictName("MAIL_STATE", detail.state) }}
        <template v-if="detail.state==='-1'">{{ detail.counter }}次</template>
      </FormItem>
      <FormItem v-if="detail.state==='1'||detail.state==='-1'" label="发送">{{ $moment(detail.sendTime).format('YYYY-MM-DD HH:mm') }}</FormItem>
      <FormItem label="创建">{{ $moment(detail.createTime).format('YYYY-MM-DD HH:mm') }}</FormItem>
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
    ...mapActions("sys/mail", ["getDetail"]),
    init(id) {
      this.getDetail(id).then(res => {
        this.detail = res.info;
        this.visible = true;
      });
    }
  }
};
</script>