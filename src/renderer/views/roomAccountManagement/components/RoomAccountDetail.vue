<template>
  <div style="display:flex;flex-direction: column;height: 100%;">
    <table class="room-detail-table table table-bordered table-hover">
      <tbody>
        <tr class="active">
          <td>房号：307</td>
          <td>房价：430</td>
          <td>服务费：FLASE</td>
          <td>加床费：0</td>
          <td>状态：住</td>
        </tr>
        <tr>
          <td colspan="2">入店日期：</td>
          <td>停留天数：1</td>
          <td colspan="2" rowspan="6">
            <p>姓名：港办-袁惠</p>
            <p>性别：男</p>
            <p>民族：汉族</p>
            <p>住址：</p>
            <p>身份证号：</p>
          </td>
        </tr>
        <tr>
          <td colspan="2">预离日期</td>
          <td>营销部</td>
        </tr>
        <tr>
          <td>结算方式： 现金</td>
          <td>客类： 网络</td>
          <td>销售员：网络</td>
        </tr>
        <tr>
          <td colspan="3">账务信息：ALL</td>
        </tr>
        <tr>
          <td colspan="3" rowspan="2">备注：</td>
        </tr>
      </tbody>
    </table>
    <div class="height-fill-available">
      <el-table :data="tableData3" style="height:100%;width:100%;" :height="`98%`" border>
        <el-table-column prop="date" label="序号" ></el-table-column>
        <el-table-column prop="name" label="结算" ></el-table-column>
        <el-table-column prop="address" label="摘要"></el-table-column>
        <el-table-column prop="date" label="数量" ></el-table-column>
        <el-table-column prop="name" label="单价" ></el-table-column>
        <el-table-column prop="address" label="折扣"></el-table-column>
        <el-table-column prop="date" label="借方" ></el-table-column>
        <el-table-column prop="name" label="贷方" ></el-table-column>
        <el-table-column prop="address" label="状态"></el-table-column>
         <el-table-column prop="address" label="操作员"></el-table-column>
         <el-table-column prop="date" label="入单时间" ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData3: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市'
        }
      ]
    }
  }
}
</script>
<style scoped>
.room-detail-table {
  padding-right: 20px;
}
td {
  text-align: left;
}
</style>
