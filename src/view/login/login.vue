<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <Form ref="form" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
            <FormItem prop="username">
              <Input v-model="form.username" placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="16" type="ios-person"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="14" type="md-lock"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem prop="captcha">
              <Row :gutter="10">
                <Col span="12">
                  <Input v-model="form.captcha" placeholder="请输入验证码">
                    <span slot="prepend">
                      <Icon :size="16" type="ios-checkmark-circle"></Icon>
                    </span>
                  </Input>
                </Col>
                <Col span="12" style="height: 32px;">
                  <img :src="captchaPath" @click="getCaptcha()" style="height: 33px;" />
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
          <!-- <p class="login-tip">输入任意用户名和密码即可</p> -->
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { getUUID } from "@/libs/tools";
import { getApiBaseUrl } from "@/libs/util";
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    const validateCaptcha = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("请输入5位验证码"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "root",
        password: "123456",
        captcha: "",
        session: ""
      },
      rules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        captcha: [
          { required: true, trigger: "blur", validator: validateCaptcha }
        ]
      },
      captchaPath: ""
    };
  },
  created() {
    this.getCaptcha();
  },
  methods: {
    ...mapActions(["handleLogin", "getUserInfo"]),
    ...mapMutations(["setSession"]),
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.handleLogin({
            username: this.form.username,
            password: this.form.password,
            captcha: this.form.captcha
          }).then(res => {
            if (res.err_code === 0) {
              this.getUserInfo().then(res => {
                this.$router.push({
                  name: this.$config.homeName
                });
              });
            } else {
              this.$Loading.error();
              this.$Message.error(res.err_msg);
              this.getCaptcha();
            }
          });
        }
      });
    },
    getCaptcha() {
      this.form.session = getUUID();
      this.captchaPath = `${getApiBaseUrl()}/auth/captcha.jpg?session=${
        this.form.session
      }`;
      this.setSession(this.form.session);
    }
  }
};
</script>

<style>
</style>
