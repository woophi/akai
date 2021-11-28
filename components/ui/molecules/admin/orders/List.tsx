import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { goToDeep } from 'core/common';
import { numberWithCommas } from 'core/lib';
import { ShopOrderItem } from 'core/models/admin';
import * as React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { styleTruncate } from 'ui/atoms/constants';
import { InputSearch } from 'ui/atoms/InputSearch';
import { getOrders } from './operations';

type Props = {
  orders: ShopOrderItem[];
};

const Row = (props: ListChildComponentProps) => {
  const { index, style, data } = props;
  const { orders } = data as Props;

  const order = orders[index];
  return (
    <ListItem button style={style as React.CSSProperties} key={index}>
      <ListItemText
        primaryTypographyProps={{ noWrap: true }}
        style={styleTruncate}
        onClick={() => goToDeep(`${order.orderId}`)}
        primary={`(${order.orderId}) ${order.name} - ${order.email} - ${order.orderState}`}
        secondary={`$${numberWithCommas(order.total)}`}
      />
    </ListItem>
  );
};

export const OrdersList: React.FC = () => {
  const classes = useStyles({});
  const [query, search] = React.useState('');
  const [orders, setList] = React.useState<ShopOrderItem[]>([]);

  React.useEffect(() => {
    getOrders().then(setList).catch(console.error);
  }, []);

  const getList = () =>
    orders.filter(
      f =>
        f.email.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        f.name.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1
    );

  const itemData: Props = {
    orders: getList(),
  };

  return (
    <div className={classes.root}>
      <InputSearch onChangeCb={search} value={query} />
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            itemData={itemData}
            height={height}
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
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: '.5rem',
      margin: '1rem',
      height: '100%',
      minHeight: '75vh',
    },
  })
);
