module.exports = async (args, db, openId, ctx) => {
    try {
        let res = await db.collection("test-form").where({
            openId: openId
        })
            .get();
        return {
            success: true,
            groupId: res.data[0] ? res.data[0].groupId : ''
        };
    } catch (error) {
        return {
            success: false,
            errorMessage: error
        }
    }
}