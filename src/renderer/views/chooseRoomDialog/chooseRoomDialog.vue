<template>
    <el-dialog
            title="选房"
            :visible.sync="viewsDetailDialogVisible"
            append-to-body
            width="50%">
        <room-list :goodsNo="goodsNo" :quantity="quantity"></room-list>
    </el-dialog>
</template>

<script>
  import RoomList from './components/RoomList'
  export default {
    name: 'ChooseRoomDialog',
    components: {RoomList},
    props: ['openDialog', 'currentGoodsNo', 'currentQuantity'],
    data () {
      return {
        goodsNo: '',
        quantity: '',
        viewsDetailDialogVisible: false
      }
    },
    watch: {
      currentGoodsNo: function () {
        this.goodsNo = this.currentGoodsNo
      },
      currentQuantity: function () {
        this.quantity = this.currentQuantity
      },
      openDialog: function () {
        this.viewsDetailDialogVisible = this.openDialog
      },
      viewsDetailDialogVisible: function () {
        if (this.viewsDetailDialogVisible === false) {
          this.handleClose()
        }
      }
    },
    methods: {
      handleClose: function () {
        this.$emit('openDialog', false)
      }
    }
  }
</script>

<style scoped>
    
</style>