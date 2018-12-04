<template>
  <div class="base-info-item">
    <div class="ellipsis">
      {{info.infoName}}
      {{info.infoValue}}
      <svg class="icon" aria-hidden="true">
        <use xlink:href="info.iconName"></use>
      </svg>
    </div>
    <div>
      <el-input v-model="info.infoValue" :disabled="true" size="mini"></el-input>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    info: Object
  },
  data () {
    return {
      value: 100
    }
  }
}
</script>
<style lang="scss" scoped>
.base-info-item {
  color: #000;
  font-size: 14px;
  width: 70px;
  min-width: 70px;
}
</style>
<style>
.base-info-item .el-input__inner {
  background-color: #ffffff !important;
  border-color: #e4e7ed;
  text-align: center;
  color: #000000 !important;
  cursor: not-allowed;
}
</style>


