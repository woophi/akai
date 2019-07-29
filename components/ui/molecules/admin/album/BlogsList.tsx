import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Spinner, Snakbars } from 'ui/atoms';
import { getAllBlogs } from './operations';
import { BlogPreviewItem } from 'core/models';

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
      <ListItemIcon>
        <Checkbox
          checked={checked}
          tabIndex={-1}
          color="primary"
          inputProps={{ 'aria-labelledby': blogs[index].id }}
        />
      </ListItemIcon>
      <ListItemText
        id={blogs[index].id}
        primary={blogs[index].title}
        primaryTypographyProps={{ noWrap: true }}
      />
      <ListItemAvatar>
        <Avatar alt={blogs[index].title} src={blogs[index].coverPhoto} />
      </ListItemAvatar>
    </ListItem>
  );
};

type Props = {
  selectedBlogs: string[];
  onClickCb: (blogIds: string[]) => void;
};

export const BlogsList: React.FC<Props> = ({ onClickCb, selectedBlogs }) => {
  const classes = useStyles({});
  const [fetching, fetch] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [blogs, setBlogs] = React.useState<BlogPreviewItem[]>([]);
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

  return (
    <div className={classes.root}>
      <Snakbars message={error} variant="error" />
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            itemData={{
              blogs,
              onClickCb,
              selectedBlogs
            }}
            height={height}
            width={width}
            itemSize={46}
            itemCount={blogs.length}
            style={{
              overflowX: 'hidden'
            }}
          >
            {Row}
          </FixedSizeList>
        )}
      </AutoSizer>
      <Spinner isShow={fetching} />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      minWidth: 300
    }
  })
);
