
// 时间戳(长度为10位) 转 日期（YY-MM-dd）
export function dateNumToDateString (dateNum) {
  let d = new Date(+(dateNum + '000'))
  let year = d.getFullYear()
  let month = d.getMonth() + 1
  let day = d.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return year + '-' + month + '-' + day
}

// 日期 转 时间戳(长度为10位)
export function dateStringToDateNum (dateString) {
  let d = new Date(dateString)
  d.setHours(0, 0, 0, 0)
  return (d.getTime() + '').substring(0, 10)
}

// 求日期（YY-MM-dd）是星期几
export function getDateWeekByDateString (dateString) {
  let d = new Date(dateString)
  let week = ['日', '一', '二', '三', '四', '五', '六']
  return week[d.getDay()]
}

// 求日期（YY-MM-dd）是星期几
export function getDateWeekByDateNum (dateNum) {
  let d = new Date(+(dateNum + '000'))
  let week = ['日', '一', '二', '三', '四', '五', '六']
  return week[d.getDay()]
}
