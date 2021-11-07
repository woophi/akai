import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { goToDeep } from 'core/common';
import { ROLES, UserModel } from 'core/models/admin';
import * as React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { styleTruncate } from 'ui/atoms/constants';
import { InputSearch } from 'ui/atoms/InputSearch';
import { getUsers } from './operations';

type Props = {
  users: UserModel[];
};

const Row = (props: ListChildComponentProps) => {
  const { index, style, data } = props;
  const { users } = data as Props;

  const isSuperAdmin = users[index].roles.includes(ROLES.GODLIKE);

  return (
    <ListItem button style={style as React.CSSProperties} key={index} disabled={isSuperAdmin}>
      <ListItemText
        primaryTypographyProps={{ noWrap: true }}
        style={styleTruncate}
        onClick={() => goToDeep(`edit/${users[index]._id}`)}
        primary={users[index].name}
      />
    </ListItem>
  );
};

export const UsersList: React.FC = () => {
  const classes = useStyles({});
  const [query, search] = React.useState('');
  const [users, setList] = React.useState<UserModel[]>([]);

  React.useEffect(() => {
    getUsers().then(setList).catch(console.error);
  }, []);

  const getList = () =>
    users.filter(
      f =>
        f.email.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        f.name.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1
    );

  const itemData: Props = {
    users: getList(),
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
      minHeight: '320px',
    },
  })
);
