<template>
  <div class="base-product" @click="addProduct">
    <div class="product-name">
      {{orderName}}
    </div>
    <div class="product-price">
      <span>{{price}} / 个</span>
      <span>剩余{{remain}}个</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      orderName: '扑克',
      price: '0.00',
      remain: '37'
    }
  },
  methods: {
    addProduct () {
      this.$store.dispatch('increaseProduct', this.orderName)
    }
  }
}
</script>

<style lang="scss" scoped>
.base-product{
  width: 150px;
  background: #eee;
  padding: 12px 8px;
  border-radius: 4px;
  cursor: pointer;
  .product-name{
    text-align: left;
  }
  .product-price{
    display: flex;
    margin-top: 5px;
    justify-content: space-between;
  }
}
</style>
