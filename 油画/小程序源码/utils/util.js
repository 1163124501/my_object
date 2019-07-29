
// 网络请求
function request(url, method, data, message, _success, _fail) {
  // wx.showNavigationBarLoading()
  if (message != "") {
    wx.showLoading({
      title: message
    })
  }
  wx.request({
    // weixin.njkeren.cn
    url: 'https://weixin.njkeren.cn/show_img/' + url,
    // url: 'http://localhost/show_img/' + url,
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: method,
    success: function (res) {
      _success(res)
      // wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
    },
    fail: function (err) {
      if (err) {
        _fail(err)
      }
      // wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
    },
  })
}
function formatTime(unixtime) {
  var dateTime = new Date(parseInt(unixtime))
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  var hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  var second = dateTime.getSeconds();
  var now = new Date();
  var now_new = Date.parse(now.toDateString());  //typescript转换写法
  var milliseconds = now_new - dateTime;
  // var timeSpanStr = (hour < 10 ? '0' + hour : hour) + ':' + minute < 10 ? '0' + minute : minute;
  var timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
  return timeSpanStr;
}
module.exports = {
  request: request,
  formatTime: formatTime
}