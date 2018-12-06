<template>
  <div class="base-info-item" @click="filter" :class="{active:isActiveClass}">
    <div
      :style="{background:info.color}"
      style="display:block;width:12px;height:12px;border:1px solid #000;margin-right:5px"
    ></div>
    {{info.infoName}}({{info.infoValue}})
    <!-- <div>
      <el-input v-model="info.infoValue" :disabled="true" size="mini"></el-input>
    </div>-->
  </div>
</template>
<script>
export default {
  props: {
    info: Object
  },
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    isActiveClass () {
      let inputTypeFileter = this.$store.getters.getInputTypeFileter
      return this.isActive && inputTypeFileter.inputTypeName === this.info.infoType
    }
  },
  methods: {
    filter () {
      let inputTypeFilter
      if (!this.isActiveClass) {
        inputTypeFilter = {
          isNeedInputTypeFileter: true,
          inputTypeName: this.info.infoType,
          emphasizeColor: this.info.color
        }
        this.isActive = true
      } else {
        this.isActive = false
        inputTypeFilter = {
          isNeedInputTypeFileter: false,
          inputTypeName: '',
          emphasizeColor: ''
        }
      }

      this.$store.dispatch('updateInputTypeFilter', inputTypeFilter)
    }
  }
}
</script>
<style lang="scss" scoped>
.base-info-item {
  border: 1px solid #333;
  padding: 5px 2px;
  border-radius: 6px;
  background: #eee;
  color: #000;
  font-size: 14px;
  min-width: 100px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: #c4c4c4;
  }
  &.active{
    background: #11b3cf;
    color: #fff;
  }
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


