const cloud = require("wx-server-sdk");

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();
let wxContext = cloud.getWXContext();
let openId = wxContext.OPENID;

module.exports = async (event) => {
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