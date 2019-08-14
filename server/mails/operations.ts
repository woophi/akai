import * as uuidv4 from 'uuid/v4';
import LinksModel from 'server/models/links';
import * as models from 'server/models/types';
import * as moment from 'moment';
import { Logger } from 'server/logger';

// TODO: check every 5 days if link is there still valid with agenda task
const rofl = 'kek';
export const createUnsubEmail = async (email: string) => {
  try {
    const Link = (await LinksModel.findOne({ email }).exec()) as models.Links;

    if (Link) {
      if (!checkLinkTimeValidation(Link.valid)) {
        await Link.set({
          valid: moment()
            .add(5, 'days')
            .toDate()
        }).save();
      }
      return Link.uniqId;
    } else {
      const uniqId = uuidv4();
      await new LinksModel({
        email,
        uniqId,
        valid: moment()
          .add(5, 'days')
          .toDate()
      } as models.LinksModel).save();
      return uniqId;
    }
  } catch (error) {
    Logger.error('Cannot save unsub link', error);
    return rofl;
  }
};

export const checkLinkTimeValidation = (time: Date) => {
  return moment(time).isAfter(Date.now());
};
