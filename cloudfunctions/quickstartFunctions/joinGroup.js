const cloud = require("wx-server-sdk");

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();
const _ = db.command;

module.exports = async(event)=>{
    let u = event.data;
    let wxContext = cloud.getWXContext();
    let openId = wxContext.OPENID;  // 用户微信返回的id
    let res = await db.collection("test-group").where({ groupId: u.groupId }).get();

    if(res.data[0].member > 5){
        return {
            success: false,
            errorMessage: "该小组已满6人"
        }
    }
    // 执行return后，之后的代码不会执行 所以不用else

    await db.collection("test-group").where({ groupId: u.groupId }).update({
        data: {
            member: _.inc(1)
        }
    });
    await db.collection("test-form").add({
        data: {
            nickname: u.nickname,
            gender: u.gender === "nv" ? "女" : "男",
            region: u.region,
            code: u.code,
            birth: u.birth,
            info: u.info,
            isLeader: false,
            openId,
            groupId: u.groupId
        }
    });
    return {
        success: true,
        groupId: res.data[0].groupId
    };
}