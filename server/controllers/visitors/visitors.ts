import { Request, Response, NextFunction } from 'express';
import { getUserIp } from '../../utils/helpers';
const parser = require('ua-parser-js');
import * as uuidv4 from 'uuid/v4';
const geoip = require('geoip-lite');
import VisitorsList from '../../models/visitors';
import { Model } from '../../models/types';
import { Logger } from '../../logger';

export const connectedUniqVisitor = (req: Request, res: Response, next: NextFunction) => {
  const visitorId = req.signedCookies['visitID'];
  const uniqID = uuidv4();
  const newDate = new Date();
  const now = newDate.toISOString();
  if (!visitorId) {
    res.cookie('visitID', uniqID, { signed: true, expires: new Date(newDate.getFullYear() + 99, newDate.getMonth(), newDate.getDay()) });
  }
  res.cookie('LastVisit', now, { signed: true });

  const ua = new parser(req.headers['user-agent']);
  const ip = getUserIp(req);
  const geo = geoip.lookup(ip);
  let newVisitorData = {
    visitorId,
    uniqVisits: 1,
    lastVisit: req.signedCookies['LastVisit'] || now,
    visitInfo: {
      device: ua.getDevice(),
      language: req.headers['accept-language'],
      city: geo && geo.city,
      country: geo && geo.country,
      browser: ua.getBrowser(),
      os: ua.getOS(),
      ip
    }
  };
    VisitorsList
      .findOne()
      .where('visitorId', visitorId)
      .exec((err, visitor: Model<typeof newVisitorData>) => {
        if (err) {
          Logger.error('err to find visitor ' + err);
          return res.send().status(400);
        }

        if (!visitor) {
          if (!newVisitorData.visitorId) {
            newVisitorData.visitorId = uniqID;
          }
          const newVisitor = new VisitorsList(newVisitorData);
          return newVisitor.save((err) => {
            if (err) {
              Logger.error('err to save new visitor ' + err);
              return res.send().status(500);
            }
            Logger.info('new visitor saved');
            return res.send().status(200);

          });
        }

        const newVisitTime = Date.parse(now);
        const lastVisitTime = Date.parse(visitor.lastVisit);
        Logger.debug(newVisitTime + ' ' + lastVisitTime + ' ' + (newVisitTime - lastVisitTime))
        if (newVisitTime - lastVisitTime >= 30*60000) {
          visitor.uniqVisits = visitor.uniqVisits + 1;
          visitor.lastVisit = now;
          return visitor.save(() => {
            Logger.info('visitors count increase');
            return res.send().status(200);
          });
        } else {
          Logger.info('old here');
          visitor.lastVisit = now;
          return visitor.save(() => {
            Logger.info('visitors last visit updated');
            return res.send().status(200);
          });
        }
      });
}
