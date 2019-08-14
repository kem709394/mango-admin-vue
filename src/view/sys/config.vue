<style scoped>
</style>

<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="ios-list-box"></Icon>参数列表
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
        <Col span="12" style="text-align:right;"></Col>
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
        <FormItem label="代码">
          <Input
            v-model="searchForm.code"
            clearable
            placeholder="Enter something..."
            style="width: 300px"
          ></Input>
        </FormItem>
      </Form>
    </Modal>
    <ConfigUpdate ref="updateModal" @callback="getData"></ConfigUpdate>
    <ConfigDetail ref="detailModal"></ConfigDetail>
  </div>
</template>
<script>
import ConfigUpdate from "_c/sys/config/update";
import ConfigDetail from "_c/sys/config/detail";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "sys_config",
  components: {
    ConfigUpdate,
    ConfigDetail
  },
  data() {
    return {
      deleteBatch: false,
      searchVisible: false,
      searchForm: {
        name: "",
        code: ""
      },
      searchTag: [],
      columns: [
        {
          type: "index",
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
          title: "说明",
          key: "note"
        },
        {
          title: "操作",
          width: 140,
          align: "center",
          render: (h, params) => {
            let array = [];
            if (this.$checkAccess("sys_config_detail")) {
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
            if (this.$checkAccess("sys_config_update")) {
              array.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "warning",
                      size: "small"
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
            return h("div", array);
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters("sys/config", [
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
    ...mapActions("sys/config", ["getData", "delete"]),
    ...mapMutations("sys/config", [
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
      this.setPageFilter(filter);
      this.setPageNum(1);
      this.getData();
    },
    handleRefresh() {
      this.searchTag = [];
      this.searchForm.name = "";
      this.searchForm.code = "";
      this.setPageFilter({});
      this.setPageNum(1);
      this.getData();
    },
    handleUpdate(row) {
      this.$refs.updateModal.init(row.id);
    },
    handleDetail(row) {
      this.$refs.detailModal.init(row.id);
    }
  }
};
</script>
