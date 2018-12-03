<template>
  <div class="choose-room">
    <div class="room-container">
      <div class="time-bar">
        <el-date-picker
          v-model="startDate"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="timestamp">
        </el-date-picker>
        <div class="date-scroll">
          <span class="date-item"
                v-for="(dateItem, index) in dateList"
                :class="{ active: (index === currentDateItem) }"
                @click="dateItemClick(index, dateItem.timestamp)">
            {{dateItem.date}} ({{dateItem.week}})
          </span>
        </div>
      </div>
      <div class="type-bar">
        <span class="type-item"
              :class="{ active: currentTypeId === -1 }"
              @click="typeItemClick(-1)">全部</span>
        <span class="type-item"
              v-for="typeItem in roomType"
              :class="{ active: (typeItem.type_id === currentTypeId) }"
              @click="typeItemClick(typeItem.type_id)">{{typeItem.type_name}}</span>
      </div>
      <div class="rooms">
        <div class="floor-item" v-for="(floorItem, index) in floorRooms">
          <div class="floor-name">{{index}}F</div>
          <div class="floor-rooms">
            <div class="room-item"
                 v-for="roomItem in floorItem"
                 v-show="currentTypeId === -1 || currentTypeId === roomItem.type_id">
              {{roomItem.room_num}}<br/>
              <span class="type-name">{{roomItem.type_name}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="status-bar"></div>
    </div>
    <div class="order-container"></div>
  </div>
</template>

<script>
import { getShopsRooms } from '@/api/room'
import { dateNumToDateString, getDateWeekByDateNum } from '@/utils/date'

export default {
  name: 'ChooseRoom',
  data () {
    return {
      startDate: '',
      dateList: [],
      currentDateItem: 0,
      currentTypeItem: 0,
      currentTypeId: -1,
      roomType: [],
      floorRooms: {}
    }
  },
  created () {
    let d = new Date()
    d.setHours(0, 0, 0, 0)
    this.startDate = d.getTime()

    let startDate = +((d.getTime() + '').substring(0, 10))
    let list = []
    for (let i = 0; i < 30; i++) {
      let temp = startDate + 3600 * 24 * i
      let date = dateNumToDateString(temp)
      var obj = {
        date: date,
        timestamp: temp,
        week: getDateWeekByDateNum(temp)
      }
      list.push(obj)
    }
    this.dateList = list
    this.getRooms()
  },
  methods: {
    dateItemClick: function (index, date) {
      this.currentDateItem = index
    },
    typeItemClick: function (typeId) {
      this.currentTypeId = typeId
    },
    getRooms: function () {
      getShopsRooms().then(response => {
        this.formatRoomsData(response.data.data)
      })
    },
    formatRoomsData: function (data) {
      let roomType = []
      let roomTypeTemp = []
      let floorRooms = {}
      for (let i = 0; i < data.length; i++) {
        if (roomTypeTemp.indexOf(data[i].type_name) === -1) {
          let obj = {type_id: data[i].type_id, type_name: data[i].type_name}
          roomTypeTemp.push(data[i].type_name)
          roomType.push(obj)
        }
        if (floorRooms[data[i].floor] === undefined) {
          floorRooms[data[i].floor] = []
        }
        floorRooms[data[i].floor].push(data[i])
      }
      this.roomType = roomType
      this.floorRooms = floorRooms
    }
  }
}
</script>

<style scoped lang="scss">
  .choose-room {
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    height: 100%;
    text-align: left;
    .room-container {
      display: flex;
      flex-direction: column;
      flex: 1;
      .time-bar, .type-bar, .status-bar {
        display: flex;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;
      }
      .time-bar {
        display: flex;
        min-height: 60px;
        border-bottom: 1px solid #ddd;
        .date-scroll {
          flex: 1;
          width: 100px;
          padding: 0 10px;
          white-space: nowrap;
          overflow: auto;
          .date-item {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            margin: 0 10px 0 0;
            border-radius: 3px;
            font-size: 12px;
            background: #55a532;
            color: #fff;
            cursor: pointer;
            &:hover {
              background: #30601d;
            }
            &.active {
              background: #222;
              &:hover {
                background: #222;
              }
            }
          }
        }
      }
      .type-bar {
        min-height: 60px;
        border-bottom: 1px solid #ddd;
        .type-item {
          display: inline-block;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          margin: 0 10px 0 0;
          border-radius: 3px;
          font-size: 12px;
          background: #55a532;
          color: #fff;
          cursor: pointer;
          &:hover {
            background: #30601d;
          }
          &.active {
            background: #222;
            &:hover {
              background: #222;
            }
          }
        }
      }
      .status-bar {
        min-height: 60px;
        background: #795da3;
      }
      .rooms {
        flex: 1;
        padding: 10px;
        box-sizing: border-box;
        overflow: auto;
        .floor-item {
          .floor-name {
            padding: 20px 0;
            font-size: 30px;
          }
          .floor-rooms {
            &:after {
              content: '';
              display: block;
              clear: both;
            }
            .room-item {
              float: left;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              width: 100px;
              height: 90px;
              border: 1px solid #f1f1f1;
              font-size: 20px;
              font-weight: bold;
              background: #6ccac9;
              color: #ff6c60;
              cursor: pointer;
              .type-name {
                font-size: 18px;
                color: #8175c7;
              }
            }
          }
        }
      }
    }
    .order-container {
      width: 250px;
      background: #e7e1cd;
    }
  }
</style>