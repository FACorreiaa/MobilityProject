require('dotenv').config();

const nodemailer = require('nodemailer');

const { EMAIL_ACCOUNT, EMAIL_PASSWORD } = process.env;

function sendEmailBySMTP(email) {
  const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL,
    auth: {
      user: EMAIL_ACCOUNT,
      pass: EMAIL_PASSWORD
    }
  };

  const transporter = nodemailer.createTransport(smtpConfig);

  const mailOptions = {
    from: EMAIL_ACCOUNT,
    to: 'fernandocorreia316@gmail.com',
    subject: email.subject,
    html: email.message
  };

  return transporter.sendMail(mailOptions);
}

module.exports.sendEmailBySMTP = sendEmailBySMTP;
