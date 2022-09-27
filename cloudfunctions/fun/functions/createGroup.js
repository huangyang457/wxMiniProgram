module.exports = async(args, db, openId, ctx)=>{
    // 递增小组id
    let res = await db.collection("test-group").count();
    let groupId = parseInt(res.total) + 1;
    // 严格项目需要事务功能
    await db.collection("test-group").add({
        data: {
            leader: args.nickname,
            region: args.region,
            code: args.code,
            birth: args.birth,
            info: args.info,
            openId,
            groupId,
            member: 1
        }
    });
    await db.collection("test-form").add({
        data: {
            nickname: args.nickname,
            gender: args.gender === "nv" ? "女" : "男",
            region: args.region,
            code: args.code,
            birth: args.birth,
            info: args.info,
            isLeader: true,
            openId,
            groupId
        }
    });
    return {
        success: true,
        groupId: groupId
    };
}