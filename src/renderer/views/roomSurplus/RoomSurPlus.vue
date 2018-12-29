<template>
  <div class="room-surplus">
    <el-date-picker
      class="date-picker"
      v-model="date"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      format="yyyy-MM-dd"
      value-format="timestamp"
      @change="updateRoomSurplus"
    ></el-date-picker>

    <el-table
      :data="dataRoomSurplus"
      v-loading="loading"
      height="calc(100% - 60px)"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        fixed
        header-align="center"
        width="150">
        <template slot-scope="scope">
          {{scope.row.date}}&nbsp;
          <span :class="{red: (scope.row.week === '六' || scope.row.week === '日')}">({{scope.row.week}})</span>
        </template>
      </el-table-column>
      <el-table-column
      v-for="roomTypeItem in tableHeadRoomSurplus"
      :key="roomTypeItem"
      :label="roomTypeItem"
      header-align="center"
      >
        <el-table-column
          :prop='roomTypeItem+"_max_num"'
          label="总量"
          width=""
          header-align="center">
        </el-table-column>
        <el-table-column
          :prop='roomTypeItem+"_left_num"'
          label="剩余"
          width=""
          header-align="center">
          <template slot-scope="scope">
            <span :class="{red: (scope.row[roomTypeItem+'_left_num'] <= 0)}">{{scope.row[roomTypeItem+'_left_num']}}</span>
          </template>
        </el-table-column>
        <!--<el-table-column-->
          <!--:prop='roomTypeItem+"_op_num"'-->
          <!--label="官网总量"-->
          <!--width=""-->
          <!--header-align="center">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--:prop='roomTypeItem+"_op_down_num"'-->
          <!--label="官网已下"-->
          <!--width=""-->
          <!--header-align="center">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--:prop='roomTypeItem+"_reserved_num"'-->
          <!--label="必留"-->
          <!--width=""-->
          <!--header-align="center">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--:prop='roomTypeItem+"_reserved_down_num"'-->
          <!--label="必留已下"-->
          <!--width=""-->
          <!--header-align="center">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--:prop='roomTypeItem+"_upkeep_num"'-->
          <!--label="维修"-->
          <!--width=""-->
          <!--header-align="center">-->
        <!--</el-table-column>-->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getRoomSurplus } from '@/api/room'
import { dateNumToDateString, getDateWeekByDateNum } from '@/utils/date'

export default {
  name: 'RoomSurPlus',
  data () {
    return {
      date: [],
      dataRoomSurplus: [],
      tableHeadRoomSurplus: [],
      loading: false
    }
  },
  created () {
    let d = new Date()
    d.setHours(0, 0, 0, 0)
    let startTime = d.getTime()
    let endTime = startTime + (1000 * 3600 * 24 * 30 * 1)
    this.date = [startTime, endTime]
    this.updateRoomSurplus()
  },
  methods: {
    updateRoomSurplus: function () {
      let beginDate = (new Date(this.date[0]).setHours(0, 0, 0, 0) + '').substring(0, 10)
      let endDate = (new Date(this.date[1]).setHours(0, 0, 0, 0) + '').substring(0, 10)
      let query = {
        begin_date: beginDate,
        end_date: endDate
      }
      this.loading = true
      getRoomSurplus(query).then(response => {
        this.loading = false
        let data = this.formatRoomSurplus(response.data.data)
        this.setRoomSurplus(data)
      }).catch(reason => {
        this.loading = false
      })
    },
    formatRoomSurplus: function (data) {
      let dateObj = {}
      for (let i = 0; i < data.length; i++) {
        let typeName = data[i].type_name
        if (this.tableHeadRoomSurplus.indexOf(typeName) === -1) {
          this.tableHeadRoomSurplus.push(typeName)
        }
        let date = dateNumToDateString(data[i].book_date)
        let keys = Object.keys(data[i])
        if (dateObj[date] === undefined) {
          dateObj[date] = {}
          dateObj[date]['date'] = date
        }
        for (let j = 0; j < keys.length; j++) {
          dateObj[date][data[i].type_name + '_' + keys[j]] = data[i][keys[j]]
        }
        let leftNum = data[i]['max_num'] - data[i]['op_down_num'] - data[i]['op_down_num'] - data[i]['reserved_down_num']
        dateObj[date][data[i].type_name + '_left_num'] = leftNum
        dateObj[date]['week'] = getDateWeekByDateNum(data[i].book_date)
      }
      return Object.values(dateObj)
    },
    setRoomSurplus: function (data) {
      this.dataRoomSurplus = data
    }
  }
}
</script>

<style scoped lang="scss">
  .room-surplus {
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
  .date-picker {
    margin: 0 auto 20px;
  }
  .red {
    font-weight: bold;
    color: red;
  }
</style>