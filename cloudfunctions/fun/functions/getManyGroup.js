module.exports = async (args, db, openId, ctx) => {
    try {
        const _ = db.command;  //command数据库操作符
        //查询test-group表 
        let res = await db.collection("test-group")
        // 成员小于6的数据
        .where({  
            member: _.lt(6) 
        }).orderBy("groupId", "asc")
        .get(); // 升序排列 .get()获取数据
        return {
            success: true,
            groupList: res.data
        };
    } catch (error) {
        return {
            success: false,
            errorMessage: error
        };
    }
};