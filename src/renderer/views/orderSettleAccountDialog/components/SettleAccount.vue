<template>
  <div id="settle-account">
    <div class="input-group">
      <ul>
        <li class="check_item" v-for="(type,index) in paytypes" :key="index">
          <input class="check_radio"
            type="radio"
            :id="index"
            :value="type.sign"
            v-model="transactionModel.way"
            data-is-hand-point=""
            >
            <label :for="index">{{type.alias}}</label>
        </li>
      </ul>
    </div>
    <div class="form">
      <el-form
        label-width="100px"
      >
        <el-row>
          <el-col :span="9">
            <el-form-item label="金额:">
              <el-input
                v-model="transactionModel.price"
                placeholder="请填写金额"
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="备注:">
              <el-input
                v-model="transactionModel.pay_remark"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
         <el-col :span="22">
            <el-form-item label="交易单号:">
              <el-input
                v-model="transactionModel.transaction_no"
                placeholder="请交易单号"
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button type="success" size="small" @click="doSettleAccount">结账</el-button>
    </div>
  </div>
</template>
<script>
import {getPaytypes, settleAccount} from '@/api/order'
export default {
  data () {
    return {
      paytypes: [],
      transactionModel: {
        transaction_no: '',
        type: 'IN',
        way: '',
        pay_remark: '',
        price: ''
      }
    }
  },
  props: {
    orderNo: String
  },
  created () {
    this.doGetPaytypes()
  },
  methods: {
    showSettleAccountDialogLoading () {
      this.$emit('openLoadingOrderSettleAccount', true)
    },
    closeSettleAccountDialogLoading () {
      this.$emit('openLoadingOrderSettleAccount', false)
    },
    doGetPaytypes () {
      this.showSettleAccountDialogLoading()
      getPaytypes().then(response => {
        this.paytypes = response.data.data
        console.log(this.paytypes)
        this.closeSettleAccountDialogLoading()
      }).catch(err => {
        alert(err)
      })
    },
    doSettleAccount () {
      console.log(this.transactionModel)
      settleAccount(this.orderNo, {
        transaction_no: this.transactionModel.transaction_no,
        type: this.transactionModel.type,
        way: this.transactionModel.way,
        pay_remark: this.transactionModel.pay_remark,
        price: this.transactionModel.price
      }).then(response => {

      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#settle-account {
  .input-group {
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
    font-size: 0;
    .check_radio {
      margin: 0 5px;
      vertical-align: middle;
    }
    .check_item {
      float: left;
      width: 30%;
      padding-left: 40px;
      height: 35px;
      line-height: 35px;
      display: flex;
      align-items: center;
      text-align: left;
      font-size: 16px;
      margin: 0;
    }
    input{
      min-width: 30px
    }
    label{
      min-width: 100px;
      margin:0
    }
  }
  .form{
    margin-top:15px;
  }
}
</style>

