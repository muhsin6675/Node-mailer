const nodemailer = require('nodemailer');
const emails = ['mohdmuhsinvv@gmail.com'];
console.log(emails);
const sendMail=async (emails,otp)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "mohdmuhsinvv@gmail.com",
          pass: "nwvx yndv kqjo kbmu",
        },
      });

      const info = await transporter.sendMail({
        from: '"NodeMailer" <mohdmuhsinvv@gmail.com>', // sender address
        to: emails, // list of receivers
        subject: "Reset Password", // Subject line
        html: `<h2>${otp}</h2>`, // html body
      });
}
module.exports=sendMail