<template>
  <Modal v-model="visible" title="添加角色">
    <Form ref="form" :model="form" :rules="rules" :label-width="100">
      <FormItem label="代码" prop="code">
        <Input v-model="form.code" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="名称" prop="name">
        <Input v-model="form.name" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="状态">
        <RadioGroup v-model="form.state" type="button">
          <Radio
            v-for="(item,index) in $getDictOptions('USE_STATE')"
            :key="index"
            :label="item.code"
          >{{item.name}}</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="优先级" prop="priority">
        <Input v-model="form.priority" number placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="说明">
        <Input
          v-model="form.note"
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
    const validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("代码不能为空"));
      } else {
        this.getList({ code: value }).then(res => {
          if (res.list.length === 0) {
            callback();
          } else {
            callback(new Error("代码被使用"));
          }
        });
      }
    };
    return {
      visible: false,
      form: {
        name: "",
        code: "",
        priority: 0,
        state: "",
        note: "",
        extFields: {}
      },
      rules: {
        code: [
          {
            required: true,
            validator: validateCode,
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "名称不能为空",
            trigger: "blur"
          }
        ],
        priority: [
          {
            required: true,
            type: "number",
            message: "优先级不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions("sys/role", ["create", "getList"]),
    init() {
      this.form.name = "";
      this.form.code = "";
      this.form.state = "1";
      this.form.priority = 0;
      this.form.note = "";
      this.form.extFields = {};
      this.visible = true;
    },
    handleSubmit() {
      let self = this;
      self.$refs.form.validate(valid => {
        if (valid) {
          self
            .create({
              name: self.form.name,
              code: self.form.code,
              state: self.form.state,
              extFields: self.form.extFields,
              priority: self.form.priority,
              note: self.form.note
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