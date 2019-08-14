<style scoped>
</style>

<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="ios-list-box"></Icon>资源列表
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
        </Col>
        <Col span="12" style="text-align:right;">
          <Button v-if="$checkAccess('sys_resource_create')" type="success" @click="handleCreate">添加</Button>
          <Button
            v-if="$checkAccess('sys_resource_delete')"
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
        <FormItem label="代码">
          <Input
            v-model="searchForm.code"
            clearable
            placeholder="Enter something..."
            style="width: 300px"
          ></Input>
        </FormItem>
        <FormItem label="状态">
          <RadioGroup v-model="searchForm.state" type="button">
            <Radio
              v-for="(item,index) in $getDictOptions('USE_STATE')"
              :key="index"
              :label="item.code"
            >{{ item.name }}</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
    <ResourceCreate ref="createModal" @callback="getData"></ResourceCreate>
    <ResourceUpdate ref="updateModal" @callback="getData"></ResourceUpdate>
    <ResourceDetail ref="detailModal"></ResourceDetail>
  </div>
</template>
<script>
import ResourceCreate from "_c/sys/resource/create";
import ResourceUpdate from "_c/sys/resource/update";
import ResourceDetail from "_c/sys/resource/detail";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "sys_resource",
  components: {
    ResourceCreate,
    ResourceUpdate,
    ResourceDetail
  },
  data() {
    return {
      deleteBatch: false,
      searchVisible: false,
      searchForm: {
        name: "",
        code: "",
        state: ""
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
          title: "代码",
          key: "code"
        },
        {
          title: "路径",
          key: "path"
        },
        {
          title: "方法",
          render: (h, params) => {
            return h(
              "span",
              this.$tranDictName("REQUEST_METHOD", params.row.method)
            );
          }
        },
        {
          title: "状态",
          render: (h, params) => {
            return h("span", this.$tranDictName("USE_STATE", params.row.state));
          }
        },
        {
          title: "操作",
          width: 180,
          align: "center",
          render: (h, params) => {
            let array = [];
            if (this.$checkAccess("sys_resource_detail")) {
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
            if (this.$checkAccess("sys_resource_update")) {
              array.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "warning",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.handleUpdate(params.row);
                      }
                    }
                  },
                  "修改"
                )
              );
            }
            if (this.$checkAccess("sys_resource_delete")) {
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
    ...mapGetters("sys/resource", [
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
    ...mapActions("sys/resource", ["getData", "delete"]),
    ...mapMutations("sys/resource", [
      "setPageNum",
      "setPageRows",
      "setPageFilter"
    ]),
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
      if (this.searchForm.name.trim() !== "") {
        filter.name = this.searchForm.name.trim();
        this.searchTag.push("名称：" + this.searchForm.name.trim());
      }
      if (this.searchForm.code.trim() !== "") {
        filter.code = this.searchForm.code.trim();
        this.searchTag.push("代码：" + this.searchForm.code.trim());
      }
      if (this.searchForm.state !== "") {
        filter.state = this.searchForm.state;
        this.searchTag.push(
          "状态：" + this.$tranDictName("USE_STATE", this.searchForm.state)
        );
      }
      this.setPageFilter(filter);
      this.setPageNum(1);
      this.getData();
    },
    handleRefresh() {
      this.searchTag = [];
      this.searchForm.name = "";
      this.searchForm.code = "";
      this.searchForm.state = "";
      this.setPageFilter({});
      this.setPageNum(1);
      this.getData();
    },
    handleCreate() {
      this.$refs.createModal.init();
    },
    handleUpdate(row) {
      this.$refs.updateModal.init(row.id);
    },
    handleDetail(row) {
      this.$refs.detailModal.init(row.id);
    },
    handleDelete(row) {
      let self = this;
      self.$Modal.confirm({
        title: "确认删除",
        content: "<p>确认要把当前接口删除吗？</p>",
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
        content: "<p>确认要把勾选的全部接口删除吗？</p>",
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
