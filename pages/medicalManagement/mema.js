// pages/medicalManagement/mema.js
import { userInfoFindUrl } from "../../utils/config"
import { mdcnPlanFindUrl } from "../../utils/util"

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
            userId: Number(this.data.id),
        }
        wx.request({
          url: mdcnPlanFindUrl,
          method: "POST",
          data: id,
          header: {
            'content-type': 'application/texts' // 默认值
          },
          success(res) {
            let data = res.data
            that.setData({
                items: data
            })
            for(var i = 0; i < that.data.items.length; i++){
                var str = 'items[' + i + '].time'
                // that.setData({
                //     [str] : '爆炸'
                // })
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
                var str = 'items[' + i + '].checked'
                var strId = 'items[' + i + '].id'
                that.setData({
                    [str] : 0,
                    [strId] : i
                })
            }
          }
        })
    },

    drugTaken(e) {
        // console.log(e.currentTarget.dataset)
        var checked = e.currentTarget.dataset.bean.checked
        var id = e.currentTarget.dataset.bean.id
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

    },

    editDrugs(e) {
        let that = this
        that.setData({
            edit: 1
        })
        console.log(that.edit)
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = wx.getStorageSync('id')
        this.setData({
            id,
        })
        this.getUserInfo();
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