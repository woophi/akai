import { SchemaNames, SaveBlogModel } from 'server/models/types';

// FIXME: REMOVE
exports.create = {
  [SchemaNames.BLOG]: [
    {
      body: [
        {
          content: 'sosat',
          localeId: 'en'
        }
      ],
      createdBy: '5cd7e141889c8c26b8ff5e4d',
      photos: [
        '5ce9080a9f08190a60b2570f',
        '5ce9080a9f08190a60b2570f',
        '5ce978becb22382ec421dc9f'
      ],
      socialShare: {
        localeId: 'en',
        photo: '5ce978becb22382ec421dc9f'
      },
      title: [
        {
          content: 'pizda',
          localeId: 'en'
        }
      ],
      topic: [
        {
          content: 'super topic',
          localeId: 'en'
        }
      ]
    } as SaveBlogModel
  ]
};
