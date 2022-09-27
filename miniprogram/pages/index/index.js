// index.js
// const app = getApp()
const { envList } = require('../../envList.js');

Page({
  data: {
    title: 'Hello',
    groupId: []
  },
  clickTitle: function() {
    this.setData({
      title: this.data.title + "~~"
    });
  },
  onLoad: function(params) {
    let groupId = wx.getStorageSync("groupId");
    if(groupId) {
      this.setData({
        groupId: groupId
      })
    }
    else {
      wx.cloud.callFunction({
        name: "fun",
        data: {
          api: "getMyGroup"
        }
      })
      .then(res => {
        if (res.result.groupId) {
          wx.setStorageSync("groupId", res.result.groupId)
        }
        this.setData({
          groupId: res.result.groupId
        })
      })
    }
  }
  
});
