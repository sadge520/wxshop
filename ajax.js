//const api = 'http://127.0.0.1:8080/wxShop/';
const api = 'http://localhost:8080/wxshop/';
// common.js
function request(opt) {
  // set token
  wx.request({
    method: opt.method || 'GET',
    url: api + opt.url,
    header: {
      'content-type': 'application/json' // 默认值
    },
    data: opt.data,
    success: function (res) {
      if (res.data.code == 100) {
        if (opt.success) {
          opt.success(res.data);
        }
      } else {
        console.error(res);
        wx.showToast({
          title: res.data.message,
        })
      }
    }
  })
}

module.exports.request = request