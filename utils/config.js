/**
 * 新接口url
 */
let env = 'local';

var baseUrl = '';
if(env == 'local') {
  baseUrl = 'http://localhost:8080';
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
}
