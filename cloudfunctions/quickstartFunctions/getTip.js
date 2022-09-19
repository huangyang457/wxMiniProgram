const cloud = require("wx-server-sdk");

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

module.exports = async (event) => {
    try {
        let u = event.data;
        const _ = db.command;
        let membersNickname = [];
    
        let groupLeader = await db.collection("test-form").where({
            groupId: Number(u.groupId),
            isLeader: true
        })
        .get();
        let members = await db.collection("test-form").where({
            groupId: Number(u.groupId),
            isLeader: false
        })
        .get();
        
        members.data.forEach((item) => {
            membersNickname.push(item.nickname)
        })

        return {
            groupLeader: groupLeader.data,
            members: membersNickname,
        };
    }catch(error){
        return {
            errorMessage: error,
            sec: "失败"
        }
    }
}