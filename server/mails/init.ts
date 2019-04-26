import * as nodemailer from 'nodemailer';
import config from '../config';

/**
 * TODO: create queue to send mails
 * TODO: send general mail
 * TODO: gracefull template
 * TODO: i don't want to wait for all mails when sending posts
 */

export class Mailer {
  constructor() {}

  init = async () => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.GMAIL_USER,
        pass: config.GMAIL_APP_PASS
      }
    });
    let info = await transporter.sendMail({
      from: '"👻"', // sender address
      to: 'konstantin.mikheev@icord.cz', // list of receivers
      subject: 'Hello ✔✔✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>' // html body
    });
    console.log('Message sent: %s', info.messageId);
  };
}
