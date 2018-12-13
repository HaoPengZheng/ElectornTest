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
        <el-tab-pane label="酒店材料" name="first" style="display:flex">
          <base-product :productInfo="{productName:'扑克',price:'1.00',remain:'37',quantifier:'副'}"></base-product>
          <base-product :productInfo="{productName:'袜子',price:'18.00',remain:'37',quantifier:'双'}"></base-product>
        </el-tab-pane>
        <el-tab-pane label="其他" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="婴儿用品" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="衣服类" name="fourth">定时任务补偿</el-tab-pane>
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
export default {
  components: {
    UnderLine,
    BaseProduct,
    RoomOrderList
  },
  data () {
    return {
      isDeliveryWhenAbsent: false,
      activeTabName: 'first',
      remark: ''
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
.mg-top-20{
  margin-top: 20px;
}
.mg-bottom-10{
  margin-bottom: 10px;
}
.delivery{
  display: flex;
  justify-content:flex-start;
}
</style>
