<template>
    <div class="order-list">
        <el-pagination
                class="page"
                small
                :pager-count="5"
                layout="total, prev, pager, next"
                :page-size="pageSize"
                :total="pageTotal"
                @current-change="handlePageChange"
                :current-page="currentPage">
        </el-pagination>
        <el-table :data="orderList" v-loading="loadingOrderList" size="mini" height="calc(100% - 26px)" style="width: 100%;">
            <el-table-column prop="no" label="订单号"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <span :class="{
                    'green' : isOrderItemChosen(scope.row) === '已排房',
                    'blue' : isOrderItemChosen(scope.row) === '已排房（未排完）' ,
                    'red' : isOrderItemChosen(scope.row) === '未排房'
                    }">{{isOrderItemChosen(scope.row)}}&nbsp;</span>
                </template>
            </el-table-column>
            <el-table-column prop="customer" label="订购人"></el-table-column>
            <el-table-column label="操作" style="padding-right: 10px;box-sizing: border-box;">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleOrderDetail(scope.row.no)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <order-detail
                :order-no="viewsDetailOrderNo"
                :show="viewsDetailDialogVisible"
                @openOrderDialog="viewsDetailDialogVisible=$event">
        </order-detail>
    </div>
</template>

<script>
import { dateStringToDateNum } from '@/utils/date'
import { getOrders } from '@/api/order'
import { roomtypes } from '@/api/room'
// import OrderDetail from '../../orderPage/components/OrderDetail'
import OrderDetail from '../../orderDetailDialog/OrderDetailDialog'

export default {
  name: 'OrderList',
  props: ['currentDateNum'],
  components: {OrderDetail},
  data () {
    return {
      loadingOrderList: false,
      orderList: [],
      pageTotal: 1,
      pageSize: 1,
      currentPage: 1,
      viewsDetailDialogVisible: false,
      viewsDetailOrderNo: ''
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
      this.getOrderList(false)
    },
    setOrderList: function (data) {
      this.orderList = data
    },
    getOrderList: function (isInitial) {
      if (isInitial === undefined) {
        this.currentPage = 1
        this.pageTotal = 1
        this.pageSize = 1
        this.orderList = []
      }
      if (this.$store.getters.getRoomTypeList.length) {
        this.queryOrderList()
      } else {
        let typeIdList
        roomtypes(this.$store.getters.shop).then(responseRoomType => {
          typeIdList = responseRoomType.data.data.map(function (item) {
            return item.type_id
          })
          this.$store.dispatch('updateRoomTypeList', typeIdList)
          this.queryOrderList()
        })
      }
    },
    queryOrderList: function () {
      let query = {
        use_time: this.currentDateNum,
        page: this.currentPage,
        state: [1, 2, 3],
        goods_type: this.$store.getters.getRoomTypeList
      }
      this.loadingOrderList = true
      getOrders(query).then(response => {
        this.loadingOrderList = false
        this.setOrderList(response.data.data)
        this.pageTotal = +response.data.meta.pagination.total
        this.pageSize = +response.data.meta.pagination.per_page
        this.currentPage = +response.data.meta.pagination.currentPage
      }).catch(reason => {
        this.loadingOrderList = false
      })
    },
    isOrderItemChosen: function (row) {
      // -1 未排房 0 已排房（未排完） 1 已排房
      let currentDate = +this.currentDateNum
      let list = row.detail.filter(function (item) {
        return +dateStringToDateNum(item.use_time) === currentDate
      })
      let arrayChosen = list.map(function (item) {
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
    },
    handleOrderDetail: function (OrderNo) {
      this.viewsDetailDialogVisible = true
      this.viewsDetailOrderNo = OrderNo
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
