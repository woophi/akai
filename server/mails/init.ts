import * as nodemailer from 'nodemailer';
import config from '../config';
import { Logger } from '../logger';
import { agenda } from '../lib/db';
import { EmailTemplate } from './types';
import { createUniqLink } from './operations';
import Mail from 'nodemailer/lib/mailer';
const hbs = require('nodemailer-express-handlebars');

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
  private transporter: Mail;

  private init = () => {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.GMAIL_USER,
        pass: config.GMAIL_APP_PASS,
      },
    });
    agenda.define(this.job, (job, done) => {
      this.to.forEach(emailAddress => {
        const personal = this.context?.personal;
        if (personal) {
          const personalData = this.context?.data.find((d: any) => d.email == emailAddress);
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
      layoutsDir: 'server/mails/views',
      defaultLayout: false,
    },
    viewPath: 'server/mails/views',
    extName: '.hbs',
  };

  sendMail = async (to: string, done?: (err?: Error) => void, personalContext?: { [key: string]: any }) => {
    try {
      this.transporter.use('compile', hbs(this.handlebarOptions));
      const unsubId = await createUniqLink(to);
      const configurationMail = {
        from: `${this.from} <${config.GMAIL_USER}>`,
        to,
        subject: personalContext ? personalContext.subject : this.subject,
        text: this.shortText || '',
        template: personalContext ? personalContext.templateName : this.templateName,
        context: {
          ...(personalContext || this.context),
          unsubLink: `${config.SITE_URI}unsub/${unsubId}`,
        },
      };
      let info = await this.transporter.sendMail(configurationMail);
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
    agenda.now(this.job, null);
  };
}
