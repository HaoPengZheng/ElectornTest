<template>
  <div class="key-control">
    <el-button :type="type" :size="size" plain>单号：264271</el-button>
    <el-button :type="type" :size="size" plain>1.调客房</el-button>
    <el-button :type="type" :size="size" plain>2.账务处理</el-button>
    <el-button :type="type" :size="size" plain>5.清账</el-button>
    <el-button :type="type" :size="size" plain>7.客房离店</el-button>
    <el-button :type="type" :size="size" plain>9.查询</el-button>
    <el-button :type="type" :size="size" plain>操作日志</el-button>
    <el-button :type="type" :size="size" plain>8.当前账单</el-button>
    <el-button :type="type" :size="size" plain>E.检索</el-button>
  </div>
</template>
<script>
export default {
  name: 'key-control',
  data () {
    return {
      type: 'primary',
      size: 'mini'
    }
  }
}
</script>
<style lang="scss">

.key-control{
  display: flex;
  justify-content:space-around;
  padding:0 0 10px 0;
  margin-bottom: 15px;
  border-bottom: 2px solid #e4e7ed;
}
</style>

