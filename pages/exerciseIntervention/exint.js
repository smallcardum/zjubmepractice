import { sportDefaultFindUrl } from "../../utils/config"
var util = require('../../utils/util');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sportItem:'',
        "suit": 0 ,
        "sportId": 2,
        items: [
            {itemId: 'A', sportKind:'',sportItem:'拉伸腿部、背部肌肉；活动肩关节、胯关节、膝关节、踝关节'},
            {itemId: 'B', sportKind:'',sportItem:'游泳/俯卧撑/平板支撑/骑自行车/球类运动/弹力带/跳绳/健美操/器材锻炼'},
            {itemId: 'C', sportKind:'',sportItem:'快走/慢跑/散步'},
            {itemId: 'D', sportKind:'',sportItem:'拉伸颈部、背部、腿部等部位'}
          ],

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取时间
        var time = util.formatTime(new Date());
        this.setData({
            time: time
        });
        // 获取运动项目
        var weekday = util.formatTime3(new Date());
        if(weekday==0){
            var weekday = 7
        }
        this.setData({
            weekday: weekday
        });
        let sport = { 
            "suit": this.data.suit,
            "sportId": this.data.sportId,
            "weekday": this.data.weekday
        }
          wx.request({
            data: sport,
            url: sportDefaultFindUrl,
            method:"POST",
            header: {
                'content-type': 'application/texts' // 默认值
              },
              success:res=> { 
                console.log(res.data[0])
                if(res.statusCode){
                    this.setData({
                        sportItem:res.data[0].comment,
                    })
                    console.log(this.data.sportItem)
                    // 把四种运动及时长分割存入数组
                    var sportKind = this.data.sportItem.split("，")
                    console.log(sportKind)
                    console.log(this.data.items[0].sportKind)
                    if(sportKind.length == 4){
                        this.setData({
                            'items[0].sportKind':sportKind[0],
                            'items[1].sportKind':sportKind[1],
                            'items[2].sportKind':sportKind[2],
                            'items[3].sportKind':sportKind[3],
                        })
                    }else{
                        this.setData({
                            'items[0].sportKind':sportKind[0],
                            'items[1].sportKind':sportKind[1],
                            'items[2].sportKind':sportKind[2]+','+sportKind[3],
                            'items[3].sportKind':sportKind[4],
                        })
                    }
                   
                }
            },
        })
    },
    // 打卡成功弹窗
    sportDone(){
        // const patientID = this.data.patientID;
        // let url = vicoBloodPressureRecordCreateUrl;
        // let data = {
        //   doneDateTime: this.data.doneDateTime,
        //   memo: this.data.memo,
        //   patientID,
        // };  
        // request({url, data}).then(res=>{
        //   if(res.data.code == 0){
        //     navigateBack();
            wx.showToast({
              title:'打卡成功！'
            });
        //   }
        // });
    },
    // 运动打卡
    sportHistory(){
        console.log("今日已打卡！")
        wx.navigateTo({
          url: './exerciseRecord/exerciseRecord',
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