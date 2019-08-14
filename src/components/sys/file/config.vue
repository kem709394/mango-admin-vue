<template>
  <Modal v-model="visible" title="存储设置">
    <Form v-show="mode==='local'" ref="form1" :model="form1" :rules="rules1" :label-width="120">
      <FormItem label="方式">
        <RadioGroup v-model="mode" type="button">
          <Radio label="local">本地</Radio>
          <Radio label="aliyun">阿里云</Radio>
          <Radio label="qcloud">腾讯云</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="访问域名" prop="domain">
        <Input v-model="form1.domain" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="路径前缀" prop="pathPrefix">
        <Input v-model="form1.pathPrefix" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="存储目录" prop="storeDirectory">
        <Input v-model="form1.storeDirectory" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
    </Form>
    <Form v-show="mode==='aliyun'" ref="form2" :model="form2" :rules="rules2" :label-width="120">
      <FormItem label="方式">
        <RadioGroup v-model="mode" type="button">
          <Radio label="local">本地</Radio>
          <Radio label="aliyun">阿里云</Radio>
          <Radio label="qcloud">腾讯云</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="访问域名" prop="domain">
        <Input v-model="form2.domain" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="路径前缀" prop="pathPrefix">
        <Input v-model="form2.pathPrefix" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="Endpoint" prop="endpoint">
        <Input v-model="form2.endpoint" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="AccessKeyId" prop="accessKeyId">
        <Input v-model="form2.accessKeyId" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="AccessKeySecret" prop="accessKeySecret">
        <Input v-model="form2.accessKeySecret" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="BucketName" prop="bucketName">
        <Input v-model="form2.bucketName" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
    </Form>
    <Form v-show="mode==='qcloud'" ref="form3" :model="form3" :rules="rules3" :label-width="120">
      <FormItem label="方式">
        <RadioGroup v-model="mode" type="button">
          <Radio label="local">本地</Radio>
          <Radio label="aliyun">阿里云</Radio>
          <Radio label="qcloud">腾讯云</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="访问域名" prop="domain">
        <Input v-model="form3.domain" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="路径前缀" prop="pathPrefix">
        <Input v-model="form3.pathPrefix" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="AppId" prop="appId">
        <Input v-model="form3.appId" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="SecretId" prop="secretId">
        <Input v-model="form3.secretId" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="SecretKey" prop="secretKey">
        <Input v-model="form3.secretKey" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="Region" prop="region">
        <Input v-model="form3.region" placeholder="请填写内容..." style="width: 300px"></Input>
      </FormItem>
      <FormItem label="BucketName" prop="bucketName">
        <Input v-model="form3.bucketName" placeholder="请填写内容..." style="width: 300px"></Input>
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
      content: null,
      mode: "local",
      form1: {
        domain: "",
        pathPrefix: "",
        storeDirectory: ""
      },
      rules1: {
        domain: [
          {
            required: true,
            message: "访问域名不能为空",
            trigger: "blur"
          }
        ],
        storeDirectory: [
          {
            required: true,
            message: "存储目录不能为空",
            trigger: "blur"
          }
        ]
      },
      form2: {
        domain: "",
        pathPrefix: "",
        endpoint: "",
        accessKeyId: "",
        accessKeySecret: "",
        bucketName: ""
      },
      rules2: {
        domain: [
          {
            required: true,
            message: "访问域名不能为空",
            trigger: "blur"
          }
        ],
        endpoint: [
          {
            required: true,
            message: "Endpoint不能为空",
            trigger: "blur"
          }
        ],
        accessKeyId: [
          {
            required: true,
            message: "AccessKeyId不能为空",
            trigger: "blur"
          }
        ],
        accessKeySecret: [
          {
            required: true,
            message: "AccessKeySecret不能为空",
            trigger: "blur"
          }
        ],
        bucketName: [
          {
            required: true,
            message: "BucketName不能为空",
            trigger: "blur"
          }
        ]
      },
      form3: {
        domain: "",
        pathPrefix: "",
        appId: "",
        secretId: "",
        secretKey: "",
        region: "",
        bucketName: ""
      },
      rules3: {
        domain: [
          {
            required: true,
            message: "访问域名不能为空",
            trigger: "blur"
          }
        ],
        appId: [
          {
            required: true,
            message: "AppId不能为空",
            trigger: "blur"
          }
        ],
        secretId: [
          {
            required: true,
            message: "SecretId不能为空",
            trigger: "blur"
          }
        ],
        secretKey: [
          {
            required: true,
            message: "SecretKey不能为空",
            trigger: "blur"
          }
        ],
        region: [
          {
            required: true,
            message: "Region不能为空",
            trigger: "blur"
          }
        ],
        bucketName: [
          {
            required: true,
            message: "BucketName不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions("sys/config", ["getContent", "updateContent"]),
    init() {
      this.getContent("STORE_CONFIG").then(res => {
        this.content = res.info;
        this.mode = this.content.mode;
        if(this.mode === 'local'){
          this.form1.domain = this.content.local.domain;
          this.form1.pathPrefix = this.content.local.pathPrefix;
          this.form1.storeDirectory = this.content.local.storeDirectory;
        }else if(this.mode === 'aliyun'){
          this.form2.domain = this.content.aliyun.domain;
          this.form2.pathPrefix = this.content.aliyun.pathPrefix;
          this.form2.endpoint = this.content.aliyun.endpoint;
          this.form2.accessKeyId = this.content.aliyun.accessKeyId;
          this.form2.accessKeySecret = this.content.aliyun.accessKeySecret;
          this.form2.bucketName = this.content.aliyun.bucketName;
        }else if(this.mode === 'qcloud'){
          this.form3.domain = this.content.qcloud.domain;
          this.form3.pathPrefix = this.content.qcloud.pathPrefix;
          this.form3.appId = this.content.qcloud.appId;
          this.form3.secretId = this.content.qcloud.secretId;
          this.form3.secretKey = this.content.qcloud.secretKey;
          this.form3.region = this.content.qcloud.region;
          this.form3.bucketName = this.content.qcloud.bucketName;
        }
        this.visible = true;
      });
    },
    handleSubmit() {
      let self = this;
      if (self.mode === "local") {
        self.$refs.form1.validate(valid => {
          if (valid) {
            self
              .updateContent({
                code: "STORE_CONFIG",
                content: {
                  mode: "local",
                  local: self.form1
                }
              })
              .then(res => {
                if (res.err_code === 0) {
                  self.$Message.success("操作成功");
                  self.visible = false;
                } else {
                  self.$Message.error(res.err_msg);
                }
              });
          }
        });
      } else if (self.mode === "aliyun") {
        self.$refs.form2.validate(valid => {
          if (valid) {
            self
              .updateContent({
                code: "STORE_CONFIG",
                content: {
                  mode: "aliyun",
                  aliyun: self.form2
                }
              })
              .then(res => {
                if (res.err_code === 0) {
                  self.$Message.success("操作成功");
                  self.visible = false;
                } else {
                  self.$Message.error(res.err_msg);
                }
              });
          }
        });
      } else if (self.mode === "qcloud") {
        self.$refs.form3.validate(valid => {
          if (valid) {
            self
              .updateContent({
                code: "STORE_CONFIG",
                content: {
                  mode: "qcloud",
                  qcloud: self.form3
                }
              })
              .then(res => {
                if (res.err_code === 0) {
                  self.$Message.success("操作成功");
                  self.visible = false;
                } else {
                  self.$Message.error(res.err_msg);
                }
              });
          }
        });
      }
    }
  }
};
</script>