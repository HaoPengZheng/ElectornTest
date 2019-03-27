<template>
  <div class="order-info-warp">
    <div class="booking-order-info">
      <div class="info-item">
        <div class="info-input-3">
          <el-input
            placeholder="请输入内容"
            v-model="orderForm.order"
            size="small"
          >
            <template slot="prepend">账单</template>
          </el-input>

        </div>
        <div class="info-input-3">
          <el-input
            placeholder="请输入内容"
            v-model="orderForm.order"
            size="small"
          >
            <template slot="prepend">制单单位</template>
          </el-input>
        </div>
        <div class="info-input-3">
          <el-input
            placeholder="请输入内容"
            v-model="orderForm.order"
            size="small"
          >
            <template slot="prepend">状态</template>
          </el-input>
        </div>
      </div>
      <div class="info-item">
        <div class="info-input-4">
          <el-input
            placeholder="请输入内容"
            v-model="orderForm.order"
            size="small"
          >
            <template slot="prepend">团队名称</template>
          </el-input>
        </div>
        <div class="info-input-4">
          <el-input
            placeholder="请输入内容"
            v-model="orderForm.order"
            size="small"
          >
            <template slot="prepend">领队</template>
          </el-input>
        </div>
        <div class="info-input-4">
          <el-input
            placeholder="请输入内容"
            v-model="orderForm.order"
            size="small"
          >
            <template slot="prepend">电话</template>
          </el-input>
        </div>
        <div class="info-input-4">
          <el-input
            placeholder="请输入内容"
            v-model="orderForm.order"
            size="small"
          >
            <template slot="prepend">客人来源</template>
          </el-input>
        </div>
      </div>
      <div class="info-item">
        <div class="info-input-5">
          <el-input
            placeholder="请输入内容"
            v-model="orderForm.order"
            size="small"
          >
            <template slot="prepend">预到日期</template>
          </el-input>
        </div>
        <div class="info-input-5">
          <el-input
            placeholder="请输入内容"
            v-model="orderForm.order"
            size="small"
          >
            <template slot="prepend">停留天数</template>
          </el-input>
        </div>
        <div class="info-input-5">
          <el-input
            placeholder="请输入内容"
            v-model="orderForm.order"
            size="small"
          >
            <template slot="prepend">类别</template>
          </el-input>
        </div>
        <div class="info-input-5">
          <el-input
            placeholder="请输入内容"
            v-model="orderForm.order"
            size="small"
          >
            <template slot="prepend">营销部</template>
          </el-input>
        </div>
        <div class="info-input-5">
          <el-input
            placeholder="请输入内容"
            v-model="orderForm.order"
            size="small"
          >
            <template slot="prepend">销售员</template>
          </el-input>
        </div>
      </div>
      <div class="info-item">
        <div class="info-input-5">
          <el-input
            placeholder="请输入内容"
            v-model="orderForm.order"
            size="small"
          >
            <template slot="prepend">单据号</template>
          </el-input>
        </div>
        <div class="info-input-5">
          <el-input
            placeholder="请输入内容"
            v-model="orderForm.order"
            size="small"
          >
            <template slot="prepend">预定方式</template>
          </el-input>
        </div>
        <div class="info-input-5">
          <el-input
            placeholder="请输入内容"
            v-model="orderForm.order"
            size="small"
          >
            <template slot="prepend">结算方式</template>
          </el-input>
        </div>
        <div class="info-input-40">
          <el-input
            placeholder="请输入内容"
            v-model="orderForm.order"
            size="small"
          >
            <template slot="prepend">成人/儿童/陪同</template>
          </el-input>
        </div>
      </div>
      <div class="info-item">
        <div class="info-input-40">
          <el-input
            placeholder="请输入内容"
            v-model="orderForm.order"
            size="small"
          >
            <template slot="prepend">服务费</template>
          </el-input>
        </div>
        <div class="info-input-60">
          <el-input
            placeholder="请输入内容"
            v-model="orderForm.order"
            size="small"
          >
            <template slot="prepend">预留房类</template>
          </el-input>
        </div>
      </div>
      <div class="info-item">
        <div class="info-input-40">
          <el-input
            placeholder="请输入内容"
            v-model="orderForm.order"
            size="small"
          >
            <template slot="prepend">会员卡</template>
          </el-input>
        </div>
        <div class="info-input-60">
          <el-input
            placeholder="请输入内容"
            v-model="orderForm.order"
            size="small"
          >
            <template slot="prepend">特殊说明</template>
          </el-input>
        </div>
      </div>
      <div class="info-item">
        <div class="info-input-40">
          <el-input
            placeholder="请输入内容"
            v-model="orderForm.order"
            size="small"
          >
            <template slot="prepend">佣金数额</template>
          </el-input>
        </div>
        <div class="info-input-60">
          <el-input
            placeholder="请输入内容"
            v-model="orderForm.order"
            size="small"
          >
            <template slot="prepend">团体付费</template>
          </el-input>
        </div>
      </div>
      <div class="info-item">
        <div class="info-input-40">
          <el-input
            placeholder="请输入内容"
            v-model="orderForm.order"
            size="small"
          >
            <template slot="prepend">佣金单位</template>
          </el-input>
        </div>
        <div class="info-input-60">
          <el-input
            placeholder="请输入内容"
            v-model="orderForm.order"
            size="small"
          >
            <template slot="prepend">账务说明</template>
          </el-input>
        </div>
      </div>
      <div class="info-item">
        <div>
          <el-input
            placeholder="请输入内容"
            v-model="orderForm.order"
            size="small"
          >
            <template slot="prepend">备注</template>
          </el-input>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderForm: {
        order: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.order-info-warp {
  width: 100%;
  padding: 15px;
}
.booking-order-info {
  border: 1px solid #000;
  background: #fff;
  .info-item {
    border-bottom: 1px solid #000;
    padding: 10px 0;
    display: flex;
    flex-wrap: wrap;
    &:last-child {
      border-bottom: 0;
    }
    .info-input-3 {
      width: 33%;
      min-width: 150px;
    }
    .info-input-4 {
      width: 25%;
      min-width: 150px;
    }
    .info-input-5 {
      width: 20%;
      min-width: 150px;
    }
    .info-input-40 {
      width: 40%;
      min-width: 150px;
    }
    .info-input-60 {
      width: 60%;
      min-width: 150px;
    }
  }
}
</style>

