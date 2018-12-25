<template>
  <div>
    <div class="order_detail_container">
      <table class="t table table-bordered table-hover table_info">
        <tbody>
          <tr class="table_info_tr">
            <td><span class="info_name">订单号:</span>66666618122403001</td>
            <td><span class="info_name">订购人:</span>黄瑞麟</td>
            <td><span class="info_name">电话:</span>13631231363</td>
          </tr>
          <tr class="table_info_tr">
            <td><span class="info_name">支付方式:</span>微信公众号</td>
            <td><span class="info_name">订单类型:</span>普通下单</td>
            <td><span class="info_name">创建时间:</span>2018-12-24 13:56:25</td>
          </tr>
        </tbody>
      </table>
      <table class="t table table-bordered table-hover table_goods">
        <tbody>
          <tr class="tr_title">
            <td class="td_title">商品名称</td>
            <td class="td_title">数量</td>
            <td class="td_title">使用时间</td>
            <td class="td_title">小计</td>
            <td class="td_title">房间号</td>
          </tr>

          <tr>
            <td>大餐庙会2人上房套票</td>
            <td>1</td>
            <td>2018-12-24</td>
            <td>2300.00</td>
            <td>178</td>
          </tr>
        </tbody>
      </table>

      <table class="t table table-bordered table-hover table_goods_remark">
        <tbody>
          <tr class="tr_first">
            <td class="td_title">总价:</td>
            <td colspan="3">2300.00</td>
          </tr>

          <tr>
            <td class="td_title">大餐庙会备注:</td>
            <td colspan="3"></td>
          </tr>
          <tr>
            <td class="td_title">旅行社订单号:</td>
            <td colspan="3"></td>
          </tr>
        </tbody>
      </table>

      <table class="t table table-bordered table-hover table_customer">

        <tbody>
          <tr class="tr_title">
            <td class="td_title">入住人姓名</td>
            <td class="td_title">手机号</td>
            <td class="td_title">会员卡号</td>
            <td class="td_title">身份证号</td>
          </tr>

          <tr>
            <td>柯天灼</td>
            <td>15999919874</td>
            <td></td>
            <td></td>
          </tr>

          <tr class="tr_user_remark">
            <td class="td_title">用户备注:</td>
            <td colspan="5"></td>
          </tr>
          <tr class="tr_b_remark">
            <td class="td_title">后台备注:</td>
            <td
              class="td_bs_remark"
              colspan="5"
            ><span class="remark_txt"></span>
              <a
                href="javascript:void(0)"
                onclick="editOrderRemark()"
              >添加</a>
            </td>
          </tr>
          <tr class="tr_pay_remark">
            <td class="td_title">支付记录:</td>
            <td
              colspan="5"
              class="td_pay_record"
            >
              <div
                class="pay_remark"
                title=""
              >支付时间：2018-12-24 16:12:27 操作员:田彬2 微信公众号 收入:500.00
                <el-button size="mini">修改</el-button>
                <el-button size="mini">撤销</el-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.t {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  text-align: left;
  tr td {
    height: 35px;
    line-height: 35px;
    padding: 0 10px;
    padding-top: 0px;
    padding-right: 10px;
    padding-bottom: 0px;
    padding-left: 10px;
    border: 1px solid #d6d6d8;
    border-top-color: rgb(214, 214, 216);
    border-top-style: solid;
    border-top-width: 1px;
    border-right-color: rgb(214, 214, 216);
    border-right-style: solid;
    border-right-width: 1px;
    border-bottom-color: rgb(214, 214, 216);
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-left-color: rgb(214, 214, 216);
    border-left-style: solid;
    border-left-width: 1px;
    border-image-source: initial;
    border-image-slice: initial;
    border-image-width: initial;
    border-image-outset: initial;
    border-image-repeat: initial;
    font-size: 12px;
  }
  .tr_title {
    background: #f4f4f4;
  }
  .table_info_tr td {
    padding: 0;
  }
  .info_name {
    display: inline-block;
    width: 80px;
    height: 100%;
    font-weight: bold;
    background: #f4f4f4;
    padding: 0 0 0 10px;
    border-right: 1px solid #d6d6d8;
    margin-right: 10px;
    font-size: 13px;
    float: left;
  }
}
.table_goods {
  margin-bottom: 0 !important;
}
.table_goods_remark {
  border-top: 0;
  .tr_first {
    td {
      border-top: 0;
    }
  }
}
.footer{
  display: flex;
  justify-content: flex-end;
}
</style>
