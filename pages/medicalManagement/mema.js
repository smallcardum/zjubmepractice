// pages/medicalManagement/mema.js
import { userInfoFindUrl } from "../../utils/config"
import { mdcnPlanFindUrl } from "../../utils/util"
import { mdcnRecordFindUrl } from "../../utils/util"
import { mdcnRecordAddUrl } from "../../utils/util"
import { mdcnRecordUpdateUrl } from "../../utils/util"
import { mdcnPlanDeleteUrl } from "../../utils/util"
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
        let userId = this.data.id
        let id = {
            // userId: Number(this.data.id),
            userId: this.data.id
        }
        console.log("mdcnPlanFindUrl = " + util.mdcnPlanFindUrl)
        let planIdList = []
        wx.request({
          url: mdcnPlanFindUrl,
          method: "POST",
          data: id,
          header: {
            'content-type': 'application/texts' // 默认值
          },
          success(res) {
            // console.log(res)
            // console.log("haha")
            let data = res.data
            that.setData({
                items: data
            })
            
            let time = util.formatTime2(new Date())
            const map = new Map()
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
                planIdList.push(planId)
                
                var strId = 'items[' + i + '].planid'
                that.setData({
                    [strId] : i
                })
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
                            // console.log(i + "haha")
                            map.set(planId, 0)
                            wx.request({
                                url: mdcnRecordAddUrl,
                                method: "POST",
                                data: {
                                    userId: userId,
                                    planId: planId,
                                    date: time,
                                    did: 0
                                },
                                header: {
                                    'content-type': 'application/texts' // 默认值
                                },
                            })
                        }else{
                            // console.log(rcddata[0].did)
                            map.set(planId, rcddata[0].did)
                        }
                        if(map.size==that.data.items.length){
                            for(let i = 0; i < that.data.items.length; i++){
                                var str = 'items[' + i + '].checked'
                                let planId = that.data.items[i].id
                                // console.log("planId=" + planId)
                                // console.log(map.get(planId))
                                // console.log(map)
                                that.setData({
                                    [str]: map.get(planId)
                                })
                            }
                        }
                    }
                })
            }
            console.log("planIdList="+planIdList)
            console.log(map)
            // map.set('name','张三')
          }
        })
    },

    drugTaken(e) {
        console.log(e.currentTarget.dataset)
        let checked = e.currentTarget.dataset.bean.checked
        let planid = e.currentTarget.dataset.bean.planid
        let id = e.currentTarget.dataset.bean.id
        let that = this
        let str = 'items[' + planid + '].checked'
        let time = util.formatTime2(new Date())
        switch(checked){
            case 0:
                checked = 1
                console.log("planid="+id)
                wx.request({
                    url: mdcnRecordUpdateUrl,
                    method: "POST",
                    data: {
                        old: {
                            planId: id,
                            date: time,
                        },
                        new: {
                            userId: that.data.id,
                            planId: id,
                            date: time,
                            did: 1
                        }
                    },
                    header: {
                        'content-type': 'application/texts' // 默认值
                    },
                })
                break
            case 1:
                checked = 0
                wx.request({
                    url: mdcnRecordUpdateUrl,
                    method: "POST",
                    data: {
                        old: {
                            planId: id,
                            date: time,
                        },
                        new: {
                            userId: that.data.id,
                            planId: id,
                            date: time,
                            did: 0
                        }
                    },
                    header: {
                        'content-type': 'application/texts' // 默认值
                    },
                })
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
        console.log(e.currentTarget.dataset.bean)
        console.log('haha')
        let userId = this.data.id
        let that = this
        wx.showModal({
          title: '提示',
          content: '你确定要删除这个药物吗？',
          success(res){
            if(res.confirm){
                wx.request({
                    url: mdcnPlanDeleteUrl,
                    method: "POST",
                    data: {
                        userId: userId,
                        id: e.currentTarget.dataset.bean.id
                    },
                    header: {
                        'content-type': 'application/texts' // 默认值
                    },
                    success(res){
                        wx.showToast({
                          title: '删除成功！',
                        }),
                        that.onLoad()
                    }
                })
            }
          }
        })
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

    },

    checkboxChange: function(){
        
    }
})