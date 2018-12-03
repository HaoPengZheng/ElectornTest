<template>
  <div class="order-list-toolbar">
    <div class="toolbar-options">
      <el-button type="primary" size="small">搜索</el-button>
    </div>
    <div class="toolbar-pagination">
      <el-pagination
        :current-page="paginationInfo.current_page"
        :page-sizes="[15,30,60]"
        :page-size="15"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginationInfo.total"
        @size-change="sizeChange"
        @current-change="changePage"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import {getOrders} from '@/api/order'
import objectUtil from '@/utils/ObjectUtil'
export default {
  name: 'order-list-toolbar',
  methods: {
    sizeChange (limit) {
      let query = this.$store.getters.getOrderQuery
      query.limit = limit
      this.$store.dispatch('updateTableLoading', true)
      getOrders(query).then(response => {
        this.$store.dispatch('updateOrderQuery', query)
        console.log(response.data)
        this.$store.dispatch('updateOrderListData', response.data)
        this.$store.dispatch('initOrderListHistory')
        this.$store.dispatch('updateTableLoading', false)
      }).catch(() => {
        this.$store.dispatch('updateTableLoading', false)
      })
    },
    changePage (currentPage) {
      let orderListData = this.$store.getters.getOrderListHistory.hasOwnProperty(currentPage) ? this.$store.getters.getOrderListHistory[currentPage] : undefined
      if (orderListData === undefined) {
        let query = objectUtil.deepCopy(this.$store.getters.getOrderQuery)
        query.page = currentPage
        this.$store.dispatch('updateTableLoading', true)
        getOrders(query).then(response => {
          this.$store.dispatch('updateOrderQuery', query)
          this.$store.dispatch('updateOrderListData', response.data)
          this.$store.dispatch('updateTableLoading', false)
        }).catch(() => {
          this.$store.dispatch('updateTableLoading', false)
        })
      } else {
        this.$store.dispatch('updateOrderListData', orderListData)
      }
    }
  },
  computed: {
    paginationInfo () {
      return this.$store.getters.getOrderListObject.meta.pagination
    }
  }
}
</script>
<style lang="scss" scoped>
.order-list-toolbar{
  display: flex;
  justify-content: space-between;
  align-items: center;
  .toolbar-options{
    display: flex;
    justify-content: flex-start;
  }
}
</style>


