import { Button } from '@material-ui/core';
import { RecentlyAddedProductData } from 'core/models';
import { useAppSelector } from 'core/reducers/rootReducer';
import { shopActions } from 'core/reducers/shop';
import { hasBasketItem } from 'core/selectors';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'server/lib/i18n';

export const AddOrRemoveProduct = React.memo<{ data: RecentlyAddedProductData; small?: boolean }>(({ data, small }) => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const hasItem = useAppSelector(s => hasBasketItem(s, data.id));

  const toggleBasket = React.useCallback(() => {
    if (hasItem) {
      dispatch(shopActions.removeProduct(data.id));
    } else {
      dispatch(
        shopActions.addProduct({
          file: data.file,
          id: data.id,
          name: data.title,
          price: data.price,
          href: data.href,
        })
      );
    }
  }, [data.id, data.href, data.title, data.file, data.price, hasItem]);

  const label = hasItem ? t('shop.removeFromCart') : `${t('shop.addToCart')} +`;
  return (
    <Button
      size={small ? 'small' : undefined}
      variant="contained"
      color="primary"
      onClick={toggleBasket}
      disabled={data.stock <= 0}
    >
      {label}
    </Button>
  );
});
