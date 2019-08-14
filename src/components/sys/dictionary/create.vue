<template>
  <Modal v-model="visible" title="添加字典" width="800">
    <Form ref="form" :model="form" :rules="rules" :label-width="100">
      <FormItem label="名称" prop="name">
        <Input v-model="form.name" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="代码" prop="code">
        <Input v-model="form.code" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="类型" prop="type">
        <Select v-model="form.type" placeholder="请选择类型" style="width: 300px">
          <Option
            v-for="(item,index) in $getDictOptions('DICT_TYPE')"
            :key="index"
            :value="item.code"
          >{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="选项" style="margin-left: 1px;">
        <Table border :columns="columns" :data="form.options"></Table>
        <br />
        <Button type="dashed" @click="handleAddData">
          <Icon type="plus"></Icon>添加选项
        </Button>
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
        type: "",
        options: [],
        priority: 0,
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
        code: [
          {
            required: true,
            validator: validateCode,
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "类型不能为空",
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
      },
      columns: [
        {
          title: "名称",
          align: "center",
          render: (h, params) => {
            let self = this;
            return h("Input", {
              props: {
                value: params.row.name,
                placeholder: "Enter something..."
              },
              style: {
                width: "80%"
              },
              on: {
                "on-blur": function(event) {
                  self.form.options[params.index].name = event.target.value;
                }
              }
            });
          }
        },
        {
          title: "代码",
          align: "center",
          render: (h, params) => {
            let self = this;
            return h("Input", {
              props: {
                value: params.row.code,
                placeholder: "Enter something..."
              },
              style: {
                width: "80%"
              },
              on: {
                "on-blur": function(event) {
                  self.form.options[params.index].code = event.target.value;
                }
              }
            });
          }
        },
        {
          title: "操作",
          width: 180,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("Button", {
                props: {
                  type: "text",
                  size: "small",
                  icon: "md-arrow-dropup-circle"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.handleUpData(params.index);
                  }
                }
              }),
              h("Button", {
                props: {
                  type: "text",
                  size: "small",
                  icon: "md-arrow-dropdown-circle"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.handleDownData(params.index);
                  }
                }
              }),
              h("Button", {
                props: {
                  type: "text",
                  size: "small",
                  icon: "md-close-circle"
                },
                on: {
                  click: () => {
                    this.handleDelData(params.index);
                  }
                }
              })
            ]);
          }
        }
      ]
    };
  },
  methods: {
    ...mapActions("sys/dictionary", ["create", "getList"]),
    init() {
      this.form.name = "";
      this.form.code = "";
      this.form.type = "1";
      this.form.options = [];
      this.form.priority = 0;
      this.form.note = "";
      this.visible = true;
    },
    handleAddData() {
      this.form.options.push({
        name: "",
        code: ""
      });
    },
    handleUpData(index) {
      if (index > 0) {
        let array = this.form.options;
        let tempName = array[index - 1].name;
        let tempCode = array[index - 1].code;
        array[index - 1].name = array[index].name;
        array[index - 1].code = array[index].code;
        array[index].name = tempName;
        array[index].code = tempCode;
      }
    },
    handleDownData(index) {
      let array = this.form.options;
      if (index < array.length - 1) {
        let tempName = array[index + 1].name;
        let tempCode = array[index + 1].code;
        array[index + 1].name = array[index].name;
        array[index + 1].code = array[index].code;
        array[index].name = tempName;
        array[index].code = tempCode;
      }
    },
    handleDelData(index) {
      this.form.options.splice(index, 1);
    },
    handleSubmit() {
      let self = this;
      self.$refs.form.validate(valid => {
        if (valid) {
          self
            .create({
              name: self.form.name,
              code: self.form.code,
              type: self.form.type,
              options: self.form.options,
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