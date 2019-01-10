<template>
    <el-select class="shop-select" v-model="shopValue" placeholder="请选择店">
        <el-option
                v-for="item in shopOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>
</template>

<script>
export default {
  name: 'ChangeShop',
  data () {
    return {
      shopValue: this.$store.getters.getShopId,
      shopOptions: [
        {value: 49, label: '云来客栈'},
        {value: 51, label: '温泉部'}
      ]
    }
  },
  watch: {
    shopValue: function () {
      this.$store.dispatch('updateShopId', this.shopValue)
    }
  }
}
</script>

<style scoped lang="scss">
  .shop-select {
      width: 120px;
      margin: 0 20px;
  }
</style>