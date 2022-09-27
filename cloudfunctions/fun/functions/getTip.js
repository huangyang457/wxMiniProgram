module.exports = async (args, db, openId, ctx) => {
    try {
        let membersNickname = [];
    
        let groupLeader = await db.collection("test-form").where({
            groupId: Number(args.groupId),
            isLeader: true
        })
        .get();
        let members = await db.collection("test-form").where({
            groupId: Number(args.groupId),
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