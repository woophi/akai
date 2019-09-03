import * as React from 'react';
import Box from '@material-ui/core/Box';
import { getTopBlogs } from './operations';
import { BlogTopItem } from 'core/models';
import { Spinner, styleTruncate, H1 } from 'ui/atoms';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import Eye from '@material-ui/icons/RemoveRedEye';
import { goToSpecific } from 'core/common';

const linkToBlog = (id: string) => {
  goToSpecific(`/admin/blogs/edit/${id}`);
};

export const AdminDashboard = React.memo(() => {
  const [blogs, setBlogs] = React.useState<BlogTopItem[]>([]);
  const [fetching, setFetching] = React.useState(false);
  React.useEffect(() => {
    setFetching(true);
    getTopBlogs()
      .then(setBlogs)
      .finally(() => setFetching(false));
  }, []);

  return (
    <>
      <H1>{'Топ 5 самых популярных блогов'}</H1>
      <Box flexDirection="column" flex={1}>
        {blogs.map(b => (
          <ListItem key={b._id} onClick={() => linkToBlog(b._id)}>
            <ListItemAvatar>
              <Avatar alt={b.title} src={b.photos[0]} />
            </ListItemAvatar>
            {b.title && (
              <ListItemText
                primary={b.title}
                primaryTypographyProps={{ noWrap: true }}
                style={styleTruncate}
              />
            )}
            <ListItemIcon>
              <>
                <Eye />
                <Box margin="auto">{b.views}</Box>
              </>
            </ListItemIcon>
            <ListItemIcon>
              <IconButton onClick={() => linkToBlog(b._id)}>
                <EditIcon />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        ))}
        <Spinner isShow={fetching} />
      </Box>
    </>
  );
});
