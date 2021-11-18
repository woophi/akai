import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import BrushIcon from '@material-ui/icons/Brush';
import ClearIcon from '@material-ui/icons/Clear';
import { numberWithCommas } from 'core/lib';
import { ProductData } from 'core/models';
import React from 'react';
import { useTranslation } from 'server/lib/i18n';
import { BoxGrid } from 'ui/atoms';
import { ProductDescription } from './ProductDescription';
import { ProductGallery } from './ProductGallery';
import { RecentlyAddedProduct } from './RecentlyAddedProduct';

export const ProductLayout = React.memo<{ data: ProductData }>(({ data }) => {
  const classes = useStyles();
  const { t } = useTranslation('common');

  const typeOfParams = data.parameters.filter(f => !!f.typeOf);
  const restParams = data.parameters.filter(f => !f.typeOf);

  return (
    <BoxGrid>
      <Box width="65%" minWidth="320px" marginBottom="1rem">
        <Paper className={classes.productBox} elevation={4}>
          <ProductGallery files={data.files} />

          <Box width="35%" minWidth="260px">
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
            {data.stock > 0 && (
              <Button variant="contained" color="primary">
                {t('shop.addToCart')}
              </Button>
            )}
            <Box marginY="1rem">
              <b>{t('shop.categories')} </b>
              <span>{data.categories.join(', ')}</span>
            </Box>
          </Box>
        </Paper>
        <ProductDescription description={data.description} params={restParams} />
      </Box>
      <Box width="30%" minWidth="320px">
        <RecentlyAddedProduct data={data.recentlyAddedProduct} />
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
}));
