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
}
export default new ObjectUtil()
