<template>
  <div v-loading="loadingDetail">
    <div class="order_detail_container">
      <table class="t table table-bordered table-hover table_info">
        <tbody>
          <tr class="table_info_tr">
            <td><span class="info_name">订单号:</span><span class="info-value">{{order_no}}</span></td>
            <td><span class="info_name">订购人:</span><span class="info-value">{{detailData.customer}}</span></td>
            <td><span class="info_name">电话:</span><span class="info-value">{{detailData.phone}}</span></td>
          </tr>
          <tr class="table_info_tr">
            <td><span class="info_name">支付方式:</span><span class="info-value">{{detailData.pay_type}}</span></td>
            <td><span class="info_name">订单类型:</span><span class="info-value">{{detailData.order_type}}</span></td>
            <td><span class="info_name">创建时间:</span><span class="info-value">2018-12-24 13:56:25</span></td>
          </tr>
        </tbody>
      </table>
      <table class="t table table-bordered table-hover table_goods">
        <tbody>
          <tr class="tr_title">
            <td class="td_title">商品名称</td>
            <td class="td_title">数量</td>
            <td class="td_title">使用时间</td>
            <td class="td_title">小计</td>
            <td class="td_title">房间号</td>
            <td class="td_title">操作</td>
          </tr>
          <tr v-if="detailData.detail.length===0">
            <td colspan="5">
              暂无数据
            </td>
          </tr>
          <tr v-for="(detail,index) in detailData.detail" :key="index">
            <td>{{detail.name}}</td>
            <td>{{detail.quantity}}</td>
            <td>{{detail.use_time}}</td>
            <td>{{detail.price}}</td>
            <td>{{detail.roomNosList.length ? detail.roomNosList.join(", ") : '无'}}</td>
            <td>
              <el-button size="mini" type="primary" v-if="(detail.action === 1)" @click="handleChooseRoom(detail)">选房</el-button>
              <span v-if="(detail.action === -1)">不可选房</span>
            </td>
          </tr>
        </tbody>
      </table>

      <table class="t table table-bordered table-hover table_goods_remark">
        <tbody>
          <tr class="tr_first">
            <td class="td_title">总价:</td>
            <td colspan="3">2300.00</td>
          </tr>

          <tr>
            <td class="td_title">大餐庙会备注:</td>
            <td colspan="3"></td>
          </tr>
          <tr>
            <td class="td_title">旅行社订单号:</td>
            <td colspan="3"></td>
          </tr>
        </tbody>
      </table>

      <table class="t table table-bordered table-hover table_customer">

        <tbody>
          <tr class="tr_title">
            <td class="td_title">入住人姓名</td>
            <td class="td_title">手机号</td>
            <td class="td_title">会员卡号</td>
            <td class="td_title">身份证号</td>
          </tr>

          <tr v-for="(contact,index) in detailData.contacts" :key="index">
            <td>{{contact.contact_name}}</td>
            <td>{{contact.contact_phone}}</td>
            <td>{{contact.contact_id_card}}</td>
            <td></td>
          </tr>

          <tr class="tr_user_remark">
            <td class="td_title">用户备注:</td>
            <td colspan="5"></td>
          </tr>
          <tr class="tr_b_remark">
            <td class="td_title">后台备注:</td>
            <td class="td_bs_remark" colspan="5">
              <span class="remark_txt"></span>
              <el-tag
                v-for="(tag,index) in remarkList"
                :key="tag"
                :color="colorList[index]" class="my-tag"
                :style="{'color':oppositeColor(colorList[index])}"
                closable>{{tag}}</el-tag>
              <el-button type="text" @click="showBackendRemarkDialog">添加</el-button>
            </td>
          </tr>
          <tr class="tr_pay_remark">
            <td class="td_title">支付记录:</td>
            <td colspan="5" class="td_pay_record">
              <div class="pay_remark" title="">
                支付时间：2018-12-24 16:12:27 操作员:田彬2 微信公众号 收入:500.00
                <el-button size="mini">修改</el-button>
                <el-button size="mini">撤销</el-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="backendRemarkDialog">
      <el-dialog
        title="后台备注"
        :visible.sync="backendRemarkDialogVisible"
        append-to-body
        width="30%">
        <div>
          <div>
            <el-checkbox-group v-model="remarkSelect" size="small">
              <el-checkbox
                :label="option"
                v-for="(option,index) in remarkOptions"
                :key="option"
                border
                :class="{'mg-left-10':index===0}"></el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="mg-left-10">
            <el-input type="textarea" placeholder="填写备注内容"></el-input>
          </div>
          <div class="remark-footer">
            <el-button type="danger" size="small">保存</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
    <choose-room-dialog
            ref="chooseRoomDialog"
            @loadingStart="loadingDetail=true"
            @loadingEnd="loadingDetail=false"></choose-room-dialog>
  </div>
</template>
<script>
import {getOrderDetail} from '@/api/order'
import {dateStringToDateNum} from '@/utils/date'
import ChooseRoomDialog from '../../chooseRoomDialog/ChooseRoomDialog'
export default {
  props: {
    orderNo: String
  },
  components: {ChooseRoomDialog},
  data () {
    return {
      loadingDetail: false,
      backendRemarkDialogVisible: false,
      remarkSelect: [],
      remarkOptions: ['散客', 'L类保密', '尊尚', '加1童', '大床', '非吸烟', '送单车', '送单车及千色', '双床', '相连房', '高楼层', '送千色', '时光邮驿'],
      colorList: [],
      order_no: this.orderNo,
      detailData: {
        customer: '',
        phone: '',
        pay_type: '',
        order_type: '',
        ctime: '',
        detail: [],
        payed_sum: '',
        contacts: [],
        pay_remark: ''
      }
    }
  },
  computed: {
    remarkList () {
      let tags = this.detailData.pay_remark.split(';')
      tags.forEach((tag, index) => {
        if (!this.remarkOptions.includes(tag.trim())) {
          tags.splice(index, 1)
        }
      })
      return tags
    },
    isReload: function () {
      return this.$store.getters.getIsChosen
    }
  },
  watch: {
    isReload () {
      this.fetchOrderDetailData()
    },
    remarkList (newList) {
      while (this.colorList.length < newList.length) {
        this.colorList.push(this.color16())
      }
      this.remarkSelect = this.remarkList
    },
    orderNo (newOrder) {
      this.order_no = newOrder
      this.fetchOrderDetailData()
    }
  },
  created () {
    this.fetchOrderDetailData()
  },
  methods: {
    fetchOrderDetailData () {
      this.$emit('loadingStart')
      getOrderDetail(this.order_no).then(reponse => {
        this.$emit('loadingEnd')
        let data = reponse.data.data
        this.detailData.customer = data.customer
        this.detailData.phone = data.phone
        this.detailData.pay_type = data.pay_type
        this.detailData.order_type = data.order_type
        this.detailData.ctime = data.ctime
        this.detailData.payed_sum = data.payed_sum
        this.detailData.detail = data.detail === null ? [] : data.detail
        this.detailData.contacts = data.contacts
        this.detailData.pay_remark = data.pay_remark
        this.detailData.detail.forEach(ele => {
          ele['action'] = this.getOrderDetailAction(ele, data.state)
          ele.roomNosList = this.getRoomNosByDetail(ele)
        })
      }).catch(reason => {
        this.$emit('loadingEnd')
        this.$message.error(reason.message)
      })
    },
    getRoomNosByDetail (detail) {
      let key = dateStringToDateNum(detail.use_time)
      if (detail === null || detail.room_nos === null || !detail.room_nos.hasOwnProperty(key)) {
        return []
      }
      let roomNos = Object.values(detail.room_nos[key]).map(function (item) {
        return item.room_id + ''
      })
      return roomNos
    },
    getOrderDetailAction: function (data, state) {
      // -1不可选 1可选
      if (data.type_id !== -1 && data.store_no === this.$store.getters.getShopId && (state === '未支付' || state === '已支付' || state === '已完成')) {
        return 1
      } else {
        return -1
      }
    },
    showBackendRemarkDialog () {
      this.backendRemarkDialogVisible = true
    },
    color16 () {
      var r = Math.floor(Math.random() * 250)
      var g = Math.floor(Math.random() * 250)
      var b = Math.floor(Math.random() * 250)
      var color = '#' + r.toString(16) + g.toString(16) + b.toString(16)
      if (color.length < 7) {
        color += Math.floor(Math.random() * 10)
      }
      return color
    },
    oppositeColor (color) {
      let whiteColor = '#fff'
      let blackColor = '#000'
      let r = parseInt(color.substr(1, 2), 16)
      let g = parseInt(color.substr(3, 2), 16)
      let b = parseInt(color.substr(5, 2), 16)
      // 亮度算法
      // lightness = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255
      let lightness = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255
      let threshold = 0.5
      if (lightness > threshold) {
        return blackColor
      }
      return whiteColor
    },
    handleChooseRoom (detail) {
      this.$refs.chooseRoomDialog.showDialog()
      this.$refs.chooseRoomDialog.setOrderItem(detail)
    }
  }
}
</script>
<style lang="scss">
.my-tag{
  .el-icon-close{
    color: inherit!important;
  }
}
</style>

<style lang="scss" scoped>
.mg-left-10 {
  margin-left: 10px;
}
.t {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  text-align: left;
  tr td {
    height: 35px;
    padding: 5px 10px;
    border: 1px solid #d6d6d8;
    font-size: 12px;
    vertical-align: middle;
  }
  .tr_title {
    background: #f4f4f4;
  }
  .table_info_tr td {
    padding: 0;
    vertical-align: middle;
  }
  .info_name {
    display: flex;
    align-items: center;
    width: 80px;
    height: 100%;
    font-weight: bold;
    background: #f4f4f4;
    padding: 0 0 0 10px;
    border-right: 1px solid #d6d6d8;
    margin-right: 10px;
    font-size: 13px;
    float: left;
    vertical-align: middle;
  }
  .info-value {
    display: flex;
    align-items: center;
    height: 100%;
  }
}
.my-tag{
  margin-right: 10px;
}
.table_goods {
  margin-bottom: 0 !important;
}
.table_goods_remark {
  border-top: 0;
  .tr_first {
    td {
      border-top: 0;
    }
  }
  .td_title {
    min-width: 100px;
    width: 110px;
    background: #ffffff;
    text-align: left;
  }
}
.td_title {
  min-width: 100px;
  font-weight: 700;
}
.remark-footer,
.footer {
  display: flex;
  justify-content: flex-end;
}
.remark-footer {
  margin-top: 20px;
}
</style>
