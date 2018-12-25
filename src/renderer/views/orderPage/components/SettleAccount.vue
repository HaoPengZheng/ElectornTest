<template>
  <div id="settle-account">
    <div class="input-group">
      <ul>
        <li class="check_item">
          <input
            id="1"
            class="check_radio"
            type="radio"
            name="type"
            value="1"
            data-is-hand-point=""
          >
          <label for="1">月结</label>
        </li>
        <li class="check_item">
          <input
            id="4"
            class="check_radio"
            type="radio"
            name="type"
            value="4"
            data-is-hand-point=""
          >
          <label for="4">天猫</label>
        </li>
        <li class="check_item">
          <input
            id="5"
            class="check_radio"
            type="radio"
            name="type"
            value="5"
            data-is-hand-point=""
          >
          <label for="5">冲账</label>
        </li>
        <li class="check_item">
          <input
            id="6"
            class="check_radio"
            type="radio"
            name="type"
            value="6"
            data-is-hand-point=""
          >
          <label for="6">周结</label>
        </li>
        <li class="check_item">
          <input
            id="7"
            class="check_radio"
            type="radio"
            name="type"
            value="7"
            data-is-hand-point=""
          >
          <label for="7">银行转账</label>
        </li>
        <li class="check_item">
          <input
            id="8"
            class="check_radio"
            type="radio"
            name="type"
            value="8"
            data-is-hand-point=""
          >
          <label for="8">二维码</label>
        </li>
        <li class="check_item">
          <input
            id="9"
            class="check_radio"
            type="radio"
            name="type"
            value="9"
            data-is-hand-point=""
          >
          <label for="9">支付宝支付</label>
        </li>
        <li class="check_item">
          <input
            id="10"
            class="check_radio"
            type="radio"
            name="type"
            value="10"
            data-is-hand-point=""
          >
          <label for="10">电汇</label>
        </li>
        <li class="check_item">
          <input
            id="11"
            class="check_radio"
            type="radio"
            name="type"
            value="11"
            data-is-hand-point=""
          >
          <label for="11">信用卡</label>
        </li>
        <li class="check_item">
          <input
            id="12"
            class="check_radio"
            type="radio"
            name="type"
            value="12"
            data-is-hand-point=""
          >
          <label for="12">已前台支付</label>
        </li>
        <li class="check_item">
          <input
            id="13"
            class="check_radio"
            type="radio"
            name="type"
            value="13"
            data-is-hand-point="0"
          >
          <label for="13">公司接待</label>
        </li>
        <li class="check_item">
          <input
            id="14"
            class="check_radio"
            type="radio"
            name="type"
            value="14"
            data-is-hand-point=""
          >
          <label for="14">担保追收</label>
        </li>
        <li class="check_item">
          <input
            id="16"
            class="check_radio"
            type="radio"
            name="type"
            value="16"
            data-is-hand-point=""
          >
          <label for="16">房券</label>
        </li>
        <li class="check_item">
          <input
            id="40"
            class="check_radio"
            type="radio"
            name="type"
            value="40"
            data-is-hand-point=""
          >
          <label for="40">微信公众号</label>
        </li>
      </ul>
    </div>
    <div class="form">
      <el-form
        label-width="100px"
      >
        <el-row>
          <el-col :span="9">
            <el-form-item label="金额:">
              <el-input
                placeholder="请填写金额"
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="备注:">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="textarea"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
         <el-col :span="22">
            <el-form-item label="交易单号:">
              <el-input
                placeholder="请交易单号"
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button type="success" size="small">结账</el-button>
    </div>
    <div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      paymethod: ''
    }
  }
}
</script>
<style lang="scss" scoped>
#settle-account {
  .input-group {
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
    font-size: 0;
    .check_radio {
      margin: 0 5px;
      vertical-align: middle;
    }
    .check_item {
      float: left;
      width: 30%;
      padding-left: 40px;
      height: 35px;
      line-height: 35px;
      display: flex;
      align-items: center;
      text-align: left;
      font-size: 16px;
      margin: 0;
    }
  }
  .form{
    margin-top:15px;
  }
}
</style>

