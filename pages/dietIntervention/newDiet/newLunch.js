var utils = require('../../../utils/util')

import {
  foodFindUrl
} from "../../../utils/util"
// import { vicoSearchFoodUrl, vicoSearchFoodUnitUrl } from "../../../../../../utils/config";
// import { tokenRequest } from "../../../../../../utils/request";

// pages/function/input/inputfood2/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: 1,
    foodList: [],
    hidden: true,
    food: {},
    value: 0,
    word: "",
    units: ["克"],
    unit: "",
    valueUnit: [0],
    unitGram: 1,
    unitsNum: [1],
    meal: [],
    animationData: {},
    mealType: 1,
    nowNowFoodSortId: 0,
    flag: false
  },

  gotoResult() {
    this.setData({
      selected: 1,
    })
  },

  gotoCollect() {
    this.setData({
      selected: 2,
    })
    wx.showToast({
      title: '该功能暂未开放',
      icon: 'none'
    })
  },

  gotoHistory() {
    this.setData({
      selected: 3,
    })
    wx.showToast({
      title: '该功能暂未开放',
      icon: 'none'
    })
  },

  selectOne(e) {
    let food = e.currentTarget.dataset.food
    console.log(food)
    // this.getFoodUnit(food)
    let that = this
    that.setData({
      hidden: false,
      nowNowFoodSortId: food.nowFoodSortId
    })
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
  },

  mCancel: function (e) {
    var that = this;
    console.log("mCancelStart")
    that.hideModal(e);
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
      duration: 400, //动画的持续时间 默认400ms
      timingFunction: 'ease', //动画的效果 默认值是linear
    })
    this.animation = animation
    that.slideDown(); //调用动画--滑出
    var time1 = setTimeout(function () {
      that.setData({
        hidden: true,
      })
      clearTimeout(time1);
      time1 = null;
    }, 220) //先执行下滑动画，再隐藏模块 
  },

  slideTrigger: function (e) {
    let that = this
    console.log("hahahaslideTrigger")
    // console.log(e.currentTarget.dataset.bean)
    // let mealType = e.currentTarget.dataset.bean.mealTypeId.toString()
    // let sortId = e.currentTarget.dataset.bean.sortId.toString()
    // console.log(e.currentTarget.dataset.bean)
    if (that.data.flag) {
      that.setData({
        value: e.detail.curVal
      });
      // console.log(that.data)
    }
    // console.log('当前选择的值',e.detail.curVal);
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


  // getFoodUnit(food) {
  //   let serial_No = food.id
  //   // let source = food.source
  //     let token = wx.getStorageSync('login_token');
  //     let method = "POST";
  //     let header = {
  //       token: token,
  //       "content-type": "application/json"
  //     };
  //     let url = vicoSearchFoodUnitUrl;
  //     let data = {
  //       serial_No: serial_No,
  //       source: source,
  //     }
  //     tokenRequest({url, header, method, data}).then(res=>{
  //       if(res.data.data.length != 0  && res.data.data[0].edible_Part != 0) {
  //         let list = []
  //         res.data.data.forEach(e => {
  //           let one = {}
  //           one.unit = e.level_Part + e.unit_Name_Part
  //           one.number = e.edible_Part / e.number_Part
  //           list.push(one)
  //         });
  //         let slist = []
  //         let nlist = []
  //         list.forEach( e => {
  //           slist.push(e.unit)
  //           nlist.push(e.number)
  //         })
  //         this.setData({
  //           gram: true,
  //           food,
  //           value: "",
  //           units : slist,
  //           unitsNum : nlist,
  //           unit: slist[0],
  //           unitGram: nlist[0],
  //           valueUnit: [0],
  //         })
  //       } else {
  //         let slist = ["克"]
  //         let nlist = [1]
  //         this.setData({
  //           gram: true,
  //           food,
  //           value: "",
  //           units : slist,
  //           unitsNum : nlist,
  //           unit: slist[0],
  //           unitGram: nlist[0],
  //           valueUnit: [0],
  //         })
  //       }

  //     })
  // },

  gramChange(e) {
    this.setData({
      value: e.detail.value
    })
  },

  cancelGram() {
    this.setData({
      gram: false,
      value: "",
    })
  },

  confirmGram() {
    if (this.data.value == "") {
      wx.showToast({
        title: '请输入食物份量',
        icon: 'none'
      })
    } else {
      let actual = this.data.unitGram * this.data.value
      let foodi = this.data.food
      //实际克数
      foodi.memo = this.data.value + this.data.unit
      foodi.value = actual.toFixed(1)
      const eventChannel = this.getOpenerEventChannel()
      eventChannel.emit('acceptDataFromOpenedPage', {
        data: foodi
      });
      wx.navigateBack({ //返回前一页
        delta: 1
      })
    }
  },

  inputWord(e) {
    //console.log("输入框"+JSON.stringify(e.detail))
    this.setData({
      word: e.detail.value,
    })
  },

  searchFood() {
    let word = this.data.word
    let that = this

    if (word == "") {
      wx.showToast({
        title: '请输入食物名称',
        icon: 'none'
      })
    } else {
      console.log(word)
      wx.request({
        url: utils.foodFindUrl,
        method: "POST",
        data: {
          name: word
        },
        header: {
          'content-type': 'application/texts' // 默认值
        },
        success(res) {
          let list = res.data
          // console.log(list)
          if (list.length == 0) {
            wx.showToast({
              title: '暂无数据',
              icon: 'none',
              duration: 1000,
            })
          } else {
            let foodSortId = 0
            let foodList = []
            list.forEach(e => {
              e.abbrname = e.name
              e.nameLength = e.name.length
              e.nowFoodSortId = foodSortId
              if (e.nameLength > 10) {
                e.abbrname = e.name.substring(0, 10)
              }
              foodList.push(e)
              foodSortId++
            })
            console.log(foodList)
            that.setData({
              flag: true,
              foodList: foodList
            })
          }
        }
      })
      //   tokenRequest({url, header, method, data}).then(res=>{
      //     let list = res.data.data
      //     if(list.length == 0) {
      //       wx.showToast({
      //         title: '暂无数据',
      //         icon: 'none',
      //         duration: 1000,
      //       })
      //     } else {
      //       let foodList = []
      //       list.forEach(e => {
      //         let item = {}
      //         item.no = e.serial_No
      //         item.name = e.name
      //         item.typeID = e.food_type_id
      //         item.source = e.source
      //         foodList.push(item)
      //       });
      //       this.setData({
      //         foodList,
      //       })
      //     }
      //console.log("搜索返回==="+JSON.stringify(res.data))
      //   })
    }

  },

  mConfirm(e) {
    var queryTime = utils.formatTime2(new Date());
    let that = this
    // console.log(e.currentTarget.dataset.bean)
    console.log("mConfirmStart")
    // console.log(e.currentTarget.dataset.bean)
    // let id = e.currentTarget.dataset.bean.id
    // let recordId = e.currentTarget.dataset.bean.recordId
    // console.log(recordId)
    // let foodId = e.currentTarget.dataset.bean.
    console.log(e.currentTarget.dataset.bean)
    // console.log(foodId)
    let newWeight = that.value
    if (newWeight == undefined) {
      newWeight = 0
    }
    // let foodName = e.currentTarget.dataset.bean.foodName
    // let foodTypeId = e.currentTarget.dataset.bean.foodTypeId
    // let mealType = e.currentTarget.dataset.bean.mealType
    // let userId = e.currentTarget.dataset.bean.userId
    // let memo = e.currentTarget.dataset.bean.memo
    // console.log(queryTime)
    // console.log(memo)
    wx.request({
      url: utils.foodReDeAddUrl,
      method: "POST",
      data: {
        userId: that.data.id,
        memo: "",
        datetime: queryTime,
        mealType: 1,
        foodId: e.currentTarget.dataset.bean.id,
        weight: that.data.value,
        foodName: e.currentTarget.dataset.bean.name,
        foodTypeId: e.currentTarget.dataset.bean.type
      },
      header: {
        'content-type': 'application/texts' // 默认值
      },
      success(res) {
        wx.showToast({
            title: '添加午餐成功！',
          }),
          console.log("wuhuhu")
        let pencil=that.pencil
        setTimeout(pencil, 1000)
        // wx.navigateTo({
        //   url: '../dint',
        // })
      }
    })
  },

  pencil(){
      wx.redirectTo({
        url: '../dint',
      })
  },


  bindChangeUnit(e) {
    const val = e.detail.value
    this.setData({
      unit: this.data.units[val],
      unitGram: this.data.unitsNum[val],
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let unit = this.data.units[0]
    let userId = wx.getStorageSync('userId')
    this.setData({
      unit,
      id: userId
    })
    // this.getUserInfo()
  },

  // getUserInfo(){
  //   let that = this

  // }

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