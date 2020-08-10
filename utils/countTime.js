import moment from '../common/moment'
import cn from '../common/moment_zh-cn'
// 设置中文显示
moment.locale('zh-cn', cn)

const getCurrentTime = () => moment().format('YYYY-MM-DD HH:mm:ss') // 当前时间
const isSame = (x, y) => moment(x).isSame(y) // 是否相同时间
const isBetween = (c, x, y) => moment(c).isBetween(x, y) // 是否在这个时间段内
const isBefore = (x, y) => moment(x).isBefore(y) // 是否在此时间之前
const isAfter = (x, y) => moment(x).isAfter(y) // 是否在此时间之后
const getDuration = (x, y) => moment(y).diff(moment(x)) // 获取时长 单位毫秒
// 相对时间
const getCalendar = (t) => {
   return moment(t).calendar(null, {
    sameDay: 'HH:mm',
    nextDay: '[明日]HH:mm',
    nextWeek: 'ddddHH:mm',
    lastDay: '[昨天]HH:mm',
    lastWeek: '[上个]ddddHH:mm',
    sameElse: 'MM-DD HH:mm'
  })
}
// x 开始时间 y 结束时间
const timeData = (x, y) => {
  let duration = '', calendar = '',
    currentTime = getCurrentTime(),
    startTime = isBefore(x, y) ? x : y,
    endTime = isAfter(y, x) ? y : x
  if (isBetween(currentTime, startTime, endTime)) {
    duration = getDuration(currentTime, endTime)
  }
  calendar = getCalendar(startTime)
  return {
    duration,
    calendar
  }
}

module.exports = {
  getCurrentTime,
  isSame,
  isBetween,
  isBefore,
  isAfter,
  getDuration,
  getCalendar,
  timeData
}