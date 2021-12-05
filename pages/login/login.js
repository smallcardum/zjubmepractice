// pages/login/login.js
import { userAuthFindUrl } from "../../utils/config"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userName: "",
        userPassword: "",
    },

    userNameInput(e) {
        this.setData({
            userName: e.detail.value
          });
    },

    userPasswordInput(e) {
        this.setData({
            userPassword: e.detail.value
          });
    },

    gotoRegister() {
        wx.navigateTo({
            url: "/pages/register/register"
          });
    },

    logIn() {
        let upsw = this.data.userPassword
        let user = {
            phone : this.data.userName,
          }
          wx.request({
            url: userAuthFindUrl,
            data: user,
            method: "POST",
            header: {
              'content-type': 'application/texts' // 默认值
            },
            success (res) {
                console.log("userAuth=="+res.data)
                if(res.data.length != 0) {
                    let psw = res.data[0].password
                    if(psw == upsw) {
                        wx.switchTab({
                          url: "/pages/index/index"
                        });
                    } else {
                        wx.showToast({
                          title: '密码错误',
                          icon: 'error'
                        })
                    }
                } else {
                    wx.showToast({
                        title: '找不到用户',
                        icon: 'error'
                      })
                }
            }
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