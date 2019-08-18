import { SchemaNames, FilesModel } from 'server/models/types';

exports.create = {
  [SchemaNames.FILES]: [
    // slider
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108753/slide_1_p526wt.jpg',
      name: 'slide_1',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108753/slide_1_p526wt.jpg'
    },

    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108750/slide_2_ixnets.jpg',
      name: 'slide_2',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108750/slide_2_ixnets.jpg'
    },

    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108747/slide_3_idjqt7.jpg',
      name: 'slide_3',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108747/slide_3_idjqt7.jpg'
    },

    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108788/slide_4_szzmq5.jpg',
      name: 'sldie_4',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108788/slide_4_szzmq5.jpg'
    },

    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108750/slide_5_f1uksx.jpg',
      name: 'slide_5',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108750/slide_5_f1uksx.jpg'
    },
    // photos
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108701/photo_1_agygka.jpg',
      name: 'photo_1',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108701/photo_1_agygka.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108697/photo_2_ivfb5y.jpg',
      name: 'photo_2',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108697/photo_2_ivfb5y.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108697/photo_3_ko3a4m.jpg',
      name: 'photo_3',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108697/photo_3_ko3a4m.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108703/photo_4_cugwvz.jpg',
      name: 'photo_4',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108703/photo_4_cugwvz.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108700/photo_5_uikxcg.jpg',
      name: 'photo_5',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108700/photo_5_uikxcg.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108701/photo_6_hltshh.jpg',
      name: 'photo_6',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108701/photo_6_hltshh.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108698/photo_7_na0qwj.jpg',
      name: 'photo_7',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108698/photo_7_na0qwj.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108699/photo_8_hi1hv2.jpg',
      name: 'photo_8',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108699/photo_8_hi1hv2.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108700/photo_9_ybfrxd.jpg',
      name: 'photo_9',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108700/photo_9_ybfrxd.jpg'
    },
    // albums
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108789/BLACK_WHITE_uel4n9.jpg',
      name: 'black_white',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108789/BLACK_WHITE_uel4n9.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108790/COLOR_qtusfv.jpg',
      name: 'color',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108790/COLOR_qtusfv.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108790/WATERCOLOR_pfxu7e.jpg',
      name: 'water_color',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108790/WATERCOLOR_pfxu7e.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108797/PAINTS_ikpamj.jpg',
      name: 'paints',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108797/PAINTS_ikpamj.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108797/PASTEL_mhzjo2.jpg',
      name: 'pastel',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108797/PASTEL_mhzjo2.jpg'
    },
    // blogs
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108655/pastel_1_sok9oj.jpg',
      name: 'pastel_1',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108655/pastel_1_sok9oj.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108654/pastel_2_nnitnj.jpg',
      name: 'pastel_2',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108654/pastel_2_nnitnj.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108654/pastel_3_icatwv.jpg',
      name: 'pastel_3',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108654/pastel_3_icatwv.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108654/pastel_4_jniupo.jpg',
      name: 'pastel_4',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108654/pastel_4_jniupo.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108656/pastel_5_aaagnf.jpg',
      name: 'pastel_5',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108656/pastel_5_aaagnf.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108649/pastel_6_lxykii.jpg',
      name: 'pastel_6',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108649/pastel_6_lxykii.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108650/pastel_7_iwtci5.jpg',
      name: 'pastel_7',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108650/pastel_7_iwtci5.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108651/pastel_8_yvx2zq.jpg',
      name: 'pastel_8',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108651/pastel_8_yvx2zq.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108653/pastel_9_xjpelm.jpg',
      name: 'pastel_9',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108653/pastel_9_xjpelm.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108654/pastel_10_skriu2.jpg',
      name: 'pastel_10',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108654/pastel_10_skriu2.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108654/pastel_11_pdtdhd.jpg',
      name: 'pastel_11',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108654/pastel_11_pdtdhd.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108661/pastel_12_j4bf5r.jpg',
      name: 'pastel_12',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108661/pastel_12_j4bf5r.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108661/pastel_13_z0ut5t.jpg',
      name: 'pastel_13',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108661/pastel_13_z0ut5t.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108657/pastel_14_yvran9.jpg',
      name: 'pastel_14',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108657/pastel_14_yvran9.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108664/pastel_15_nz5mu6.jpg',
      name: 'pastel_15',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108664/pastel_15_nz5mu6.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108663/pastel_16_nhtljv.jpg',
      name: 'pastel_16',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108663/pastel_16_nhtljv.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108657/pastel_17_iwslz8.jpg',
      name: 'pastel_17',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108657/pastel_17_iwslz8.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108657/pastel_18_mrnopa.jpg',
      name: 'pastel_18',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108657/pastel_18_mrnopa.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108658/pastel_19_vlvcrw.jpg',
      name: 'pastel_19',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108658/pastel_19_vlvcrw.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108659/pastel_20_mnhytc.jpg',
      name: 'pastel_20',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108659/pastel_20_mnhytc.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108659/pastel_21_tlyz1m.jpg',
      name: 'pastel_21',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108659/pastel_21_tlyz1m.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108659/pastel_22_osgkho.jpg',
      name: 'pastel_22',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108659/pastel_22_osgkho.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108660/pastel_23_qkauij.jpg',
      name: 'pastel_23',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108660/pastel_23_qkauij.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108661/pastel_24_rc1sx4.jpg',
      name: 'pastel_24',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108661/pastel_24_rc1sx4.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108662/pastel_25_zsmljd.jpg',
      name: 'pastel_25',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108662/pastel_25_zsmljd.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108663/pastel_26_yuq0eo.jpg',
      name: 'pastel_26',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108663/pastel_26_yuq0eo.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108664/pastel_27_fhuvgp.jpg',
      name: 'pastel_27',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108664/pastel_27_fhuvgp.jpg'
    },
    // bio
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108790/foto_BIO_imasux.jpg',
      name: 'foto_bio',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108790/foto_BIO_imasux.jpg'
    },
    // blogs paint
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108565/paint_1_pi187j.jpg',
      name: 'paint_1',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108565/paint_1_pi187j.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108557/paint_2_alhg6u.jpg',
      name: 'paint_2',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108557/paint_2_alhg6u.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108573/paint_3_uehmsb.jpg',
      name: 'paint_3',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108573/paint_3_uehmsb.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108553/paint_4_sp9xyg.jpg',
      name: 'paint_4',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108553/paint_4_sp9xyg.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108555/paint_5_mwa9gu.jpg',
      name: 'paint_5',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108555/paint_5_mwa9gu.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108553/paint_6_k0ubfu.png',
      name: 'paint_6',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108553/paint_6_k0ubfu.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108558/paint_7_dgz6wf.jpg',
      name: 'paint_7',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108558/paint_7_dgz6wf.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108555/paint_8_xpysmj.jpg',
      name: 'paint_8',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108555/paint_8_xpysmj.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108570/paint_9_q9upnt.jpg',
      name: 'paint_9',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108570/paint_9_q9upnt.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108559/paint_10_xr7qm3.png',
      name: 'paint_10',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108559/paint_10_xr7qm3.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108573/paint_11_vujptb.png',
      name: 'paint_11',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108573/paint_11_vujptb.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108563/paint_12_ajgjaf.jpg',
      name: 'paint_12',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108563/paint_12_ajgjaf.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108562/paint_13_rtbzwq.jpg',
      name: 'paint_13',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108562/paint_13_rtbzwq.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108566/paint_14_zyweqb.jpg',
      name: 'paint_14',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108566/paint_14_zyweqb.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108565/paint_15_jjhswq.jpg',
      name: 'paint_15',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108565/paint_15_jjhswq.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108571/paint_16_qorxak.jpg',
      name: 'paint_16',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108571/paint_16_qorxak.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108571/paint_17_flsrqd.jpg',
      name: 'paint_17',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108571/paint_17_flsrqd.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108574/paint_18_eok8gz.jpg',
      name: 'paint_18',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108574/paint_18_eok8gz.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108571/paint_19_xzod61.jpg',
      name: 'paint_19',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108571/paint_19_xzod61.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108573/paint_20_qwxfsg.jpg',
      name: 'paint_20',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108573/paint_20_qwxfsg.jpg'
    },
    // painting
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108623/painting_1_gjcebr.jpg',
      name: 'painting_1',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108623/painting_1_gjcebr.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108617/painting_2_btwdct.jpg',
      name: 'painting_2',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108617/painting_2_btwdct.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108619/painting_3_bxwu51.jpg',
      name: 'painting_3',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108619/painting_3_bxwu51.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108621/painting_4_dfbb52.jpg',
      name: 'painting_4',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108621/painting_4_dfbb52.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108619/painting_5_qfedcp.jpg',
      name: 'painting_5',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108619/painting_5_qfedcp.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dfki5rwza/image/upload/v1566108624/painting_6_h7hvxa.jpg',
      name: 'painting_6',
      thumbnail: 'https://res.cloudinary.com/dfki5rwza/image/upload/h_400/v1566108624/painting_6_h7hvxa.jpg'
    }
  ] as FilesModel[]
};
