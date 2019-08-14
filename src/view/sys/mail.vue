<style scoped>
</style>

<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="ios-list-box"></Icon>邮件消息
      </p>
      <Row>
        <Col span="12">
          <Input
            v-model="searchForm.subject"
            clearable
            placeholder="请输入主题搜搜..."
            style="width: 200px; margin-right: 10px;"
          />
          <Button type="primary" shape="circle" icon="ios-search" @click="handleSearch"></Button>
          <Button type="text" size="small" icon="ios-funnel" @click="handleFilter"></Button>
          <Button type="text" size="small" icon="ios-refresh-circle" @click="handleRefresh"></Button>
          <Button
            v-if="$checkAccess('sys_mail_config')"
            @click="handleConfig"
            style="margin-left: 20px;"
          >设置</Button>
        </Col>
        <Col span="12" style="text-align:right;">
          <Button v-if="$checkAccess('sys_mail_send')" type="success" @click="handleSend">发送</Button>
          <Button
            v-if="$checkAccess('sys_mail_delete')"
            type="error"
            style="margin-left: 5px;"
            @click="handleDeleteBatch"
            :disabled="!deleteBatch"
          >删除</Button>
        </Col>
      </Row>
      <Row>
        <Tag v-for="(item,index) in searchTag" :key="index">{{ item }}</Tag>
      </Row>
      <Row style="margin-top:12px;" :gutter="1">
        <Table
          border
          ref="selection"
          :columns="columns"
          :data="pageList"
          :loading="pageLoading"
          @on-selection-change="handleSelect"
        ></Table>
      </Row>
      <Row style="margin-top:10px;">
        <Page
          :current="pageNum"
          :total="pageTotal"
          :page-size="pageRows"
          show-sizer
          @on-change="handleChangePage"
          @on-page-size-change="handleChangePageSize"
        ></Page>
      </Row>
    </Card>
    <Modal title="高级搜索" v-model="searchVisible" @on-ok="handleSearch">
      <Form ref="searchForm" :model="searchForm" :label-width="100">
        <FormItem label="主题">
          <Input
            v-model="searchForm.subject"
            clearable
            placeholder="Enter something..."
            style="width: 300px"
          ></Input>
        </FormItem>
        <FormItem label="状态">
          <Select v-model="searchForm.state" clearable style="width:300px">
            <Option
              v-for="(item,index) in $getDictOptions('MAIL_STATE')"
              :value="item.code"
              :key="index"
            >{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="日期">
          <DatePicker
            v-model="searchForm.daterange"
            type="daterange"
            placeholder="Select date"
            style="width: 300px"
          ></DatePicker>
        </FormItem>
      </Form>
    </Modal>
    <MailSend ref="sendModal" @callback="getData"></MailSend>
    <MailDetail ref="detailModal"></MailDetail>
    <MailConfig ref="configModal"></MailConfig>
  </div>
</template>
<script>
import MailSend from "_c/sys/mail/send";
import MailDetail from "_c/sys/mail/detail";
import MailConfig from "_c/sys/mail/config";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "sys_mail",
  components: {
    MailSend,
    MailDetail,
    MailConfig
  },
  data() {
    return {
      deleteBatch: false,
      searchVisible: false,
      searchForm: {
        subject: "",
        state: "",
        daterange: null
      },
      searchTag: [],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "主题",
          align: "center",
          key: "subject"
        },
        {
          title: "接收",
          align: "center",
          render: (h, params) => {
            let tags = [];
            params.row.toSite.forEach(item => {
              tags.push(
                h(
                  "Tag",
                  {
                    props: {
                      type: "border",
                      color: "blue"
                    }
                  },
                  item
                )
              );
            });
            return h("div", tags);
          }
        },
        {
          title: "状态",
          align: "center",
          render: (h, params) => {
            let array = [];
            array.push(
              h("span", this.$tranDictName("MAIL_STATE", params.row.state))
            );
            if (params.row.state === "-1") {
              array.push(
                h(
                  "Tag",
                  {
                    props: { color: "error" },
                    style: {
                      marginLeft: "5px"
                    }
                  },
                  `${params.row.counter}次`
                )
              );
            }
            return h("div", array);
          }
        },
        {
          title: "时间",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              this.$moment(params.row.createTime).format("YYYY-MM-DD HH:mm")
            );
          }
        },
        {
          title: "操作",
          width: 180,
          align: "center",
          render: (h, params) => {
            let array = [];
            if (
              this.$checkAccess("sys_mail_cancel") &&
              (params.row.state === "0" ||
                (params.row.state === "-1" && params.row.counter < 3))
            ) {
              array.push(
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.handleCancel(params.row);
                      }
                    }
                  },
                  "撤销"
                )
              );
            }
            if (
              this.$checkAccess("sys_mail_retry") &&
              (params.row.state === "2" ||
                (params.row.state === "-1" && params.row.counter === 3))
            ) {
              array.push(
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.handleRetry(params.row);
                      }
                    }
                  },
                  "重发"
                )
              );
            }
            if (this.$checkAccess("sys_mail_detail")) {
              array.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "info",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.handleDetail(params.row);
                      }
                    }
                  },
                  "详情"
                )
              );
            }
            if (this.$checkAccess("sys_mail_delete")) {
              array.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.handleDelete(params.row);
                      }
                    }
                  },
                  "删除"
                )
              );
            }
            return h("div", array);
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters("sys/mail", [
      "pageFilter",
      "pageNum",
      "pageRows",
      "pageList",
      "pageTotal",
      "pageLoading"
    ])
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions("sys/mail", ["getData", "update", "delete"]),
    ...mapMutations("sys/mail", ["setPageNum", "setPageRows", "setPageFilter"]),
    init() {
      this.getData();
    },
    handleSelect() {
      if (this.$refs.selection.getSelection().length > 0) {
        this.deleteBatch = true;
      } else {
        this.deleteBatch = false;
      }
    },
    handleChangePage(val) {
      this.setPageNum(val);
      this.getData();
    },
    handleChangePageSize(val) {
      this.setPageNum(1);
      this.setPageRows(val);
      this.getData();
    },
    handleFilter() {
      this.searchVisible = true;
    },
    handleSearch() {
      this.searchTag = [];
      let filter = {};
      if (this.searchForm.subject.trim() !== "") {
        filter.subject = this.searchForm.subject.trim();
        this.searchTag.push("主题：" + this.searchForm.subject.trim());
      }
      if (this.searchForm.state.trim() !== "") {
        filter.state = this.searchForm.state.trim();
        this.searchTag.push(
          "状态：" +
            this.$tranDictName("MAIL_STATE", this.searchForm.state.trim())
        );
      }
      if (this.searchForm.daterange) {
        if (this.searchForm.daterange[0]) {
          filter.dateRange = this.searchForm.daterange;
          this.searchTag.push(
            "日期：" +
              this.$moment(this.searchForm.daterange[0]).format("YYYY-MM-DD") +
              "至" +
              this.$moment(this.searchForm.daterange[1]).format("YYYY-MM-DD")
          );
        }
      }
      this.setPageFilter(filter);
      this.setPageNum(1);
      this.getData();
    },
    handleRefresh() {
      this.searchTag = [];
      this.searchForm.subject = "";
      this.searchForm.state = "";
      this.searchForm.daterange = null;
      this.setPageFilter({});
      this.setPageNum(1);
      this.getData();
    },
    handleSend() {
      this.$refs.sendModal.init();
    },
    handleConfig() {
      this.$refs.configModal.init();
    },
    handleDetail(row) {
      this.$refs.detailModal.init(row.id);
    },
    handleRetry(row) {
      let self = this;
      self.$Modal.confirm({
        title: "确认重发",
        content: "<p>确认要重发当前邮件吗？</p>",
        loading: true,
        onOk: () => {
          self
            .update({
              id: row.id,
              data: {
                retry: true
              }
            })
            .then(res => {
              self.$Modal.remove();
              if (res.err_code === 0) {
                self.$Message.info("操作成功");
                self.getData();
              } else {
                self.$Message.error(res.err_msg);
              }
            });
        }
      });
    },
    handleCancel(row) {
      let self = this;
      self.$Modal.confirm({
        title: "确认撤销",
        content: "<p>确认要撤销当前邮件吗？</p>",
        loading: true,
        onOk: () => {
          self
            .update({
              id: row.id,
              data: {
                cancel: true
              }
            })
            .then(res => {
              self.$Modal.remove();
              if (res.err_code === 0) {
                self.$Message.info("操作成功");
                self.getData();
              } else {
                self.$Message.error(res.err_msg);
              }
            });
        }
      });
    },
    handleDelete(row) {
      let self = this;
      self.$Modal.confirm({
        title: "确认删除",
        content: "<p>确认要把当前记录删除吗？</p>",
        loading: true,
        onOk: () => {
          self.delete([row.id]).then(res => {
            self.$Modal.remove();
            if (res.err_code === 0) {
              self.$Message.info("删除成功");
              if (self.pageNum > 1 && self.pageList.length === 1) {
                self.setPageNum(self.pageNum - 1);
              }
              self.getData();
            } else {
              self.$Message.error(res.err_msg);
            }
          });
        }
      });
    },
    handleDeleteBatch() {
      let self = this;
      self.$Modal.confirm({
        title: "确认删除",
        content: "<p>确认要把勾选的全部记录删除吗？</p>",
        loading: true,
        onOk: () => {
          let ids = self.$refs.selection.getSelection().map(item => {
            return item.id;
          });
          self.delete(ids).then(res => {
            self.$Modal.remove();
            if (res.err_code === 0) {
              self.$Message.info("删除成功");
              if (self.pageNum > 1 && self.pageList.length === 1) {
                self.setPageNum(self.pageNum - 1);
              }
              self.getData();
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
