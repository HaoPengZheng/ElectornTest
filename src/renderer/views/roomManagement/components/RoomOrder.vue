<template>
  <div class="room-order">
    <el-tabs type="border-card" id="room-order-base-tabs">
      <el-tab-pane label="下单">
       <place-order :goodsType="goods_type" :goodsData="goods_data"></place-order>
      </el-tab-pane>
      <el-tab-pane label="订单">
        <el-table
          :data="tableData"
          border
          stripe
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column prop="date" label="订单号" sortable width="180"></el-table-column>
          <el-table-column prop="name" label="状态" sortable width="180"></el-table-column>
          <el-table-column prop="address" label="手机"></el-table-column>
          <el-table-column prop="address" label="总价"></el-table-column>
          <el-table-column prop="address" label="创建时间"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="日志">
        <table class="room-detail-table table table-bordered table-hover">
          <tbody>
            <tr class="active">
              <td>消息</td>
              <td>时间</td>
            </tr>
            <tr>
              <td colspan="2">无数据</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import PlaceOrder from './PlaceOrder'
import {getRoomGoods} from '@/api/room.js'
export default {
  components: {
    PlaceOrder
  },
  data () {
    return {
      goods_type: {},
      goods_data: [],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },

        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },

        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },

        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },

        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  created () {
    this.getRoomGoodsForOrder()
  },
  methods: {
    getRoomGoodsForOrder () {
      getRoomGoods().then(response => {
        console.log(response.data)
        this.goods_type = response.data.goods_type
        this.goods_data = response.data.data
      })
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
#room-order-base-tabs{
  height: 100%;
  padding-bottom: 10px;
}
</style>
