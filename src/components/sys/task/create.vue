<template>
  <Modal v-model="visible" title="添加任务">
    <Form ref="form" :model="form" :rules="rules" :label-width="100">
      <FormItem label="名称" prop="name">
        <Input v-model="form.name" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="Bean" prop="bean">
        <Input v-model="form.bean" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="Cron" prop="cron">
        <Input v-model="form.cron" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="参数" prop="params">
        <Input
          v-model="form.params"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="请填写内容..."
          style="width: 300px"
        ></Input>
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
    const validateParams = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("参数不能为空"));
      } else {
        try {
          let obj = JSON.parse(value);
          if(typeof obj === 'object'){
            callback();
          }else{
            callback(new Error("参数必须为JSON格式"));
          }
        } catch(e) {
          callback(new Error("参数必须为JSON格式"));
        }
      }
    };
    return {
      visible: false,
      form: {
        name: "",
        bean: "",
        cron: "",
        params: "",
        note: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "名称不能为空",
            trigger: "blur"
          }
        ],
        bean: [
          {
            required: true,
            message: "Bean不能为空",
            trigger: "blur"
          }
        ],
        cron: [
          {
            required: true,
            message: "Cron不能为空",
            trigger: "blur"
          }
        ],
        params: [
          {
            required: true,
            validator: validateParams,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions("sys/task", ["create"]),
    init() {
      this.form.name = "";
      this.form.bean = "";
      this.form.cron = "";
      this.form.params = "{}";
      this.form.note = "";
      this.visible = true;
    },
    handleSubmit() {
      let self = this;
      self.$refs.form.validate(valid => {
        if (valid) {
          self
            .create({
              name: self.form.name,
              bean: self.form.bean,
              cron: self.form.cron,
              params: JSON.parse(self.form.params),
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