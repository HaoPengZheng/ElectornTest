<template>
  <div>
    <div v-for="(order,index) in getRoomOrderList" :key="index">
      <room-order-list-item></room-order-list-item>
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
      return this.$store.state.RoomPlaceOrder.orderList
    }
  }
}
</script>
