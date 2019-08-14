<template>
  <div>
    <Modal v-model="visible" title="添加用户">
      <Form ref="form" :model="form" :rules="rules" :label-width="100">
        <FormItem label="用户头像" prop="avatar">
          <Avatar icon="ios-person" size="large" :src="form.avatar" @click.native="openCropperModal" />
        </FormItem>
        <FormItem label="用户昵称" prop="nickName">
          <Input v-model="form.nickName" placeholder="Enter something..." style="width: 300px"></Input>
        </FormItem>
        <FormItem label="登录账号" prop="userName">
          <Input v-model="form.userName" placeholder="Enter something..." style="width: 300px"></Input>
        </FormItem>
        <FormItem label="登录密码" prop="password">
          <Input
            type="password"
            v-model="form.password"
            placeholder="Enter something..."
            style="width: 300px"
          ></Input>
        </FormItem>
        <FormItem label="确认密码" prop="password2">
          <Input
            type="password"
            v-model="form.password2"
            placeholder="Enter something..."
            style="width: 300px"
          ></Input>
        </FormItem>
        <FormItem label="角色配置">
          <Select v-model="form.roles" multiple placeholder="请选择类型" style="width: 300px">
            <Option
              v-for="(item,index) in roleOptions"
              :key="index"
              :value="item.id"
            >{{ item.name }}</Option>
          </Select>
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
        <FormItem label="说明">
          <Input
            v-model="form.note"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
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
    <upload-cropper
      ref="cropperModal"
      @callback="updateAvatar"
    ></upload-cropper>
  </div>
</template>

<script>
import UploadCropper from "@/components/upload/cropper";
import { mapActions } from "vuex";
export default {
  components: {
    UploadCropper
  },
  data() {
    const validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("登录账号不能为空"));
      } else {
        if (/^[a-zA-Z0-9_]{3,16}$/.test(value)) {
          this.getList({ userName: value }).then(res => {
            if (res.list.length === 0) {
              callback();
            } else {
              callback(new Error("登录账号被使用"));
            }
          });
        } else {
          callback(new Error("登录账号必须为3~16位数字、字母字符串"));
        }
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("登录密码不能为空"));
      } else {
        if (value.length >= 6 && value.length <= 10) {
          callback();
        } else {
          callback(new Error("登录密码的长度必须为6~10位"));
        }
      }
    };
    const validatePassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("确认密码不能为空"));
      } else {
        if (this.form.password === value) {
          callback();
        } else {
          callback(new Error("确认密码和登录账号不一致"));
        }
      }
    };
    return {
      visible: false,
      form: {
        avatar: "",
        nickName: "",
        userName: "",
        password: "",
        password2: "",
        state: "",
        note: "",
        privilege: {},
        extFields: {},
        roles: []
      },
      rules: {
        avatar: [
          {
            required: true,
            message: "头像不能为空",
            trigger: "blur"
          }
        ],
        nickName: [
          {
            required: true,
            message: "昵称不能为空",
            trigger: "blur"
          }
        ],
        userName: [
          {
            required: true,
            validator: validateUserName,
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            validator: validatePassword,
            trigger: "blur"
          }
        ],
        password2: [
          {
            required: true,
            validator: validatePassword2,
            trigger: "blur"
          }
        ]
      },
      roleOptions: []
    };
  },
  methods: {
    ...mapActions("sys/user", ["create", "getList"]),
    ...mapActions("sys/role", {
      getRoleList: "getList"
    }),
    init() {
      this.getRoleList({}).then(res => {
        this.roleOptions = res.list;
      });
      this.form.avatar = "";
      this.form.nickName = "";
      this.form.userName = "";
      this.form.password = "";
      this.form.password2 = "";
      this.form.state = "1";
      this.form.note = "";
      this.form.roles = [];
      this.visible = true;
    },
    openCropperModal() {
      this.$refs.cropperModal.init();
    },
    updateAvatar(url) {
      this.form.avatar = url;
    },
    handleSubmit() {
      let self = this;
      self.$refs.form.validate(valid => {
        if (valid) {
          self
            .create({
              avatar: self.form.avatar,
              nickName: self.form.nickName,
              userName: self.form.userName,
              password: self.form.password,
              state: self.form.state,
              note: self.form.note,
              roles: self.form.roles,
              privilege: self.form.privilege,
              extFields: self.form.extFields
            })
            .then(res => {
              if (res.err_code === 0) {
                self.$emit("callback");
                this.visible = false;
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