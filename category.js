// pages/category/category.js
//引入utils/category-list.js的数据
var categoryData = require("../../utils/category-list.js");
var ajax = require("../../utils/ajax.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左边菜单点击类样式
    currentIndex: "A",
    scrollTop: 0,
    //定义一个空数组，用来存放右侧详情滑动栏中每一个商品分类的Height
    listHeight: "",
    listChild: [],
    categoryData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //动态获取数据
    ajax.request({
      method: "GET",
      url: "category/getCategoryInfo",
      success: data => {
        console.log(data);
        console.log(data.result[0]);
        that.setData({
          listChild: data.result[0],
        });
        //异步获取数据，要用回调函数，在获取到同步数据的时候，才执行
        that.cateCb(data.result[0]);
      }
    })
    console.log("onload::" + this.data.result);



  },




  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {




  },

  cateCb: function(listChild) {
    // 把请求到的 list 中的数据赋值给 listChild 
    //var listChild = categoryData.result[0];
    var that = this;
    console.log("test::" + listChild)
    console.log(this.data);
    //var listChild=this.data.listChild;

    // 定义右侧标题的 rpx 高度 和 px 高度 
    var right_titleRpxHeight = 60;
    var right_titleHeight;
    // 定义右侧单个商品的 rpx 高度 和 px 高度 
    var right_contentRpxHeight = 180;
    var right_contentHeight;
    // 定义左侧单个tab的 rpx 高度 和 px 高度
    var left_titleRpxHeight = 140;
    var left_titleHeight;

    //获取可视区高度
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);
        //percent为当前设备1rpx对应的px值
        var percent = res.windowWidth / 750;
        console.log("listChild::" + listChild);
        that.setData({
          //点击左边列表对应右边详情
          categoryData: listChild,
          windowHeight: res.windowHeight,
          //滑动右边详情对应左边分类列表
          right_titleHeight: Number(right_titleRpxHeight * percent),
          right_contentHeight: Number(right_contentRpxHeight * percent),
          left_titleHeight: Number(left_titleRpxHeight * percent)

        })
        console.log(listChild);
        console.log(categoryData);

      },
    })

    // 定义一个 names ，用于存放 scroll-into-view 使用的 id 
    var names = '';
    // 循环 listChild 中的每一项 
    for (var item in listChild) {
      // 把 listChild 中每一项的键值用“：”（便于后期处理）分隔开，存入 names 中，数据格式见图‘names中的数据’
      names += ":" + item;
      // 计算右侧每一个分类的 Height 。
      // listChild 下的每一个 item 中包含该分类的 title，所以 listChild[item].length 需要减一 
      // 右侧每一个分类中每一行放两个商品，所以 this.data.right_contentHeight 除二
      // 最后加上 right_titleHeight，此时 height 为右侧一个完整分类的高度 
      var height = (listChild[item].length - 1) * this.data.right_contentHeight / 2 + this.data.right_titleHeight;
      // 同上面 names 的道理，把每一个 height 用“：”隔开放入 listHeight 中
      this.data.listHeight += ":" + height;
      this.setData({
        // 把 listChild 赋值给 list ，供 wxml 中循环使用
        categoryData: listChild,
        listHeight: this.data.listHeight
      })
    }
    // 把 names 的数据切成数组 
    var names = names.substring(1).split(':');
    this.setData({
      names: names
    })
  },


  // 右侧滑栏的 bindscroll 事件函数（ES6写法）
  scroll: function(event) {
    // 把 listHeight 切割成数组 
    var height = this.data.listHeight.substring(1).split(':');
    // 定义一个 index 供左侧边栏联动使用 
    var index = 1;
    var num = 0;
    for (var i = 0; i < height.length; i++) {
      // 累计右侧滑栏滚动上去的每一个分类的Height 
      num += parseInt(height[i]);
      // 循环判断 num 是否大于右侧滑栏滚动上去的 Height ，然后 get 到 i 值赋给 index 
      if (num > event.detail.scrollTop) {
        index = i + 1;
        // 如果右侧滑栏滚动高度小于单个类别高度的 1/2 时，index 为 0 
        if (event.detail.scrollTop < height[0] / 2) {
          index = 0;
        }
        break;
      }
    }
    // 定义并设置左侧边栏的滚动高度 
    var left_scrollTop = this.data.left_titleHeight * index
    console.log(left_scrollTop);
    this.setData({
      scrollTop: left_scrollTop,
      // 动态给左侧滑栏传递对应该项的 id，用于高亮效果显示
      currentIndex: this.data.names[index]
    })
  },

  //点击左侧tab，右侧列表相应位置联动 置顶
  switchRightTab: function(e) {
    var id = e.target.id;
    console.log(e);
    this.setData({
      //动态把获取打id传给scrollTopId
      scrollTopId: id,
      //左侧点击类样式
      currentIndex: id
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  // onShow: function() {


  // },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

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