//引入数据包
var mongoose= require('../common/db');

//数据库的数据集
var article = new mongoose.Schema({
    articleTitle:String,
    articleContext:String,
    articleTime:String,
});

//通过ID查找
article.statics.findByArticleId= function (id,callBack) {
    this.find({_id:id},callBack);

};

var articleModel= mongoose.model("article",article);

module.exports=articleModel;

