import * as nodemailer from 'nodemailer';
import config from '../config';
import { Logger } from '../logger';
import { agenda } from '../lib/agenda';
import { EmailTemplate } from './types';
const hbs = require('nodemailer-express-handlebars');

export class Mailer {
  constructor(
    protected job: string,
    protected templateName: EmailTemplate,
    protected to: string[],
    protected subject: string,
    protected shortText: string,
    protected context?: { [key: string]: any }
  ) {
    this.init();
  }
  private transporter;

  private init = () => {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.GMAIL_USER,
        pass: config.GMAIL_APP_PASS
      }
    });
    agenda.define(this.job, (job, done) => {
      this.to.forEach(emailAddress => {
        this.sendMail(emailAddress, done);
      });
    });
  };

  private handlebarOptions = {
    viewEngine: {
      extName: '.hbs',
      partialsDir: 'server/mails/views',
      layoutsDir: 'server/mails/views',
      defaultLayout: 'email.hbs',
    },
    viewPath: 'server/mails/views',
    extName: '.hbs',
  };


  sendMail = async (to: string, done?: (err?: Error) => void) => {
    try {
      this.transporter.use('compile', hbs(this.handlebarOptions));
      let info = await this.transporter.sendMail({
        from: '"👻"',
        to,
        subject: this.subject,
        text: this.shortText,
        template: this.templateName,
        context: this.context
      });
      Logger.debug('Message sent: ' + info.messageId);
      if (done) {
        done();
      }
    } catch (error) {
      Logger.error(error);
      if (done) {
        done(error);
      }
    }
  };

  performQueue = () => {
    agenda.now(this.job);
  }
}
