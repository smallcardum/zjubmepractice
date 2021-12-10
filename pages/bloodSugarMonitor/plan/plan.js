// pages/bloodSugarMonitor/plan/plan.js
import { gluPlanAddUrl, gluPlanFindUrl, gluPlanDeleteUrl } from '../../../utils/config'
const id = wx.getStorageSync('id')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    target: "",
    week: "",
    items: [
      {value: '0', name: '早饭空腹'},
      {value: '1', name: '早饭饭后'},
      {value: '2', name: '午饭空腹'},
      {value: '3', name: '午饭饭后'},
      {value: '4', name: '晚饭空腹'},
      {value: '5', name: '晚饭饭后'}
    ],
    day: [],
    flag: false,
  },

  inputTarget(e) {
    this.setData({
      target: e.detail.value
    })
  },

  inputWeek(e) {
    this.setData({
      week: e.detail.value
    })
  },

  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    const items = this.data.items
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false
      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value === values[j]) {
          items[i].checked = true
          break
        }
      }
    }
    this.setData({
      day: values,
    })
  },

  confirm() {
    if (this.data.flag) {
      this.deletePlan()
    }
    let day = this.data.day
    let dayFre = day.length
    let data = {
      userId: Number(id),
      target: Number(this.data.target),
      time: 0,
      weekFre: Number(this.data.week),
      dayFre: Number(dayFre),
    }
    day.forEach(e => {
      data.time = Number(e)
      this.addPlan(data)
    });
    wx.showToast({
      title: '更改成功',
      icon: 'success',
    })
  },
  

  addPlan(data) {
    wx.request({
      url: gluPlanAddUrl,
      method: "POST",
      data: data,
      header: {
        'content-type': 'application/texts' // 默认值
      },
      success(res) {
        
      }
    })

  },

  deletePlan() {
    wx.request({
      url: gluPlanDeleteUrl,
      method: "POST",
      data: {userId: id},
      header: {
        'content-type': 'application/texts' // 默认值
      },
      success(res) {
        
      }
    })
  },

  getPlan() {
    let that = this
    wx.request({
      url: gluPlanFindUrl,
      method: "POST",
      data: {userId: id},
      header: {
        'content-type': 'application/texts' // 默认值
      },
      success(res) {
        let data = res.data
        if(data.length) {
          let target = res.data[0].target
          let week = res.data[0].weekFre
          let list = that.data.items
          data.forEach(e => {
            let i = 0
            for(i = 0; i < list.length; i++) {
              if(list[i].value == e.time) {
                list[i].checked = true
                break
              }
            }
          });
          that.setData({
            target: target,
            week: week,
            items: list,
            flag: true,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取计划
    this.getPlan()
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