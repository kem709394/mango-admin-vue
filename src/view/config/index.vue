<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="ios-list-box"></Icon>个人设置
      </p>
      <Form :label-width="200">
        <FormItem label="头像">
          <Avatar size="large" :src="userInfo.avatar" />
          <Button size="large" type="text" icon="md-reverse-camera" @click="cropperImage"></Button>
        </FormItem>
        <FormItem label="昵称">
          {{ userInfo.nickName }}
          <Button size="large" type="text" icon="md-create" @click="editNickName"></Button>
        </FormItem>
        <FormItem label="账号">{{ userInfo.userName }}</FormItem>
        <FormItem label="角色">
          <Tag v-for="item in userInfo.roles" :key="item">{{item}}</Tag>
        </FormItem>
      </Form>
      <Row type="flex" justify="center">
        <Button @click="editPassword">修改密码</Button>
      </Row>
    </Card>
    <upload-cropper ref="cropperModal" @callback="updateAvatar"></upload-cropper>
    <nickname ref="nicknameModal" @callback="updateNickName"></nickname>
    <password ref="passwordModal" @callback="updatePassword"></password>
  </div>
</template>

<script>
import UploadCropper from "_c/upload/cropper";
import Nickname from "_c/config/nickname";
import Password from "_c/config/password";
import { mapActions } from "vuex";
export default {
  name: "config",
  components: {
    UploadCropper,
    Nickname,
    Password
  },
  computed: {
    userInfo() {
      return this.$store.state.auth.info;
    }
  },
  methods: {
    ...mapActions(["updateUserInfo"]),
    cropperImage() {
      this.$refs.cropperModal.init();
    },
    updateAvatar(url) {
      this.handleSubmit({
        avatar: url
      });
    },
    editNickName() {
      this.$refs.nicknameModal.init(this.userInfo.nickName);
    },
    updateNickName(val) {
      this.handleSubmit({
        nickName: val
      });
    },
    editPassword() {
      this.$refs.passwordModal.init();
    },
    updatePassword({ oldPassword, newPassword }) {
      this.handleSubmit({
        oldPassword: oldPassword,
        newPassword: newPassword
      });
    },
    handleSubmit(data) {
      let self = this;
      self.updateUserInfo(data).then(res => {
        if (res.err_code === 0) {
          self.$Message.success("操作成功");
        } else {
          self.$Message.error(res.err_msg);
        }
      });
    }
  }
};
</script>
