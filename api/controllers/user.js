const express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const nodemailer = require('nodemailer');

var db = require('../db.js');
// var base = require('../models/base.js');

router.post('/', async  (req, res) => {
    res.contentType('application/json');
    try {
        var obj = req.body[0];
        var where = [];
        obj.email ? where.push(" email = '"+obj.email+"' ") : '';
        obj.mobile ? where.push(" mobile = '"+obj.mobile+"' ") : '';
        

        var sql = "SELECT user_id FROM user WHERE ("+where.join(" OR ")+")";
        db.query(sql, function(error, rows) {
            // console.log(rows);
            // console.log(error);
            if(error){
                res.send({
                    error: "Could not be processed at this time, please try later.",
                    data: "",
                    status:0
                  })
            }
            else if(rows.length)
            {
                res.send({
                    error: "",
                    data: rows[0].user_id,
                    status:1
                });
            }
            else
            {
                var sql = "INSERT INTO user SET ? ";
                db.query(sql, req.body, function(error, result) {
                    // console.log(rows);
                    // console.log(error);
                    if(error){
                        res.send({
                            error: "Could not be processed at this time, please try later.",
                            data: "",
                            status:0
                        })
                    }else{
                        res.send({
                            error: "",
                            data: result.insertId,
                            status:1
                        });
                    }
                });
            }
        });
    } catch ( err ){
        console.log(err);
        res.send({
            error: "Something went wrong please try again",
            data: "",
            status:0
          })
    }
});

router.get('/sendOtp/:mobile', async  (req, res, next) => {
    res.contentType('application/json');
    try {
        var mobile = req.params.mobile;
        var otp = Math.floor(100000 + Math.random() * 900000);
        var message = "Your Verification OTP is: "+otp;

        var senderId = 'RKINGS';
        var routeId = 1;
        var authKey = '57ff8fd7b131d4903d121ed78b3a91f';
        var queryString = 'mobileNos='+mobile+'&message='+message+'&senderId='+senderId+'&routeId='+routeId+'&smsContentType=Unicode';
        var url = "http://msg.msgclub.net/rest/services/sendSMS/sendGroupSms?AUTH_KEY="+authKey+"&"+queryString;

        fetch(url)
        .then(res => res.json())
        .then((json) => {
            res.send({
                error: "",
                data: otp,
                status:1
                });
            })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            throw error;
            });
    } catch ( err ){
        res.send({
            error: "Something went wrong, Please try again.",
            data: "",
            status:0
          })
    }
});

router.get('/sendEmailOtp/:email', async (req, res, next) => {
    res.contentType('application/json');
    try {
        var email = req.params.email;
        var otp = Math.floor(100000 + Math.random() * 900000);
        var message = "Your Verification OTP is: "+otp;
        var subject =  'Confirmation Code';

        // create reusable transporter object using the default SMTP transport
        /////https://mailtrap.io/inboxes/796786/messages
        var transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "b372d192600b93",
              pass: "acf25dc57edb3c"
            }
          });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Ads Infinite" <abitexpertdev@gmail.com>', // sender address
            to: email,//"bar@example.com, baz@example.com", // list of receivers
            subject: subject, // Subject line
            text: message, // plain text body
            // html: "<h1>"+message+"</h1>" // html body
        });

        if(info.messageId){
            res.send({
                error: "",
                data: otp,
                status:1
                });
        }else{
            res.send({
                error: "Mail Can't Delivered this time, Please try after Some time.",
                data: "",
                status:0
              })
        }
    } catch ( err ){
        res.send({
            error: "Something went wrong, Please try again.",
            data: "",
            status:0
          })
    }
});

router.get('/', async  (req, res, next) => {
    res.contentType('application/json');
    try {
        var sql = "SELECT * FROM user";
        db.query(sql, await function (err, result, fields) {
            res.send({
              error: "",
              data: result,
              status:1
            });
        });  
    } catch ( err ){
        res.send({
            error: "Something went wrong, Please try again.",
            data: "",
            status:0
          })
    }
});

module.exports = router;