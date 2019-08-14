<template>
  <Modal v-model="visible" title="角色资源" width="800">
    <Form v-if="detail" :label-width="100">
      <FormItem label="名称">{{ detail.name }}</FormItem>
      <FormItem label="代码">{{ detail.code }}</FormItem>
      <FormItem label="资源">
        <Table
          ref="selection"
          :columns="columns"
          :data="data"
          max-height="500"
          @on-selection-change="selectionChange"
        ></Table>
      </FormItem>
    </Form>
    <Row slot="footer" type="flex" justify="center">
      <Button type="primary" @click="handleSubmit">确认</Button>
      <Button @click="visible=false">取消</Button>
    </Row>
  </Modal>
</template>

<script>
import ResourceFieldsFilter from "./resource_fields_filter.vue";
import { mapActions } from "vuex";
export default {
  components: {
    ResourceFieldsFilter
  },
  data() {
    return {
      visible: false,
      detail: null,
      columns: [
        {
          type: "selection",
          width: 50,
          align: "center"
        },
        {
          title: "名称",
          key: "name"
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
          type: "expand",
          width: 40,
          render: (h, params) => {
            if (params.row.method === "GET") {
              let self = this;
              return h(ResourceFieldsFilter, {
                props: {
                  fields: params.row.attributes,
                  checked: params.row.filter.fields
                },
                on: {
                  input: function(val) {
                    self.rowVal.forEach(item => {
                      if (params.row.id === item.id) {
                        item.filter.fields = val;
                      }
                    });
                  }
                }
              });
            }
          }
        }
      ],
      data: [],
      rowVal: []
    };
  },
  methods: {
    ...mapActions("sys/role", ["getDetail", "getResource", "updateResource"]),
    ...mapActions("sys/resource", {
      getResourceList: "getList"
    }),
    init(id) {
      let self = this;
      self.getResource(id).then(res1 => {
        let current = res1.list;
        self.getResourceList({}).then(res2 => {
          self.data = res2.list.map(item2 => {
            if (
              current.some(item => {
                return item.id === item2.id;
              })
            ) {
              let temp = current.find(item => {
                return item.id == item2.id;
              });
              self.rowVal.push({
                id: item2.id,
                checked: true,
                filter: JSON.parse(JSON.stringify(temp.filter))
              });
              item2._checked = true;
              item2.filter = JSON.parse(JSON.stringify(temp.filter));
            } else {
              self.rowVal.push({
                id: item2.id,
                checked: false,
                filter: {
                  fields: []
                }
              });
              item2._checked = false;
              item2.filter = {
                fields: []
              };
            }
            if (item2.method !== "GET") {
              item2._disableExpand = true;
            }
            return item2;
          });
        });
      });
      self.getDetail(id).then(res => {
        self.detail = res.info;
        self.visible = true;
      });
    },
    selectionChange(nodes) {
      let ids = nodes.map(item => {
        return item.id;
      });
      this.rowVal.forEach(item => {
        if (ids.includes(item.id)) {
          item.checked = true;
        } else {
          item.checked = false;
        }
      });
    },
    handleSubmit() {
      let self = this;
      let checkedNodes = self.rowVal.filter(item => {
        if (item.checked) {
          return item;
        }
      });
      let resources = checkedNodes.map(item => {
        return {
          id: item.id,
          filter: item.filter
        };
      });
      self
        .updateResource({
          id: self.detail.id,
          data: {
            resources: resources
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