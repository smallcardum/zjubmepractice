// pages/bloodSugarMonitor/bsm.js
import { gluRecordFindUrl, gluRecordAddUrl, gluPlanFindUrl } from "../../utils/config"
var wxCharts = require('../../utils/wxcharts.js');
import { formatTime2 } from "../../utils/util"

var lineChart = null;
const id = wx.getStorageSync('id');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        lastValue: "",
        value: "",
        list: [],
        enableScroll: false,
        windowWidth: 375,
        planId: 0,
        target: "",
    },

    //plan id 怎么搞 有bug

    inputValue(e) {
        this.setData({
            value: e.detail.value
        })
    },

    changePlan() {
        wx.navigateTo({
          url: '/pages/bloodSugarMonitor/plan/plan',
        })
    },

    commitRecord() {
        let that = this
        var now = new Date()
        var time = formatTime2(now)
        wx.request({
          url: gluRecordAddUrl,
          method: "POST",
          data: {
            userId: Number(id),
            planId: Number(that.data.planId),
            date: time,
            value: Number(that.data.value),
        },
          header: {
            'content-type': 'application/texts' // 默认值
          },
          success(res) {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
            })
            that.getHistoryList()
          }
        })
    },

    getHistoryList() {
        let that = this
        wx.request({
          url: gluRecordFindUrl,
          method: "POST",
          data: {userId: id},
          header: {
            'content-type': 'application/texts' // 默认值
          },
          success(res) {
            let data = res.data
            let list = []
            if(data.length) {
                data.forEach(e => {
                    list.push({value: e.value, date: e.date.slice(0,10)})
                });
                let lastValue = data[data.length-1].value
                that.setData({
                    list,
                    lastValue,
                })
                that.drawlinechart()
            } 
          }
        })
    },

    touchHandler: function (e) {
      lineChart.scrollStart(e);
    },
    moveHandler: function (e) {
      lineChart.scroll(e);
    },
    touchEndHandler: function (e) {
      lineChart.scrollEnd(e);
      lineChart.showToolTip(e, {
        format: function (item, category) {
          return category + ' ' + item.name + ':' + item.data
        }
      });
    },

  createData: function () {
    var that = this;
    var chartsdate = {
      date: [],
      glu: [],
      color: [],
    };
    var glus = this.data.list;
    if (glus.length > 5) {
      that.setData({
        enableScroll: true
      })
    }
    else {
      that.setData({
        enableScroll: false
      })
    }
    let target = this.data.target
    chartsdate.date = glus.map(function (item) {
      chartsdate.glu.push(item.value);
      chartsdate.color.push(item.value > target ? '#FF0000' :'#000000');
      return item.date.slice(5,10)
    })
    return chartsdate;
  },

  drawlinechart: function (e) {
    var weekData = this.createData();
    console.log(JSON.stringify(this.data.list)+"==="+JSON.stringify(weekData)+"scoll"+this.data.enableScroll)
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: weekData.date,
      animation: true,
      series: [{
        name: '血糖',
        data: weekData.glu,
        pointColor: weekData.color,
      }],
      yAxis: {
        format: function (val) {
          return val.toFixed(1);
        },
        min: 0,
        max: 10,
        disableGrid: false,
        fontSize: 8,
      },
      xAxis: {
        fontSize: 8,
      },
      width: this.data.windowWidth*0.92,
      enableScroll: this.data.enableScroll,
      height: 160,
      dataLabel: true,
      dataPointShape: true,
      legend: false,
      extra: {
        lineStyle: 'curve'
      },
    });
    setTimeout(()=>{
      lineChart.scrollToEnd()
    }, 1000)
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
        if(res.data.length) {
          that.setData({
            target: res.data[0].target
          })
        } else {
          wx.showToast({
            title: '请制定监测方案',
            icon: 'none',
          })
        }
      }
    })
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getPlan()
      this.getHistoryList()
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

    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
    },
    formReset: function () {
        console.log('form发生了reset事件')
    }


})