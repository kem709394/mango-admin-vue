<template>
  <Modal v-model="visible" title="角色菜单">
    <Form v-if="detail" :label-width="100">
      <FormItem label="名称">{{ detail.name }}</FormItem>
      <FormItem label="代码">{{ detail.code }}</FormItem>
      <FormItem label="菜单">
        <Tree ref="tree" :data="data" check-strictly show-checkbox></Tree>
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
      detail: null,
      data: []
    };
  },
  methods: {
    ...mapActions("sys/role", [
      "getDetail",
      "getMenuFunction",
      "updateMenuFunction"
    ]),
    ...mapActions("sys/menu_function", {
      getMenuFuncTree: "getTree"
    }),
    init(id) {
      let self = this;
      self.getMenuFunction(id).then(res1 => {
        let ids = res1.list.map(item => {
          return item.id;
        });
        self.getMenuFuncTree({ checked: ids }).then(res2 => {
          self.data = res2.tree;
        });
      });
      self.getDetail(id).then(res => {
        self.detail = res.info;
        self.visible = true;
      });
    },
    handleSubmit() {
      let self = this;
      let checkedNodes = this.$refs.tree.getCheckedNodes();
      let ids = checkedNodes.map(item => {
        return item.id;
      });
      self
        .updateMenuFunction({
          id: self.detail.id,
          data: {
            menuFuncIds: ids
          }
        })
        .then(res => {
          if (res.err_code === 0) {
            self.visible = false;
          } else {
            self.$Message.error(res.err_msg);
          }
        });
    }
  }
};
</script>