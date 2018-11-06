//index.js
//获取应用实例
const app = getApp()
var ajax = require('../../utils/ajax.js');
var utils = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [{
      id: 1,
      bannerName: '',
      goodsId: 1,
      imgUrl: 'https://m.360buyimg.com/mobilecms/s720x322_jfs/t5056/28/1233616393/72169/bb1adbf2/58eed7e5Nc4698c8d.jpg!q70.jpg',
      clickUrl: ''

    }, {
      id: 2,
      bannerName: '',
      goodsId: 2,
      imgUrl: 'https://img1.360buyimg.com/da/jfs/t4783/171/280173974/67361/d821e7d3/58de2d17N2747032e.jpg',
      clickUrl: ''


    }, {
      id: 3,
      bannerName: '',
      goodsId: 3,
      imgUrl: 'https://m.360buyimg.com/mobilecms/s720x322_jfs/t5056/28/1233616393/72169/bb1adbf2/58eed7e5Nc4698c8d.jpg!q70.jpg',
      clickUrl: ''
    }],

    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    windowWidth: 320,
    sortPanelTop: '0',
    sortPanelDist: '290',
    sortPanelPos: 'relative',
    noticeIdx: 0,
    animationNotice: {},
    category: [{
        img: "../../images/icon_order.png",
        text: "分类",
        url: "../column/column"
      },
      {
        img: "../../images/icon_order.png",
        text: "分类",
        url: "../column/column"
      },
      {
        img: "../../images/icon_order.png",
        text: "分类",
        url: "../column/column"
      },
      {
        img: "../../images/icon_order.png",
        text: "分类",
        url: "../column/column"
      },
      {
        img: "../../images/icon_order.png",
        text: "分类",
        url: "../column/column"
      },
      {
        img: "../../images/icon_order.png",
        text: "分类",
        url: "../column/column"
      },
      {
        img: "../../images/icon_order.png",
        text: "分类",
        url: "../column/column"
      },
      {
        img: "../../images/icon_order.png",
        text: "分类",
        url: "../column/column"
      },
    ],
    "goodsList": [{
        "goods": {
          "buyUnit": 10,
          "desc": "唯一的不同，是处处不同",
          "id": 1093,
          "imgUrl": "../../images/1.jpg",
          "name": "【预售】Apple iPhone6s Plus 128G 颜色随机",
          "tag": "ten"
        },
        "period": 211116272,
        "takeRate": 0.01,
        "takeChances": 70,
        "totalChances": 8090
      },
      {
        "goods": {
          "buyUnit": 10,
          "desc": "唯一的不同，是处处不同",
          "id": 1093,
          "imgUrl": "../../images/1.jpg",
          "name": "【预售】Apple iPhone6s Plus 128G 颜色随机",
          "tag": "ten"
        },
        "period": 211116272,
        "takeRate": 0.01,
        "takeChances": 70,
        "totalChances": 8090
      },
      {
        "goods": {
          "buyUnit": 10,
          "desc": "唯一的不同，是处处不同",
          "id": 1093,
          "imgUrl": "../../images/1.jpg",
          "name": "【预售】Apple iPhone6s Plus 128G 颜色随机",
          "tag": "ten"
        },
        "period": 211116272,
        "takeRate": 0.01,
        "takeChances": 70,
        "totalChances": 8090
      },
      {
        "goods": {
          "buyUnit": 10,
          "desc": "唯一的不同，是处处不同",
          "id": 1093,
          "imgUrl": "../../images/1.jpg",
          "name": "【预售】Apple iPhone6s Plus 128G 颜色随机",
          "tag": "ten"
        },
        "period": 211116272,
        "takeRate": 0.01,
        "takeChances": 70,
        "totalChances": 8090
      },
      {
        "goods": {
          "buyUnit": 10,
          "desc": "唯一的不同，是处处不同",
          "id": 1093,
          "imgUrl": "../../images/1.jpg",
          "name": "【预售】Apple iPhone6s Plus 128G 颜色随机",
          "tag": "ten"
        },
        "period": 211116272,
        "takeRate": 0.01,
        "takeChances": 70,
        "totalChances": 8090
      }

    ],
    product: []

  },

  /**
   * 生命周期函数--监听页面加载
   * 加载动画animation
   */
  onLoad: function(options) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease-out',
    });
    that.animation = animation;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowWidth: res.windowWidth
        })
      }
    });

    console.log('onLoad');
    //加载banners轮播图
    that.bannerShow();
    //加载商品 数据
    that.getGoodsInfo();
    //加载分类
    that.getClassifyInfo();

  },

  /**
   * 加载轮播图
   */
  bannerShow: function() {
    ajax.request({
      url: 'index/getBanners',
      method: 'GET',
      success: data => {
        console.log(data.result);
        this.setData({
          banners: data.result
        })
      }
    })

  },

  /**
   * 轮播图 点击图片跳转到详情页
   */
  show: function(e) {
    var that = this;
    var goodsId = e.currentTarget.dataset.goodsid;
    console.log("show" + goodsId);
    //跳转商品详情
    wx.navigateTo({
      url: '../detail/detail?goodsId=' + goodsId,
    })

  },
  /**
   * 加载商品数据
   */
  getGoodsInfo: function() {
    var that = this;
    ajax.request({
      method: "GET",
      url: "goods/getGoodsList",
      success: data => {
        console.log(data);
        that.setData({
          product: data.result,
          goodsList: data.result
        })
      }
    })

  },
  /**
   * 获取分类图标
   */
  getClassifyInfo: function() {
    ajax.request({
      url: 'classify/getClassifyInfo',
      method: 'GET',
      success: data => {
        console.log(data.result);
        this.setData({
          category: data.result
        })
      }
    })

  },


  /**
   * 动画异常的提示信息
   */
  startNotice: function() {
    var that = this;

    var notices = that.data.notices || [];
    if (notices.length == 0) {
      return;
    }

    var animation = that.animation;
    //animation.translateY( -12 ).opacity( 0 ).step();
    animation.translateY(0).opacity(1).step({
      duration: 0
    });
    that.setData({
      animationNotice: animation.export()
    });

    var noticeIdx = that.data.noticeIdx + 1;
    if (noticeIdx == notices.length) {
      noticeIdx = 0;
    }

    // 更换数据
    setTimeout(function() {
      that.setData({
        noticeIdx: noticeIdx
      });
    }, 400);

    // 启动下一次动画
    setTimeout(function() {
      that.startNotice();
    }, 5000);
  },
  /**
   * 滚动时触发
   */
  onToTop: function(e) {
    if (e.detail.scrollTop >= 290) {
      this.setData({
        sortPanelPos: 'fixed'
      });
    } else {
      this.setData({
        sortPanelPos: 'relative'
      });
    }
    console.log(e.detail.scrollTop)
    console.log("打印")
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