<template>
  <div class="room-filter">
    <span style="font-weight:700">房间类型：</span>
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
      <el-checkbox-group v-model="checkedroomTypes" @change="handleCheckedroomTypesChange">
        <el-checkbox border size="small" v-for="roomType in getRoomTypeOption" :label="roomType" :key="roomType">{{roomType}}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      checkAll: true,
      checkedroomTypes: [],
      roomTypes: this.getRoomTypeOption,
      isIndeterminate: false
    }
  },
  created: function () {
    this.initCheckedRoomTypes()
  },
  methods: {
    initCheckedRoomTypes () {
      this.checkedroomTypes = this.getRoomTypeOption
    },
    handleCheckAllChange (val) {
      this.checkedroomTypes = val ? this.getRoomTypeOption : []
      this.isIndeterminate = false
      this.updateRoomTypeFilter()
    },
    handleCheckedroomTypesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.getRoomTypeOption.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.getRoomTypeOption.length
      this.updateRoomTypeFilter()
    },
    updateRoomTypeFilter () {
      this.$store.dispatch('updateTypeFilter', this.checkedroomTypes)
    }
  },
  computed: {
    getRoomTypeOption () {
      return this.$store.getters.getTypeFilterOptions
    }
  }
}
</script>
<style lang="scss" scoped>
.room-filter{
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
