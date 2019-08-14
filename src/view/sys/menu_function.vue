<style scoped>
</style>

<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="ios-list-box"></Icon>菜单列表
      </p>
      <Row>
        <Col span="12">
          <Button icon="ios-refresh-circle" @click="handleRefresh">刷新</Button>
        </Col>
        <Col span="12" style="text-align:right;">
          <Button
            v-if="$checkAccess('sys_menu_function_create')"
            type="success"
            @click="handleCreate"
          >添加</Button>
        </Col>
      </Row>
      <Row style="margin-top:12px;" :gutter="1">
        <tree-table
          expand-key="title"
          :expand-type="false"
          :selectable="false"
          :columns="columns"
          :data="data"
        >
          <template slot="type" slot-scope="scope">{{ $tranDictName('MENU_TYPE', scope.row.type) }}</template>
          <template
            slot="state"
            slot-scope="scope"
          >{{ $tranDictName('USE_STATE', scope.row.state) }}</template>
          <template slot="operate" slot-scope="scope">
            <Button
              v-if="$checkAccess('sys_menu_function_detail')"
              type="info"
              size="small"
              style="margin-right: 5px;"
              @click="handleDetail(scope.row)"
            >详情</Button>
            <Button
              v-if="$checkAccess('sys_menu_function_update')"
              type="warning"
              size="small"
              style="margin-right: 5px;"
              @click="handleUpdate(scope.row)"
            >修改</Button>
            <Button
              v-if="$checkAccess('sys_menu_function_update') && (!scope.row.children||scope.row.children.length===0)"
              type="error"
              size="small"
              @click="handleDelete(scope.row)"
            >删除</Button>
          </template>
        </tree-table>
      </Row>
    </Card>
    <MenuFunctionCreate ref="createModal" @callback="init"></MenuFunctionCreate>
    <MenuFunctionUpdate ref="updateModal" @callback="init"></MenuFunctionUpdate>
    <MenuFunctionDetail ref="detailModal"></MenuFunctionDetail>
  </div>
</template>
<script>
import MenuFunctionCreate from "_c/sys/menu-function/create";
import MenuFunctionUpdate from "_c/sys/menu-function/update";
import MenuFunctionDetail from "_c/sys/menu-function/detail";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "sys_menu_function",
  components: {
    MenuFunctionCreate,
    MenuFunctionUpdate,
    MenuFunctionDetail
  },
  data() {
    return {
      columns: [
        {
          title: "名称",
          key: "title"
        },
        {
          title: "代码",
          key: "code"
        },
        {
          title: "类型",
          type: "template",
          template: "type"
        },
        {
          title: "状态",
          type: "template",
          template: "state"
        },
        {
          title: "操作",
          align: "center",
          headerAlign: "center",
          type: "template",
          template: "operate"
        }
      ],
      data: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions("sys/menu_function", ["getTree", "delete"]),
    init() {
      this.getTree({}).then(res => {
        this.data = res.tree;
      });
    },
    handleRefresh() {
      this.init();
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
        content: "<p>确认要把当前菜单删除吗？</p>",
        loading: true,
        onOk: () => {
          self.delete(row.id).then(res => {
            self.$Modal.remove();
            if (res.err_code === 0) {
              self.$Message.info("删除成功");
              self.init();
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
