import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Spinner, Snakbars, InputSearch, styleTruncate } from 'ui/atoms';
import { BlogPreviewItem } from 'core/models';
import Box from '@material-ui/core/Box';
import { getAllBlogs } from '../operations';

type LocalState = {
  blogs: BlogPreviewItem[];
};

const Row = (props: ListChildComponentProps) => {
  const { index, style, data } = props;
  const { onClickCb, selectedBlogs, blogs } = data as Props & LocalState;
  const checked = selectedBlogs.indexOf(blogs[index].id) !== -1;
  const handleClick = () => {
    const data = checked
      ? selectedBlogs.filter(id => id != blogs[index].id)
      : [...selectedBlogs, blogs[index].id];
    onClickCb(data);
  };

  return (
    <ListItem button style={style} key={index} onClick={handleClick}>
      <ListItemAvatar>
        <Avatar alt={blogs[index].title} src={blogs[index].coverPhoto} />
      </ListItemAvatar>
      <ListItemText
        id={blogs[index].id}
        primary={blogs[index].title}
        primaryTypographyProps={{ noWrap: true }}
        style={styleTruncate}
        title={blogs[index].title}
      />
      <ListItemIcon>
        <Checkbox
          checked={checked}
          tabIndex={-1}
          color="primary"
          inputProps={{ 'aria-labelledby': blogs[index].id }}
          style={{ marginLeft: '.5rem' }}
        />
      </ListItemIcon>
    </ListItem>
  );
};

type Props = {
  selectedBlogs: string[];
  onClickCb: (blogIds: string[]) => void;
};

export const BlogsList: React.FC<Props> = ({ onClickCb, selectedBlogs }) => {
  const [fetching, fetch] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [blogs, setBlogs] = React.useState<BlogPreviewItem[]>([]);
  const [query, search] = React.useState('');
  React.useEffect(() => {
    getAllBlogs()
      .then(bs => {
        fetch(false);
        setBlogs(bs);
      })
      .catch(e => {
        fetch(false);
        setError(e);
      });
  }, []);

  const getList = () =>
    blogs.filter(b => b.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  return (
    <Box flex={1} minHeight={250} maxHeight={500} display="flex" flexDirection="column">
      <Snakbars message={error} variant="error" />
      <InputSearch onChangeCb={search} value={query} />
      <Box marginTop={1} />
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            itemData={{
              blogs: getList(),
              onClickCb,
              selectedBlogs
            }}
            height={height - 74}
            width={width}
            itemSize={46}
            itemCount={getList().length}
            style={{
              overflowX: 'hidden'
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
