<style scoped>
</style>

<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="ios-list-box"></Icon>任务列表
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
          <Button v-if="$checkAccess('sys_task_log_page')" @click="handleLog">日志</Button>
          <Button
            v-if="$checkAccess('sys_task_create')"
            type="success"
            style="margin-left: 5px;"
            @click="handleCreate"
          >添加</Button>
        </Col>
      </Row>
      <Row>
        <Tag v-for="(item,index) in searchTag" :key="index">{{ item }}</Tag>
      </Row>
      <Row style="margin-top:12px;" :gutter="1">
        <Table border :columns="columns" :data="pageList" :loading="pageLoading"></Table>
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
        <FormItem label="Bean">
          <Input
            v-model="searchForm.bean"
            clearable
            placeholder="Enter something..."
            style="width: 300px"
          ></Input>
        </FormItem>
        <FormItem label="状态">
          <RadioGroup v-model="searchForm.state" type="button">
            <Radio
              v-for="(item,index) in $getDictOptions('TASK_STATE')"
              :key="index"
              :label="item.code"
            >{{ item.name }}</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
    <TaskCreate ref="createModal" @callback="getData"></TaskCreate>
    <TaskUpdate ref="updateModal" @callback="getData"></TaskUpdate>
    <TaskDetail ref="detailModal"></TaskDetail>
  </div>
</template>
<script>
import TaskCreate from "_c/sys/task/create";
import TaskUpdate from "_c/sys/task/update";
import TaskDetail from "_c/sys/task/detail";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "sys_task",
  components: {
    TaskCreate,
    TaskUpdate,
    TaskDetail
  },
  data() {
    return {
      searchVisible: false,
      searchForm: {
        name: "",
        bean: "",
        state: ""
      },
      searchTag: [],
      columns: [
        {
          title: "名称",
          key: "name"
        },
        {
          title: "Bean",
          key: "bean"
        },
        {
          title: "Cron",
          key: "cron"
        },
        {
          title: "状态",
          render: (h, params) => {
            return h(
              "span",
              this.$tranDictName("TASK_STATE", params.row.state)
            );
          }
        },
        {
          title: "操作",
          width: 230,
          align: "center",
          render: (h, params) => {
            let array = [];
            if (this.$checkAccess("sys_task_detail")) {
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
            if (this.$checkAccess("sys_task_update")) {
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
            if (this.$checkAccess("sys_task_delete")) {
              array.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
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
            let operate = [];
            if (this.$checkAccess("sys_task_execute")) {
              operate.push(h("DropdownItem", { props: { name: "2" } }, "执行"));
            }
            if (
              this.$checkAccess("sys_task_start") &&
              params.row.state === "0"
            ) {
              operate.push(h("DropdownItem", { props: { name: "1" } }, "启动"));
            }
            if (
              this.$checkAccess("sys_task_stop") &&
              params.row.state === "1"
            ) {
              operate.push(h("DropdownItem", { props: { name: "0" } }, "停止"));
            }
            if (operate.length > 0) {
              array.push(
                h(
                  "Dropdown",
                  {
                    props: {
                      transfer: true
                    },
                    on: {
                      "on-click": name => {
                        this.handleMore(params.row, name);
                      }
                    }
                  },
                  [
                    h(
                      "Button",
                      {
                        props: {
                          type: "default",
                          size: "small"
                        }
                      },
                      [
                        "控制",
                        h("Icon", {
                          props: {
                            type: "md-arrow-dropdown"
                          }
                        })
                      ]
                    ),
                    h(
                      "DropdownMenu",
                      {
                        slot: "list"
                      },
                      operate
                    )
                  ]
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
    ...mapGetters("sys/task", [
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
    ...mapActions("sys/task", ["getData", "delete", "operate"]),
    ...mapMutations("sys/task", ["setPageNum", "setPageRows", "setPageFilter"]),
    init() {
      this.getData();
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
      if (this.searchForm.bean.trim() !== "") {
        filter.bean = this.searchForm.bean.trim();
        this.searchTag.push("Bean：" + this.searchForm.bean.trim());
      }
      if (this.searchForm.state !== "") {
        filter.state = this.searchForm.state;
        this.searchTag.push(
          "状态：" + this.$tranDictName("TASK_STATE", this.searchForm.state)
        );
      }
      this.setPageFilter(filter);
      this.setPageNum(1);
      this.getData();
    },
    handleRefresh() {
      this.searchTag = [];
      this.searchForm.name = "";
      this.searchForm.bean = "";
      this.searchForm.state = "";
      this.setPageFilter({});
      this.setPageNum(1);
      this.getData();
    },
    handleLog() {
      this.$router.push({
        name: "sys_task_log"
      });
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
    handleMore(row, name) {
      let self = this;
      self
        .operate({
          id: row.id,
          command: name
        })
        .then(res => {
          if (res.err_code === 0) {
            self.$Message.success("操作成功");
            self.getData();
          } else {
            self.$Message.error(res.err_msg);
          }
        });
    },
    handleDelete(row) {
      let self = this;
      self.$Modal.confirm({
        title: "确认删除",
        content: "<p>确认要把当前角色删除吗？</p>",
        loading: true,
        onOk: () => {
          self.delete(row.id).then(res => {
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
