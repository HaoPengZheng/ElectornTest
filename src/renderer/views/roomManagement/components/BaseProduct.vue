<template>
  <div class="base-product">
    <div class="product-name">
      扑克
    </div>
    <div class="product-price">
      <span>0.00 / 个</span>
      <span>剩余 37 个</span>
    </div>
  </div>
</template>
<script>
export default {

}
</script>

<style lang="scss" scoped>
.base-product{
  width: 150px;
  background: #eee;
  padding: 12px 8px;
  border-radius: 4px;
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
