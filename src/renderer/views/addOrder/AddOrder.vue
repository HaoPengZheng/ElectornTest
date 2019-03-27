<template>
    <div class="add-order">
        <div class="main">
            <div class="goods-list">
                <el-collapse v-model="activeRoomTypeList"
                             @change="handleChangeActiveRoomType">
                    <el-collapse-item
                            v-for="item in roomType"
                            :key="item.type_id"
                            :name="item.type_id">
                        <template slot="title">
                            <div class="room-type-item">{{item.type_name}}</div>
                        </template>
                        <div class="goods-item"
                             v-for="(goodsItem, goodsIdx) in GoodsListByRoomType[item.type_id]"
                             :key="goodsIdx" @click="handleChooseGoodsItem(goodsItem)">{{goodsItem.name}}</div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div class="goods-main"></div>
        </div>
    </div>
</template>

<script>
import { roomtypes } from '@/api/room'
import { goods } from '@/api/goods'
export default {
  name: 'AddOrder',
  data () {
    return {
      roomType: [],
      GoodsListByRoomType: {},
      activeRoomTypeList: [],
      orderList: []
    }
  },
  created () {
    this.getRoomTypes()
  },
  methods: {
    getRoomTypes: function () {
      roomtypes(this.$store.getters.getShopId).then(response => {
        this.roomType = response.data.data
      }).catch(reason => {
        this.$message.error(reason.message)
      })
    },
    getGoods: function (typeId) {
      if (this.GoodsListByRoomType[typeId] === undefined) {
        goods({type_id: typeId}).then(response => {
          this.GoodsListByRoomType[typeId] = response.data.data
          let temp = this.activeRoomTypeList
          this.activeRoomTypeList = []
          this.activeRoomTypeList = temp
        }).catch(reason => {
          this.$message.error(reason.message)
        })
      }
    },
    handleChangeActiveRoomType: function () {
      for (let i = 0; i < this.activeRoomTypeList.length; i++) {
        this.getGoods(this.activeRoomTypeList[i])
      }
    },
    handleChooseGoodsItem: function (data) {
      console.log(data)
    }
  }
}
</script>

<style scoped lang="scss">
.add-order {
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    text-align: initial;
    .main {
        display: flex;
        height: 100%;
        background: #fff;
        overflow: auto;
        .goods-list {
            width: 300px;
            height: 100%;
            overflow: auto;
            border-right: 1px solid #ddd;
            background: #ddd;
            .room-type-item {
                padding-left: 20px;
            }
            .goods-item {
                padding: 10px 20px;
                border-top: 1px solid #fff;
                background: #e7e1cd;
                cursor: pointer;
                &:hover {
                    background: #847f72;
                    color: #fff;
                }
            }
        }
    }
}
</style>
