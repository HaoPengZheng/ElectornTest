<template>
  <div class="room-order-list-item">
    <span>扑克</span>
    <el-input-number v-model="num1" @change="handleChange" size="mini" :min="1" :max="10" label="描述文字"></el-input-number>
    <span>价格：0.00</span>
    <span>总价：0.00</span>
    <el-button type="danger" size="mini">删除</el-button>
  </div>  
</template>
<script>
export default {
  data () {
    return {
      num1: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.room-order-list-item{
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-around;
  align-content: center;
  padding: 10px 0;
  text-align: center;
  line-height: 28px;
}
</style>
