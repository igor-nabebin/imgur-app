<template>
  <div>
    <label class="label" :for="id">{{ label }}:</label>
    <select class="select-box" v-model="selectHandler" :id="id">
        <option v-for="option in options" :key="option.id" :value="option.id">
            {{ option.label }}
        </option>
    </select>
  </div>
</template>
<script>
export default {
  name: "SelectFilter",
  props: {
    value: {
      type: [String, Boolean],
      required: true
    },
    options: {
      type: Array,
      required: true,
      validator: options =>
        options.every(
          option =>
            option &&
            typeof option.id !== "undefined" &&
            typeof option.label === "string"
        )
    },
    label: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    selectHandler: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit(
          "input",
          typeof value === "string" ? value : value === "true"
        );
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.select-box {
  display: block;
  font-size: 24px;
  box-shadow: 0px 8px 20px rgba(0, 118, 203, 0.15);
  border-radius: 6px;
  padding: 5px;
}
.label {
  display: block;
  text-align: left;
  margin-bottom: 5px;
}
</style>