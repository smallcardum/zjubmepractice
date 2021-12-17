import { mdcnPlanAddUrl } from "../../../utils/util"

// pages/medicalManagement/memaplan/plan.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: "",
        dasage: "",
        time: [],
        weekFre: 0,
        dayFre: 0,
        frequency: [{
            name: "早饭空腹"
        },{
            name: "早饭饭后"
        },{
            name: "午饭空腹"
        },{
            name: "午饭饭后"
        },{
            name: "晚饭空腹"
        },{
            name: "晚饭饭后"
        }],
        nameError: false,
        dasageError: false,
        weekFreError: false,
        frequencyError: false
    },

    formSubmit: function(e){
        console.log(e.detail.value)
        const detail = e.detail.value
        let userId = this.data.userId
        if(detail.name==""){
            this.setData({
                nameError: true
            })
        }else{
            this.setData({
                nameError: false
            })
        }
        if(detail.dasage==""){
            this.setData({
                dasageError: true
            })
        }else{
            this.setData({
                dasageError: false
            })
        }
        if(detail.weekFre == 0){
            this.setData({
                weekFreError: true
            })
        }else{
            this.setData({
                weekFreError: false
            })
        }
        if(detail.checkbox.length==0){
            this.setData({
                frequencyError: true
            })
        }else{
            this.setData({
                frequencyError: false
            })
        }
        if(this.data.nameError==false&&this.data.dasageError==false&&this.data.weekFreError==false&&this.data.frequencyError==false){
            var set = new Set()
            for(let i = 0; i < detail.checkbox.length; i++){
                wx.request({
                    url: mdcnPlanAddUrl,
                    method: "POST",
                    data:{
                        userId: userId,
                        name: detail.name,
                        dasage: detail.dasage,
                        time: Number(detail.checkbox[i]),
                        weekFre: Number(detail.weekFre),
                        dayFre: detail.checkbox.length
                    },
                    header: {
                        'content-type': 'application/texts' // 默认值
                    },
                    success(res){
                        set.add(i)
                        
                        if(set.size==detail.checkbox.length){
                            wx.showLoading({
                                title:'正在记录'
                            })
                            setTimeout(() => {
                                wx.redirectTo({
                                    url: '../mema'
                                })
                            }, 2000)
                        }
                    }
                })
            }
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userId = wx.getStorageSync('id')
        this.setData({
            userId: userId
        })
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