//引入相关文件和代码包
var mongoose = require('../common/db');
//根据数据集建立一个新的mail数据内容
var mail = new mongoose.Schema({
    fromUser:String,
    toUser:String,
    title:String,
    context:String,
})
//数据库操作的一些常用方法
mail.statics.findByToUserId= function (user_id,callBack) {
        this.find({toUser:user_id},callBack);
};
mail.statics.findByFromUserd=function (user_id,callBack) {
            this.find({fromUser:user_id},callBack)
}
var mailModel=mongoose.model('mail',mail);

module.exports = mailModel
