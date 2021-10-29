import { Logger } from 'server/logger';
import * as async from 'async';
import SubModel from 'server/models/subscribers';
import * as mails from 'server/mails';
import { EmailTemplate } from 'server/mails/types';
import config from 'server/config';

type SubsType = {
  email: string;
};

export const sendMailToSubscribersAfterBlogPost = (savedBlogId: string, adminName: string) => {
  if (!savedBlogId) {
    Logger.info('no savedBlogId', savedBlogId);
    return;
  }
  let data: SubsType[] = [];

  async.series(
    [
      cb => {
        SubModel.find()
          .where({ active: true })
          .select('email -_id')
          .lean()
          .exec((err, subsEmail: SubsType[]) => {
            if (err) {
              Logger.error(err);
              return;
            }
            if (subsEmail && subsEmail.length) {
              data = subsEmail;
              return cb();
            }
            return cb();
          });
      },
    ],
    () => {
      Logger.info('starting sendMailToSubscribersAfterBlogPost');
      const mailer = new mails.Mailer(
        'message to subs for new blog',
        EmailTemplate.email,
        data.map(d => d.email),
        `New picture on site ${process.env.CHAT_DOMAIN}`,
        '',
        adminName,
        {
          personal: true,
          data: data.map(d => ({
            ...d,
            templateName: EmailTemplate.email + 'en',
            subject: personalSubjectNewBlog('en'),
            url: `${config.SITE_URI}gallery/album/${savedBlogId}`,
          })),
        }
      );
      mailer.performQueue();
    }
  );
};

const personalSubjectNewBlog = (savedLocaleId: string) => {
  switch (savedLocaleId) {
    case 'ru':
      return `Новая картина на сайте ${process.env.CHAT_DOMAIN}`;
    case 'cs':
      return `Nový obrázek na webe ${process.env.CHAT_DOMAIN}`;
    case 'en':
    default:
      return `New picture on site ${process.env.CHAT_DOMAIN}`;
  }
};
