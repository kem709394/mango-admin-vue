<style scoped>
</style>

<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="ios-list-box"></Icon>文件列表
      </p>
      <Row>
        <Col span="12">
          <Input
            v-model="searchForm.name"
            clearable
            placeholder="请输入名称搜搜..."
            style="width: 200px; margin-right: 10px;"
          />
          <Button type="primary" shape="circle" icon="ios-search" @click="handleSearch"></Button>
          <Button type="text" size="small" icon="ios-funnel" @click="handleFilter"></Button>
          <Button type="text" size="small" icon="ios-refresh-circle" @click="handleRefresh"></Button>
          <Button
            v-if="$checkAccess('sys_file_config')"
            @click="handleConfig"
            style="margin-left: 20px;"
          >设置</Button>
        </Col>
        <Col span="12" style="text-align:right;">
          <Upload
            v-if="$checkAccess('sys_file_upload')"
            ref="upload"
            :action="action"
            :headers="headers"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :on-error="handleError"
            style="display: inline;"
          >
            <Button type="success">上传</Button>
          </Upload>
          <Button
            v-if="$checkAccess('sys_file_delete')"
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
        <FormItem label="名称">
          <Input
            v-model="searchForm.name"
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
    <FileDetail ref="detailModal"></FileDetail>
    <FileConfig ref="configModal"></FileConfig>
  </div>
</template>
<script>
import FileDetail from "_c/sys/file/detail";
import FileConfig from "_c/sys/file/config";
import { getToken, getApiBaseUrl } from "@/libs/util";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "sys_file",
  components: {
    FileDetail,
    FileConfig
  },
  data() {
    return {
      action: "",
      headers: {},
      deleteBatch: false,
      searchVisible: false,
      searchForm: {
        name: "",
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
          title: "名称",
          key: "name"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "大小",
          render: (h, params) => {
            if (params.row.size > 1024) {
              if (params.row.size > 1024 * 1024) {
                return h(
                  "span",
                  (params.row.size / (1024 * 1024)).toFixed(2) + "MB"
                );
              } else {
                return h("span", (params.row.size / 1024).toFixed(1) + "KB");
              }
            } else {
              return h("span", params.row.size + "B");
            }
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
            if (this.$checkAccess("sys_file_detail")) {
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
            if (this.$checkAccess("sys_file_delete")) {
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
    ...mapGetters("sys/file", [
      "pageFilter",
      "pageNum",
      "pageRows",
      "pageList",
      "pageTotal",
      "pageLoading"
    ])
  },
  created() {
    this.headers.Token = getToken();
    this.action = `${getApiBaseUrl()}/v1/sys/file`;
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions("sys/file", ["getData", "delete"]),
    ...mapMutations("sys/file", ["setPageNum", "setPageRows", "setPageFilter"]),
    init() {
      this.getData();
    },
    handleSuccess(res, file) {
      this.$Message.success("上传成功！");
      this.getData();
    },
    handleError() {
      this.$Message.error("上传失败！");
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
      if (this.searchForm.name.trim() !== "") {
        filter.name = this.searchForm.name.trim();
        this.searchTag.push("名称：" + this.searchForm.name.trim());
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
      this.searchForm.name = "";
      this.searchForm.daterange = null;
      this.setPageFilter({});
      this.setPageNum(1);
      this.getData();
    },
    handleDetail(row) {
      this.$refs.detailModal.init(row.id);
    },
    handleConfig() {
      this.$refs.configModal.init();
    },
    handleDelete(row) {
      let self = this;
      self.$Modal.confirm({
        title: "确认删除",
        content: "<p>确认要把当前文件删除吗？</p>",
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
        content: "<p>确认要把勾选的全部文件删除吗？</p>",
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
