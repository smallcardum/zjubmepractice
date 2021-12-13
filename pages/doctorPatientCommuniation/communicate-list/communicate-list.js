// pages/doctorPatientCommuniation/communicate-list/communicate-list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        chatList:[
            {id:"1",name:"张山",lastMsgContent: "123", lastMsgDateTime: "2021-11-18 12:16:47"},
            {id:"2",name:"李士",lastMsgContent: "456", lastMsgDateTime: "2021-11-30 12:16:47"}
        ]
    },
    gotoChat: function(e){
        let chatModel = JSON.stringify(e.currentTarget.dataset['chat']);
        wx.navigateTo({
          url: '../communicate-chat/communicate-chat?chatInfo' + chatModel
        })
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