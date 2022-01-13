// index.js
// 获取应用实例
import {
  userAuthAddUrl
} from "../../utils/config"
import {
  gluPlanAddUrl,
  gluPlanFindUrl,
  gluPlanDeleteUrl
} from '../../utils/config'
import {
  formatTime2
} from "../../utils/util"
var util = require('../../utils/util')
const app = getApp()

Page({
  data: {
    num: 0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    blood: false,
    sport: false
  },
  handleInput(e) {
    this.setData({
      num: e.detail.value
    })
  },
  handletap(e) {
    const operation = e.currentTarget.dataset.operation;
    this.setData({
      num: parseInt(this.data.num) + operation
    });
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    this.getBlood()
    this.getSport()
  },

  onShow(){
    this.getBlood()
    this.getSport()
  },

  getSport() {
    let that = this
    console.log(getApp().globalData.clockonTime)
    if (getApp().globalData.clockonTime != "") {
      this.setData({
        sport: true
      })
    }
  },

  getBlood() {
    let userId = wx.getStorageSync('id')
    let that = this
    wx.request({
      url: gluPlanFindUrl,
      method: "POST",
      data: {
        userId: userId
      },
      header: {
        'content-type': 'application/texts' // 默认值
      },
      success(res) {
        console.log(res.data.length)
        let queryTime = util.formatTime2(new Date())
        console.log(queryTime)
        wx.request({
          url: gluPlanFindUrl,
          method: "POST",
          data: {
            userId: userId,
            datetime: queryTime
          },
          header: {
            'content-type': 'application/texts' // 默认值
          },
          success(res2) {
            if (res2.data.length == res.data.length) {
              that.setData({
                blood: true
              })
            }
          }
        })
      }
    })
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function () {
    return {
      title: 'aa',
      path: '/page/user?id=123'
    }
  },
  onClick: function () {
    this.setData({
      wording: 'boy'
    })
  },


  /*
  tryUrl: function() {
    let user = {
      phone : "18888921909",
      password : "123456",
      registerTime : "2021-12-05",
      lastLoginTime : "2021-12-05"
    }
    wx.request({
      url: userAuthAddUrl,
      data: user,
      method: "POST",
      header: {
        'content-type': 'application/texts' // 默认值
      },
      success (res) {
        console.log(res.data)
      }
    })
  }
   */

})