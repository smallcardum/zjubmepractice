/**
 * 新接口url
 */
let env = 'local'
//let env = 'test';
var baseUrl = '';
if(env == 'local') {
  baseUrl = 'http://localhost:8080';
}  else if (env == 'test') {
  baseUrl = 'https://exp.zjubiomedit.com/glutest'
  //baseUrl = 'http://39.100.99.97:8070'
}

const userAuthAddUrl = baseUrl + '/userAuth/addReturnId'
const userAuthFindUrl = baseUrl + '/userAuth/find'
const userInfoAddUrl = baseUrl + '/userInfo/add'
const userInfoFindUrl = baseUrl + '/userInfo/find'
const gluRecordFindUrl = baseUrl + '/gluRecord/find'
const gluRecordAddUrl = baseUrl + '/gluRecord/add'
const gluPlanAddUrl = baseUrl + '/gluPlan/add'
const gluPlanFindUrl = baseUrl + '/gluPlan/find'
const gluPlanDeleteUrl = baseUrl + '/gluPlan/delete'
const sportDefaultFindUrl = baseUrl + '/sportDefault/find'
const sportItemFindUrl = baseUrl + '/sportItem/find'
const chatFindUrl = baseUrl + '/doctorChat/find'
const chatAddUrl = baseUrl + '/doctorChat/add'


export {
  userAuthAddUrl,
  userAuthFindUrl,
  userInfoAddUrl,
  userInfoFindUrl,
  gluRecordFindUrl,
  gluRecordAddUrl,
  gluPlanAddUrl,
  gluPlanFindUrl,
  gluPlanDeleteUrl,
  sportDefaultFindUrl,
  sportItemFindUrl,
  chatFindUrl,
  chatAddUrl,
}
