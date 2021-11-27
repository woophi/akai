import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import Block from '@material-ui/icons/Block';
import ExitToApp from '@material-ui/icons/ExitToApp';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import InsertPhoto from '@material-ui/icons/InsertPhoto';
import PhotoAlbum from '@material-ui/icons/PhotoAlbum';
import PictureInPicture from '@material-ui/icons/PictureInPicture';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Slideshow from '@material-ui/icons/Slideshow';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import VideoLibrary from '@material-ui/icons/VideoLibrary';
import Wallpaper from '@material-ui/icons/Wallpaper';
import { logout } from 'core/operations/auth';
import { useAppSelector } from 'core/reducers/rootReducer';
import { hasRoleSuperAdmin } from 'core/selectors';
import * as React from 'react';
import * as constants from 'ui/atoms/constants';

export const AdminMenu = React.memo(() => {
  const isSuperAdmin = useAppSelector(hasRoleSuperAdmin);
  const classes = useStyles({});

  return (
    <div>
      <div className={classes.toolbar} />
      <List>
        <ListItem button onClick={constants.toShop}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary={'Магазин'} />
        </ListItem>
        <ListItem button onClick={constants.toAlbums}>
          <ListItemIcon>
            <PhotoAlbum />
          </ListItemIcon>
          <ListItemText primary={'Альбомы'} />
        </ListItem>
        <ListItem button onClick={constants.toBlogs}>
          <ListItemIcon>
            <Wallpaper />
          </ListItemIcon>
          <ListItemText primary={'Блоги'} />
        </ListItem>
        <ListItem button onClick={constants.toSlider}>
          <ListItemIcon>
            <Slideshow />
          </ListItemIcon>
          <ListItemText primary={'Главный слайдер'} />
        </ListItem>
        <ListItem button onClick={constants.toBio}>
          <ListItemIcon>
            <AssignmentInd />
          </ListItemIcon>
          <ListItemText primary={'Биография'} />
        </ListItem>
        <ListItem button onClick={constants.toPhotos}>
          <ListItemIcon>
            <PictureInPicture />
          </ListItemIcon>
          <ListItemText primary={'Фотографии'} />
        </ListItem>
        <ListItem button onClick={constants.toYoutube}>
          <ListItemIcon>
            <VideoLibrary />
          </ListItemIcon>
          <ListItemText primary={'Youtube'} />
        </ListItem>
        <ListItem button onClick={constants.toInstagram}>
          <ListItemIcon>
            <InsertPhoto />
          </ListItemIcon>
          <ListItemText primary={'Instagram'} />
        </ListItem>

        {isSuperAdmin && (
          <ListItem button onClick={constants.toUsers}>
            <ListItemIcon>
              <SupervisorAccount />
            </ListItemIcon>
            <ListItemText primary={'Пользователи'} />
          </ListItem>
        )}

        <ListItem button onClick={constants.toTT}>
          <ListItemIcon>
            <ImportantDevicesIcon />
          </ListItemIcon>
          <ListItemText primary={'Terms and conditions'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={constants.toBans} disabled>
          <ListItemIcon>
            <Block />
          </ListItemIcon>
          <ListItemText primary={'Черный список'} />
        </ListItem>
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary={'Выйти'} />
        </ListItem>
      </List>
    </div>
  );
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      ...theme.mixins.toolbar,
      minHeight: '73px !important',
    },
  })
);
