<template>
  <Modal v-model="visible" title="修改密码">
    <Form ref="form" :model="form" :rules="rules" :label-width="100">
      <FormItem label="旧的密码" prop="oldPassword">
        <Input
          type="password"
          v-model="form.oldPassword"
          placeholder="Enter something..."
          style="width: 300px"
        ></Input>
      </FormItem>
      <FormItem label="新的密码" prop="newPassword">
        <Input
          type="password"
          v-model="form.newPassword"
          placeholder="Enter something..."
          style="width: 300px"
        ></Input>
      </FormItem>
      <FormItem label="确认密码" prop="newPassword2">
        <Input
          type="password"
          v-model="form.newPassword2"
          placeholder="Enter something..."
          style="width: 300px"
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
export default {
  data() {
    const validateOldPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("旧的密码不能为空"));
      } else {
        if (value.length >= 6 && value.length <= 10) {
          callback();
        } else {
          callback(new Error("密码的长度必须为6~10位"));
        }
      }
    };
    const validateNewPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("新的密码不能为空"));
      } else {
        if (value.length >= 6 && value.length <= 10) {
          callback();
        } else {
          callback(new Error("密码的长度必须为6~10位"));
        }
      }
    };
    const validateNewPassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("确认密码不能为空"));
      } else {
        if (this.form.newPassword === value) {
          callback();
        } else {
          callback(new Error("确认密码和新的密码不一致"));
        }
      }
    };
    return {
      visible: false,
      form: {
        oldPassword: "",
        newPassword: "",
        newPassword2: ""
      },
      rules: {
        oldPassword: [
          {
            required: true,
            validator: validateOldPassword,
            trigger: "blur"
          }
        ],
        newPassword: [
          {
            required: true,
            validator: validateNewPassword,
            trigger: "blur"
          }
        ],
        newPassword2: [
          {
            required: true,
            validator: validateNewPassword2,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    init() {
      this.oldPassword = "";
      this.newPassword = "";
      this.newPassword2 = "";
      this.visible = true;
    },
    handleSubmit() {
      let self = this;
      self.$refs.form.validate(valid => {
        if (valid) {
          self.$emit("callback", {
            oldPassword: self.form.oldPassword,
            newPassword: self.form.newPassword
          });
          self.visible = false;
        }
      });
    }
  }
};
</script>