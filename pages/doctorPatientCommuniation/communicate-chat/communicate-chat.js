// pages/communicate/communicate-chat/communicate-chat.js
import {
  chatAddUrl, chatFindUrl
} from "../../../utils/config";
import {formatTime2} from '../../../utils/util'
var util = require('../../../utils/util');
var app = getApp();
var chatList = []; //信息记录
var windowHeight = wx.getSystemInfoSync().windowHeight; // 界面高度
var keyHeight = 0; // 键盘高度
var restHeight = 0;
var historyHeight = 0;
var inputHeight = 0;
var msgHeight = 0;
var top = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctorId: null,
    doctorName:'',
    unReadMsgList:[],
    userInputValue: '',
    chatList: [],
    toView: 'msg-0',
    top: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //this.openWS();
    var query = wx.createSelectorQuery();
    query.select('weui-textarea')
    chatList = [];
    console.log(options)
    let chatBasic = JSON.parse(options.chatInfo)
    console.log(chatBasic)
    this.setData({
      doctorId: parseInt(chatBasic.id),
      doctorName: chatBasic.name,
      chatList: chatBasic.chat,
      //unReadMsgList: chatBasic.unReadMsgList
    })
    wx.setNavigationBarTitle({
      title: chatBasic.name
    })
    //this.getHistoryMsgList(true)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // 获取输入框的高度
    var query = wx.createSelectorQuery();
    var that = this;
    query.select('#user-input').boundingClientRect(function(rect) {
      inputHeight = rect.height;
      historyHeight = windowHeight - inputHeight;
    }).exec();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getHistoryMsgList();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.refresh()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  // component function
  // 绑定用户输入
  userInput: function(e) {
    this.setData({
      userInputValue: e.detail.value
    })
  },
  // 发送信息
  sendMsg: function() {
    // 获取用户输入信息
    let msgText = this.data.userInputValue;
    if (msgText === "") {
        wx.showToast({
            title: "发送信息不能为空！",
            icon: "none"
        });
      return
    }
    let userid = wx.getStorageSync('userId')
    let now = new Date()
    let msg = {
      sent: Number(userid),
      received: Number(this.data.doctorId),
      // received: Number(userid),
      // sent: Number(this.data.doctorId),
      // msgDateTime: util.formatTime(new Date()),
      content: msgText,
      datetime: util.formatTime2(now)
    }
    this.send(msg)
  },

  onFocus: function(e) {
    keyHeight = e.detail.height;
    if (chatList.length >= 1) {
      this.setData({
        toView: 'msg-' + (chatList.length - 1)
      })
    }
    // 得到键盘弹出时，剩下的展示界面高度
    if (restHeight === 0) {
      restHeight = windowHeight - keyHeight - inputHeight;
    }
    // 根据历史记录的共度，偏移历史信息区域
    if (msgHeight < restHeight) {
      top = keyHeight + 10;
      this.setData({
        top: top
      })
    } else if (msgHeight < historyHeight) {
      top = historyHeight - msgHeight;
      this.setData({
        top: top
      })
    }
  },
  onBlur: function() {
    top = 0;
    this.setData({
      top: top
    })
  },

  getMsgHeight: function() {
    var query = wx.createSelectorQuery();
    var that = this;
    query.select('#msg-area').boundingClientRect(function(rect) {
      msgHeight = rect.height
    }).exec();
  },

  test(date) {
    //console.log("date = "+date)
    //var timelagging = 8; // 5 or 6
    var utc = new Date(date);
    //console.log("utc = "+utc)
    //var cdt = new Date(utc.getTime()-((1 * 60 * 60 * 1000) * timelagging));
    var newDate = formatTime2(utc)
    //console.log("CDT: "+newDate);
    return newDate
  },

  getHistoryMsgList: function(clearInput) {
    var that = this
    let user = wx.getStorageSync('userId')
    let doctor = this.data.doctorId
    wx.request({
      url: chatFindUrl,
      data: {},
      method: "POST",
      header: {
        'content-type': 'application/texts' // 默认值
      },
      success (res) {
          if(res.data.length != 0) {
            let list = res.data
            let chat = []
            list.forEach(e => {
              if((e.received == user || e.sent == user) && (e.received == doctor || e.sent == doctor)) {
                chat.push({no: e.no, senderID: e.sent, msgContent: e.content, msgDateTime: that.test(e.datetime)})
              }
            });
            that.setData({
              chatList: chat,
            })
          } else {

          }
      }
    })
  },
  send: function(msg){
    var that =this
    wx.request({
      url: chatAddUrl,
      data: msg,
      method: "POST",
      header: {
        'content-type': 'application/texts' // 默认值
      },
      success (res) {
        that.getHistoryMsgList(true)
        that.setData({
          userInputValue: "",
        })
      }
    })
  },
})
