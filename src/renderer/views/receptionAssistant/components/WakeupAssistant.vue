<template>
  <div class="wakeup-assistant">
    <under-line lineColor="#149aec">
      <span slot="left" style="font-size:20px">叫醒服务</span>
      <span slot="right">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          size="mini"
          v-model="searchKey"
          @keydown.native="searchGood"
        ></el-input>
      </span>
    </under-line>
  </div>
</template>
<script>
import UnderLine from '@/components/UnderLine/UnderLine'
export default {
  components: {
    UnderLine
  }
}
</script>
<style lang="scss" scoped>
.wakeup-assistant{
  padding: 0 40px;
}
</style>

