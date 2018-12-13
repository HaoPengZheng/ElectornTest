<template>
  <div class="room-order-list-item">
    <span>{{product.productName}}</span>
    <el-input-number v-model="count" size="mini" :min="1" :max="parseInt(product.remain)" label="描述文字"></el-input-number>
    <span>单价：{{product.price}}</span>
    <span>总价：{{totalPrice}}</span>
    <el-button type="danger" size="mini" @click="deleteProduct">删除</el-button>
  </div>  
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    product: Object,
    index: Number
  },
  computed: {
    count: {
      get: function () {
        return this.product.count
      },
      set: function (value) {
        let product = {}
        Object.assign(product, this.product)
        product.count = value
        this.$store.dispatch('updateProductCount', product)
      }
    },
    totalPrice () {
      return this.product.price * this.count
    }
  },
  methods: {
    deleteProduct () {
      this.$store.dispatch('deleteProductInOrderList', this.product)
    }
  }
}
</script>
<style lang="scss" scoped>
.room-order-list-item{
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-around;
  align-content: center;
  padding: 10px 0;
  text-align: center;
  line-height: 28px;
}
</style>
