<style scoped>
</style>

<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="ios-list-box"></Icon>用户列表
      </p>
      <Row>
        <Col span="12">
          <Input
            v-model="searchForm.userName"
            clearable
            placeholder="请输入账号搜搜..."
            style="width: 200px; margin-right: 10px;"
          />
          <Button type="primary" shape="circle" icon="ios-search" @click="handleSearch"></Button>
          <Button type="text" size="small" icon="ios-funnel" @click="handleFilter"></Button>
          <Button type="text" size="small" icon="ios-refresh-circle" @click="handleRefresh"></Button>
        </Col>
        <Col span="12" style="text-align:right;">
          <Button v-if="$checkAccess('sys_user_create')" type="success" @click="handleCreate">添加</Button>
          <Button
            v-if="$checkAccess('sys_user_delete')"
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
        <FormItem label="账号">
          <Input
            v-model="searchForm.userName"
            clearable
            placeholder="Enter something..."
            style="width: 300px"
          ></Input>
        </FormItem>
        <FormItem label="昵称">
          <Input
            v-model="searchForm.nickName"
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
    <UserCreate ref="createModal" @callback="getData"></UserCreate>
    <UserUpdate ref="updateModal" @callback="getData"></UserUpdate>
    <UserDetail ref="detailModal"></UserDetail>
  </div>
</template>
<script>
import UserCreate from "_c/sys/user/create";
import UserUpdate from "_c/sys/user/update";
import UserDetail from "_c/sys/user/detail";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "sys_user",
  components: {
    UserCreate,
    UserUpdate,
    UserDetail
  },
  data() {
    return {
      deleteBatch: false,
      searchVisible: false,
      searchForm: {
        userName: "",
        nickName: "",
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
          title: "头像",
          align: "center",
          render: (h, params) => {
            return h("Avatar", {
              props: {
                src: params.row.avatar
              }
            });
          }
        },
        {
          title: "账号",
          key: "userName"
        },
        {
          title: "昵称",
          key: "nickName"
        },
        {
          title: "角色",
          render: (h, params) => {
            let tags = [];
            params.row.roles.forEach(item => {
              tags.push(
                h(
                  "Tag",
                  {
                    props: {
                      type: "border",
                      color: "blue"
                    }
                  },
                  item.name
                )
              );
            });
            return h("div", tags);
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
            if (this.$checkAccess("sys_user_detail")) {
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
            if (this.$checkAccess("sys_user_update")) {
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
            if (this.$checkAccess("sys_user_delete")) {
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
    ...mapGetters("sys/user", [
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
    ...mapActions("sys/user", ["getData", "delete"]),
    ...mapMutations("sys/user", ["setPageNum", "setPageRows", "setPageFilter"]),
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
      if (this.searchForm.userName.trim() !== "") {
        filter.userName = this.searchForm.userName.trim();
        this.searchTag.push("账号：" + this.searchForm.userName.trim());
      }
      if (this.searchForm.nickName.trim() !== "") {
        filter.nickName = this.searchForm.nickname.trim();
        this.searchTag.push("昵称：" + this.searchForm.nickName.trim());
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
      this.searchForm.nickName = "";
      this.searchForm.nickName = "";
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
        content: "<p>确认要把当前用户删除吗？</p>",
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
        content: "<p>确认要把勾选的全部用户删除吗？</p>",
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
