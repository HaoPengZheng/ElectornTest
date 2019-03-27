<template>
  <div class="room-assign">
    <!--  -->
    <div style="width:100%">
      <booking-order-info></booking-order-info>
      <member-room></member-room>
    </div>
    <!-- 预订单，未到 -->
    <div class="booking-order-warp">
      <booking-order></booking-order>
    </div>
  </div>
</template>

<script>
import BookingOrder from './components/BookingOrder'
import BookingOrderInfo from './components/BookingOrderInfo'
import MemberRoom from './components/MemberRoom'

export default {
  components: {
    BookingOrder,
    BookingOrderInfo,
    MemberRoom
  }

}
</script>

<style lang="scss" scoped>
  .room-assign{
    display: flex;
    justify-content: space-between;
    .booking-order-warp{
      width: 600px;
    }
  }
</style>
