import { userInfoFindUrl } from "../../../../utils/config"
import { foodRcmdFindUrl } from "../../../../utils/util"

// pages/dietIntervention/dietAnalysis/dietRecommend/dire.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        level: 0,
        mealType: 0,
        package: 0,
        recommend: "",
        rcmdword: ["好吃", "美味", "营养", "健康", "低糖", "低脂", "低盐", "低钠", "低胆固醇", "易消化", "好吸收", "清宿便", "排肠毒", "润肠道", "利尿", "降血糖", "降血脂", "降血压", "温和", "养胃", "护肾", "护肝", "护心", "润肺"]
    },

    getUserInfo() {
        let that = this
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
                level : data.level
            })
            // console.log("level = " + that.data.level)
            that.getFoodRecommend()
          }
        })
        // this.getFoodRecommend()
    },

    getFoodRecommend() {
        let that = this
        let level = {
            suit : this.data.level,
            mealType : this.data.mealType,
            packages : this.data.package,
        }
        // console.log(level.packages)
        wx.request({
            url: foodRcmdFindUrl,
            method: "POST",
            data: level,
            header:{
                'content-type': 'application/texts'
            },
            success(res){
                let data = res.data
                that.setData({
                    recommend: data
                })
                // console.log(that.data.recommend)
                let rcmd = that.data.recommend
                let newRcmd = []
                let names = []
                let randomNum = []
                for(let i = 0; i < rcmd.length; ++i){
                    // console.log(rcmd[i].dishName)
                    if(names.indexOf(rcmd[i].dishName) == -1){
                        // console.log("haha")
                        var newRcmdId = newRcmd.length
                        newRcmd.push({
                            name: rcmd[i].dishName,
                            ingredients:[{
                                ingredientsName: rcmd[i].name,
                                weight: rcmd[i].weight
                            }],
                            hidden: 1,
                            rcmdId: newRcmd.length
                        })
                        names.push(rcmd[i].dishName)
                    }else{
                        // console.log(names.indexOf(rcmd[i].dishName)+rcmd[i].dishName+rcmd[i].name+rcmd[i].weight)
                        newRcmd[names.indexOf(rcmd[i].dishName)].ingredients.push({
                            ingredientsName: rcmd[i].name,
                            weight: rcmd[i].weight
                        })
                    }
                }
                for(let i = 0; i < newRcmd.length; ++i){
                    let randgroup = []
                    for(let j = 0; j < 3; ++j){
                        var randNum = Math.floor(Math.random()*24)
                        if(randgroup.indexOf(randNum) == -1){
                            randgroup.push(randNum)
                        }else{
                            j--
                        }
                    }
                    randomNum.push(randgroup)
                }
                that.setData({
                    showRecommend: newRcmd,
                    random: randomNum
                })
            }
        })
    },

    packageChange(e){
        let that = this
        let newPackage = that.data.package
        switch(that.data.package){
            case 0:
                newPackage = 1
                break
            case 1:
                newPackage = 0
                break
        }
        that.setData({
            package: newPackage
        })
        that.getFoodRecommend()
    },

    typeChange(e){
        let newType = parseInt(e.currentTarget.dataset.bean)
        let that = this
        that.setData({
            mealType: newType
        })
        that.getFoodRecommend()
    },

    showNutrition(e){
        // console.log(e.currentTarget.dataset)
        let that = this
        var hidden = e.currentTarget.dataset.bean.hidden
        // console.log(that.data)
        var id = e.currentTarget.dataset.bean.rcmdId
        

        var str = 'showRecommend[' + id + '].hidden'
        switch(hidden){
            case 0:
                hidden = 1
                break
            case 1:
                hidden = 0
                break
        }
        that.setData({
            [str] : hidden
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
        this.getUserInfo();
        // console.log("level=" + this.data.level);
        // this.getFoodRecommend();
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