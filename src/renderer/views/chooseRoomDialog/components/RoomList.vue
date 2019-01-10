<template>
    <div class="room-list">
        <div class="floor-item">
            <div class="room-item">{{goodsNo}}{{quantity}}</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'RoomList',
  props: ['goodsNo', 'quantity'],
  data () {
    return {
      roomList: [],
      floorList: {},
      chosenList: []
    }
  },
  created () {
    console.log(this.goodsNo, this.quantity)
  },
  watch: {
    goodsNo: function () {
      console.log(this.goodsNo, this.quantity)
      this.getRoomList()
    }
  },
  methods: {
    getRoomList: function () {
      this.setRoomList()
      this.getRoomListStatus()
    },
    getRoomListStatus: function () {
    },
    setRoomList: function () {
    }
  }
}
</script>

<style scoped>

</style>