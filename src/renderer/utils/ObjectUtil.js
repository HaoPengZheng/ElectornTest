class ObjectUtil {
  // 克隆一个对象
  deepCopy (obj) {
    if (typeof obj !== 'object') {
      return obj
    }
    var newobj = {}
    for (var attr in obj) {
      newobj[attr] = this.deepCopy(obj[attr])
    }
    return newobj
  }
  isNotNullOrUndefined (obj) {
    return obj !== null && obj !== undefined
  }
}
export default new ObjectUtil()
