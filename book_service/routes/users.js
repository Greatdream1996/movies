var express = require('express');
var router = express.Router();
var user = require('../models/user');
var crypto = require('crypto');
// var movie = require('../models/movie');
// var mail = require('../models/mail');
// var comment = require('../models/comment');
// const init_token = 'TKL02o';


/* GET users listing. */
// router.get('/', function (req, res, next) {
//     res.send('respond with a resource');
// });
// 用户登陆接口
router.post('/login', function (req, res, next) {
    //验证完整性，这里使用简单的if方式，可以使用正则表达式对输入的格式进行验证
    if (!req.body.username) {
        res.json({status: 1, message: "用户名为空"})
    }
    if (!req.body.password) {
        res.json({status: 1, message: "密码为空"})
    }
    user.findUserLogin(req.body.username, req.body.password, function (err, userSave) {
        if (userSave.length != 0) {
            //md5查看密码
            // res.json(userSave)
            // var md5 = crypto.createHash('md5');
            // var token_before = userSave[0]._id + init_token
            // res.json(userSave[0]._id)
            // var token_after = md5.update(token_before).digest('hex')
            // var token_after = getMD5Password(userSave[0]._id);

            res.json({status: 0,  data:{user:userSave._id},message: "用户登录成功"})
        } else {
            res.json({status: 1, message: "用户名或者密码错误"});

        }
    })
});
//用户注册接口
router.post('/register', function (req, res, next) {
    //验证完整性，这里使用简单的if方式，可以使用正则表达式对输入的格式进行验证
    if (!req.body.username) {
        res.json({status: 1, message: "用户名为空"})
    }
    if (!req.body.password) {
        res.json({status: 1, message: "用户密码为空"})
    }
    if (!req.body.userMail) {
        res.json({status: 1, message: "用户邮箱为空"})
    }
    if (!req.body.userPhone) {
        res.json({status: 1, message: "用户电话为空"})
    }
    user.findByUsername(req.body.username, function (err, userSave) {
        if (userSave.length != 0) {
            //返回错误信息
            res.json({status: 1, message: "用户已注册"})
        } else {
            var registerUser = new user({
                username: req.body.username,
                password: req.body.password,
                userMail: req.body.userMail,
                userPhone: req.body.userPhone,
                userAdmin: 0,
                userPower: 0,
                userStop: 0
            })
            registerUser.save(function () {
                res.json({status: 0, message: "注册成功"})
            })

        }
    })

});
//用户提交评论
router.post('/postComment', function (req, res, next) {

});
//用户点赞
router.post('/support', function (req, res, next) {

});
//用户找回密码
router.post('/findPassword', function (req, res, next) {
//需要输入用户的邮箱信息和手机信息，同时可以更新密码
//这里须有返回两个情况，一个是req.body.repassword存在时，另一个是repassword不存在时
//这个接口同时用于密码的重置，需要用户登陆
});
//用户发送站内信
router.post('/sendEmail', function (req, res, next) {

});

//获取MD5的值
function getMD5Password(id) {
    var md5 = crypto.createHash('md5');
    var token_before = id + init_token
    // res.json(userSave[0]._id)
    return md5.update(token_before).digest('hex')
}

module.exports = router;
