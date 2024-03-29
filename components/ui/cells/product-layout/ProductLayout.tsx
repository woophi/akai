import { Box, Link, makeStyles, Paper, Typography, useMediaQuery } from '@material-ui/core';
import BrushIcon from '@material-ui/icons/Brush';
import ClearIcon from '@material-ui/icons/Clear';
import { numberWithCommas } from 'core/lib';
import { ProductData, RecentlyAddedProductData } from 'core/models';
import React from 'react';
import { useTranslation } from 'server/lib/i18n';
import { BoxGrid } from 'ui/atoms';
import { AddOrRemoveProduct } from './AddOrRemoveProduct';
import { ProductDescription } from './ProductDescription';
import { ProductGallery } from './ProductGallery';
import { RecentlyAddedProduct } from './RecentlyAddedProduct';
import { RecentlyViewedProducts } from './RecentlyViewedProducts';

export const ProductLayout = React.memo<{ data: ProductData }>(({ data }) => {
  const classes = useStyles();
  const { t } = useTranslation('common');
  const isSmallEnough = useMediaQuery('(max-width:800px)');

  const typeOfParams = data.parameters.filter(f => !!f.typeOf);
  const restParams = data.parameters.filter(f => !f.typeOf);

  const pDat = React.useMemo<RecentlyAddedProductData>(
    () => ({
      file: data.files[0],
      id: data._id,
      categories: data.categories,
      href: data.href,
      price: data.price,
      stock: data.stock,
      title: data.title,
    }),
    [data]
  );

  return (
    <BoxGrid>
      <Box width="65%" minWidth="320px" marginBottom="1rem">
        <Paper className={classes.productBox} elevation={4}>
          <ProductGallery files={data.files} />

          <Box width="37%" minWidth="260px" style={{ wordBreak: 'break-word' }}>
            <Typography variant="h3" gutterBottom className={classes.capitalLetter}>
              {data.title}
            </Typography>
            <Typography variant="h4" className={classes.price} gutterBottom>
              ${numberWithCommas(data.price)}
            </Typography>
            <Typography variant="subtitle1" component="em">
              <span className={classes.capitalLetter}>{data.title}</span> {t('shop.byProduct')}
            </Typography>
            {typeOfParams.map((p, i) => (
              <Box key={i}>
                <b>{p.name}: </b>
                <span>{p.value}</span>
              </Box>
            ))}
            <Box display="flex" alignItems="center" fontSize="1rem" fontWeight={500} marginY=".5rem">
              {data.stock > 0 ? <BrushIcon color="primary" /> : <ClearIcon color="error" />}
              <Box component="span" marginLeft=".25rem">
                {t(data.stock > 0 ? 'shop.inStock' : 'shop.soldOut')}
              </Box>
            </Box>
            {data.stock > 0 && <AddOrRemoveProduct data={pDat} />}
            <Box marginY="1rem">
              <b>{t('shop.categories')} </b>
              {data.categories.map((c, i) => (
                <React.Fragment key={i}>
                  <Link href={`/category/${c}`}>
                    <a className={classes.link}>
                      {c}
                      {data.categories.indexOf(c) === data.categories.length - 1 ? '' : ','}
                    </a>
                  </Link>{' '}
                </React.Fragment>
              ))}
            </Box>
          </Box>
        </Paper>
        <ProductDescription description={data.description} params={restParams} />

        <Typography variant="h5" gutterBottom>
          {t('shop.related')}
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns={isSmallEnough ? '1fr' : '1fr 1fr 1fr'}
          gridTemplateRows={isSmallEnough ? '1fr 1fr 1fr' : undefined}
          style={{ gap: '1rem' }}
        >
          {data.relatedProducts.map(p => (
            <RecentlyAddedProduct key={p.id} data={p} />
          ))}
        </Box>
      </Box>
      <Box width="30%" minWidth="320px">
        <RecentlyAddedProduct data={data.recentlyAddedProduct} />
        <RecentlyViewedProducts data={data} />
      </Box>
    </BoxGrid>
  );
});

const useStyles = makeStyles(theme => ({
  productBox: {
    padding: '.5rem',
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '1rem',
  },
  price: {
    color: theme.palette.success.main,
  },
  capitalLetter: {
    textTransform: 'capitalize',
  },
  link: {
    color: theme.palette.text.primary,
  },
}));
