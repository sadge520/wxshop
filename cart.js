// pages/cart/cart.js
var ajax = require("../../utils/ajax.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [], //数据 
    iscart: false,
    hidden: null,
    isAllSelect: true,
    totalMoney: 0,
    button_active: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    var that = this;
    ajax.request({
      method: "GET",
      url: "carts/getShopCartsInfo?userId=1",
      success: data => {
        console.log("data.result::", data.result);
        that.setData({
          carts: data.result,
          // iscart: true,
          // hidden: false
        })
        //把获取到的数据库数据设置到缓存数据cart数据
        wx.setStorageSync("cart", data.result);
      }
    })
    //加载到缓存数据中
    that.getCartsInfo();
    console.log(" this.data.carts1", this.data.carts);

  },
  /**
   * 读取缓存数据
   */
  getCartsInfo: function() {
    // 获取产品展示页保存的缓存数据（购物车的缓存数组，没有数据，则赋予一个空数组）  
    var arr = wx.getStorageSync('cart') || [];
    console.info("缓存数据arr：" , arr);
    var i=0,totalMoney=0;
    // 有数据的话，就遍历数据，计算总金额 和 总数量  
    if (arr.length > 0) {
      // 更新数据  
      for(i=0;i<arr.length;i++){
        if(arr[i].isSelect){
          totalMoney = totalMoney + (arr[i].price * arr[i].count);
        }  
      }
      console.log("totalMoney", totalMoney);
      if(0==totalMoney){
        this.setData({
          totalMoney: totalMoney,
          isAllSelect:false,
          button_active:false,
          carts: arr,
          iscart: true,
          hidden: false
        })
      }else{
        this.setData({
          totalMoney: totalMoney,
          button_active: true,

          carts: arr,
          iscart: true,
          hidden: false
        });


      }
    
      console.log("缓存数据：" , this.data.carts);
    } else {
      this.setData({
        iscart: false,
        hidden: true,
      });
    }

    console.log(" this.data.carts2", this.data.carts);

  },

  //勾选事件处理函数  
  switchSelect: function(e) {
    // 获取item项的id，和数组的下标值  
    var Allprice = 0,
      i = 0;
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
      let goodsid=e.target.dataset.goodsid,
       select=e.target.dataset.select;

    console.log(" this.data.carts", this.data.carts);
    this.data.carts[index].isSelect = !this.data.carts[index].isSelect;
    
      ajax.request({
        method:"GET",
        url: "carts/updateShopCartsBySelect?&userId=1" + "&goodsId=" + goodsid + "&select=" + this.data.carts[index].isSelect,
        success:data =>{
          wx.showToast({
            title: '',
            icon:'success',
            duration: 3000
          })
        }
     })
  
    //价钱统计
    if (this.data.carts[index].isSelect) {
      this.data.totalMoney = this.data.totalMoney + (this.data.carts[index].price * this.data.carts[index].count);
      //如果选中合计不为0，则设置为红色样式
      this.setData({
        button_active: true
      })
    } else {
      this.data.totalMoney = this.data.totalMoney - (this.data.carts[index].price * this.data.carts[index].count);
    }
    //如果选中合计为0，则设置为灰色样式
    if (0 == this.data.totalMoney) {
      this.setData({
        button_active: false
      })
    }
    //是否全选判断
    console.log("this.data.carts", this.data.carts);
    for (i = 0; i < this.data.carts.length; i++) {
      Allprice = Allprice + (this.data.carts[i].price * this.data.carts[i].count);

    }
    if (Allprice == this.data.totalMoney) {
      this.data.isAllSelect = true;
    } else {
      this.data.isAllSelect = false;
    }
    console.log(this.data.isAllSelect);
    this.setData({
      carts: this.data.carts,
      totalMoney: this.data.totalMoney,
      isAllSelect: this.data.isAllSelect,
    })
  },
  //全选
  allSelect: function(e) {
    //处理全选逻辑
    let i = 0;
    if (!this.data.isAllSelect) {
      this.data.totalMoney = 0;
      for (i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].isSelect = true;
        this.data.totalMoney = this.data.totalMoney + (this.data.carts[i].price * this.data.carts[i].count);

      }
      //全选按钮为红色样式
      this.setData({
        button_active: true
      })
    } else {
      for (i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].isSelect = false;
      }
      this.data.totalMoney = 0;
      //如果选中合计为0，则设置为灰色样式
        this.setData({
          button_active: false
        })
    }
    console.log(!this.data.isAllSelect);
    this.setData({
      carts: this.data.carts,
      isAllSelect: !this.data.isAllSelect,
      totalMoney: this.data.totalMoney,
    })
  },
  // 去结算
  toBuy:function() {
    console.log("去carts",this.data.carts);
    if (0 != this.data.totalMoney) {
      wx.navigateTo({
        url: '../address/address',
      })
    }

    // wx.showToast({
    //   title: '去结算',
    //   icon: 'success',
    //   duration: 3000
    // });
    // this.setData({
    //   showDialog: !this.data.showDialog
    // });
  },
  //数量变化处理
  handleQuantityChange(e) {
    var componentId = e.componentId;
    var quantity = e.quantity;
    this.data.carts[componentId].count.quantity = quantity;
    this.setData({
      carts: this.data.carts,
    });
  },
  /* 减数 */
  delCount: function(e) {
    var index = e.target.dataset.index;
    console.log("刚刚您点击了加一");
    var count = this.data.carts[index].count;
    // 商品总数量-1
    if (count > 1) {
      this.data.carts[index].count--;
    }
    // 将数值与状态写回  
    this.setData({
      carts: this.data.carts
    });
    console.log("carts:" + this.data.carts);
    this.priceCount();
  },
  /* 加数 */
  addCount: function(e) {
    var index = e.target.dataset.index;
    console.log("刚刚您点击了加+");
    var count = this.data.carts[index].count;
    // 商品总数量+1  
    if (count < 10) {
      this.data.carts[index].count++;
    }
    // 将数值与状态写回  
    this.setData({
      carts: this.data.carts
    });
    console.log("carts:" + this.data.carts);
    this.priceCount();
  },
  priceCount: function(e) {
    this.data.totalMoney = 0;
    for (var i = 0; i < this.data.carts.length; i++) {
      if (this.data.carts[i].isSelect == true) {
        this.data.totalMoney = this.data.totalMoney + (this.data.carts[i].price * this.data.carts[i].count);
      }

    }
    this.setData({
      totalMoney: this.data.totalMoney,
    })
  },

  /* 删除item */
  delGoods: function(e) {
    console.log(this.data.carts);
    this.data.carts.splice(e.target.id.substring(3), 1);
    console.log("显示e.target", e.target);
    var userId = 1;
    var goodsId = e.currentTarget.dataset.goodsid;

    ajax.request({
      method: "GET",
      url: "carts/deleteShopCarts?userId=" + userId + "&goodsId=" + goodsId,
      success: data => {
        //提示窗口
        wx.showToast({
          title: data.message,
          icon: 'success',
        })
      }
    })
    // 更新data数据对象  
    if (this.data.carts.length > 0) {
      this.setData({
        carts: this.data.carts
      })
      wx.setStorageSync('cart', this.data.carts);
      this.priceCount();
    } else {
      this.setData({
        cart: this.data.carts,
        iscart: false,
        hidden: true,
      })
      wx.setStorageSync('cart', []);
    }
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