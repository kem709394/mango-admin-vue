<template>
  <Modal v-model="visible" title="修改资源">
    <Form ref="form" :model="form" :rules="rules" :label-width="100">
      <FormItem label="名称" prop="name">
        <Input v-model="form.name" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="代码" prop="code">
        <Input v-model="form.code" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="请求路径" prop="path">
        <Input v-model="form.path" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="访问方法" prop="method">
        <Select v-model="form.method" placeholder="请选择方法" style="width: 300px">
          <Option
            v-for="(item,index) in $getDictOptions('REQUEST_METHOD')"
            :key="index"
            :value="item.code"
          >{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem v-if="form.method==='GET'" label="映射类型">
        <Input v-model="form.mapClass" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem v-if="form.method==='GET'" label="可选字段">
        <tags-input v-model="form.attributes" />
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
import TagsInput from "@/components/tags-input";
export default {
  components: {
    TagsInput
  },
  data() {
    const validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("代码不能为空"));
      } else {
        if (this.detail.code === value) {
          callback();
        } else {
          this.getList({ code: value }).then(res => {
            if (res.list.length === 0) {
              callback();
            } else {
              callback(new Error("代码被使用"));
            }
          });
        }
      }
    };
    return {
      visible: false,
      detail: null,
      form: {
        name: "",
        code: "",
        path: "",
        method: "",
        mapClass: "",
        attributes: [],
        extFields: {},
        priority: 0,
        state: "",
        note: ""
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
        path: [
          {
            required: true,
            message: "访问路径不能为空",
            trigger: "blur"
          }
        ],
        method: [
          {
            required: true,
            message: "请求方法不能为空",
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
    ...mapActions("sys/resource", ["getDetail", "update", "getList"]),
    init(id) {
      this.getDetail(id).then(res => {
        this.detail = res.info;
        this.form.name = this.detail.name;
        this.form.code = this.detail.code;
        this.form.path = this.detail.path;
        this.form.method = this.detail.method;
        this.form.state = this.detail.state;
        this.form.mapClass = this.detail.mapClass;
        this.form.attributes = this.detail.attributes;
        this.form.extFields = this.detail.extFields;
        this.form.priority = this.detail.priority;
        this.form.note = this.detail.note;
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
                name: self.form.name,
                code: self.form.code,
                path: self.form.path,
                method: self.form.method,
                state: self.form.state,
                mapClass: self.form.mapClass,
                attributes: self.form.attributes,
                extFields: self.form.extFields,
                priority: self.form.priority,
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