const nodemailer=require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.qq.com",// 邮件地址
    port: 465,// 端口
    secureConnection: true, // use SSL
    auth: {
        "user": '190885882', // 邮箱账号
        "pass": 'kljcghmgwjdqcbbe'         // 密码
    }
});
module.exports.send =  (mailOptions) => {
    transporter.sendMail(mailOptions, function(error, info){
        if(error) {
            return console.log(error);
        }
    })
}