import { SchemaNames, FilesModel } from 'server/models/types';

exports.create = {
  [SchemaNames.FILES]: [
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1558775813/jz5gjponfminbmtwuwyr.jpg',
      name: 'jz5gjponfminbmtwuwyr.jpg',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1558775813/jz5gjponfminbmtwuwyr.jpg'
    },

    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1557665374/ltjcnnlsduusxfge1ksp.jpg',
      name: 'ltjcnnlsduusxfge1ksp.jpg',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1557665374/ltjcnnlsduusxfge1ksp.jpg'
    },

    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1557655459/yn5lnlz94umroibuqicr.jpg',
      name: 'yn5lnlz94umroibuqicr.jpg',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1557655459/yn5lnlz94umroibuqicr.jpg'
    },

    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1535876273/n5xg97w7rvqsk1mp48nj.jpg',
      name: 'n5xg97w7rvqsk1mp48nj.jpg',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1535876273/n5xg97w7rvqsk1mp48nj.jpg'
    },

    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1529481968/kj0fxkjglexynwjouitm.png',
      name: 'kj0fxkjglexynwjouitm.png',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1529481968/kj0fxkjglexynwjouitm.png'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1526064434/x0mo8fs0cdhgwtspuw4d.jpg',
      name: 'x0mo8fs0cdhgwtspuw4d.jpg',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1526064434/x0mo8fs0cdhgwtspuw4d.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1556446519/slcajlgylzlsxufs2vzp.jpg',
      name: 'bio_pic',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1556446519/slcajlgylzlsxufs2vzp.jpg'
    },
    // TODO: define file name for others blogs, albums etc
  ] as FilesModel[]
};
