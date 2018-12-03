<template>
  <div class='warp' id="login-page" >
    <div class="login-main">
      <h1>御温泉酒店系统</h1>
      <el-form class="login-form" label-position="top" label-width="80px" :model="LoginModel">
        <el-form-item label="酒店：">
          <el-select v-model="LoginModel.entry" style="width:100%">
            <el-option label="云来客栈" value="ylkz"></el-option>
            <el-option label="御瀛庄" value="yyz"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名：">
          <el-input v-model="LoginModel.username"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input type="password" v-model="LoginModel.password"></el-input>
        </el-form-item>
        <div class="login-form-bottom">
          <el-button type="primary"  size="medium" round @click="login">登&nbsp;&nbsp;录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login-page',
  data () {
    return {
      LoginModel: {
        entry: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login: function () {
      this.$router.push('/hotal-management/RoomManagement')
    }
  }
}
</script>
<style>
#login-page .el-form-item__label{
  padding: 0;
  font-size: 12px;
  font-weight: 700;
  color: #1A1938;
}
</style>
<style lang="scss" scoped>
$background-color:#f9fafb;
.warp{
  .login-main{
    h1{
      margin-top: 10px;
      text-align: center;
      font-size: 26px;
      color: #1A1938;
      line-height: 30px;
    }
    .login-form{
      .login-form-bottom{
        display: flex;
        justify-content: flex-end;
      }
      padding: 15x;
    }
    padding: 20px;
    margin-bottom: 100px;
    border: 1px solid #dee0e3;
    background-color: #FFF;
    border-radius: 3px;
    max-width: 600px;
    min-width: 400px;
  }
  background: $background-color;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>
