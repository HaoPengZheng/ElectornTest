var pinyin = require('pinyin')
let result = ''
pinyin('中心', { style: pinyin.STYLE_INITIALS }).forEach(ele => {
  console.log(ele)
  result += ele
})
console.log(result)
