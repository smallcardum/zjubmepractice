// pages/dietIntervention/dint.js
var util = require('../../utils/util');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        meal: [
            {mealName: '早餐' },
            {mealName: '午餐' },
            {mealName: '晚餐' },
            {mealName: '加餐' }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var time = util.formatTime(new Date());

        this.setData({
            time: time
        });
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