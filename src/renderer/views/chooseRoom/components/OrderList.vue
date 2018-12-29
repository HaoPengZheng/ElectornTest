<template>
    <div class="order-list">
        <el-pagination
                class="page"
                small
                :pager-count="5"
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="pageTotal"
                @current-change="handlePageChange">
        </el-pagination>
        <el-table :data="orderList" v-loading="loadingOrderList" size="mini" height="calc(100% - 26px)" style="width: 100%;">
            <el-table-column prop="no" label="订单号"></el-table-column>
            <el-table-column prop="no" label="状态">
                <template slot-scope="scope">
                    <span :class="{
                    'green' : isOrderItemChosen(scope.row) === '已排房',
                    'blue' : isOrderItemChosen(scope.row) === '已排房（未排完）' ,
                    'red' : isOrderItemChosen(scope.row) === '未排房'
                    }">{{isOrderItemChosen(scope.row)}}&nbsp;</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { dateStringToDateNum } from '@/utils/date'
import { getOrders } from '@/api/order'
export default {
  name: 'OrderList',
  props: ['currentDateNum'],
  data () {
    return {
      loadingOrderList: false,
      orderList: [],
      pageTotal: 1,
      pageSize: 1,
      currentPage: 1
    }
  },
  created () {
    this.getOrderList()
  },
  watch: {
    currentDateNum: function () {
      this.getOrderList()
    }
  },
  methods: {
    handlePageChange (val) {
      this.currentPage = val
      this.getOrderList()
    },
    setOrderList: function (data) {
      this.orderList = data
    },
    getOrderList: function () {
      let query = {
        use_time: this.currentDateNum,
        page: this.currentPage
      }
      this.loadingOrderList = true
      getOrders(query).then(response => {
        this.loadingOrderList = false
        this.setOrderList(response.data.data)
        this.pageTotal = +response.data.meta.pagination.total
        this.pageSize = +response.data.meta.pagination.per_page
      }).catch(reason => {
        this.loadingOrderList = false
      })
    },
    isOrderItemChosen: function (row) {
      // -1 未排房 0 已排房（未排完） 1 已排房
      let arrayChosen = row.detail.map(function (item) {
        let code = -1

        if (item.room_nos) {
          if (item.room_nos[dateStringToDateNum(item.use_time)].length === +item.quantity) {
            code = 1
          } else {
            code = 0
          }
        } else {
          code = -1
        }
        return code
      })
      if (arrayChosen.indexOf(0) !== -1) {
        return '已排房（未排完）'
      } else if (arrayChosen.indexOf(1) !== -1 && arrayChosen.indexOf(-1) !== -1) {
        return '已排房（未排完）'
      } else if (arrayChosen.indexOf(1) !== -1) {
        return '已排房'
      } else if (arrayChosen.indexOf(-1) !== -1) {
        return '未排房'
      }
    }
  }
}
</script>

<style scoped lang="scss">
    .green { color: #55a532; }
    .blue { color: #0086b3}
    .red { color: #d43f3a; }
    .page { float: right;}
</style>
