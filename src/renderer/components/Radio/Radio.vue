<template>
  <div class="my-radio">
    <el-radio-group v-model="radioValue" :size="size" @change="$emit('change')">
      <el-radio-button v-for="label in items" :key="label" :label="label"></el-radio-button>
    </el-radio-group>
  </div>
</template>
<script>
export default {
  props: {
    items: Array,
    value: '',
    size: String
  },
  computed: {
    radioValue: {
      get: function () {
        return this.value
      },
      set: function (newValue) {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>

<style lang="scss">
.my-radio{
  .el-radio-button__inner{
    background: lightseagreen;
    color: #fff;
    border-radius:4px!important;
    margin: 0 8px;
    &:hover{
      color:#fff;
      background: darkgreen;
    }
  }
  .el-radio-button__orig-radio:checked+.el-radio-button__inner{
    background: black;
    border-color:#666;
  }
}
</style>

<style lang="scss" scoped>

</style>

