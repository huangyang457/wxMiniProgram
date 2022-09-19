Page({
  data: {
    date: '1900-00-00',
    region: ['广东省', '广州市', '海珠区'],
    groupId: ''
  },
  onLoad: function(e){
    if(e.groupId) {
      this.setData({
        groupId: e.groupId
      })
    }
  },
  submit: function (e) {
    let u = e.detail.value;
    if (this.data.groupId) {
      wx.cloud.callFunction({
        name: "quickstartFunctions",
        data: {
          type: "joinGroup",
          data: {
            ...u,
            birth: this.data.date,
            region: this.data.region,
            groupId: Number(this.data.groupId)
          }
        }
      }).then((res) => {
        console.log(res);
        if(res.result.success){
          wx.redirectTo({
            url: "/pages/tip/index?groupId=" + this.data.groupId
          })
        }else{
          wx.showModal({
            title: "提示",
            content: res.result.errorMessage,
            // 成功时调用回调函数success
            success(){
              // wx.navigateBack()返回上 delta 级页面, delta: 1 返回上一级页面
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      })
    } else {
      wx.cloud.callFunction({
        name: "quickstartFunctions",
        data: {
          type: "createGroup",
          data: {
            ...u,
            birth: this.data.date,
            region: this.data.region,
          }
        }
      }).then((res) => {
        this.setData({
          groupId: res.result.groupId
        })
        wx.redirectTo({
          url: "/pages/tip/index?groupId=" + res.result.groupId
        })
      })
    }
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  reset: function () {
    this.setData({
      date: '1900-00-00',
      region: ['广东省', '广州市', '海珠区']
    });
  }
});
