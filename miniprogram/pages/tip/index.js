Page({
  data: {
    groupId: '',
    groupLeader: '',
    members: [],
    info: '',
  },
  onLoad: function(e){
    if(e.groupId) {
      this.setData({
        groupId: e.groupId[0]
      })
      wx.cloud.callFunction({
        name: "quickstartFunctions",
        data: {
          type: "getTip",
          data: {
            groupId: e.groupId
          },
        }
      }).then((res) => {
        console.log(res);
        this.setData({
          groupLeader: res.result.groupLeader[0].nickname || '',
          info: res.result.groupLeader[0].info || '',
          members: res.result.members
        })
      })
    }
  },
});
