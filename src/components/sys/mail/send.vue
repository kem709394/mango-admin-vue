<template>
  <Modal v-model="visible" title="发送邮件" width="800">
    <Form ref="form" :model="form" :rules="rules" :label-width="150">
      <FormItem label="主题" prop="subject">
        <Input v-model="form.subject" placeholder="请填写内容..." style="width: 500px"></Input>
      </FormItem>
      <FormItem label="接收" prop="toSite">
        <MailsInput v-model="form.toSite"></MailsInput>
      </FormItem>
      <FormItem label="抄送" prop="ccSite">
        <MailsInput v-model="form.ccSite"></MailsInput>
      </FormItem>
      <FormItem label="内容" prop="content">
        <Input
          v-model="form.content"
          type="textarea"
          style="width: 500px"
          :autosize="{minRows: 8,maxRows: 20}"
          placeholder="请填写内容..."
        ></Input>
      </FormItem>
    </Form>
    <Row slot="footer" type="flex" justify="center">
      <Button type="primary" @click="handleSubmit">确认</Button>
      <Button @click="visible=false">取消</Button>
    </Row>
  </Modal>
</template>

<script>
import MailsInput from "_c/mails-input";
import { mapActions } from "vuex";
export default {
  components: {
    MailsInput
  },
  data() {
    return {
      visible: false,
      form: {
        subject: "",
        content: "",
        toSite: [],
        ccSite: [],
        inline: [],
        attachment: []
      },
      rules: {
        subject: [
          {
            required: true,
            message: "主题不能为空",
            trigger: "blur"
          }
        ],
        content: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur"
          }
        ],
        toSite: [
          {
            required: true,
            type: "array",
            message: "至少填写一个接收地址",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions("sys/mail", ["create"]),
    init() {
      this.form.subject = "";
      this.form.content = "";
      this.form.toSite = [];
      this.form.ccSite = [];
      this.visible = true;
    },
    handleSubmit() {
      let self = this;
      self.$refs.form.validate(valid => {
        if (valid) {
          self
            .create({
              subject: self.form.subject,
              content: self.form.content,
              toSite: self.form.toSite,
              ccSite: self.form.ccSite,
              inline: [],
              attachment: []
            })
            .then(res => {
              if (res.err_code === 0) {
                self.$emit("callback");
                self.visible = false;
              } else {
                self.$Message.error(res.err_msg);
              }
            });
        }
      });
    }
  }
};
</script>