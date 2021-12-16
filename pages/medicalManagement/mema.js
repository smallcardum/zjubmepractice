// pages/medicalManagement/mema.js
import { userInfoFindUrl } from "../../utils/config"
import { mdcnPlanFindUrl } from "../../utils/util"
import { mdcnRecordFindUrl } from "../../utils/util"
var util = require('../../utils/util')

Page({
    /**
     * 页面的初始数据
     */
    data: {
        items: [],
        edit: 0
    },

    getUserInfo() {
        
        let that = this
        let id = {
            // userId: Number(this.data.id),
            userId: this.data.id
        }
        console.log("mdcnPlanFindUrl = " + mdcnPlanFindUrl)
        
        wx.request({
          url: mdcnPlanFindUrl,
          method: "POST",
          data: id,
          header: {
            'content-type': 'application/texts' // 默认值
          },
          success(res) {
            console.log(res)
            // console.log("haha")
            let data = res.data
            that.setData({
                items: data
            })
            
            let time = util.formatTime2(new Date())
            for(var i = 0; i < that.data.items.length; i++){
                var str = 'items[' + i + '].time'
                switch(that.data.items[i].time){
                    case 0:
                        that.setData({
                            [str] : '早饭空腹'
                        })
                        break
                    case 1:
                        that.setData({
                            [str] : '早饭饭后'
                        })
                        break
                    case 2:
                        that.setData({
                            [str] : '午饭空腹'
                        })
                        break
                    case 3:
                        that.setData({
                            [str] : '午饭饭后'
                        })
                        break
                    case 4:
                        that.setData({
                            [str] : '晚饭空腹'
                        })
                        break
                    case 5:
                        that.setData({
                            [str] : '晚饭饭后'
                        })
                        break    
                }
                let planId = that.data.items[i].id
                let did = 0
                wx.request({
                    url: mdcnRecordFindUrl,
                    method: "POST",
                    data: {
                        planId: planId,
                        date: time
                    },
                    header: {
                        'content-type': 'application/texts' // 默认值
                    },
                    success(res){
                        let rcddata = res.data
                        if(rcddata.length==0){
                            console.log(i + "haha")
                        }else{
                            console.log(i + rcddata[0].did)
                            did = rcddata[0].did
                        }
                    }
                })
                var str = 'items[' + i + '].checked'
                var strId = 'items[' + i + '].planid'
                that.setData({
                    [str] : did,
                    [strId] : i
                })
            }
          }
        })
    },

    drugTaken(e) {
        // console.log(e.currentTarget.dataset)
        var checked = e.currentTarget.dataset.bean.checked
        var id = e.currentTarget.dataset.bean.planid
        let that = this
        var str = 'items[' + id + '].checked'
        switch(checked){
            case 0:
                checked = 1
                break
            case 1:
                checked = 0
                break
        }
        that.setData({
            [str] : checked
        })
        that.updateRecord(e, checked)
    },

    updateRecord(e, checked){
        let planId = e.currentTarget.dataset.bean.id
        console.log(planId)
        let bean = e.currentTarget.dataset.bean
    },

    editDrugs(e) {
        let that = this
        that.setData({
            edit: 1
        })
        // console.log(that.edit)
    },

    editFinish(e) {
        let that = this
        that.setData({
            edit: 0
        })
    },

    deleteDrug(e){

    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = wx.getStorageSync('id')
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

    },

    checkboxChange: function(){
        
    }
})