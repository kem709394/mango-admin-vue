<template>
  <Modal v-model="visible" title="邮件设置">
    <Form ref="form" :model="form" :rules="rules" :label-width="120">
      <FormItem label="邮箱主机" prop="host">
        <Input v-model="form.host" placeholder="请填写邮箱主机..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="邮箱端口" prop="port">
        <Input v-model="form.port" placeholder="请填写邮箱端口..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="邮箱账号" prop="username">
        <Input v-model="form.username" placeholder="请填写邮箱账号..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="邮箱密码" prop="password">
        <Input v-model="form.password" placeholder="请填写邮箱密码..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="默认邮箱" prop="sender">
        <Input v-model="form.sender" placeholder="请填写默认邮箱..." style="width: 300px"></Input>
      </FormItem>
    </Form>
    <Row slot="footer" type="flex" justify="center">
      <Button type="primary" @click="handleSubmit">确认</Button>
      <Button @click="visible=false">取消</Button>
    </Row>
  </Modal>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      visible: false,
      content: null,
      form: {
        host: "",
        port: "",
        username: "",
        password: "",
        sender: ""
      },
      rules: {
        host: [
          {
            required: true,
            message: "邮箱主机不能为空",
            trigger: "blur"
          }
        ],
        port: [
          {
            required: true,
            message: "邮箱端口不能为空",
            trigger: "blur"
          }
        ],
        username: [
          {
            required: true,
            message: "邮箱账号不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "邮箱密码不能为空",
            trigger: "blur"
          }
        ],
        sender: [
          {
            required: true,
            message: "默认邮箱不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions("sys/config", ["getContent", "updateContent"]),
    init() {
      this.getContent("MAIL_CONFIG").then(res => {
        this.content = res.info;
        this.form.host = this.content.host;
        this.form.port = this.content.port;
        this.form.username = this.content.username;
        this.form.password = this.content.password;
        this.form.sender = this.content.sender;
        this.visible = true;
      });
    },
    handleSubmit() {
      let self = this;
      self.$refs.form.validate(valid => {
        if (valid) {
          self
            .updateContent({
              code: "MAIL_CONFIG",
              content: self.form
            })
            .then(res => {
              if (res.err_code === 0) {
                self.$Message.success("操作成功");
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