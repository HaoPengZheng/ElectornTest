<template>
  <div>
    <span>成员房间</span>
    <el-table
        ref="bookingOrder"
        :data="orderData"
        highlight-current-row
        border
        @current-change="handleCurrentChange"
      >
        <el-table-column
          type="index"
          width="50"
        >
        </el-table-column>
        <el-table-column
          property="customer"
          label="顾客"
          width="120"
        >
        </el-table-column>
        <el-table-column
          property="contacts"
          label="联系人"
          width="120"
        >
        </el-table-column>
        <el-table-column
          property="orderNum"
          label="单号"
          width="120"
        >
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderData: [{
        customer: '苗花',
        contacts: '苗花',
        orderNum: '2643.....'
      }, {
        customer: '苗花',
        contacts: '苗花',
        orderNum: '2643.....'
      }],
      currentRow: 0
    }
  }
}
</script>

<style>

</style>
