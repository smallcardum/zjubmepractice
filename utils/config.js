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


export {
  userAuthAddUrl,
  userAuthFindUrl,
  userInfoAddUrl,
  userInfoFindUrl,
}
