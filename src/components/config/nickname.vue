<template>
  <Modal v-model="visible" title="修改昵称">
    <Form ref="form" :model="form" :rules="rules" :label-width="100">
      <FormItem label="用户昵称" prop="nickName">
        <Input v-model="form.nickName" placeholder="Enter something..." style="width: 300px"></Input>
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
    const validateNickName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("昵称不能为空"));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      form: {
        nickName: ""
      },
      rules: {
        nickName: [
          {
            required: true,
            validator: validateNickName,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    init(nickName) {
      this.form.nickName = nickName;
      this.visible = true;
    },
    handleSubmit() {
      let self = this;
      self.$refs.form.validate(valid => {
        if (valid) {
          self.$emit("callback", self.form.nickName);
          self.visible = false;
        }
      });
    }
  }
};
</script>