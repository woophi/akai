import { Box, Card, CardActionArea, makeStyles, Typography } from '@material-ui/core';
import { goToSpecific } from 'core/common';
import { numberWithCommas, theme } from 'core/lib';
import { LS } from 'core/LS';
import { ProductData, RelatedProductData } from 'core/models';
import React from 'react';
import { useTranslation } from 'server/lib/i18n';

export const RecentlyViewedProducts = React.memo<{ data?: ProductData }>(({ data }) => {
  const classes = useStyles();
  const { t } = useTranslation('common');
  const [viewedItems, setItems] = React.useState<RelatedProductData[]>([]);

  React.useEffect(() => {
    const savedItems = LS.getItem(LS.keys.RecentlyViewed, []);

    setItems(savedItems);

    if (!data) return;

    const newViewItem: RelatedProductData = {
      categories: data.categories,
      file: data.files[0],
      href: data.href,
      id: data._id,
      price: data.price,
      stock: data.stock,
      title: data.title,
    };

    let newItems: RelatedProductData[] = [];

    if (savedItems.some(si => si.id === data._id)) return;

    if (savedItems.length >= 3) {
      newItems = [newViewItem, savedItems[0], savedItems[1]];
    } else {
      newItems = [newViewItem, ...savedItems];
    }

    LS.setItem(LS.keys.RecentlyViewed, newItems);
    setItems(newItems);
  }, [data]);

  const handleClick = React.useCallback((href: string) => {
    goToSpecific(`/product/${href}`);
  }, []);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {t('shop.viewed')}
      </Typography>
      {viewedItems.map(vi => (
        <Card key={vi.id} className={classes.card}>
          <CardActionArea className={classes.cardAction} onClick={() => handleClick(vi.href)}>
            <Box width="101px" minWidth="101px" height="101px">
              <img src={vi.file.url} className={classes.img} />
            </Box>
            <Box paddingY=".25rem" paddingX="1rem" width="250px">
              <Typography component="h5" variant="h5" noWrap>
                {vi.title}
              </Typography>
              <Typography variant="subtitle1">${numberWithCommas(vi.price)}</Typography>
              {vi.stock <= 0 && (
                <Box component="span" color={theme.palette.error.main}>
                  {t('shop.soldOut')}
                </Box>
              )}
            </Box>
          </CardActionArea>
        </Card>
      ))}
    </>
  );
});

const useStyles = makeStyles(theme => ({
  cardAction: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  card: {
    marginBottom: '.25rem',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));
