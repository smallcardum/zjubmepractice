// pages/personalHomepage/peho.js
import { userInfoFindUrl } from "../../utils/config"
import { formatTime2 } from "../../utils/util"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: 0,
        userID: "",
        sex: "",
        birthDate: "",
        height: "",
        weight: "",
        level: "",
    },

    getUserInfo() {
        let that = this
        let phone = wx.getStorageSync('phone')
        let id = {
            userId: Number(this.data.id),
        }
        wx.request({
          url: userInfoFindUrl,
          method: "POST",
          data: id,
          header: {
            'content-type': 'application/texts' // 默认值
          },
          success(res) {
            let data = res.data[0]
            that.setData({
                userID: phone,
                sex: data.sex == 1 ? "男" : "女",
                birthDate: that.test(data.birth),
                height: data.height,
                weight: data.weight,
                level: data.level == 0 ? "一般人群" : (data.level == 1 ? "高危人群" : "糖尿病患者"),
            })
          }
        })

    },

    gotoPlan() {
        wx.navigateTo({
          url: '/pages/interventionPlan/plan?level='+this.data.level,
        })
    },

    exit() {
      wx.redirectTo({
        url: '/pages/login/login',
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = wx.getStorageSync('userId')
        this.setData({
            id,
        })
        this.getUserInfo()
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