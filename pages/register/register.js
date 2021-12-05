// pages/register/register.js
import { userAuthFindUrl, userAuthAddUrl, userInfoAddUrl } from "../../utils/config"
import { formatTime2 } from "../../utils/util"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    name: "",
    sex: "男",
    birthDate: "1970-01-01",
    phoneNumber: "",
    profession: "轻度",
    height: "",
    weight: "",
    //password
    password: "",
    passwordCheck: "",
    professionArr: [
      "轻度",
      "中度",
      "重度",
      "卧床",
    ],
    sexArr: ["男", "女"],
    // error
    nameError: false,
    passwordError: false,
    phoneNumberError: false,
    phoneNumberErrorMsg:"该手机号已注册",

    // 选择 脑抽不用数组和循环
    r1: false,
    r2: false,
    r3: false,
    r4: false,
    r5: false,
    r6: false,
    r7: false,
    r8: false,
    r9: false,
    r10: false,
    r11: false,
    r12: false,
    r13: false,
  },

  // 姓名输入
  nameInput: function(e) {
    const name = e.detail.value;
    let flag = true;
    if (name) flag = false;
    this.setData({
      nameError: flag,
      name: name
    });
  },

  // 密码输入
  passWordInput: function(e) {
    this.setData({
      password: e.detail.value
    });
  },

  validatePasswordAgain: function() {
    if (this.data.passwordError) {
      if (this.data.password === this.data.passwordCheck) {
        this.setData({
          passwordError: false
        });
      }
    } else if (this.data.passwordCheck) {
      if (this.data.password !== this.data.passwordCheck) {
        this.setData({
          passwordError: true
        });
      }
    }
  },

  // 重复确认密码
  passWordCheckInput: function(e) {
    this.setData({
      passwordError: false,
      passwordCheck: e.detail.value
    });
  },

  validatePassword: function() {
    if (this.data.password !== this.data.passwordCheck) {
      this.setData({
        passwordError: true
      });
    }
  },

  //生日输入
  bindBirthDateChange: function(e) {
    this.setData({
      birthDate: e.detail.value
    })
  },

  // 手机号输入
  phoneNumberInput: function(e) {
    this.setData({
      phoneNumberError: false,
      phoneNumber: e.detail.value
    });
  },

  phoneNumberCheck: function(e) {
    var that = this
    // 判断该手机号码是否已经注册
    let user = {
        phone : this.data.phoneNumber,
      }
      wx.request({
        url: userAuthFindUrl,
        data: user,
        method: "POST",
        header: {
          'content-type': 'application/texts' // 默认值
        },
        success (res) {
            if(res.data.length != 0) {
              that.setData({
                phoneNumberError: true,
                phoneNumberErrorMsg: "该手机号已注册"
              });
            } 
        }
      })
  },

  // 劳动强度选择
  bindprofessionChange: function(e) {
    this.setData({
      profession: this.data.professionArr[e.detail.value]
    });
  },

  // 性别选择
  bindSexChange(e) {
    this.setData({
      sex: this.data.sexArr[e.detail.value]
    })
  },

  // 身高输入
  heightInput: function(e) {
    this.setData({
      height: e.detail.value
    });
  },

  // 体重输入
  weightInput: function(e) {
    this.setData({
      weight: e.detail.value
    });
  },

  r1Change: function(e) {
    this.setData({
      r1: e.detail.value
    })
  },
  r2Change: function(e) {
    this.setData({
      r2: e.detail.value
    })
  },
  r3Change: function(e) {
    this.setData({
      r3: e.detail.value
    })
  },
  r4Change: function(e) {
    this.setData({
      r4: e.detail.value
    })
  },
  r5Change: function(e) {
    this.setData({
      r5: e.detail.value
    })
  },
  r6Change: function(e) {
    this.setData({
      r6: e.detail.value
    })
  },
  r7Change: function(e) {
    this.setData({
      r7: e.detail.value
    })
  },
  r8Change: function(e) {
    this.setData({
      r8: e.detail.value
    })
  },
  r9Change: function(e) {
    this.setData({
      r9: e.detail.value
    })
  },
  r10Change: function(e) {
    this.setData({
      r10: e.detail.value
    })
  },
  r11Change: function(e) {
    this.setData({
      r11: e.detail.value
    })
  },
  r12Change: function(e) {
    this.setData({
      r12: e.detail.value
    })
  },
  r13Change: function(e) {
    this.setData({
      r13: e.detail.value
    })
  },

  confirm_register: function() {
    var that = this
    const { name,birthDate,phoneNumber,password,
      profession,sex,height,weight} = this.data;
    const { r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13} = this.data;
    var toast = "";
    const {
      nameError,
      passwordError,
      phoneNumberError
    } = this.data;

    //各项数据是否填写
    if(!birthDate) toast = toast.concat("出生日期，");
    if (!phoneNumber) toast = toast.concat("手机号，");
    if (!name) toast = toast.concat("姓名，");
    if (!sex) toast = toast.concat("性别，");
    if (!profession) toast = toast.concat("劳动强度，");
    if (!height) toast = toast.concat("身高，");
    if (!weight) toast = toast.concat("体重，");
    if (toast) {
      wx.showToast({
        title: "请输入" + toast.slice(0, -1),
        icon: "none",
        duration: 1500
      });
      return;
    }
    if (
      nameError || passwordError || phoneNumberError) {
      wx.showToast({
        title: "请注意红字提示",
        icon: "none",
        duration: 1500
      });
      return;
    }

    var now = new Date()
    var time = formatTime2(now)
    var id = 0
    var userAuth = {
      phone: phoneNumber,
      password: password,
      registerTime: time,
      lastLoginTime: time,
    }
    wx.request({
      url: userAuthAddUrl,
      data: userAuth,
      method: "POST",
      header: {
        'content-type': 'application/texts' // 默认值
      },
      success (res) {
          id = res.data[0].id
          that.addInfo(id)
      }
    })
  },

  turnR(r) {
    if (r) return 1
    else return 0
  },

  addInfo(id) {
    var that = this
    const { name,birthDate,phoneNumber,password,
      profession,sex,height,weight} = this.data;
    const { r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13} = this.data;

    var sexd, intensityd
    if (sex == "男") sexd = 1 
    else sexd = 0
    if (profession == "轻度") {
      intensityd = 0
    } else if (profession == "中度") {
      intensityd = 1
    } else if (profession == "重度") {
      intensityd = 2
    } else {
      intensityd = 3
    }
    var userInfo = {
      userId: id,
      birth: birthDate,
      sex: sexd,
      height: parseInt(height*100),
      weight: parseInt(weight),
      bmi: weight / (height * height),
      intensity: intensityd,
      level: 0,
      isCondition1: this.turnR(r1),
      isCondition2: this.turnR(r2),
      isCondition3: this.turnR(r3),
      isCondition4: this.turnR(r4),
      isCondition5: this.turnR(r5),
      isCondition6: this.turnR(r6),
      isCondition7: this.turnR(r7),
      isCondition8: this.turnR(r8),
      isCondition9: this.turnR(r9),
      isCondition10: this.turnR(r10),
      isCondition11: this.turnR(r11),
      isCondition12: this.turnR(r12),
      isCondition13: this.turnR(r13),
    };
    wx.request({
      url: userInfoAddUrl,
      data: userInfo,
      method: "POST",
      header: {
        'content-type': 'application/texts' // 默认值
      },
      success(res) {
        wx.showLoading({
          title:'登录中'
        })
        wx.setStorageSync("userId", id);
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }, 2000)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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