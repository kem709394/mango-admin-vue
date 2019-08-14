<template>
  <Modal v-model="visible" title="发送消息">
    <Form ref="form" :model="form" :rules="rules" :label-width="100">
      <FormItem label="标题" prop="title">
        <Input v-model="form.title" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="内容" prop="content">
        <Input
          v-model="form.content"
          type="textarea"
          style="width: 300px"
          :autosize="{minRows: 4,maxRows: 10}"
          placeholder="请填写内容..."
        ></Input>
      </FormItem>
      <FormItem label="接收" prop="toUsers">
        <Select v-model="form.toUsers" multiple filterable style="width:300px">
          <Option
            v-for="(item,index) in userOption"
            :key="index"
            :value="item.id"
          >{{ item.nickName }}({{ item.userName }})</Option>
        </Select>
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
    return {
      visible: false,
      form: {
        title: "",
        content: "",
        toUsers: [],
        extFields: {},
        note: ""
      },
      rules: {
        title: [
          {
            required: true,
            message: "标题不能为空",
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
        toUsers: [
          {
            required: true,
            type: "array",
            message: "至少选择一个接收人",
            trigger: "blur"
          }
        ]
      },
      userOption: []
    };
  },
  methods: {
    ...mapActions("sys/message", ["create"]),
    ...mapActions("sys/user", {
      getUserList: "getList"
    }),
    init() {
      this.form.title = "";
      this.form.content = "";
      this.form.extFields = {};
      this.form.toUsers = [];
      this.form.note = "";
      this.visible = true;
      this.getUserList({}).then(res => {
        this.userOption = res.list;
      });
    },
    handleSubmit() {
      let self = this;
      self.$refs.form.validate(valid => {
        if (valid) {
          self
            .create({
              title: self.form.title,
              content: self.form.content,
              extFields: self.form.extFields,
              toUsers: self.form.toUsers,
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