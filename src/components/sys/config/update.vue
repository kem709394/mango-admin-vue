<template>
  <Modal v-model="visible" title="修改参数">
    <Form v-if="detail" ref="form" :model="form" :rules="rules" :label-width="100">
      <FormItem label="名称">{{ detail.name }}</FormItem>
      <FormItem label="代码">{{ detail.code }}</FormItem>
      <FormItem label="说明">{{ detail.note }}</FormItem>
      <FormItem label="内容" prop="content">
        <Input
          v-model="form.content"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="请填写内容..."
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
import { mapActions } from "vuex";
export default {
  data() {
    const validateContent = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("内容不能为空"));
      } else {
        try {
          JSON.parse(value);
          callback();
        } catch (error) {
          callback(new Error("内容必须为json格式"));
        }
      }
    };
    return {
      visible: false,
      detail: null,
      form: {
        content: ""
      },
      rules: {
        content: [
          {
            required: true,
            validator: validateContent,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions("sys/config", ["getDetail", "update"]),
    init(id) {
      this.getDetail(id).then(res => {
        this.detail = res.info;
        this.form.content = JSON.stringify(this.detail.content);
        this.visible = true;
      });
    },
    handleSubmit() {
      let self = this;
      self.$refs.form.validate(valid => {
        if (valid) {
          self
            .update({
              id: self.detail.id,
              data: {
                content: JSON.parse(self.form.content)
              }
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