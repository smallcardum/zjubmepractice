// pages/dietIntervention/dint.js
var util = require('../../utils/util');

import { foodRecordFindUrl } from "../../utils/util"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        meal: [
            {
                mealName: '早餐',
                meals: [],
                newMealUrl: "newDiet/newBreakfast"
            },
            {
                mealName: '午餐',
                meals: [],
                newMealUrl: "newDiet/newLunch"
            },
            {
                mealName: '晚餐',
                meals: [],
                newMealUrl: "newDiet/newDinner"
            },
            {
                mealName: '加餐',
                meals: [],
                newMealUrl: "newDiet/newAddMeal"
            }
        ],
        animationData: {},
    },

    slideTrigger: function(e){
        let that = this
        // console.log("hahaha")
        // console.log(e.currentTarget.dataset.bean)
        let mealType = e.currentTarget.dataset.bean.mealTypeId.toString()
        let sortId = e.currentTarget.dataset.bean.sortId.toString()
        var str = 'meal[' + mealType + '].meals[' + sortId + '].tempValue'
        // console.log(e.currentTarget.dataset.bean)
        that.setData({
            [str]: e.detail.curVal
        });
        // console.log('当前选择的值',e.detail.curVal);
    },

    mConfirm(e){
        let that = this
        // console.log(e.currentTarget.dataset.bean)
        console.log("mConfirmStart")
        console.log(e.currentTarget.dataset.bean)
        let no = e.currentTarget.dataset.bean.no
        let recordId = e.currentTarget.dataset.bean.recordId
        let foodId = e.currentTarget.dataset.bean.foodId
        let newWeight = e.currentTarget.dataset.bean.tempValue
        let foodName = e.currentTarget.dataset.bean.foodName
        let foodTypeId = e.currentTarget.dataset.bean.foodTypeId
        let userId = e.currentTarget.dataset.bean.userId
        wx.request({
          url: util.foodDetailUpdateUrl,
          method: "POST",
          data: {
              old: {
                no: no
              },
              new: {
                recordId: recordId,
                foodId: foodId,
                weight: newWeight,
                foodName: foodName,
                foodTypeId: foodTypeId,
                userId: userId
              },
          },
          header: {
            'content-type': 'application/texts' // 默认值
          },
          success(res) {
              wx.showToast({
                title: '更改成功！',
              }),
              that.onLoad()
          }
        })
    },

    delete(e){
        let that = this
        console.log(e.currentTarget.dataset.bean)
        let mealType = e.currentTarget.dataset.bean.mealTypeId
        let sortId = e.currentTarget.dataset.bean.sortId
        let no = e.currentTarget.dataset.bean.no
        let foodId = e.currentTarget.dataset.bean.foodId
        let newWeight = e.currentTarget
        wx.showModal({
            title: '提示',
            content: '你确定要删除这个食物记录吗？',
            success(res){
                // if(res.confirm){
                //     wx.request({
                //         url: util.foodDetailDeleteUrl,
                //         method: "POST",
                //         data:{
                //             old:{
                //                 no:
                //             }
                //         }
                //     })
                // }
            }

        })
    },

    getUserInfo(){
        let that = this
        let userId = this.data.userId
        let queryTime = this.data.queryTime
        // console.log(userId)
        
        wx.request({
            url: foodRecordFindUrl,
            method: "POST",
            data: {
                userId: userId,
                datetime: queryTime
            },
            header: {
                'content-type': 'application/texts' // 默认值
            },
            success(res) {
                let data = res.data
                let dataLength = data.length
                // console.log(data.length)
                for(var i = 0; i < data.length; i++){
                    // console.log(data[i])
                    var mealType = data[i].mealType
                    var recordId = data[i].id
                    wx.request({
                      url: util.foodDetailFindUrl,
                      method: "POST",
                      data: {
                        recordId: recordId,
                        userId: userId,
                      },
                      header: {
                        'content-type': 'application/texts' // 默认值
                      },
                      success(res){
                        let resData = res.data
                        // console.log(resData)
                        let resDataLength = resData.length
                        // console.log(res.data)
                        let list = that.data.meal
                        for(var j = 0; j < resData.length; j++){
                            // that.data.meal[mealType].meals.push(resData[j].foodName)
                            // that.data.meal[mealType].meals.push(resData[j])
                            resData[j].hidden=true
                            resData[j].mealTypeId=mealType
                            resData[j].sortId=j
                            resData[j].tempValue=resData[j].weight
                            // console.log(resData[j])
                            list[mealType].meals.push(resData[j])
                            that.setData({meal: list})
                            // console.log(that.data)
                        }
                        // if(i == dataLength){
                        //     console.log(that.data)
                        // }
                      }
                    })
                }
                console.log("heiheihei")
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var time = util.formatTime(new Date());
        var queryTime = util.formatTime2(new Date());
        let userId = wx.getStorageSync('id')
        // console.log(userId)
        
        this.setData({
            time: time,
            queryTime: queryTime,
            userId,
        })
        this.getUserInfo()
    },

    mCancel: function (e) {
        var that = this;
        console.log("mCancelStart")
        that.hideModal(e);
    },

    editMeal(e) {
        // console.log("editMealStart")
        // console.log(e.currentTarget.dataset.bean)
        let hidden = e.currentTarget.dataset.bean.hidden
        let mealType = e.currentTarget.dataset.bean.mealTypeId.toString()
        let sortId = e.currentTarget.dataset.bean.sortId.toString()
        let that = this
        var str = 'meal[' + mealType + '].meals[' + sortId + '].hidden'
        this.setData({
            [str] : false
        })
        // console.log(that.data.meal)
        var animation = wx.createAnimation({
            duration: 400,
            timingFunction: 'ease',
          })
        this.animation = animation;
        var time1 = setTimeout(function () {
            that.slideIn();
            clearTimeout(time1);
            time1 = null;
        }, 100)
        // console.log("editMealFinished")
        // console.log(e.currentTarget.dataset.bean)
    },

    hideModal: function (e) {
        // console.log("hideModelStart")
        // console.log(e.currentTarget.dataset.bean)
        let that = this;
        let hidden = e.currentTarget.dataset.bean.hidden
        let mealType = e.currentTarget.dataset.bean.mealTypeId.toString()
        let sortId = e.currentTarget.dataset.bean.sortId.toString()
        var str = 'meal[' + mealType + '].meals[' + sortId + '].hidden'
        var animation = wx.createAnimation({
            duration: 400,//动画的持续时间 默认400ms
            timingFunction: 'ease',//动画的效果 默认值是linear
        })
        this.animation = animation
        that.slideDown();//调用动画--滑出
        var time1 = setTimeout(function () {
            that.setData({
                [str]: true,
            })
            clearTimeout(time1);
            time1 = null;
        }, 220)//先执行下滑动画，再隐藏模块 
    },
     //动画 -- 滑入
    slideIn: function () {
        this.animation.translateY(0).step() // 在y轴偏移，然后用step()完成一个动画
        this.setData({
          //动画实例的export方法导出动画数据传递给组件的animation属性
            animationData: this.animation.export()
        })
    },
      //动画 -- 滑出
    slideDown: function () {
        this.animation.translateY(300).step()
        this.setData({
            animationData: this.animation.export(),
        })
    },

    newMeal(e){
        // console.log(e.currentTarget.dataset.bean)
        wx.navigateTo({
          url: e.currentTarget.dataset.bean.newMealUrl,
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