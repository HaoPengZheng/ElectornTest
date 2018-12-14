var pinyin = require('pinyin')

/**
  *将文字转换成汉语拼音首字母
 * @author haopengzh
 * @date 2018-12-14
 * @export
 * @param {String} Hanzi 待转换汉字
 * @return {String} result 返回拼音字符串
 */
export function convertHanziToPinYin (Hanzi) {
  let result = ''
  pinyin(Hanzi, { style: pinyin.STYLE_NORMAL }).forEach(ele => {
    result += ele
  })
  return result
}

/**
 *将文字转换成汉语拼音首字母
 * @author haopengzh
 * @date 2018-12-14
 * @export
 * @param {String} Hanzi
 * @returns {String} result 返回首字母
 */
export function convertHanZiToInitial (Hanzi) {
  let result = ''
  pinyin(Hanzi, {style: pinyin.STYLE_INITIALS}).forEach(ele => {
    result += ele.toString().charAt(0)
  })
  return result
}
