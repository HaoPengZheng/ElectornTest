<template>
  <div class="base-product" @click="addProduct">
    <div class="product-name">
      {{productInfo.materials_name}}
    </div>
    <div class="product-price">
      <span>{{productInfo.unit_price}} / {{productInfo.unit}}</span>
      <span>剩余{{productInfo.remain}}{{productInfo.quantity}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    productInfo: Object
  },
  methods: {
    addProduct () {
      this.$store.dispatch('increaseProduct', this.productInfo)
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
  margin: 10px 15px;
  cursor: pointer;
  &:hover{
    background: #d47676;
    color: #fff;
  }
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
