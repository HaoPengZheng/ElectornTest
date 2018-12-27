<template>
  <div>
    <div class="order_detail_container">
      <table class="t table table-bordered table-hover table_info">
        <tbody>
          <tr class="table_info_tr">
            <td><span class="info_name">订单号:</span>{{order_no}}</td>
            <td><span class="info_name">订购人:</span>{{detailData.customer}}</td>
            <td><span class="info_name">电话:</span>{{detailData.phone}}</td>
          </tr>
          <tr class="table_info_tr">
            <td><span class="info_name">支付方式:</span>{{detailData.pay_type}}</td>
            <td><span class="info_name">订单类型:</span>{{detailData.order_type}}</td>
            <td><span class="info_name">创建时间:</span>2018-12-24 13:56:25</td>
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
            <td>{{detail.roomNos}}</td>
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
            <td
              class="td_bs_remark"
              colspan="5"
            ><span class="remark_txt"></span>
              <el-tag
                v-for="(tag,index) in remarkList"
                :key="tag"
                :color="colorList[index]" class="my-tag"
                :style="{'color':oppositeColor(colorList[index])}"
                closable
              >
                {{tag}}
              </el-tag>
              <el-button
                type="text"
                @click="showBackendRemarkDialog"
              >
                添加
              </el-button>
            </td>
          </tr>
          <tr class="tr_pay_remark">
            <td class="td_title">支付记录:</td>
            <td
              colspan="5"
              class="td_pay_record"
            >
              <div
                class="pay_remark"
                title=""
              >支付时间：2018-12-24 16:12:27 操作员:田彬2 微信公众号 收入:500.00
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
        width="30%"
      >
        <div>
          <div>
            <el-checkbox-group
              v-model="remarkSelect"
              size="small"
            >
              <el-checkbox
                :label="option"
                v-for="(option,index) in remarkOptions"
                :key="option"
                border
                :class="{'mg-left-10':index===0}"
              ></el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="mg-left-10">
            <el-input
              type="textarea"
              placeholder="填写备注内容"
            ></el-input>
          </div>
          <div class="remark-footer">
            <el-button
              type="danger"
              size="small"
            >保存</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {getOrderDetail} from '@/api/order'
import {dateStringToDateNum} from '@/utils/date'
export default {
  props: {
    orderNo: String
  },
  data () {
    return {
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
      console.log(this.detailData.pay_remark)
      let tags = this.detailData.pay_remark.split(';')
      tags.forEach((tag, index) => {
        if (!this.remarkOptions.includes(tag.trim())) {
          tags.splice(index, 1)
        }
      })
      return tags
    }
  },
  watch: {
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
      getOrderDetail(this.order_no).then(reponse => {
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
          ele.roomNos = this.getRoomNosByDetail(ele)
        })
      })
    },
    getRoomNosByDetail (detail) {
      let key = dateStringToDateNum(detail.use_time)
      let roomNos = ''
      if (detail === null || detail.room_nos === null || !detail.room_nos.hasOwnProperty(key)) {
        return '无'
      }
      detail.room_nos[key].forEach((ele, index) => {
        roomNos += ele.room_id
        if (index > 0) {
          roomNos += ','
        }
      })
      console.log(roomNos)
      return roomNos
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
      console.log(color)
      return color
    },
    oppositeColor (color) {
      let whiteColor = '#fff'
      let blackColor = '#000'
      let r = parseInt(color.substr(1, 2), 16)
      let g = parseInt(color.substr(3, 2), 16)
      let b = parseInt(color.substr(5, 2), 16)
      let count = 0
      if (r > 150) {
        count++
      }
      if (g > 150) {
        count++
      }
      if (b > 150) {
        count++
      }
      if (count > 2) {
        return blackColor
      }
      return whiteColor
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
    line-height: 35px;
    padding: 0 10px;
    padding-top: 0px;
    padding-right: 10px;
    padding-bottom: 0px;
    padding-left: 10px;
    border: 1px solid #d6d6d8;
    border-top-color: rgb(214, 214, 216);
    border-top-style: solid;
    border-top-width: 1px;
    border-right-color: rgb(214, 214, 216);
    border-right-style: solid;
    border-right-width: 1px;
    border-bottom-color: rgb(214, 214, 216);
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-left-color: rgb(214, 214, 216);
    border-left-style: solid;
    border-left-width: 1px;
    border-image-source: initial;
    border-image-slice: initial;
    border-image-width: initial;
    border-image-outset: initial;
    border-image-repeat: initial;
    font-size: 12px;
  }
  .tr_title {
    background: #f4f4f4;
  }
  .table_info_tr td {
    padding: 0;
  }
  .info_name {
    display: inline-block;
    width: 80px;
    height: 100%;
    font-weight: bold;
    background: #f4f4f4;
    padding: 0 0 0 10px;
    border-right: 1px solid #d6d6d8;
    margin-right: 10px;
    font-size: 13px;
    float: left;
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
