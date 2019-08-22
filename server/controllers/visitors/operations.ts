import { Request, Response } from 'express';
import { getUserIp } from 'server/utils/helpers';
const parser = require('ua-parser-js');
import * as uuidv4 from 'uuid/v4';
const geoip = require('geoip-lite');
import VisitorsList from 'server/models/visitors';
import { Model } from 'server/models/types';
import { Logger } from 'server/logger';
import { VisitorCookie } from './types';
import { HTTPStatus } from 'server/lib/models';

export const connectUniqVisitor = (req: Request, res: Response) => {
  const visitorId = req.signedCookies[VisitorCookie.VisitId];
  const uniqID = uuidv4();
  const newDate = new Date();
  const now = newDate.toLocaleString();
  const expires = new Date(
    newDate.getFullYear() + 99,
    newDate.getMonth(),
    newDate.getDay()
  );
  if (!visitorId) {
    res.cookie(VisitorCookie.VisitId, uniqID, { signed: true, expires });
    const lngs = req.acceptsLanguages();
    res.cookie(VisitorCookie.Lang, lngs ? lngs.find(l => l.length == 2) : 'en', {
      expires
    });
  }
  res.cookie(VisitorCookie.LastVisit, now, { signed: true });

  const ua = new parser(req.headers['user-agent']);
  const ip = getUserIp(req);
  const splitIp = typeof ip === 'string' ? ip.split(',') : ip;
  const geo = geoip.lookup(splitIp && splitIp.length ? splitIp[0] : splitIp);
  let newVisitorData = {
    visitorId,
    uniqVisits: 1,
    lastVisit: req.signedCookies[VisitorCookie.LastVisit] || now,
    visitInfo: {
      device: ua.getDevice(),
      language: req.headers['accept-language'],
      city: geo && geo.city,
      country: geo && geo.country,
      browser: ua.getBrowser(),
      os: ua.getOS(),
      ip
    },
    savedLocaleId: 'en'
  };

  return new Promise(resolve => {
    VisitorsList.findOne()
      .where('visitorId', visitorId)
      .exec((err, visitor: Model<typeof newVisitorData>) => {
        if (err) {
          Logger.error('err to find visitor ' + err);
          return res.send().status(HTTPStatus.BadRequest);
        }

        if (!visitor) {
          if (!newVisitorData.visitorId) {
            newVisitorData.visitorId = uniqID;
          }
          const newVisitor = new VisitorsList(newVisitorData);
          return newVisitor.save(err => {
            if (err) {
              Logger.error('err to save new visitor ' + err);
              return res.send().status(HTTPStatus.ServerError);
            }
            Logger.info('new visitor saved');
            return resolve(uniqID);
          });
        }

        const newVisitTime = Date.parse(now);
        const lastVisitTime = Date.parse(visitor.lastVisit);
        Logger.debug(
          newVisitTime + ' ' + lastVisitTime + ' ' + (newVisitTime - lastVisitTime)
        );
        if (!visitor.savedLocaleId) {
          visitor.savedLocaleId =
            req.cookies[VisitorCookie.Lang] || newVisitorData.savedLocaleId;
        }
        if (visitor.savedLocaleId !== req.cookies[VisitorCookie.Lang]) {
          visitor.savedLocaleId = req.cookies[VisitorCookie.Lang];
        }
        if (newVisitTime - lastVisitTime >= 30 * 60000) {
          visitor.uniqVisits = visitor.uniqVisits + 1;
          visitor.lastVisit = now;

          return visitor.save(() => {
            Logger.info('visitors count increase');
            return resolve(visitorId);
          });
        } else {
          Logger.info('old here');
          visitor.lastVisit = now;
          return visitor.save(() => {
            Logger.info('visitors last visit updated');
            return resolve(visitorId);
          });
        }
      });
  });
};
