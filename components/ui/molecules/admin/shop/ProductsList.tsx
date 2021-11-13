import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { LocaleId, ShopItemInfo } from 'core/models';
import * as React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { InputSearch, Snakbars, Spinner, styleTruncate } from 'ui/atoms';
import { getShopProducts } from './operations';

type LocalState = {
  products: ShopItemInfo[];
};

const Row = (props: ListChildComponentProps) => {
  const { index, style, data } = props;
  const { onClickCb, selectedProducts, products } = data as Props & LocalState;
  const product = products[index];
  const checked = selectedProducts.indexOf(product._id) !== -1;
  const handleClick = () => {
    const data = checked ? selectedProducts.filter(id => id != product._id) : [...selectedProducts, product._id];
    onClickCb(data);
  };

  return (
    <ListItem button style={style as React.CSSProperties} key={index} onClick={handleClick}>
      <ListItemAvatar>
        <Avatar alt={product.title[LocaleId.Ru]} src={product.files[0]?.url} />
      </ListItemAvatar>
      <ListItemText
        id={product._id}
        primary={product.title[LocaleId.Ru]}
        primaryTypographyProps={{ noWrap: true }}
        style={styleTruncate}
        title={product.title[LocaleId.Ru]}
      />
      <ListItemIcon>
        <Checkbox
          checked={checked}
          tabIndex={-1}
          color="primary"
          inputProps={{ 'aria-labelledby': product._id }}
          style={{ marginLeft: '.5rem' }}
        />
      </ListItemIcon>
    </ListItem>
  );
};

type Props = {
  selectedProducts: string[];
  onClickCb: (ids: string[]) => void;
};

export const ProductsList: React.FC<Props> = ({ onClickCb, selectedProducts }) => {
  const [fetching, fetch] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [products, setProducts] = React.useState<ShopItemInfo[]>([]);
  const [query, search] = React.useState('');
  React.useEffect(() => {
    getShopProducts()
      .then(bs => {
        fetch(false);
        setProducts(bs);
      })
      .catch(e => {
        fetch(false);
        setError(e);
      });
  }, []);

  const getList = () => products.filter(b => b.title[LocaleId.Ru].toLowerCase().indexOf(query.toLowerCase()) !== -1);
  return (
    <Box flex={1} minHeight={250} maxHeight={500} display="flex" flexDirection="column">
      <Snakbars message={error} variant="error" />
      <InputSearch onChangeCb={search} value={query} />
      <Box marginTop={1} />
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            itemData={{
              products: getList(),
              onClickCb,
              selectedProducts,
            }}
            height={height - 74}
            width={width}
            itemSize={46}
            itemCount={getList().length}
            style={{
              overflowX: 'hidden',
            }}
          >
            {Row}
          </FixedSizeList>
        )}
      </AutoSizer>
      <Spinner isShow={fetching} />
    </Box>
  );
};
