// pages/goods/detail.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');
var imgUrls = [];
var detailImg = [];
var goodsId = null;
var goods = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: {
      imgUrls: ['https://m.360buyimg.com/mobilecms/s720x322_jfs/t5056/28/1233616393/72169/bb1adbf2/58eed7e5Nc4698c8d.jpg!q70.jpg', 'https://img1.360buyimg.com/da/jfs/t4783/171/280173974/67361/d821e7d3/58de2d17N2747032e.jpg',
        'https://m.360buyimg.com/mobilecms/s720x322_jfs/t5056/28/1233616393/72169/bb1adbf2/58eed7e5Nc4698c8d.jpg!q70.jpg',
      ],
    },

    isLike: false, //默认收藏状态为未收藏
    showDialog: false, //默认加入购物车信息 隐藏 点击之后显示
    indicatorDots: true,
    autoplay: false, //关闭自动切换
    interval: 5000,
    duration: 1000,
    windowWidth: 320,

  },
  //预览图片
  previewImage: function(e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("options" + options);
    var that = this;
    goodsId = options.goodsId;
    console.log("goodsId:" + goodsId);
    //加载商品详情
    that.goodsInfoShow();

  },
  //商品详情  获取请求数据
  goodsInfoShow: function(success) {
    var that = this;
    ajax.request({
      method: 'GET',
      // url: 'goods/getGoodsInfo?key=' + utils.key + '&goodsId=' + goodsId,
      url: 'goods/getGoodsInfo?goodsId=' + goodsId,
      success: data => {
        var goodsItem = data.result;
        console.log("result" + data.result);
        for (var i = 0; i < goodsItem.goodsImageList.length; i++) {
          imgUrls[i] = goodsItem.goodsImageList[i].imgUrl;
        }
        var details = goodsItem.details.split(";");
        console.log("打印details" ,details)
        for (var j = 0; j < details.length; j++) {
          detailImg[j] = details[j];
        }
        console.log("打印detailImg", detailImg);
        console.log(goodsItem);
        goods = {
          imgUrls: imgUrls,
          title: goodsItem.name,
          price: goodsItem.price,
          privilegePrice: goodsItem.privilegePrice,
          detailImg: detailImg,
          imgUrl: goodsItem.imgUrl,
          buyRate: goodsItem.buyRate,
          goodsId: goodsId,
          count: 1,
          totalMoney: goodsItem.price,
        }

        that.setData({
          goods: goods
        })
        console.log(goods.title)
      }
    })

  },

  /** 
   * 添加收藏  
   */
  addLike: function() {
    //选中时显示图标样式
    this.setData({
      isLike: !this.data.isLike,
    });
    ajax.request({
      method: 'GET',
      url: '',
      success: function(data) {
        console.log("收藏返回结果:" + data.message);
        // 显示提示框
        wx.showToast({
          title: data.message,
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  //跳转到购物车
  toCar: function() {
    wx.switchTab({
      url: '../cart/cart',
    })
  },

  //加入购物车 信息显示对话框 sku弹出
  toggleDialog: function() {
    //获取到商品的sku属性
    this.setData({
      showDialog: !this.data.showDialog,
    })

  },
  //立即购买操作
  immeBuy: function() {
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 2000
    });

  },
  //关闭sku
  closeDialog: function() {
    console.log("关闭sku");
    this.setData({
      showDialog: false
    })

  },
  /* 减数 */
  delCount: function(e) {
    console.log("刚刚您点击了减1");
    var count = this.data.goods.count; // 商品总数量-1
    if (count > 1) {
      this.data.goods.count--;
    }
    // 将数值与状态写回  
    this.setData({
      goods: this.data.goods
    });
    this.priceCount();
  },
  /* 加数 */
  addCount: function(e) {
    console.log("刚刚您点击了加1");
    var count = this.data.goods.count;
    // 商品总数量-1  
    if (count < 10) {
      this.data.goods.count++;
    }
    // 将数值与状态写回  
    this.setData({
      goods: this.data.goods
    });
    this.priceCount();
  },
  //价格计算
  priceCount: function(e) {
    this.data.goods.totalMoney = this.data.goods.price * this.data.goods.count;
    this.setData({
      goods: this.data.goods
    })
  },
  /* 减数 */
  delCount: function(e) {
    console.log("刚刚您点击了减1");
    var count = this.data.goods.count; // 商品总数量-1
    if (count > 1) {
      this.data.goods.count--;
    }
    // 将数值与状态写回  
    this.setData({
      goods: this.data.goods
    });
    this.priceCount();
  },
  /* 加数 */
  addCount: function(e) {
    console.log("刚刚您点击了加1");
    var count = this.data.goods.count; // 商品总数量-1  
    if (count < 10) {
      this.data.goods.count++;
    }
    // 将数值与状态写回  
    this.setData({
      goods: this.data.goods
    });
    this.priceCount();
  },
  //价格计算
  priceCount: function(e) {
    this.data.goods.totalMoney = this.data.goods.price * this.data.goods.count;
    this.setData({
      goods: this.data.goods
    })
  },

  // 加入购物车
  addCar: function(e) {
    var goods = this.data.goods;
    console.log(goods);
    goods.isSelect = false;
    var count = this.data.goods.count;
    var userId = 1;
    //设置的是data-goodsid  最好先打印target看情况获取
   var goodsId=e.currentTarget.dataset.goodsid; //通过data-* 获取
    console.log(e.target);
    //var goodsId = goods.goodsId; //能获取到 
    console.log("goodsId::" + goodsId);

    // 发送异步请求，加入购物车到后台进行处理 
    //注意'&goodsId=' & 和goodsId 参数名之间不能有空格，否则识别不了报错
    ajax.request({
      method: 'GET',
      // url: 'carts/addShopCarts?key=' + utils.key + '&goodsId=' + goodsId + '&num=' + count,
      url: 'carts/addShopCarts?userId=' + userId + '&goodsId=' + goodsId + '&num=' + count,
      success: data => {
        console.log("加入购物车返回结果：" + data.message)
        wx.showToast({
          title: '加入购物车成功',
          icon: 'success',
          duration: 2000
        });
      }
    })

    var title = this.data.goods.title;
    if (title.length > 13) {
      goods.title = title.substring(0, 13) + '...';
    }

    // 获取购物车的缓存数组（没有数据，则赋予一个空数组）  
    var arr = wx.getStorageSync('cart') || [];
    console.log("arr,{}", arr);
    if (arr.length > 0) {
      // 遍历购物车数组  
      for (var j in arr) {
        // 判断购物车内的item的id，和事件传递过来的id，是否相等  
        if (arr[j].goodsId == goodsId) {
          // 相等的话，给count+1（即再次添加入购物车，数量+1）  
          arr[j].count = arr[j].count + 1;
          // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）  
          try {
            wx.setStorageSync('cart', arr)
          } catch (e) {
            console.log(e)
          }
          //关闭窗口
          wx.showToast({
            title: '加入购物车成功！',
            icon: 'success',
            duration: 2000
          });
          this.closeDialog();
          // 返回（在if内使用return，跳出循环节约运算，节约性能） 
          return;
        }
      }
      // 遍历完购物车后，没有对应的item项，把goodslist的当前项放入购物车数组  
      arr.push(goods);
    } else {
      arr.push(goods);
    }
    // 最后，把购物车数据，存放入缓存  
    try {
      wx.setStorageSync('cart', arr)
      console.log("cart:arr"+arr);
      // 返回（在if内使用return，跳出循环节约运算，节约性能） 
      //关闭窗口
      wx.showToast({
        title: '加入购物车成功！',
        icon: 'success',
        duration: 2000
      });
      this.closeDialog();
      return;
    } catch (e) {
      console.log(e)
    }


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