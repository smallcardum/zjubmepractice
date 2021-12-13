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
      chatList:[
      {id:"1",name:"张山",lastMsgContent: "123", lastMsgDateTime: "2021-11-18 12:16:47"},
      {id:"2",name:"李士",lastMsgContent: "456", lastMsgDateTime: "2021-11-30 12:16:47"}
    ],
      toView: 'msg-0',
      top: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})