<template>
  <div style="height:100%">
    <under-line lineColor="red">
      <span slot="left">商品</span>
      <span slot="right">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" size="mini"></el-input>
      </span>
    </under-line>
    <div id="room-order-choose-tabs">
      <el-tabs>
        <el-tab-pane label="酒店材料" name="first">
          <base-product></base-product>
        </el-tab-pane>
        <el-tab-pane label="其他" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="婴儿用品" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="衣服类" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
    <under-line lineColor="red">
      <span slot="left">订单</span>
      <span slot="right">
        总结：0.00
      </span>
    </under-line>
  </div>
</template>
<script>
import UnderLine from '@/components/UnderLine/UnderLine'
import BaseProduct from './BaseProduct'
export default {
  components: {
    UnderLine,
    BaseProduct
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
