module.exports = async(args, db, openId, ctx)=>{
    let res = await db.collection("test-group").where({ groupId: args.groupId }).get();
    const _ = db.command;  //command数据库操作符

    if(res.data[0].member > 5){
        return {
            success: false,
            errorMessage: "该小组已满6人"
        }
    }
    // 执行return后，之后的代码不会执行 所以不用else

    await db.collection("test-group").where({ groupId: args.groupId }).update({
        data: {
            member: _.inc(1)
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
            isLeader: false,
            openId,
            groupId: args.groupId
        }
    });
    return {
        success: true,
        groupId: res.data[0].groupId
    };
}