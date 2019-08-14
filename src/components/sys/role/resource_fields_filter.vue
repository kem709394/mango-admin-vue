<template>
  <div>
    <span>过滤字段：</span>
    <span v-if="fields.length===0">无</span>
    <CheckboxGroup v-model="value" @on-change="filterChange">
      <Checkbox v-for="item in fields" :key="item" :label="item"></Checkbox>
    </CheckboxGroup>
  </div>
</template>

<script>
export default {
  props: {
    fields: {
      type: Array,
      default() {
        return [];
      }
    },
    checked: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      value: []
    };
  },
  created() {
    this.value = this.checked;
  },
  methods: {
    filterChange(val) {
      this.$emit("input", val);
    }
  }
};
</script>