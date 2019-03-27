<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px">
        <ul style="line-height: 50px;color: #fff;">
          <router-link tag="li" to="/hotal-management/RoomManagement">房间管理</router-link>
          <router-link tag="li" to="/hotal-management/RoomSurplus">房态</router-link>
          <router-link tag="li" to="/hotal-management/ChooseRoom">排房</router-link>
          <router-link tag="li" to="/hotal-management/OrderPage">订单</router-link>
          <router-link tag="li" to="/hotal-management/RoomAccountManagement">房间帐管理</router-link>
          <router-link tag="li" to="/hotal-management/RoomCard">房卡</router-link>
          <router-link tag="li" to="/hotal-management/AddOrder">下单</router-link>
          <router-link tag="li" to="/hotal-management/RoomAssign">预定分房入住</router-link>
        </ul>
      </el-aside>
      <el-container>
        <el-header>
          <nav-bar></nav-bar>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import NavBar from './components/NavBar/NavBar'
export default {
  name: 'layout',
  components: {
    NavBar
  },
  computed: {
    shopId: function () {
      return this.$store.getters.getShopId
    }
  },
  watch: {
    shopId: function () {
      location.reload()
    }
  }
}
</script>
<style scoped>
.layout {
  width: 100%;
  height: 100%;
}
.layout .el-container {
  height: 100%;
}
.el-header {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #35404d;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #f1f2f7;
  color: #333;
  text-align: center;
  padding: 0px !important;
  height: 100%;
}
</style>
