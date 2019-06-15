import { SchemaNames, YoutubeModel } from 'server/models/types';

// FIXME: REMOVE
exports.create = {
  [SchemaNames.YOUTUBE]: [
    {
      title: 'Faker - Yasuo vs. Zed Mid - Patch 9.8 KR Ranked | RARE',
      videoId: '9prr54CLq-s'
    } as YoutubeModel,
    {
      title: 'Week 6 Day 1 | LEC Spring Split (2019)',
      videoId: 'KbFZqnmjAno'
    } as YoutubeModel,
    {
      title: 'ARUF IS BACK 2019 - New URF on PBE | League of Legends Stream',
      videoId: 'FHkDkMOmDcQ'
    } as YoutubeModel,
    {
      title: 'NEW URF MODE!!! NEW URF DRAGON + CANNON THROWS YOU ANYWHERE!! - URF 2019 / LIVE STREAM!',
      videoId: '3mEliepfgoU'
    } as YoutubeModel
  ]
};
