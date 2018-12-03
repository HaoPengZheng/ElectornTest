/* eslint-disable no-new */
const ORDER_TYPE_OBJECT = {
  keepOrder: '保留单',
  websiteOrder: '官网下单'
}
const STATE_LABEL_OBJECT = {
  havePaid: '已支付',
  nonPayment: '未支付',
  completed: '已完成',
  haveExpired: '已过期'
}
const TAG_TYPE = {
  default: '',
  warning: 'warning',
  success: 'success',
  info: 'info',
  danger: 'danger'
}
export class OrderListHelper {
  getTagTypeByOrderType (orderType) {
    if (orderType === ORDER_TYPE_OBJECT.keepOrder) {
      return TAG_TYPE.default
    } else if (orderType === ORDER_TYPE_OBJECT.websiteOrder) {
      return TAG_TYPE.warning
    }
  }
  getTagTypeByStateType (state) {
    if (state === STATE_LABEL_OBJECT.havePaid) {
      return TAG_TYPE.default
    } else if (state === STATE_LABEL_OBJECT.haveExpired) {
      return TAG_TYPE.info
    } else if (state === STATE_LABEL_OBJECT.havePaid) {
      return TAG_TYPE.default
    } else if (state === STATE_LABEL_OBJECT.nonPayment) {
      return TAG_TYPE.warning
    }
  }
}
export default new OrderListHelper()
