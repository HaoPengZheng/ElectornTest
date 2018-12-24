<template>
  <div>
    <div class="order-list-toolbar">
      <div class="toolbar-options">
        <el-form
          :inline="true"
          :model="baseSearchModel"
          class="demo-form-inline"
          style="height: 40px;"
        >
          <el-form-item label="订单号:">
            <div style="width:140px">
              <el-input v-model="baseSearchModel.no" placeholder="订单号" size="mini"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="订购人:">
            <div style="width:80px">
              <el-input v-model="baseSearchModel.customer" placeholder="订购人" size="mini"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="联系号码:">
            <div style="width:105px">
              <el-input v-model="baseSearchModel.phone" placeholder="联系号码" size="mini"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="入住时间:">
            <div style="width:125px">
              <el-date-picker
                v-model="baseSearchModel.use_time"
                type="date"
                placeholder="选择日期"
                size="mini"
                style="width:100%"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="cleanSearch" size="mini">清空</el-button>
            <el-button type="primary" @click="doBaseSearch" size="mini">查询</el-button>
            <el-button
              type="primary"
              @click="isMoreSearchVisibility=!isMoreSearchVisibility"
              size="mini"
            >更多搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="toolbar-pagination" style="padding-top：50px">
        <el-pagination
          :pager-count="5"
          :current-page="getCurrentPage"
          :page-sizes="[15,30,60]"
          :page-size="15"
          layout="total, sizes, prev, pager, next, jumper"
          :total="getTotal"
          @size-change="sizeChange"
          @current-change="changePage"
        ></el-pagination>
      </div>
    </div>
    <div class="more-search" id="more-search" v-show="isMoreSearchVisibility" :size="formUiSize">
      <hr style="border: 1px solid #e4e7ed;margin:10px 0">
      <el-form
        ref="moreSearchForm"
        :model="moreSearchModel"
        label-position="right"
        label-width="120px"
      >
        <el-form-item label="商品名：">
          <el-col :span="fromInputSize">
            <el-input v-model="moreSearchModel.goodName" :size="formUiSize"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="订单号：">
          <el-col :span="fromInputSize">
            <el-input v-model="moreSearchModel.goodName" :size="formUiSize"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="订购人：">
          <el-col :span="fromInputSize">
            <el-input v-model="moreSearchModel.goodName" :size="formUiSize"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="联系号码：">
          <el-col :span="fromInputSize">
            <el-input v-model="moreSearchModel.goodName" :size="formUiSize"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="创建时间：">
          <el-col :span="6">
            <el-date-picker type="date" placeholder="选择日期" style="width: 100%;" :size="formUiSize"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">——</el-col>
          <el-col :span="6">
            <el-date-picker type="date" placeholder="选择日期" style="width: 100%;" :size="formUiSize"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="入住日期：">
          <el-col :span="6">
            <el-date-picker type="date" placeholder="选择日期" style="width: 100%;" :size="formUiSize"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">——</el-col>
          <el-col :span="6">
            <el-date-picker type="date" placeholder="选择日期" style="width: 100%;" :size="formUiSize"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="人数：">
          <el-col :span="fromInputSize">
            <el-input v-model="moreSearchModel.goodName" :size="formUiSize"></el-input>
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="支付方式：">
          <el-col :span="4">
            <el-select placeholder="请选择支付方式" :size="formUiSize" style="width:100%">
              <el-option label="微信" value="weixin"></el-option>
              <el-option label="支付宝" value="beijing"></el-option>
            </el-select>
          </el-col>
        </el-form-item>-->
        <el-form-item label="订单状态：">
          <el-input v-model="moreSearchModel.orderNum" :size="formUiSize"></el-input>
        </el-form-item>
        <el-form-item label="房型：">
          <div class="room-type-checkbox" style="display:flex;justify-content:flex-start;">
            <el-checkbox
              label="全选"
              v-model="checkAllTypes"
              @change="handleChangeAllTypes"
              style="margin-right:20px"
            ></el-checkbox>
            <el-checkbox-group
              v-model="moreSearchModel.checkedRoomTypes"
              @change="handleCheckedRoomTypes"
            >
              <el-checkbox v-for="(option,index) in roomTypeOptions" :key="index" :label="option"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <!-- <el-form-item label="是否处理：">
          <el-col :span="4">
            <el-select placeholder="是否处理？" :size="formUiSize" style="width:100%">
              <el-option label="全部" value="weixin"></el-option>
              <el-option label="已处理" value="beijing"></el-option>
            </el-select>
          </el-col>
        </el-form-item>-->
        <el-form-item label="会员：">
          <el-input v-model="moreSearchModel.orderNum" :size="formUiSize"></el-input>
        </el-form-item>
        <el-form-item label="操作员：">
          <el-col :span="fromInputSize">
            <el-input v-model="moreSearchModel.goodName" :size="formUiSize"></el-input>
          </el-col>
        </el-form-item>
        <el-button type="primary" :size="formUiSize">确定</el-button>
        <el-button :size="formUiSize">取消</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import { getOrders } from '@/api/order'
import { roomtypes } from '@/api/room'
import { dateStringToDateNum, getNowFormatDate } from '@/utils/date'
import objectUtil from '@/utils/ObjectUtil'
export default {
  name: 'order-list-toolbar',
  data () {
    return {
      isMoreSearchVisibility: false,
      formUiSize: 'small',
      fromInputSize: 8,
      roomTypesObject: {},
      roomTypeOptions: [],
      checkAllTypes: false,
      baseSearchModel: {
        no: '',
        customer: '',
        phone: '',
        use_time: getNowFormatDate()
      },
      moreSearchModel: {
        goodName: '',
        orderNum: '',
        checkedRoomTypes: []
      }
    }
  },
  created () {
    this.getRoomtypes()
  },
  methods: {
    getRoomtypes () {
      let shopId = this.$store.getters.shop
      roomtypes(shopId).then(response => {
        this.roomTypesObject = response.data.data
        this.roomTypeOptions = this.converterRoomTypesObjectToRoomTypeOptionArr(this.roomTypesObject)
      })
    },
    sizeChange (limit) {
      let query = objectUtil.deepCopy(this.$store.state.OrderQuery.orderQuery)
      query.page = 1
      query.limit = limit
      this.getOrdersByQuery(query)
    },
    changePage (currentPage) {
      // let orderListData = this.$store.getters.getOrderListHistory.hasOwnProperty(currentPage) ? this.$store.getters.getOrderListHistory[currentPage] : undefined
      // if (orderListData === undefined) {
      let query = objectUtil.deepCopy(this.$store.state.OrderQuery.orderQuery)
      query.page = currentPage
      this.getOrdersByQuery(query)
      // } else {
      //   this.$store.dispatch('updateOrderListData', orderListData)
      // }
    },
    getOrdersByQuery (query) {
      this.$store.dispatch('updateTableLoading', true)
      getOrders(query)
        .then(response => {
          this.$store.dispatch('updateOrderQuery', query)
          this.$store.dispatch('updateOrderListData', response.data)
          this.$store.dispatch('updateTableLoading', false)
        })
        .catch(() => {
          this.$store.dispatch('updateTableLoading', false)
        })
    },
    doBaseSearch () {
      let preQuery = objectUtil.deepCopy(this.$store.state.OrderQuery.orderQuery)
      let query = {
        page: 1,
        limit: preQuery.limit
      }
      for (let key in this.baseSearchModel) {
        if (
          this.baseSearchModel[key] !== '' &&
          this.baseSearchModel[key] !== undefined
        ) {
          query[key] = this.baseSearchModel[key]
        }
      }
      if (query.hasOwnProperty('use_time')) {
        query.use_time = dateStringToDateNum(query.use_time)
      }
      this.getOrdersByQuery(query)
    },
    handleChangeAllTypes (val) {
      this.moreSearchModel.checkedRoomTypes = val ? this.roomTypeOptions : []
    },
    handleCheckedRoomTypes (value) {
      let checkedCount = value.length
      this.checkAllTypes = checkedCount === this.roomTypeOptions.length
    },
    converterRoomTypesObjectToRoomTypeOptionArr (roomTypesObject) {
      let roomTypeNameArr = []
      for (let key in roomTypesObject) {
        roomTypeNameArr.push(roomTypesObject[key].type_name)
      }
      return roomTypeNameArr
    },
    cleanSearch () {
      this.baseSearchModel = {
        no: '',
        customer: '',
        phone: '',
        use_time: ''
      }
    }
  },
  computed: {
    paginationInfo () {
      return this.$store.getters.getOrderListObject.meta === undefined
        ? undefined
        : this.$store.getters.getOrderListObject.meta.pagination
    },
    getCurrentPage () {
      return this.paginationInfo === undefined
        ? undefined
        : this.paginationInfo.current_page
    },
    getTotal () {
      return this.paginationInfo === undefined
        ? undefined
        : this.paginationInfo.total
    }
  }
}
</script>
<style lang="scss">
#more-search {
  .el-form-item__label {
    font-size: 15px;
    font-weight: 600;
    color: #000;
  }
  .el-input__inner {
    border: 1px solid #909399;
    &:focus {
      border-color: #409eff;
      outline: 0;
    }
  }
  .el-form-item {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px dashed #ccc;
  }
}
</style>

<style lang="scss" scoped>
.order-list-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .toolbar-options {
    display: flex;
    justify-content: flex-start;
  }
  .room-type-checkbox {
    display: flex;
    justify-content: flex-start;
  }
}
</style>


