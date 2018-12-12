<template>
  <div class="room-order">
    <el-tabs type="border-card" id="room-order-base-tabs">
      <el-tab-pane label="下单">
       <place-order></place-order>
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
export default {
  components: {
    PlaceOrder
  },
  data () {
    return {
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
  }
}
</script>

<style lang="scss">
#room-order-base-tabs > .el-tabs__content {
  min-height: 100%;
  max-height: 700px;
  overflow: scroll;
  overflow-x: hidden;
  padding: 15px 15px 30px 15px !important;
}
.room-order {
  .el-tabs {
    min-height: 100%;
    max-height: 700px;
    overflow: hidden;
  }

  .el-tabs {
    padding-bottom: 20px;
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
.room-order {
}
</style>
