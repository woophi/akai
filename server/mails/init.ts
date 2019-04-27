import * as nodemailer from 'nodemailer';
import config from '../config';
import { Logger } from '../logger';

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
      to: 'attendentofsky@gmail.com', // list of receivers
      subject: 'Hello ✔✔✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>' // html body
    });
    Logger.debug('Message sent: ' + info.messageId);
  };
}
