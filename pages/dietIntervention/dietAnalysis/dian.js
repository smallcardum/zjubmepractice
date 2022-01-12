// pages/dietIntervention/dietAnalysis/dian.js
var util = require('../../../utils/util');

import { analysisGetUrl, foodReDeFindUrl } from "../../../utils/util"

// pie
const  windowWidth =375;
let pieInitData = { //环形饼图默认初始数据
  mW: 0.8 * windowWidth / 2,
  mH: 0.67 * windowWidth / 2,
  r: 0.15 * windowWidth,
  lineW: 0.07 * windowWidth,
  chink: 2 * Math.PI / 180,/* 环形间距 */
  outSpot: 0.047 * windowWidth, //伸出去点的长度
  outLine: 0.1 * windowWidth, //伸出去线的长度
  signR: 0.006 * windowWidth, //点半径
  fontSize: 0.035 * windowWidth, //字体大小
  textSpace: 0.025 * windowWidth, //文字上下与线的间距
  speed: 2 * Math.PI / 30, /* 速度 */
  moneyColorArr: ['#F1F365', '#89F7FE', '#FF934C']
};

Page({

    /**
     * 页面的初始数据
     */
    data: {
        time: '',
        queryTime: '',
        userId: 0,
        meal: [],
        
    // pie
    canvasW:0.8*windowWidth,
    canvasH:0.67*windowWidth,

    allIntake: [],
    items: [{title: "谷薯类", value: 0},{title: "肉蛋类", value: 0},{title: "乳类", value: 0},{title: "蔬果类", value: 0}],
    canvasInfo:{},


    },

    getUserInfo(){
        let that = this
        let userId = this.data.userId
        let queryTime = this.data.queryTime
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
                let list = res.data
                let items = that.data.items
                if(list.length != 0) {
                    list.forEach(e => {
                        if(e.foodTypeId == 0 || e.foodTypeId == 1) {
                            items[0].value = items[0].value + e.weight
                        } else if (e.foodTypeId == 7 || e.foodTypeId == 8 || e.foodTypeId == 10 || e.foodTypeId == 11) {
                            items[1].value = items[1].value + e.weight
                        } else if (e.foodTypeId == 9) {
                            items[2].value = items[2].value + e.weight
                        } else if (e.foodTypeId == 3 || e.foodTypeId == 5) {
                            items[3].value = items[3].value + e.weight
                        }
                    });
                }
                that.setData({items,})
                console.log("完成getuserinfo 前往getanalysis")
                that.messureCanvas()
                that.getAnalysis()
            }
        })
    },

    getAnalysis(){
        console.log("getanalysis函数起点")
        let that = this
        let userId = this.data.userId
        let queryTime = this.data.queryTime
        console.log(userId+"---"+queryTime)
        let da = {userId: userId, datetime: queryTime}
        wx.request({
            url: analysisGetUrl,
            data: da,
            method: "POST",
            header: {
              'content-type': 'application/texts' // 默认值
            },
            success (res) {
                
            }
          })
    },

    
  createRingData: function(id) {
    var list //对应的数据集
    var ringData = [0,0,0,0]//圆环上的3个数字和是否是暂无数据，【3】=1
      list = this.data.allIntake
      let all = Number(list.protein.actual) + Number(list.fat.actual) + Number(list.carbohydrate.actual)
      if (all == 0) {
        ringData[0] = 100
        ringData[3] = 1
      } else {
        let d = Number(list.protein.actual)
        let z = Number(list.fat.actual)
        let t = Number(list.carbohydrate.actual)
        ringData[0] = d
        ringData[1] = z
        ringData[2] = t
      }
    return ringData
  },

    
  // pie
  // 环形饼图
  drawPie(canvasId) {
    var ringData = this.createRingData("ringCanvas_total")
    var total = ringData[0]+ringData[1]+ringData[2]
    if (ringData[0] == 100 && ringData[1] == 0 && ringData[2] == 0) {
      return
    }
    var d = parseInt(ringData[0]/total*100)
    var z = parseInt(ringData[1]/total*100)
    var t = parseInt(ringData[2]/total*100)
    let  data = [
      {value:'蛋白质', ratio: d},
      {value:'脂肪', ratio: z},
      {value:'碳水化合物', ratio: t},
    ]
    let ctx = wx.createCanvasContext(canvasId);
    ctx.clearRect(0, 0, pieInitData.mW * 2, pieInitData.mH * 2);
    let oldOutY = 0;
    let oldDir = 'right';
    drawRing(); //绘制圆环
    function drawRing() {
      let all = 0;
      for (let i = 0; i < data.length; i++) {
        all += data[i].ratio
      }
      let angleList = transformAngle();
      let angleArr = [];
      let pieIndex = 0;
      let startAngle = 3 / 2 * Math.PI;
      loop(pieIndex)
      function loop(index) {
        let endAngle = startAngle + angleList[index].angle;
        ctx.beginPath();
        let proportion = 0;
        for (let j = 0; j < index; j++) {
          proportion += data[j].ratio;
        };
        let start = 3 / 2 * Math.PI + 2 * Math.PI * proportion / all;
        let end = start;
        pieAnimate(index, end, start);
        angleArr.push({ startAngle: startAngle, angle: angleList[index].angle })
        startAngle = endAngle;
      }
      /**
       * index 第几个圆弧块
       * end 结束的角度
       * start 开始的角度
       */
      function pieAnimate(index, end, start) {
        setTimeout(() => {
          let endLimit = start + 2 * Math.PI * data[index].ratio / all - pieInitData.chink;
          if (end < endLimit) {
            end += pieInitData.speed;
            if (end > endLimit) {
              end = endLimit
            }
            pieAnimate(index, end, start);
          } else {
            if (pieIndex < data.length - 1) {
              pieIndex++;
              loop(pieIndex)
            } else {
              // 当最后一个圆弧
              angleArr.forEach(function (item, i) {
                drawArcLine(item.startAngle, item.angle, i);//绘制点线
              });
            }
          }
        }, 10)
        ctx.setLineWidth(pieInitData.lineW);
        ctx.setStrokeStyle(pieInitData.moneyColorArr[pieIndex]);
        ctx.arc(pieInitData.mW, pieInitData.mH, pieInitData.r, start, end);
        ctx.stroke();
        ctx.draw(true);
      }
      // 转化弧度
      function transformAngle() {
        let total = 0;
        data.forEach(function (item, i) {
          total += item.ratio;
        });
        data.forEach(function (item, i) {
          var angle = item.ratio / total * Math.PI * 2;
          item.angle = angle;
        });
        return data;
      };
      /**
       * startAngle 圆弧块开始的角度
       * angle 圆弧块扇形的角度
       */
      function drawArcLine(startAngle, angle, index) {
        /*计算点出去的坐标*/
        let edge = pieInitData.r + pieInitData.outSpot;
        let edgeX = Math.cos(startAngle + angle / 2) * edge;
        let edgeY = Math.sin(startAngle + angle / 2) * edge;
        let outX = pieInitData.mW + edgeX;
        let outY = pieInitData.mH + edgeY;
        /*计算线出去的坐标*/
        let edge1 = pieInitData.r + pieInitData.outLine;
        let edgeX1 = Math.cos(startAngle + angle / 2) * edge1;
        let edgeY1 = Math.sin(startAngle + angle / 2) * edge1;
        let outX1 = pieInitData.mW + edgeX1;
        let outY1 = pieInitData.mH + edgeY1;
        ctx.beginPath();
        let dir = 'right';
        if (outX1 > pieInitData.mW) {
          dir = 'right';
        } else {
          dir = 'left';
        }
        ctx.setStrokeStyle(pieInitData.moneyColorArr[index]);
        ctx.setLineWidth(1);
        ctx.setFontSize(pieInitData.fontSize);
        ctx.setTextBaseline('middle');
        if (Math.abs(outY - oldOutY) > 10 || dir != oldDir) { ctx.arc(outX - pieInitData.signR / 2, outY - pieInitData.signR / 2, pieInitData.signR, 0, 2 * Math.PI); }
        ctx.setFillStyle(pieInitData.moneyColorArr[index]);
        ctx.fill();
        ctx.moveTo(outX - pieInitData.signR / 2, outY - pieInitData.signR / 2);
        ctx.lineTo(outX1, outY1);
        /**
         * 优化，
         * 上下距离大于30时，上下显示
         * 上下距离大于10，小于30时，一行显示 3.9%  8000-1w/月 为一行
         * 否则不显示
         */
        //if (Math.abs(outY - oldOutY) > 30 || dir != oldDir) {
          // oldOutY = outY;
          // oldDir = dir;
          // if (dir == 'right') {
          //   /*右*/
          //   ctx.lineTo(pieInitData.mW * 2, outY1);
          //   ctx.stroke();
          //   ctx.setFillStyle('#4a4a4a');
          //   ctx.setTextAlign('left');
          //   const rightValueW = ctx.measureText(data[index].value).width;
          //   const rightRatioW = ctx.measureText(data[index].ratio + '%').width;
          //   ctx.fillText(data[index].value, pieInitData.mW * 2 - rightValueW, outY1 + pieInitData.textSpace);
          //   ctx.fillText(data[index].ratio + '%', pieInitData.mW * 2 - rightRatioW, outY1 - pieInitData.textSpace);
          // } else {
          //   /*左*/
          //   ctx.lineTo(0, outY1);
          //   ctx.stroke();
          //   ctx.beginPath();
          //   ctx.setFillStyle('#4a4a4a');
          //   ctx.setTextAlign('right');
          //   const leftValueW = ctx.measureText(data[index].value).width;
          //   const leftRatioW = ctx.measureText(data[index].ratio + '%').width;
          //   ctx.fillText(data[index].value, 0 + leftValueW, outY1 + pieInitData.textSpace);
          //   ctx.fillText(data[index].ratio + '%', 0 + leftRatioW, outY1 - pieInitData.textSpace);
          // }
       // } else {
          //if (Math.abs(outY - oldOutY) >= 10) {
            oldOutY = outY;
            oldDir = dir;
            if (dir == 'right') {
              /*右*/
              const lineOffsetR = ctx.measureText('1000%').width;
              ctx.lineTo(pieInitData.mW * 2, outY1);
              ctx.stroke();
              ctx.setFillStyle('#4a4a4a');
              ctx.setTextAlign('left');
              const rightValueW = ctx.measureText(data[index].value).width;
              //const rightRatioW = ctx.measureText(data[index].ratio + '% ' + data[index].value + '1000%').width;
              ctx.fillText(data[index].value, pieInitData.mW * 2 - rightValueW, outY1 - pieInitData.textSpace);
            } else {
              /*左*/
              const lineOffsetL = ctx.measureText('1000%').width;
              ctx.lineTo(0, outY1);
              ctx.stroke();
              ctx.beginPath();
              ctx.setFillStyle('#4a4a4a');
              ctx.setTextAlign('right');
              const leftValueW = ctx.measureText(data[index].value).width;
              //const leftRatioW = ctx.measureText(data[index].ratio + '% ' + data[index].value + '1000%').width;
              ctx.fillText(data[index].value, 0 + leftValueW, outY1 - pieInitData.textSpace);
            }
          //}
        //}
        ctx.draw(true);
      }
    }
  },


  messureCanvas(){
    let query = wx.createSelectorQuery().in(this);
    // 然后逐个取出navbar和header的节点信息
    // 选择器的语法与jQuery语法相同
    query.select('#columnarCanvas').boundingClientRect();
    // 执行上面所指定的请求，结果会按照顺序存放于一个数组中，在callback的第一个参数中返回
    var that = this
    query.exec((res) => {
      // 分别取出navbar和header的高度 
      console.log(res)
      var canvasInfo = {}
      canvasInfo.width = res[0].width
      canvasInfo.height = res[0].height
      that.setData({
        canvasInfo:canvasInfo
      })
      console.log(canvasInfo)
      that.drawColumnar()
    })
  },
  drawColumnar() {
    const ctxColumnar = wx.createCanvasContext("columnarCanvas")
    var dataList = this.data.items
    var canvasInfo = this.data.canvasInfo
    var columnarNum = dataList.length
    var columnarWidth = (canvasInfo.width-30)/(2*columnarNum+1)
    console.log("宽度",columnarWidth)
    var maxColumnarHeight = canvasInfo.height - 60 - 20
    var maxColumnarValue = 0
    var totalValue= 0
    for (var i = 0; i < dataList.length; i++){
      if(dataList[i].value>maxColumnarValue){
        maxColumnarValue = dataList[i].value
      }
      totalValue = totalValue+dataList[i].value
    }
    for (var i = 0; i < dataList.length;i++){
      ctxColumnar.setFontSize(15)
      var percent = parseInt(dataList[i].value * 100 / totalValue) + "%"
      var dx = columnarWidth * (2 * i + 1)
      var dy = canvasInfo.height - (maxColumnarHeight * (dataList[i].value / maxColumnarValue) + 60) + 10
      ctxColumnar.setFillStyle('#2b2b2b')
      var percentWidth = ctxColumnar.measureText(percent)
      ctxColumnar.fillText(percent, dx+columnarWidth/2-percentWidth.width/2, dy)
      ctxColumnar.setFillStyle('rgb(99, 112, 210)')
      var valueWidth = ctxColumnar.measureText(dataList[i].value+"")
      ctxColumnar.fillText(dataList[i].value+"",dx+columnarWidth/2-valueWidth.width/2,dy+20)
      ctxColumnar.fillRect(dx, dy + 22, columnarWidth, maxColumnarHeight * (dataList[i].value / maxColumnarValue))
      ctxColumnar.setFillStyle('#8a8a8a')
      var titleWidth = ctxColumnar.measureText(dataList[i].title + "")
      ctxColumnar.fillText(dataList[i].title , dx+columnarWidth/2-titleWidth.width/2, canvasInfo.height-10)
    }
    ctxColumnar.draw()
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var time = util.formatTime(new Date());
        var queryTime = util.formatTime2(new Date());
        let userId = wx.getStorageSync('id')
        this.setData({
            time: time,
            queryTime: queryTime,
            userId,
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

    }
})