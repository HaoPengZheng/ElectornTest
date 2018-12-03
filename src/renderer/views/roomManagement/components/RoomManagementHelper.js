/* eslint-disable no-new */
// O代表住客，V代表空房，C代表干净，D代表脏

export const OD_LABEL = '脏住客房'
const VD_LABEL = '脏的退房'
const OC_LABEL = '干净的住客房'
const VC_LABEL = '干净的退房'
const LOCK_LABEL = '锁房'

// 不同房间状态的Label
const STATE_LABEL_OBJ = {
  'OD': OD_LABEL,
  'VD': VD_LABEL,
  'OC': OC_LABEL,
  'VC': VC_LABEL,
  'L': LOCK_LABEL
}

const OD_ICON_NAME = '#icon-people'
const VD_ICON_NAME = '#icon'
const OC_ICON_NAME = '#icon-people'
const VC_ICON_NAME = '#icon'
const L_ICON_NAME = '#icon-qingjie'

// 不同房间状态的Icon名
export const STATE_ICON_OBJ = {
  'OD': OD_ICON_NAME,
  'VD': VD_ICON_NAME,
  'OC': OC_ICON_NAME,
  'VC': VC_ICON_NAME,
  'L': L_ICON_NAME
}

// 不同房间状态的类名
export const CLEAN_DISTY_OBJ = {
  'OD': 'dirty',
  'VD': 'dirty',
  'OC': 'clean',
  'VC': 'clean'
}

export class RoomManagementHelper {
  getLabelByStatus (status) {
    return STATE_LABEL_OBJ[status] === undefined ? status : STATE_LABEL_OBJ[status]
  }
  getIconNameByStatus (status) {
    return STATE_ICON_OBJ[status] === undefined ? status : STATE_ICON_OBJ[status]
  }
  getCleanOrDirtyBySattus (status) {
    return CLEAN_DISTY_OBJ[status]
  }
  getOdLabel () {
    return OD_LABEL
  }
  getOcLabel () {
    return OC_LABEL
  }
  getVdLabel () {
    return VD_LABEL
  }
  getVcLabel () {
    return VC_LABEL
  }
  getLocalLabel () {
    return LOCK_LABEL
  }
}
export default RoomManagementHelper
