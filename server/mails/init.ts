import * as nodemailer from 'nodemailer';
import config from '../config';
import { Logger } from '../logger';
import { agenda } from '../lib/db';
import { EmailTemplate } from './types';
const hbs = require('nodemailer-express-handlebars');
// TODO: unsubscribe link

export class Mailer {
  constructor(
    protected job: string,
    protected templateName: EmailTemplate,
    protected to: string[],
    protected subject: string,
    protected shortText?: string,
    protected from?: string,
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
        const personal = this.context.personal;
        if (personal) {
          const personalData = this.context.data.find(d => d.email == emailAddress);
          this.sendMail(emailAddress, done, personalData);
        } else {
          this.sendMail(emailAddress, done);
        }
      });
    });
  };

  private handlebarOptions = {
    viewEngine: {
      extName: '.hbs',
      partialsDir: 'server/mails/views',
      layoutsDir: 'server/mails/views'
    },
    viewPath: 'server/mails/views',
    extName: '.hbs'
  };

  sendMail = async (
    to: string,
    done?: (err?: Error) => void,
    personalContext?: { [key: string]: any }
  ) => {
    try {
      this.transporter.use('compile', hbs(this.handlebarOptions));
      let info = await this.transporter.sendMail({
        from: `${this.from} <${config.GMAIL_USER}>`,
        to,
        subject: personalContext ? personalContext.subject : this.subject,
        text: this.shortText || '',
        template: personalContext ? personalContext.templateName : this.templateName,
        context: personalContext || this.context
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
  };
}
