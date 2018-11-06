// pages/person/index.js
//获取应用实例
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    title: "good"

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("app.globalData",app.globalData)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        title: "verygood"
      })

    } else if (this.data.canIUse) {

      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res.userInfo);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.log(res.userInfo);
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 会员积分
   */
  memberinfo: function() {
    wx.navigateTo({
      url: '',
    })
  },

  /**
   * 我的订单导航栏，点击之后进行页面跳转
   */
  navigateToOrder: function(e) {
    console.log(e.currentTarget)
    var status = e.currentTarget.dataset.status;
    wx.navigateTo({
      url: '../order/list?status=' + status,
    });
  },
  // 指定 全部订单 和 九宫格中按钮 点击跳转至 选项卡中 与之对应的tab
  allOrder: function () {
    app.globalData.currentLocation = 0,
      wx.navigateTo({
      url: '../order/list'
      })
  },
  noPay: function () {
    app.globalData.currentLocation = 1,
      wx.navigateTo({
      url: '../order/list'
      })
  },
  sended: function () {
    app.globalData.currentLocation = 2,
      wx.navigateTo({
      url: '../order/list'
      })
  },
  completed: function () {
    app.globalData.currentLocation = 3,
     wx.navigateTo({
      url: '../order/list'
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})