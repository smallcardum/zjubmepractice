// pages/dietIntervention/dint.js
var util = require('../../utils/util');

import { foodRecordFindUrl } from "../../utils/util"
import { foodReDeFindUrl } from "../../utils/util"

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
        hidden: true,
        nowMealType: 0,
        nowFoodSortId: 0,
        tempFood: {},
        flag: false
    },

    slideTrigger: function(e){
        let that = this
        console.log("hahahaslideTrigger")
        // console.log(e.currentTarget.dataset.bean)
        // let mealType = e.currentTarget.dataset.bean.mealTypeId.toString()
        // let sortId = e.currentTarget.dataset.bean.sortId.toString()
        var str = 'meal[' + that.data.nowMealType + '].meals[' + this.data.nowFoodSortId + '].tempValue'
        // console.log(e.currentTarget.dataset.bean)
        if(that.data.flag){
            that.setData({
                [str]: e.detail.curVal
            });
            console.log(that.data)
        }     
        // console.log('当前选择的值',e.detail.curVal);
    },

    mConfirm(e){
        var queryTime = util.formatTime2(new Date());
        let that = this
        // console.log(e.currentTarget.dataset.bean)
        console.log("mConfirmStart")
        // console.log(e.currentTarget.dataset.bean)
        let id = e.currentTarget.dataset.bean.id
        // let recordId = e.currentTarget.dataset.bean.recordId
        // console.log(recordId)
        let foodId = e.currentTarget.dataset.bean.foodId
        // console.log(foodId)
        let newWeight = e.currentTarget.dataset.bean.tempValue
        if(newWeight==undefined){
            newWeight=0
        }
        let foodName = e.currentTarget.dataset.bean.foodName
        let foodTypeId = e.currentTarget.dataset.bean.foodTypeId
        let mealType = e.currentTarget.dataset.bean.mealType
        let userId = e.currentTarget.dataset.bean.userId
        let memo = e.currentTarget.dataset.bean.memo
        console.log(queryTime)
        // console.log(memo)
        wx.request({
          url: util.foodReDeUpdateUrl,
          method: "POST",
          data: {
              old: {
                id: id,
              },
              new: {
                foodId: foodId,
                weight: newWeight,
                foodName: foodName,
                foodTypeId: foodTypeId,
                mealType: mealType,
                userId: userId,
                memo: memo,
                datetime: queryTime,
              },
          },
          header: {
            'content-type': 'application/texts' // 默认值
          },
          success(res) {
              wx.showToast({
                title: '更改成功！',
              }),
              console.log("wuhuhu")
              wx.navigateTo({
                url: 'dint',
              })
          }
        })
    },

    deleteMeal(e){
        let that = this
        console.log(e.currentTarget.dataset.bean)
        let mealType = e.currentTarget.dataset.bean.mealType
        let sortId = e.currentTarget.dataset.bean.sortId
        let id = e.currentTarget.dataset.bean.id
        let str = "meal["+mealType+"].meals["+sortId+"]"
        // let foodId = e.currentTarget.dataset.bean.foodId
        // let newWeight = e.currentTarget
        wx.showModal({
            title: '提示',
            content: '你确定要删除这个食物记录吗？',
            
            success(res){
                wx.request({
                  url: util.foodReDeDeleteUrl,
                  method: "POST",
                  data: {
                    id: id
                  },
                  header: {
                    'content-type': 'application/texts' // 默认值
                  },
                  success(res){
                      wx.showToast({
                        title: '删除成功！',
                      })
                    //   setTimeout(wx.redirectTo({url: 'dint', }),1000)
                      wx.redirectTo({url: 'dint',})
                  }
                })
            }

        })
    },

    // redirect: function(){
        
    // },

    getUserInfo(){
        let that = this
        let userId = this.data.userId
        let queryTime = this.data.queryTime
        // console.log(userId)
        // console.log(queryTime)
        // console.log(util.foodReDeFindUrl)
        // console.log(util.mdcnRecordAddUrl)
        // console.log(that.data.meal[0].meals.length)
        wx.request({
            url: foodReDeFindUrl,
            method: "POST",
            data: {
                userId: userId,
                datetime: queryTime
            },
            header: {
                'content-type': 'application/texts' // 默认值
            },
            success(res) {
                that.setData({
                    flag: true
                })
                // console.log("cc" + that.data.meal[0].meals.length)
                // console.log("haha")
                let data = res.data
                let dataLength = data.length
                // console.log("data.length=" + data.length)
                
                let list = that.data.meal
                // console.log("dd" + that.data.meal[0].meals.length)
                for(var i = 0; i < data.length; i++){
                    // console.log(data[i])
                    // console.log("aa" + that.data.meal[0].meals.length)
                    var mealType = data[i].mealType
                    var recordId = data[i].id
                    list[mealType].meals.push(data[i])
                    // console.log("bb" + that.data.meal[0].meals.length)
                    // console.log(that.data.meal[0])
                    // that.data.meal[mealType].meals.push(data[i])


                    // wx.request({
                    //   url: util.foodDetailFindUrl,
                    //   method: "POST",
                    //   data: {
                    //     recordId: recordId,
                    //     userId: userId,
                    //   },
                    //   header: {
                    //     'content-type': 'application/texts' // 默认值
                    //   },
                    //   success(res){
                    //     let resData = res.data
                    //     // console.log(resData)
                    //     let resDataLength = resData.length
                    //     // console.log(res.data)
                    //     let list = []
                    //     console.log("aaa")
                    //     console.log(list)
                    //     for(var j = 0; j < resData.length; j++){
                    //         // that.data.meal[mealType].meals.push(resData[j].foodName)
                    //         // that.data.meal[mealType].meals.push(resData[j])
                    //         // resData[j].hidden=true
                    //         resData[j].mealTypeId=mealType
                    //         resData[j].sortId=j
                    //         resData[j].tempValue=resData[j].weight
                    //         // console.log(resData[j])
                    //         list.push(resData[j])
                    //         console.log("bbb")
                    //         console.log(list)
                    //         // console.log(typeof(mealType))

                    //         // console.log(that.data)
                    //     }
                    //     let mealdata = that.data.meal
                    //     mealdata[mealType].meals = list
                    //     console.log("xxxx")
                    //     console.log(list)
                    //     console.log(mealdata)
                    //     that.setData({meal: mealdata})
                    //     //that.setData({meal: list})
                    //     // if(i == dataLength){
                    //     //     console.log(that.data)
                    //     // }
                    //   }
                    // })
                    
                }
                
                for(var i = 0; i < list.length; i++){
                    // console.log("ilength = " + list[i].meals.length)
                    for(var j = 0; j < list[i].meals.length; j++){
                        list[i].meals[j].sortId = j
                    }
                }

                that.setData({
                    meal: list
                })
                // console.log(that.data)
                // console.log("heiheihei")
                // console.log(that.data.meal)
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var time = util.formatTime(new Date());
        var queryTime = util.formatTime2(new Date());
        let userId = wx.getStorageSync('userId')
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
        console.log(e.currentTarget.dataset.bean)
        let hidden = e.currentTarget.dataset.bean.hidden
        let mealType = e.currentTarget.dataset.bean.mealType
        let sortId = e.currentTarget.dataset.bean.sortId
        let that = this
        let tempFood = e.currentTarget.dataset.bean
        // var str = 'meal[' + mealType + '].meals[' + sortId + '].hidden'
        this.setData({
            hidden : false,
            nowMealType: mealType,
            nowFoodSortId: sortId
        })
        // console.log(that.data)
        // console.log()
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
        // let hidden = e.currentTarget.dataset.bean.hidden
        // let mealType = e.currentTarget.dataset.bean.mealTypeId
        // let sortId = e.currentTarget.dataset.bean.sortId
        // var str = 'meal[' + mealType + '].meals[' + sortId + '].hidden'
        var animation = wx.createAnimation({
            duration: 400,//动画的持续时间 默认400ms
            timingFunction: 'ease',//动画的效果 默认值是linear
        })
        this.animation = animation
        that.slideDown();//调用动画--滑出
        var time1 = setTimeout(function () {
            that.setData({
                hidden: true,
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
        wx.redirectTo({
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