<template>
  <div>
    <div v-if="getRoomOrderList.length===0">
      无订单
    </div>
    <div v-for="(product,index) in getRoomOrderList" :key="index">
      <room-order-list-item :product="product" :index="index"></room-order-list-item>
    </div>
  </div>
</template>
<script>
import RoomOrderListItem from './RoomOrderListItem'
export default {
  components: {
    RoomOrderListItem
  },
  computed: {
    getRoomOrderList () {
      return Object.values(this.$store.state.RoomPlaceOrder.orderProductList)
    }
  }
}
</script>
