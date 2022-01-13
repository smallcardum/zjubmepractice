// pages/doctorPatientCommuniation/communicate-list/communicate-list.js
import {chatFindUrl} from '../../../utils/config.js'
import {formatTime2} from '../../../utils/util'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        chatList:[
            {id:"1",name:"张医生",lastMsgContent: "暂无消息", lastMsgDateTime: ""},
        ],
        chat: [],
    },
    gotoChat: function(e){
       let chatModel = e.currentTarget.dataset['chat'];
       chatModel.chat = this.data.chat
       chatModel = JSON.stringify(chatModel)
        console.log("chatmodel==="+chatModel)
        wx.navigateTo({
          url: '../communicate-chat/communicate-chat?chatInfo=' + chatModel
        })
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

    getList() {
      var that = this
      let user = wx.getStorageSync('userId')
      console.log("userid=="+user)
        wx.request({
          url: chatFindUrl,
          method: "POST",
          data: {},
          header: {
            'content-type': 'application/texts' // 默认值
          },
          success (res) {
              //console.log("chatlist=="+res.data)
              let list = res.data
              let chat = []
              let last = that.data.chatList
              if(list.length != 0) {
                list.forEach(e => {
                  if(e.received == user || e.sent == user) {
                    chat.push({no: e.no, senderID: e.sent, msgContent: e.content, msgDateTime: that.test(e.datetime)})
                  }
                });
                console.log("chat==="+JSON.stringify(chat))
                if(chat.length != 0) {
                  console.log(chat+"---"+chat.length)
                  last[0].lastMsgContent = chat[chat.length-1].msgContent
                  last[0].lastMsgDateTime = chat[chat.length-1].msgDateTime
                }
              }
              console.log("last==="+JSON.stringify(last))
              that.setData({
                chat,
                chatList: last,
              })
          }
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getList()

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
      this.getList()
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