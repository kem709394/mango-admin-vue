<template>
  <Modal v-model="visible" title="修改消息">
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
      <FormItem v-if="detail" label="接收">
        <Avatar :src="detail.user.avatar"></Avatar>
        <span>{{ detail.user.userName }}</span>
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
import TagsInput from "@/components/tags-input";
export default {
  components: {
    TagsInput
  },
  data() {
    return {
      visible: false,
      detail: null,
      form: {
        title: "",
        content: "",
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
        ]
      }
    };
  },
  methods: {
    ...mapActions("sys/message", ["getDetail", "update"]),
    init(id) {
      this.getDetail(id).then(res => {
        this.detail = res.info;
        this.form.title = this.detail.title;
        this.form.content = this.detail.content;
        this.form.note = this.detail.note;
        this.form.extFields = this.detail.extFields;
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
                title: self.form.title,
                content: self.form.content,
                extFields: self.form.extFields,
                note: self.form.note
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