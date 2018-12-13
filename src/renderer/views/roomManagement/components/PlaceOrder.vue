<template>
  <div style="height:100%">
    <under-line lineColor="red">
      <span slot="left">商品</span>
      <span slot="right">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" size="mini"></el-input>
      </span>
    </under-line>
    <div id="room-order-choose-tabs">
      <el-tabs v-model="activeTabName">
        <el-tab-pane v-for="(type,index) in goodsType" :key="index" :label="type" :name="type">
          <div style="display:flex;flex-wrap:wrap">
            <base-product v-for="(product,index) in getProductByGoodType(type)" :key="index" :productInfo="product"></base-product>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <under-line lineColor="red">
      <span slot="left">订单</span>
      <span slot="right">总结：0.00</span>
    </under-line>
    <div class="mg-top-20 mg-bottom-10">
      <room-order-list></room-order-list>
    </div>
    <under-line lineColor="red">
      <span slot="left">选项</span>
    </under-line>
    <div class="mg-top-20 mg-bottom-10 delivery">
      <el-switch v-model="isDeliveryWhenAbsent" active-text="客人不在时是否允许配送到房间"></el-switch>
    </div>
    <under-line lineColor="red">
      <span slot="left">备注</span>
    </under-line>
    <div class="mg-top-20 mg-bottom-10" style="min-height:150px;">
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="remark"></el-input>
    </div>
  </div>
</template>
<script>
import UnderLine from '@/components/UnderLine/UnderLine'
import BaseProduct from './BaseProduct'
import RoomOrderList from './RoomOrderList'
class Product {
  constructor (productName, price, remain, quantifier) {
    this.productName = productName
    this.price = price
    this.remain = remain
    this.quantifier = quantifier
  }
}
export default {
  components: {
    UnderLine,
    BaseProduct,
    RoomOrderList
  },
  props: {
    goodsType: Object,
    goodsData: Array
  },
  data () {
    return {
      isDeliveryWhenAbsent: false,
      activeTabName: '酒店材料',
      remark: ''
    }
  },
  methods: {
    getProductByGoodType (type) {
      let products = []
      this.goodsData.forEach(element => {
        if (element.goodstype_name === type) {
          products.push(new Product(element.materials_name, element.unit_price, element.quantity, element.unit))
        }
      })
      console.log(products)
      return products
    }
  }
}
</script>

<style lang="scss">
#room-order-choose-tabs {
  .el-tabs__nav-scroll {
    background: #eee;
  }
  .el-tabs__item.is-active {
    color: #666;
  }
  .el-tabs__item:hover {
    color: #c81623;
  }
  .el-tabs__active-bar {
    background-color: #c81623 !important;
  }
}
</style>
<style lang="scss" scoped>
.mg-top-20 {
  margin-top: 20px;
}
.mg-bottom-10 {
  margin-bottom: 10px;
}
.delivery {
  display: flex;
  justify-content: flex-start;
}
</style>
