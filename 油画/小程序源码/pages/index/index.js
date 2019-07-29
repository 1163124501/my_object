//index.js
//获取应用实例
const app = getApp()
var util = require("../../utils/util.js")

var list_num = 0;

function arrayUnique2(arr, name) {
  var hash = {};
  return arr.reduce(function(item, next) {
    hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
    return item;
  }, []);
}

function compare(val) {
  return function(a, b) {
    var value1 = a[val];
    var value2 = b[val];
    return value1 - value2;
  }
}
Page({
  data: {
    // url: 'http://localhost',
    url: 'http://weixin.njkeren.cn',
    // 自定义数字
    num: ["1", "2", "3", "4", "5", ],
    // 随机数
    list_num: "随机数",
    img_list: [],
    arr_r: [],
    arr_l: [],
    height_r: 1,
    height_l: 0

  },
  getList() {
    var data = {}
    data.sql = wx.getStorageSync('list_num') != 1 ? wx.getStorageSync('list_num') : 0
    util.request('showList.php', 'post', data, '', res => {
      res.data = arrayUnique2(res.data, 'name');
      // for (var y = 0; y < res.data.length; y++) {
      //   res.data[y].img = this.data.url + res.data[y].img
      //   res.data[y].img = this.data.url + res.data[y].img
      // }
      var list = res.data;
      list.forEach((item, idx) => {
        list[idx].id = Number(list[idx].id)
        if (item.user && item.user.indexOf(',') != -1) {
          // 当前的图片数组下标有用户点赞记录并且  有 ‘,’（有一个或一个以上记录）
          // console.log('当前的图片数组下标有用户点赞记录并且  有 ‘,’（有一个或一个以上记录）')
          var user_list = item.user.split(',')
          // console.log('user_list', user_list)
          if (user_list.indexOf(String(wx.getStorageSync('user'))) != -1) {
            console.log('我', user_list.indexOf(wx.getStorageSync('user')))
            list[idx].status = 1
          } else {
            // console.log('没有我', user_list.indexOf(wx.getStorageSync('user')))
            list[idx].status = 0
          }
        } else {
          // console.log('当前的图片数组下标有用户点赞记录并且')
          // 当前的图片数组下标有用户点赞记录并且 没有‘,’
          list[idx].status = 0
        }
      })
      list.sort(compare('id'));
        console.log('list', list)
        this.setData({
          list_num
        })
        // 1.不显示点赞  2.显示点赞数量  3.按点赞排序
        if (list_num == 1) {
          this.no_zan(list)
        } else if (list_num == 2 || list_num == 3) {
          this.show_zan(list)
        } else {
          this.zan_shen(list)
        }
    }, err => {})
  },
  onLoad: function() {
    if (!wx.getStorageSync('user')) {
      var time = new Date().getTime();
      wx.setStorageSync('user', time)
    }
    if (!wx.getStorageSync('list_num')) {
      var random = new Array(1, 2, 3, 4, 5);
      var index = Math.floor(Math.random() * 5);
      list_num = random[index];
      wx.setStorageSync('list_num', list_num)
    } else {
      list_num = wx.getStorageSync('list_num')
    }

    list_num = 1;
    this.getList()


  },
  // 2.显示点赞数量
  show_zan(list) {
    this.setData({
      img_list: list
    })
    this.zx_js()
  },
  // 1.不显示点赞
  no_zan(list) {
    this.setData({
      img_list: list
    })
    this.zx_js()
  },
  //  3.按点赞排序
  zan_shen: function(list) {
    /// 从小到大按属性b排序
    var aa = list.sort(function(x, y) {
      return parseInt(x.zan) < parseInt(y.zan) ? 1 : -1;
    });
    console.log('aa:', aa)
    this.setData({
      img_list: aa
    })
    this.zx_js()
  },
  // 点赞
  zan: function(e) {
    var img_list = this.data.img_list
    var id = e.currentTarget.dataset.id;
    var zan_item;
    img_list.forEach((item, idx) => {
      if (item.id == id) {
        zan_item = item
      }
    })
    if (zan_item.user && zan_item.user.indexOf(',') != -1) {
      var user_list = zan_item.user.split(',')
      if (user_list.indexOf(String(wx.getStorageSync('user'))) == -1) {
        zan_item.zan = Number(zan_item.zan) + 1
        zan_item.user = zan_item.user + ',' + wx.getStorageSync('user')
      } else {
        return;
      }
    } else {
      zan_item.zan = Number(zan_item.zan) + 1
      zan_item.user = wx.getStorageSync('user') + ','
    }

    zan_item.sql = wx.getStorageSync('list_num') != 1 ? wx.getStorageSync('list_num') : 0
    console.log('zan_item', zan_item)
    util.request('zan.php', 'post', zan_item, '', res => {
      wx.showToast({
        title: '点赞成功',
      })
      this.getList()
    }, err => {})
  },
  // 瀑布流计算
  zx_js: function() {

    var img_list = this.data.img_list
    var i = 0
    var arr_l = []
    var arr_r = []
    for (var i = 0; i < img_list.length; i++) {
      if (img_list[i].height != 0 | img_list[i].width != 0) {
        var height_l = Number(this.data.height_l)
        var height_r = Number(this.data.height_r)
        var height = 180 / img_list[i].width * img_list[i].height
        if (height_l >= height_r) {
          height_r = height_r + Number(height)
          arr_r.push(img_list[i])
          this.setData({
            height_r: height_r
          })
        } else {
          height_l = height_l + Number(height)
          arr_l.push(img_list[i])
          this.setData({
            height_l: height_l
          })
        }
      } else {
        this.setData({
          height_r: height_r,
          height_l: height_l
        })
      }
    }
    this.setData({
      arr_r,
      arr_l
    })

  },
})