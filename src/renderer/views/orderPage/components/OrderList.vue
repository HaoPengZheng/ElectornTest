<template>
  <div class="order-list">
    <order-list-tool-bar></order-list-tool-bar>
    <el-table
      v-loading="isOrderTableLoading"
      element-loading-text="订单数据加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      stripe
      border
      :data="orderListData"
      style="width: 100%;margin-top:20px;"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="no" label="订单号" width="180">
        <template slot-scope="scope">{{scope.row.no}}</template>
      </el-table-column>
      <el-table-column prop="order_type" label="订单类型" width="120">
        <template slot-scope="scope">
          <el-tag
            :type="OrderListHelper.getTagTypeByOrderType(scope.row.order_type)"
          >{{scope.row.order_type}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="detail.use_time" label="入住时间" width="220">
        <template slot-scope="scope">
          <p v-for="(detail,index) in scope.row.detail" :key="index">
            {{getUseTimeByDetail(detail)}}
          </p>
          </template>
      </el-table-column>
      <el-table-column prop="customer" label="订购人" width="80"></el-table-column>
      <el-table-column prop="peoples" label="入住人">
        <template slot-scope="scope">
           {{getPeoples(scope.row.peoples)}}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话" width="120"></el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <el-tag :type="OrderListHelper.getTagTypeByStateType(scope.row.state)">{{scope.row.state}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="total" label="总额"></el-table-column>
      <el-table-column prop="address" label="待支付金额">
        <template slot-scope="scope">
          {{scope.row.total-scope.row.payed_sum}}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="pay_type" label="支付方式"></el-table-column> -->
      <el-table-column prop="operator_id" label="下单员"></el-table-column>
      <el-table-column prop="is_deal" label="是否处理">
        <template slot-scope="scope">
          <el-tag type="danger">未处理</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="200px">
        <template slot-scope="scope">
          <el-button type="text" @click="viewsDetail(scope.row.no)">查看详情</el-button>
          <el-button type="text" @click="settleAccounts">结账</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="请选择结账方式"
      :visible.sync="settleAccountsDialogVisible"
      width="40%"
      >
      <settle-account></settle-account>
    </el-dialog>
    <el-dialog
      title="订单"
      :visible.sync="viewsDetailDialogVisible"
      width="50%"
      >
      <order-detail :orderNo="viewsDetailOrderNo"></order-detail>
      <div class="footer">
        <el-button size="mini" type="danger">关闭</el-button>
        <el-button size="mini" type="primary">结账</el-button>
        <el-button size="mini" type="primary">编辑</el-button>
        <el-button size="mini" type="primary">处理</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import OrderListToolBar from './OrderListToolBar'
import OrderListHelper from './OrderListHelper'
import SettleAccount from './SettleAccount'
import OrderDetail from './OrderDetail'
export default {
  name: 'order-list',
  components: {
    OrderListToolBar,
    SettleAccount,
    OrderDetail
  },
  data () {
    return {
      OrderListHelper: OrderListHelper,
      settleAccountsDialogVisible: false,
      viewsDetailDialogVisible: false,
      viewsDetailOrderNo: ''
    }
  },
  methods: {
    getUseTimeByDetail (detail) {
      let name = ''
      let goods = this.orderListMeta.goods
      if (goods.hasOwnProperty(detail.goods_no)) {
        name += goods[detail.goods_no]
      } else {
        name += detail.goods_no
      }
      name += `(${detail.use_time})*${detail.quantity}`
      return name
    },
    settleAccounts () {
      this.settleAccountsDialogVisible = true
    },
    viewsDetail (orderNo) {
      this.viewsDetailDialogVisible = true
      this.viewsDetailOrderNo = orderNo
    },
    getPeoples (peoples) {
      let peopleNames = []
      peoples.forEach(people => {
        peopleNames.push(people.name)
      })
      return peopleNames.join('，')
    }
  },
  computed: {
    orderListData () {
      return this.$store.getters.getOrderListObject.data === undefined
        ? null
        : this.$store.getters.getOrderListObject.data
    },
    orderListMeta () {
      return this.$store.getters.getOrderListObject.meta === undefined
        ? null
        : this.$store.getters.getOrderListObject.meta
    },
    isOrderTableLoading () {
      return this.$store.state.OrderQuery.tableLoading
    }
  }
}
</script>

<style lang="scss">
.order-list {
  .el-dialog__title{
    line-height: 24px;
    font-size: 16px!important;
    color: #303133;
  }
}
</style>
