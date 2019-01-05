<template>
  <div
    class="order-list"
    ref="orderList"
  >
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
      <el-table-column
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column
        prop="no"
        label="订单号"
        width="180"
        :render-header="renderHeader"
      >
        <template slot-scope="scope">{{scope.row.no}}</template>
      </el-table-column>
      <el-table-column
        prop="order_type"
        label="订单类型"
        width="120"
        :render-header="renderHeader"
      >
        <template slot-scope="scope">
          <el-tag :type="OrderListHelper.getTagTypeByOrderType(scope.row.order_type)">{{scope.row.order_type}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="detail.use_time"
        label="入住时间"
        width="220"
      >
        <template slot-scope="scope">
          <p
            v-for="(detail,index) in scope.row.detail"
            :key="index"
          >
            {{getUseTimeByDetail(detail)}}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        prop="customer"
        label="订购人"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="peoples"
        label="入住人"
      >
        <template slot-scope="scope">
          {{getPeoples(scope.row.peoples)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        width="120"
        :render-header="renderHeader"
      ></el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        :render-header="renderHeader"
      >
        <template slot-scope="scope">
          <el-tag :type="OrderListHelper.getTagTypeByStateType(scope.row.state)">{{scope.row.state}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="total"
        label="总额"
      ></el-table-column>
      <el-table-column
        prop="address"
        label="待支付金额"
      >
        <template slot-scope="scope">
          {{scope.row.total-scope.row.payed_sum}}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="pay_type" label="支付方式"></el-table-column> -->
      <el-table-column
        prop="operator_id"
        label="下单员"
      ></el-table-column>
      <el-table-column
        prop="is_deal"
        label="是否处理"
      >
        <template slot-scope="scope">
          <el-tag type="danger">未处理</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="operator"
        label="操作"
        width="200px"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="viewsDetail(scope.row.no)"
          >查看详情</el-button>
          <el-button
            type="text"
            @click="settleAccounts(scope.row.no)"
          >结账</el-button>
          <el-button
            type="text"
            @click="cancelOrderDialogVisible=true"
          >取消订单</el-button>
        </template>
        <span slot="footer">
          <el-button>
            确定
          </el-button>
          <el-button>
            取消
          </el-button>
        </span>
      </el-table-column>
    </el-table>

    <settle-account
      :order-no="viewsSettleAccountOrderNo"
      :show="settleAccountsDialogVisible"
      @openOrderDialog="settleAccountsDialogVisible=$event"
    ></settle-account>

    <el-dialog
      title="请输入取消订单的原因："
      :visible.sync="cancelOrderDialogVisible"
      width="30%"
    >
      <el-input
        type="textarea"
        rows="4"
      >
      </el-input>
    </el-dialog>

    <!-- 订单详情 -->
    <order-detail
      :order-no="viewsDetailOrderNo"
      :show="viewsDetailDialogVisible"
      @openOrderDialog="viewsDetailDialogVisible=$event"
    >
    </order-detail>
    <!-- 订单快速搜索框 -->
    <div>
      <el-card
        class="box-card"
        style="width:200px"
        :style="searchStyle"
      >
        <div style="text-align:left">搜索：</div>
        <el-input
          v-if="!isSearchByDropDownList"
          v-model="searchKey"
          @keyup.esc.native="hiddenSearch"
          @keyup.enter.native="handleSearch"
          ref="searchInput"
          @blur="hiddenSearch"
        ></el-input>
        <el-select
          v-if="isSearchByDropDownList"
          v-model="searchKey"
          ref="searchSelect"
          placeholder="请选择"
          @change="handleSearch"
          @keyup.enter.native="handleSearch"
          @keyup.esc.native="hiddenSearch"
          @blur="hiddenSearch"
        >
          <el-option
            v-for="item in dropdownOptions"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-card>
    </div>
  </div>
</template>
<script>
import OrderListToolBar from './OrderListToolBar'
import OrderListHelper from './OrderListHelper'
import DialogCard from '@/components/DialogCard/DialogCard'
import { getOrders, getOrderStatusOptions } from '@/api/order'
import objectUtil from '@/utils/ObjectUtil'
import OrderDetail from '../../orderDetailDialog/OrderDetailDialog'
import SettleAccount from '../../orderSettleAccountDialog/OrderSettleAccountDialog'
export default {
  name: 'order-list',
  components: {
    OrderListToolBar,
    SettleAccount,
    OrderDetail,
    DialogCard
  },
  data () {
    return {
      OrderListHelper: OrderListHelper,
      settleAccountsDialogVisible: false,
      viewsDetailDialogVisible: false,
      cancelOrderDialogVisible: false,
      viewsDetailOrderNo: '',
      viewsSettleAccountOrderNo: '',
      tablePropList: ['no', 'order_type', 'detail.use_time', 'customer', 'peoples', 'phone', 'state', 'total', 'address', 'operator_id', 'is_deal', 'operator'],
      searchStyle: {
        backgroundColor: 'rgb(255, 208, 84)',
        display: 'none',
        position: 'absolute',
        top: '100px',
        'z-index': '999'
      },
      isSearchByDropDownList: false,
      dropListOptions: {
        order_type: [],
        state: []
      },
      dropdownOptions: [],
      searchKey: '',
      searchType: '',
      searchIndex: '',
      searchTags: {}
    }
  },
  created () {
    this.doGetOrderStatusOptions()
  },
  methods: {
    doGetOrderStatusOptions () {
      getOrderStatusOptions().then(response => {
        this.dropListOptions.state = response.data.data
      })
    },
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
    settleAccounts (orderNo) {
      this.settleAccountsDialogVisible = true
      this.viewsSettleAccountOrderNo = orderNo
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
    },
    searchFocus () {
      if (this.isSearchByDropDownList) {
        this.$nextTick(() => {
          this.$refs.searchSelect.focus()
        })
      } else {
        this.$nextTick(() => {
          this.$refs.searchInput.focus()
        })
      }
    },
    showSearch (e, index) {
      let element = document.getElementById('search' + index)
      // 搜索框定位
      let rect = this.$refs.orderList.getBoundingClientRect()
      this.searchStyle.display = 'block'
      this.$set(this.searchStyle, 'top', (element.getBoundingClientRect().y - rect.y + 15) + 'px')
      this.$set(this.searchStyle, 'left', (element.getBoundingClientRect().x - rect.x + 15) + 'px')

      // 根据表头的类型进行划分
      this.searchType = this.tablePropList[index - 1]
      const needDrownList = ['order_type', 'state']
      console.log()
      if (needDrownList.includes(this.searchType)) {
        if (this.dropListOptions.hasOwnProperty(this.searchType)) {
          this.dropdownOptions = this.dropListOptions[this.searchType]
          this.isSearchByDropDownList = true
        } else {
          this.isSearchByDropDownList = false
        }
      } else {
        this.isSearchByDropDownList = false
      }
      // 自动获取焦点
      this.searchFocus()
      this.searchIndex = index
    },
    hiddenSearch () {
      this.$set(this.searchStyle, 'display', 'none')
    },
    handleSearch () {
      let arr = []
      arr.push(this.searchKey)
      this.$set(this.searchTags, this.searchIndex, arr)
      let query = objectUtil.deepCopy(this.$store.state.OrderQuery.orderQuery)
      let key = this.tablePropList[this.searchIndex - 1]
      query[key] = this.searchKey
      this.searchKey = ''
      this.getOrdersByQuery(query)
      this.hiddenSearch()
    },
    getOrdersByQuery (query) {
      this.$store.dispatch('updateTableLoading', true)
      getOrders(query)
        .then(response => {
          this.$store.dispatch('updateOrderQuery', query)
          this.$store.dispatch('updateOrderListData', response.data)
          this.$store.dispatch('updateTableLoading', false)
        })
        .catch(() => {
          this.$store.dispatch('updateTableLoading', false)
        })
    },
    handleTagClose (index) {
      this.$set(this.searchTags, index, [])
      let query = objectUtil.deepCopy(this.$store.state.OrderQuery.orderQuery)
      console.log(query)
      let key = this.tablePropList[index - 1]
      query[key] = ''
      this.getOrdersByQuery(query)
    },
    // 自定义渲染el-table头部的方法
    renderHeader (createElement, { column, $index }) {
      let tags = []
      if (this.searchTags.hasOwnProperty($index)) {
        tags = this.searchTags[$index]
      }
      return createElement(
        'div',
        {
          class: ['search-button']
        },
        [
          createElement(
            'span',
            {

            },
            [
              column.label,
              createElement(
                'el-button',
                {
                  attrs: {
                    size: 'mini',
                    icon: 'el-icon-search',
                    type: 'text',
                    title: `快速搜索${column.label}`,
                    id: `search${$index}`
                  },
                  on: {
                    click: (e) => {
                      this.showSearch(e, $index)
                    }
                  }
                }
              )
            ]
          ),
          createElement(
            'div',
            {
              attrs: {
                id: `search-tag-${$index}`
              }
            },
            tags.map((item) => {
              return createElement(
                'el-tag',
                {
                  props: {
                    closable: true
                  },
                  on: {
                    close: () => { this.handleTagClose($index) }
                  }
                },
                item
              )
            })
          )
        ]
      )
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
  .el-dialog__title {
    line-height: 24px;
    font-size: 16px !important;
    color: #303133;
  }
}
.search-button {
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
