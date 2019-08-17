import { SchemaNames, FilesModel } from 'server/models/types';

exports.create = {
  [SchemaNames.FILES]: [
    // slider
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047033/slide_1.jpg',
      name: 'slide_1',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047033/slide_1.jpg'
    },

    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047034/slide_2.jpg',
      name: 'slide_2',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047034/slide_2.jpg'
    },

    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047033/slide_3.jpg',
      name: 'slide_3',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047033/slide_3.jpg'
    },

    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047037/slide_4.jpg',
      name: 'sldie_4',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047037/slide_4.jpg'
    },

    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047033/slide_5.jpg',
      name: 'slide_5',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047033/slide_5.jpg'
    },
    // photos
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047282/photo_1.jpg',
      name: 'photo_1',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047282/photo_1.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047282/photo_2.jpg',
      name: 'photo_2',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047282/photo_2.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047402/photo_3.jpg',
      name: 'photo_3',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047402/photo_3.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047282/photo_4.jpg',
      name: 'photo_4',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047282/photo_4.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047282/photo_5.jpg',
      name: 'photo_5',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047282/photo_5.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047282/photo_6.jpg',
      name: 'photo_6',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047282/photo_6.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047282/photo_7.jpg',
      name: 'photo_7',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047282/photo_7.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047282/photo_8.jpg',
      name: 'photo_8',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047282/photo_8.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047282/photo_9.jpg',
      name: 'photo_9',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047282/photo_9.jpg'
    },
    // albums
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047584/BLACK_WHITE.jpg',
      name: 'black_white',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047584/BLACK_WHITE.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047585/COLOR.jpg',
      name: 'color',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047585/COLOR.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047585/WATERCOLOR.jpg',
      name: 'water_color',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047585/WATERCOLOR.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047585/PAINTS.jpg',
      name: 'paints',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047585/PAINTS.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047585/PASTEL.jpg',
      name: 'pastel',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047585/PASTEL.jpg'
    },
    // blogs
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047816/pastel_1.jpg',
      name: 'pastel_1',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047816/pastel_1.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047817/pastel_2.jpg',
      name: 'pastel_2',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047817/pastel_2.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047816/pastel_3.jpg',
      name: 'pastel_3',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047816/pastel_3.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047818/pastel_4.jpg',
      name: 'pastel_4',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047818/pastel_4.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047817/pastel_5.jpg',
      name: 'pastel_5',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047817/pastel_5.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047817/pastel_6.jpg',
      name: 'pastel_6',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047817/pastel_6.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047819/pastel_7.jpg',
      name: 'pastel_7',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047819/pastel_7.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047820/pastel_8.jpg',
      name: 'pastel_8',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047820/pastel_8.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047817/pastel_9.jpg',
      name: 'pastel_9',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047817/pastel_9.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566047817/pastel_10.jpg',
      name: 'pastel_10',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566047817/pastel_10.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048123/pastel_11.jpg',
      name: 'pastel_11',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048123/pastel_11.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048123/pastel_12.jpg',
      name: 'pastel_12',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048123/pastel_12.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048123/pastel_13.jpg',
      name: 'pastel_13',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048123/pastel_13.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048123/pastel_14.jpg',
      name: 'pastel_14',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048123/pastel_14.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048123/pastel_15.jpg',
      name: 'pastel_15',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048123/pastel_15.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048123/pastel_16.jpg',
      name: 'pastel_16',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048123/pastel_16.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048123/pastel_17.jpg',
      name: 'pastel_17',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048123/pastel_17.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048123/pastel_18.jpg',
      name: 'pastel_18',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048123/pastel_18.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048123/pastel_19.jpg',
      name: 'pastel_19',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048123/pastel_19.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048124/pastel_20.jpg',
      name: 'pastel_20',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048124/pastel_20.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048359/pastel_21.jpg',
      name: 'pastel_21',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048359/pastel_21.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048359/pastel_22.jpg',
      name: 'pastel_22',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048359/pastel_22.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048359/pastel_23.jpg',
      name: 'pastel_23',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048359/pastel_23.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048359/pastel_24.jpg',
      name: 'pastel_24',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048359/pastel_24.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048360/pastel_25.jpg',
      name: 'pastel_25',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048360/pastel_25.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048360/pastel_26.jpg',
      name: 'pastel_26',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048360/pastel_26.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048359/pastel_27.jpg',
      name: 'pastel_27',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048359/pastel_27.jpg'
    },
    // bio
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048534/foto_BIO.jpg',
      name: 'foto_bio',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048534/foto_BIO.jpg'
    },
    // blogs paint
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048588/paint_1.jpg',
      name: 'paint_1',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048588/paint_1.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048588/paint_2.jpg',
      name: 'paint_2',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048588/paint_2.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048588/paint_3.jpg',
      name: 'paint_3',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048588/paint_3.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048588/paint_4.jpg',
      name: 'paint_4',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048588/paint_4.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048588/paint_5.jpg',
      name: 'paint_5',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048588/paint_5.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048591/paint_6.png',
      name: 'paint_6',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048591/paint_6.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048588/paint_7.jpg',
      name: 'paint_7',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048588/paint_7.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048589/paint_8.jpg',
      name: 'paint_8',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048589/paint_8.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048589/paint_9.jpg',
      name: 'paint_9',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048589/paint_9.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048589/paint_10.png',
      name: 'paint_10',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048589/paint_10.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048781/paint_11.png',
      name: 'paint_11',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048781/paint_11.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048782/paint_12.jpg',
      name: 'paint_12',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048782/paint_12.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048781/paint_13.jpg',
      name: 'paint_13',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048781/paint_13.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048781/paint_14.jpg',
      name: 'paint_14',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048781/paint_14.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048781/paint_15.jpg',
      name: 'paint_15',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048781/paint_15.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048781/paint_16.jpg',
      name: 'paint_16',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048781/paint_16.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048781/paint_17.jpg',
      name: 'paint_17',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048781/paint_17.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048781/paint_18.jpg',
      name: 'paint_18',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048781/paint_18.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048782/paint_19.jpg',
      name: 'paint_19',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048782/paint_19.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048782/paint_20.jpg',
      name: 'paint_20',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048782/paint_20.jpg'
    },
    // painting
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048963/painting_1.jpg',
      name: 'painting_1',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048963/painting_1.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048963/painting_2.jpg',
      name: 'painting_2',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048963/painting_2.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048963/painting_3.jpg',
      name: 'painting_3',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048963/painting_3.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048965/painting_4.jpg',
      name: 'painting_4',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048965/painting_4.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048963/painting_5.jpg',
      name: 'painting_5',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048963/painting_5.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566048963/painting_6.jpg',
      name: 'painting_6',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566048963/painting_6.jpg'
    },
    // watercolor
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566049289/graphics_watercolor_1.jpg',
      name: 'watercolor_1',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566049289/graphics_watercolor_1.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1566049289/graphics_watercolor_2.jpg',
      name: 'watercolor_2',
      thumbnail: 'https://res.cloudinary.com/dqbo8zk4k/image/upload/h_400/v1566049289/graphics_watercolor_2.jpg'
    },
  ] as FilesModel[]
};
