import * as React from 'react';
import Divider from '@material-ui/core/Divider';
import PhotoAlbum from '@material-ui/icons/PhotoAlbum';
import ExitToApp from '@material-ui/icons/ExitToApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { logout } from 'core/operations/auth';

export const AdminMenu: React.FC = () => {
  const classes = useStyles({});

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button selected>
          <ListItemIcon><PhotoAlbum /></ListItemIcon>
          <ListItemText primary={'aльбомы'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={logout}>
          <ListItemIcon><ExitToApp /></ListItemIcon>
          <ListItemText primary={'Выйти'} />
        </ListItem>
      </List>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
  }),
);
