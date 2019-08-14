<template>
  <Modal v-model="visible" title="修改菜单">
    <Form ref="form" :model="form" :rules="rules" :label-width="100">
      <FormItem label="名称" prop="name">
        <Input v-model="form.name" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="代码" prop="code">
        <Input v-model="form.code" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="类型">
        <RadioGroup v-model="form.type" type="button">
          <Radio
            v-for="(item,index) in $getDictOptions('MENU_TYPE')"
            :key="index"
            :label="item.code"
          >{{item.name}}</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="上级" prop="parent">
        <Poptip v-model="parentVisible" placement="bottom-start">
          <Input v-model="parentName" readonly style="width: 300px"></Input>
          <div slot="content">
            <Tree :data="parentData" @on-select-change="changeParent"></Tree>
          </div>
        </Poptip>
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
        type: "1",
        parent: 0,
        priority: 0,
        state: "",
        note: "",
        extFields: {}
      },
      rules: {
        name: [
          {
            required: true,
            message: "名称不能为空",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            validator: validateCode,
            trigger: "blur"
          }
        ],
        priority: [
          {
            required: true,
            type: "number",
            message: "次序不能为空",
            trigger: "blur"
          }
        ]
      },
      parentName: "",
      parentData: [
        {
          id: 0,
          title: "根菜单",
          expand: true,
          children: []
        }
      ],
      parentVisible: false
    };
  },
  methods: {
    ...mapActions("sys/menu_function", ["getDetail", "update", "getList", "getTree"]),
    init(id) {
      this.getTree({ type: "1" }).then(res => {
        this.parentData[0].children = res.tree;
      });
      this.getDetail(id).then(res => {
        this.detail = res.info;
        this.form.name = this.detail.name;
        this.form.code = this.detail.code;
        this.form.type = this.detail.type;
        this.form.state = this.detail.state;
        this.form.extFields = this.detail.extFields;
        this.form.priority = this.detail.priority;
        this.form.note = this.detail.note;
        if (this.detail.parent) {
          this.form.parent = this.detail.parent.id;
          this.parentName = this.detail.parent.name;
        } else {
          this.form.parent = this.parentData[0].id;
          this.parentName = this.parentData[0].title;
        }
        this.visible = true;
      });
    },
    changeParent(data, item) {
      this.parentVisible = false;
      this.parentName = item.title;
      this.form.parent = item.id;
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
                type: self.form.type,
                parent: self.form.parent,
                state: self.form.state,
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