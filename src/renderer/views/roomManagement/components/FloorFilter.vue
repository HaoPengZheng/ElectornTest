<template>
  <div class="floor-filter">
    <span style="font-weight:700">选择楼层：</span>
    <div class="all-type-select">
      <el-checkbox
        border
        size="small"
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >全选</el-checkbox>
    </div>
    <div>
      <el-checkbox-group v-model="checkedfloorTypes" @change="handleCheckedFloorTypesChange">
        <el-checkbox border size="small" v-for="floorType in getFloorOptions" :label="floorType" :key="floorType">{{floorType}}F</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      checkAll: true,
      checkedfloorTypes: [],
      isIndeterminate: false
    }
  },
  created: function () {
    this.initCheckedFloorTypes()
  },
  methods: {
    initCheckedFloorTypes () {
      this.checkedfloorTypes = this.getFloorOptions
    },
    handleCheckAllChange (val) {
      this.checkedfloorTypes = val ? this.getFloorOptions : []
      this.isIndeterminate = false
      this.updateFloorFilter()
    },
    handleCheckedFloorTypesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.getFloorOptions.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.getFloorOptions.length
      this.updateFloorFilter()
    },
    updateFloorFilter () {
      this.$store.dispatch('updateFloorFilter', this.checkedfloorTypes)
    }
  },
  computed: {
    getFloorOptions () {
      return this.$store.getters.getFloorFilterOptions
    }
  }
}
</script>
<style lang="scss" scoped>
.floor-filter{
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  .all-type-select{
    padding-bottom: 1px;
    padding-left: 5px;
    padding-right: 10px;
  }
}
</style>
