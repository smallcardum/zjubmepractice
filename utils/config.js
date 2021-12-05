/**
 * 新接口url
 */
let env = 'local';

var vicoBaseUrl = '';
var vicoBaseWebSocketUrl = '';
if(env == 'local') {
  vicoBaseUrl = 'http://localhost:8080';
  vicoBaseWebSocketUrl = 'ws://localhost:8080';
} 

const userAuthAddUrl = vicoBaseUrl + '/userAuth/addReturnId'
const userAuthFindUrl = vicoBaseUrl + '/userAuth/find'
const userInfoAddUrl = vicoBaseUrl + '/userInfo/add'


export {
  userAuthAddUrl,
  userAuthFindUrl,
  userInfoAddUrl,
}
