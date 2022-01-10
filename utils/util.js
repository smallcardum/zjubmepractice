/**
 * 新接口url
 */
let env = 'local';
//let env = 'test';
var baseUrl = '';
if(env == 'local') {
  baseUrl = 'http://localhost:8080';
}  else if (env == 'test') {
  baseUrl = 'https://exp.zjubiomedit.com/glutest'
  //baseUrl = 'http://39.100.99.97:8070'
}

const foodAnalAddUrl = baseUrl + '/foodAnalysis/add'
const foodAnalFindUrl = baseUrl + '/foodAnalysis/find'
const foodAnalUpdateUrl = baseUrl + '/foodAnalysis/update'
const foodAnalDeleteUrl = baseUrl + '/foodAnalysis/delete'
const foodDetailAddUrl = baseUrl + '/foodDetail/add'
const foodDetailFindUrl = baseUrl + '/foodDetail/find'
const foodDetailUpdateUrl = baseUrl + '/foodDetail/update'
const foodDetailDeleteUrl = baseUrl + '/foodDetail/delete'
const foodRcmdAddUrl = baseUrl + '/foodRecommend/add'
const foodRcmdFindUrl = baseUrl + '/foodRecommend/find'
const foodRcmdUpdateUrl = baseUrl + '/foodRecommend/update'
const foodRcmdDeleteUrl = baseUrl + '/foodRecommend/delete'
const foodRecordAddUrl = baseUrl + '/foodRecord/add'
const foodRecordFindUrl = baseUrl + '/foodRecord/find'
const foodRecordUpdateUrl = baseUrl + '/foodRecord/update'
const foodRecordDeleteUrl = baseUrl + '/foodRecord/delete'
const mdcnPlanAddUrl = baseUrl + '/medicinePlan/add'
const mdcnPlanFindUrl = baseUrl + '/medicinePlan/find'
const mdcnPlanUpdateUrl = baseUrl + '/medicinePlan/update'
const mdcnPlanDeleteUrl = baseUrl + '/medicinePlan/delete'
const mdcnRecordAddUrl = baseUrl + '/medicineRecord/add'
const mdcnRecordFindUrl = baseUrl + '/medicineRecord/find'
const mdcnRecordUpdateUrl = baseUrl + '/medicineRecord/update'
const mdcnRecordDeleteUrl = baseUrl + '/medicineRecord/delete'

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const weekday = date.getDay()
  const week=["周日", "周一", "周二", "周三", "周四", "周五", "周六"]

  // return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`;
  return `${[month, day].map(formatNumber).join('/')} ${week[weekday]}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const formatTime2 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

module.exports = {
  formatTime,
  formatTime2,
  formatTime3,
  foodAnalAddUrl,
  foodAnalDeleteUrl,
  foodAnalFindUrl,
  foodAnalUpdateUrl,
  foodDetailAddUrl,
  foodDetailDeleteUrl,
  foodDetailFindUrl,
  foodDetailUpdateUrl,
  foodRcmdAddUrl,
  foodRcmdDeleteUrl,
  foodRcmdFindUrl,
  foodRcmdUpdateUrl,
  foodRecordAddUrl,
  foodRecordDeleteUrl,
  foodRecordFindUrl,
  foodRecordUpdateUrl,
  mdcnPlanAddUrl,
  mdcnPlanDeleteUrl,
  mdcnPlanFindUrl,
  mdcnPlanUpdateUrl,
  mdcnRecordAddUrl,
  mdcnRecordDeleteUrl,
  mdcnRecordFindUrl,
  mdcnRecordUpdateUrl
}

const formatTime3 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekday = date.getDay()

  return weekday
}
