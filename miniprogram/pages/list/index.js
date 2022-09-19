Page({
  data: {
    groupList: []
  },
  onLoad: function(e) {
    wx.cloud.callFunction({
      name: "quickstartFunctions",
      data: {
        type: "getManyGroup"
      }
    }).then((res) => {
      console.log(res);
      this.setData({
        groupList: res.result.groupList
      })
    })
  }
})