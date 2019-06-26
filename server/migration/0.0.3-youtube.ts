import { SchemaNames, YoutubeModel } from 'server/models/types';

exports.create = {
  [SchemaNames.YOUTUBE]: [
    {
      title: 'Древняя Греция за 18 минут',
      videoId: 'LJdhEpJ03Ug'
    } as YoutubeModel,
    {
      title: '5 САМЫХ ЗАГАДОЧНЫХ ЛЮДЕЙ ПЛАНЕТЫ',
      videoId: '7QojZ_hG0Ak'
    } as YoutubeModel,
    {
      title: 'Кто живет на дне Марианской впадины?',
      videoId: '4Kz_BDj38J0'
    } as YoutubeModel,
  ]
};
