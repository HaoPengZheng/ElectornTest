<template>
  <vue-scroll>
    <div class="order-page">
      <el-tabs v-model="orderPageActiveTab">
        <el-tab-pane label="订单列表" name="orderList">
          <order-list :orderListData="this.orderListData"></order-list>
        </el-tab-pane>
      </el-tabs>
    </div>
  </vue-scroll>
</template>
<script>
import OrderList from './components/OrderList'
import { getOrders } from '@/api/order'
import { dateStringToDateNum, getNowFormatDate } from '@/utils/date'
export default {
  name: 'order-page',
  components: {
    OrderList
  },
  created () {
    this.getOrderList()
  },
  data () {
    return {
      orderPageActiveTab: 'orderList',
      orderListData: Object
    }
  },
  methods: {
    getOrderList () {
      this.$store.dispatch('updateTableLoading', true)
      let defaultQuery = { use_time: dateStringToDateNum(getNowFormatDate()), page: 1, state: [1, 2, 3, 5, 6, 7] }
      getOrders(defaultQuery)
        .then(response => {
          this.$store.dispatch('updateOrderQuery', defaultQuery)
          this.$store.dispatch('updateOrderListData', response.data)
          this.$store.dispatch('updateTableLoading', false)
        })
        .catch(() => {
          this.$store.dispatch('updateTableLoading', false)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.order-page {
  background: #fff;
  margin: 30px;
  padding: 10px 20px;
  min-height: 600px;
}
</style>


