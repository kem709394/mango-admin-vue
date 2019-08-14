<style scoped>
</style>

<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="ios-list-box"></Icon>字典列表
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
          <Button
            v-if="$checkAccess('sys_dictionary_create')"
            type="success"
            @click="handleCreate"
          >添加</Button>
          <Button
            v-if="$checkAccess('sys_dictionary_delete')"
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
        <FormItem label="类型">
          <RadioGroup v-model="searchForm.type" type="button">
            <Radio
              v-for="(item,index) in $getDictOptions('DICT_TYPE')"
              :key="index"
              :label="item.code"
            >{{ item.name }}</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
    <DictionaryCreate ref="createModal" @callback="getData"></DictionaryCreate>
    <DictionaryUpdate ref="updateModal" @callback="getData"></DictionaryUpdate>
    <DictionaryDetail ref="detailModal"></DictionaryDetail>
  </div>
</template>
<script>
import DictionaryCreate from "_c/sys/dictionary/create";
import DictionaryUpdate from "_c/sys/dictionary/update";
import DictionaryDetail from "_c/sys/dictionary/detail";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "sys_dictionary",
  components: {
    DictionaryCreate,
    DictionaryUpdate,
    DictionaryDetail
  },
  data() {
    return {
      deleteBatch: false,
      searchVisible: false,
      searchForm: {
        name: "",
        code: "",
        type: ""
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
          title: "类型",
          render: (h, params) => {
            return h("span", this.$tranDictName("DICT_TYPE", params.row.type));
          }
        },
        {
          title: "选项",
          align: "center",
          render: (h, params) => {
            let tags = [];
            params.row.options.forEach(item => {
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
          title: "操作",
          width: 180,
          align: "center",
          render: (h, params) => {
            let array = [];
            if (this.$checkAccess("sys_dictionary_detail")) {
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
            if (this.$checkAccess("sys_dictionary_update")) {
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
            if (this.$checkAccess("sys_dictionary_delete")) {
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
    ...mapGetters("sys/dictionary", [
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
    ...mapMutations("sys/dictionary", [
      "setPageNum",
      "setPageRows",
      "setPageFilter"
    ]),
    ...mapActions("sys/dictionary", ["getData", "delete"]),
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
      if (this.searchForm.type !== "") {
        filter.type = this.searchForm.type;
        this.searchTag.push(
          "类型：" + this.$tranDictName("DICT_TYPE", this.searchForm.type)
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
      this.searchForm.type = "";
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
        content: "<p>确认要把当前字典删除吗？</p>",
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
        content: "<p>确认要把勾选的全部字典删除吗？</p>",
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
