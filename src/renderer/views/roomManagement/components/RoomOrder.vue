<template>
  <div class="room-order">
    <el-tabs
      type="border-card"
      id="room-order-base-tabs"
    >
      <el-tab-pane :label="`客房服务                                              (房间:${getRoomInfo.room_num})`">
        <place-order
          :goodsType="goods_type"
          :goodsData="goods_data"
          @refreshData="refreshData"
        ></place-order>
      </el-tab-pane>
      <el-tab-pane label="订单">
        <el-table
          :data="getOrderListByRoomId"
          border
          stripe
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column
            prop="warehouse_no"
            label="订单号"
            sortable
            width="180"
          ></el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            sortable
            width="180"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="手机"
          ></el-table-column>
          <el-table-column
            prop="total"
            label="总价"
          ></el-table-column>
          <el-table-column
            prop="ctime"
            label="创建时间"
          ></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200"
          >
            <template slot-scope="scope">
              <el-button
                @click="showDetail(scope.row)"
                size="small"
              >查看</el-button>
              <el-button
                type="primary"
                size="small"
                @click="cancelRoomOrder(scope.row)"
              >取消订单</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="日志">
        <table class="room-detail-table table table-bordered table-hover" style="margin-top:20px">
          <tbody>
            <tr class="active">
              <td>消息</td>
              <td>时间</td>
            </tr>
            <tr>
              <td colspan="2" v-show="getRoomLogByRoomId.length===0">暂无数据</td>
            </tr>
            <tr v-for="(log,index) in getRoomLogByRoomId" :key="index">
              <td>{{log.data}}</td>
              <td>{{log.time}}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="订单详情"
      :visible.sync="orderDetailDialogVisible"
      width="50%"
      append-to-body
    >
      <table class="table table-bordered">
        <tbody>
          <tr>
            <td style="background:#f2f2f2;height: 25px;padding: 5px 10px;border: 1px solid #e6e6e6;font-weight: bold;text-align: center;">订单号</td>
            <td>{{detailOrder.warehouse_no}}</td>
            <td style="background:#f2f2f2;height: 25px;padding: 5px 10px;border: 1px solid #e6e6e6;font-weight: bold;text-align: center;">创建时间</td>
            <td>{{detailOrder.ctime}}</td>
          </tr>
        </tbody>
      </table>
      <table class="table table-bordered  table-hover">
        <tbody>
          <tr>
            <td class="td_head">商品名</td>
            <td class="td_head">数量</td>
          </tr>
          <tr v-for="(product,index) in detailOrderInfo" :key="index">
            <td>{{product.materials_name}}</td>
            <td>{{product.quantity}}/{{product.unit}}</td>
          </tr>
        </tbody>
      </table>
    </el-dialog>
  </div>
</template>
<script>
import PlaceOrder from './PlaceOrder'
import { getRoomGoods, getOrderByShop, cancelRoomOrder, getOrderDetail, getRoomLog } from '@/api/room.js'
import { convertHanziToPinYin, convertHanZiToInitial } from '@/utils/pinyinUtils.js'
export default {
  components: {
    PlaceOrder
  },
  data () {
    return {
      goods_type: {},
      goods_data: [],
      orderDetailDialogVisible: false,
      detailOrder: {},
      detailOrderInfo: []
    }
  },
  created () {
    this.getRoomGoodsForOrder()
    this.getOrderList()
    this.getRoomOrderLogList()
  },
  methods: {
    refreshData () {
      this.getRoomGoodsForOrder()
      this.getOrderList()
      this.getRoomOrderLogList()
    },
    getRoomGoodsForOrder () {
      getRoomGoods().then(response => {
        this.goods_type = response.data.goods_type
        if (response.data.data !== false) {
          this.goods_data = response.data.data
        }
        this.initPinYin()
      })
    },
    initPinYin () {
      console.log(this.goods_data)
      this.goods_data.forEach(element => {
        element.pinyin = convertHanziToPinYin(element.materials_name)
        element.lyx = convertHanZiToInitial(element.materials_name)
      })
    },
    getOrderList () {
      getOrderByShop().then(response => {
        this.$store.dispatch('initOrderListByShop', response.data !== null ? response.data : [])
      })
    },
    getRoomOrderLogList () {
      getRoomLog().then(response => {
        this.$store.dispatch('initOrderLogList', response.data)
      })
    },
    showDetail (data) {
      this.detailOrder = data
      let query = {order_no: data.warehouse_no}
      getOrderDetail(query).then(response => {
        this.detailOrderInfo = response.data
      })
      this.orderDetailDialogVisible = true
    },
    cancelRoomOrder (data) {
      let query = {order_no: data.warehouse_no}
      cancelRoomOrder(query).then(response => {
      })
    }
  },
  computed: {
    getRoomInfo () {
      return this.$store.state.RoomPlaceOrder.roomInfo
    },
    getAllOrderListByShop () {
      return this.$store.state.RoomPlaceOrder.orderListByShop
    },
    getOrderListByRoomId () {
      let orderList = []
      let allOrderList = this.$store.state.RoomPlaceOrder.orderListByShop
      let roomInfo = this.$store.state.RoomPlaceOrder.roomInfo
      if (roomInfo === undefined || allOrderList === undefined) {
        return
      }
      allOrderList.forEach(order => {
        if (order.room_id === roomInfo.room_id) {
          orderList.push(order)
        }
      })
      return orderList
    },
    getRoomLogByRoomId () {
      let logList = []
      let allLogList = this.$store.state.RoomPlaceOrder.orderLogList
      let roomInfo = this.getRoomInfo
      if (roomInfo === undefined || allLogList === undefined || allLogList === null) {
        return []
      }
      allLogList.forEach(log => {
        if (log.room_id === roomInfo.room_id) {
          logList.push(log)
        }
      })
      return logList
    }
  }
}
</script>

<style lang="scss">
#room-order-base-tabs > .el-tabs__content {
  height: -webkit-fill-available;
  overflow: scroll;
  overflow-x: hidden;
  padding: 15px 15px 30px 15px !important;
}
.room-order {
  height: 100%;
  .el-tabs {
    overflow: hidden;
  }

  .el-tabs {
  }
  .el-table {
    margin-bottom: 20px;
    tr,
    th {
      padding: 8px 0;
    }
  }
}
</style>

<style lang="scss" scoped>
#room-order-base-tabs {
  height: 100%;
  padding-bottom: 10px;
}
</style>
