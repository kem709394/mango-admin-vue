<style scoped>
</style>

<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="ios-list-box"></Icon>异常日志
      </p>
      <Row>
        <Col span="12">
          <Input
            v-model="searchForm.path"
            clearable
            placeholder="请输入路径搜搜..."
            style="width: 200px; margin-right: 10px;"
          />
          <Button type="primary" shape="circle" icon="ios-search" @click="handleSearch"></Button>
          <Button type="text" size="small" icon="ios-funnel" @click="handleFilter"></Button>
          <Button type="text" size="small" icon="ios-refresh-circle" @click="handleRefresh"></Button>
          <Button
            v-if="$checkAccess('sys_error_log_close') && configState.error"
            style="margin-left: 20px;"
            @click="handleClose"
          >关闭</Button>
          <Button
            v-if="$checkAccess('sys_error_log_open') && !configState.error"
            style="margin-left: 20px;"
            @click="handleOpen"
          >开启</Button>
        </Col>
        <Col span="12" style="text-align:right;">
          <Button
            v-if="$checkAccess('sys_error_log_delete')"
            type="error"
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
        <FormItem label="路径">
          <Input
            v-model="searchForm.path"
            clearable
            placeholder="Enter something..."
            style="width: 300px"
          ></Input>
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
    <ErrorLogDetail ref="detailModal"></ErrorLogDetail>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import ErrorLogDetail from "_c/sys/error-log/detail";
export default {
  name: "sys_error_log",
  components: {
    ErrorLogDetail
  },
  data() {
    return {
      deleteBatch: false,
      searchVisible: false,
      searchForm: {
        path: "",
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
          title: "路径",
          key: "path"
        },
        {
          title: "方法",
          key: "method"
        },
        {
          title: "地址",
          key: "ipAddress"
        },
        {
          title: "设备",
          render: (h, params) => {
            return h(
              "span",
              `${params.row.device.browser}(${params.row.device.system})`
            );
          }
        },
        {
          title: "时间",
          render: (h, params) => {
            return h(
              "span",
              this.$moment(params.row.createTime).format("YYYY-MM-DD HH:mm")
            );
          }
        },
        {
          title: "操作",
          width: 140,
          align: "center",
          render: (h, params) => {
            let array = [];
            if (this.$checkAccess("sys_error_log_detail")) {
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
            if (this.$checkAccess("sys_error_log_delete")) {
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
      ],
      configState: {}
    };
  },
  computed: {
    ...mapGetters("sys/error_log", [
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
    ...mapActions("sys/error_log", ["getData", "delete"]),
    ...mapActions("sys/config", {
      getConfig: "getContent",
      updateConfig: "updateContent"
    }),
    ...mapMutations("sys/error_log", [
      "setPageNum",
      "setPageRows",
      "setPageFilter"
    ]),
    init() {
      this.getData();
      this.getConfig("LOG_CONFIG").then(res => {
        this.configState = res.info;
      });
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
      if (this.searchForm.path.trim() !== "") {
        filter.path = this.searchForm.path.trim();
        this.searchTag.push("路径：" + this.searchForm.path.trim());
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
      this.searchForm.path = "";
      this.searchForm.daterange = null;
      this.setPageFilter({});
      this.setPageNum(1);
      this.getData();
    },
    handleOpen() {
      let self = this;
      self.configState.error = true;
      self
        .updateConfig({
          code: "LOG_CONFIG",
          content: self.configState
        })
        .then(res => {
          if (res.err_code === 0) {
            self.$Message.info("开启成功");
          } else {
            self.configState.error = false;
            self.$Message.error(res.err_msg);
          }
        });
    },
    handleClose() {
      let self = this;
      self.configState.error = false;
      self
        .updateConfig({
          code: "LOG_CONFIG",
          content: self.configState
        })
        .then(res => {
          if (res.err_code === 0) {
            self.$Message.info("关闭成功");
          } else {
            self.configState.error = true;
            self.$Message.error(res.err_msg);
          }
        });
    },
    handleDetail(row) {
      this.$refs.detailModal.init(row.id);
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
