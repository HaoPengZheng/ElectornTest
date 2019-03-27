<template>
  <el-dialog
    title="订单"
    :visible.sync="viewsDetailDialogVisible"
    width="50%">
    <div v-loading="loadingOrderDetail">
      <order-detail
        :orderNo="viewsDetailOrderNo"
        @loadingStart="loadingOrderDetail=true"
        @loadingEnd="loadingOrderDetail=false"></order-detail>
      <div class="footer">
        <el-button
          size="mini"
          type="danger"
          @click="viewsDetailDialogVisible=false">关闭</el-button>
        <el-button
          size="mini"
          type="primary">结账</el-button>
        <el-button
          size="mini"
          type="primary">编辑</el-button>
        <el-button
          size="mini"
          type="primary">处理</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import OrderDetail from './components/OrderDetail'
export default {
  name: 'OrderDetailDialog',
  components: {
    OrderDetail
  },
  props: ['orderNo'],
  data () {
    return {
      loadingOrderDetail: false,
      viewsDetailDialogVisible: false,
      viewsDetailOrderNo: ''
    }
  },
  watch: {
    orderNo: function () {
      this.viewsDetailOrderNo = this.orderNo
    }
  },
  methods: {
    showDialog () {
      this.viewsDetailDialogVisible = true
    }
  }
}
</script>

<style scoped>
.footer {
  text-align: center;
}
</style>