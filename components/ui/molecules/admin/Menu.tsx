import * as React from 'react';
import Divider from '@material-ui/core/Divider';
import PhotoAlbum from '@material-ui/icons/PhotoAlbum';
import Wallpaper from '@material-ui/icons/Wallpaper';
// import Files from '@material-ui/icons/PermMedia';
import Slideshow from '@material-ui/icons/Slideshow';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import PictureInPicture from '@material-ui/icons/PictureInPicture';
import Block from '@material-ui/icons/Block';
import VideoLibrary from '@material-ui/icons/VideoLibrary';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Comment from '@material-ui/icons/Comment';
import Group from '@material-ui/icons/Group';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import ExitToApp from '@material-ui/icons/ExitToApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { logout } from 'core/operations/auth';
import { goToSpecific } from 'core/common';
import { connect as redux } from 'react-redux';
import { AppState } from 'core/models';
import { hasRoleSuperAdmin } from 'core/selectors';

const toAlbums = () => goToSpecific('/admin');
const toBlogs = () => goToSpecific('/admin/blogs');
// const toFiles = () => goToSpecific('/admin/files');
const toSlider = () => goToSpecific('/admin/slider');
const toBio = () => goToSpecific('/admin/bio');
const toPhotos = () => goToSpecific('/admin/photos');
const toBans = () => goToSpecific('/admin/bans');
const toYoutube = () => goToSpecific('/admin/youtube');
const toComments = () => goToSpecific('/admin/comments');
const toFacebook = () => goToSpecific('/admin/facebook');
const toFollowers = () => goToSpecific('/admin/followers');
const toUsers = () => goToSpecific('/admin/users');

type Props = {
  isSuperAdmin: boolean;
};

const AdminMenuComponent = React.memo<Props>(({ isSuperAdmin }) => {
  const classes = useStyles({});

  return (
    <div>
      <div className={classes.toolbar} />
      <List>
        <ListItem button onClick={toAlbums}>
          <ListItemIcon>
            <PhotoAlbum />
          </ListItemIcon>
          <ListItemText primary={'aльбомы'} />
        </ListItem>
        <ListItem button onClick={toBlogs}>
          <ListItemIcon>
            <Wallpaper />
          </ListItemIcon>
          <ListItemText primary={'блоги'} />
        </ListItem>
        {/* <ListItem button onClick={toFiles}>
          <ListItemIcon>
            <Files />
          </ListItemIcon>
          <ListItemText primary={'файлы'} />
        </ListItem> */}
        <ListItem button onClick={toSlider}>
          <ListItemIcon>
            <Slideshow />
          </ListItemIcon>
          <ListItemText primary={'главный слайдер'} />
        </ListItem>
        <ListItem button onClick={toBio}>
          <ListItemIcon>
            <AssignmentInd />
          </ListItemIcon>
          <ListItemText primary={'биография'} />
        </ListItem>
        <ListItem button onClick={toPhotos}>
          <ListItemIcon>
            <PictureInPicture />
          </ListItemIcon>
          <ListItemText primary={'фотографии'} />
        </ListItem>
        <ListItem button onClick={toYoutube}>
          <ListItemIcon>
            <VideoLibrary />
          </ListItemIcon>
          <ListItemText primary={'youtube'} />
        </ListItem>
        <ListItem button onClick={toComments}>
          <ListItemIcon>
            <Comment />
          </ListItemIcon>
          <ListItemText primary={'комментарии'} />
        </ListItem>
        <ListItem button onClick={toFacebook}>
          <ListItemIcon>
            <ThumbUp />
          </ListItemIcon>
          <ListItemText primary={'facebook'} />
        </ListItem>

        <ListItem button onClick={toFollowers}>
          <ListItemIcon>
            <Group />
          </ListItemIcon>
          <ListItemText primary={'подписчики'} />
        </ListItem>

        {isSuperAdmin && (
          <ListItem button onClick={toUsers}>
            <ListItemIcon>
              <SupervisorAccount />
            </ListItemIcon>
            <ListItemText primary={'пользователи'} />
          </ListItem>
        )}
        {/* <ListItem button onClick={toSketchBooks}>
          <ListItemIcon><ThumbUp /></ListItemIcon>
          <ListItemText primary={'sketch books'} />
        </ListItem> */}

        {/* <ListItem button onClick={toLikes}>
          <ListItemIcon><ThumbUp /></ListItemIcon>
          <ListItemText primary={'Понравилось'} />
        </ListItem> */}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={toBans}>
          <ListItemIcon>
            <Block />
          </ListItemIcon>
          <ListItemText primary={'черный список'} />
        </ListItem>
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary={'выйти'} />
        </ListItem>
      </List>
    </div>
  );
});

export const AdminMenu = redux((state: AppState) => ({
  isSuperAdmin: hasRoleSuperAdmin(state)
}))(AdminMenuComponent);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      ...theme.mixins.toolbar,
      minHeight: '73px !important'
    }
  })
);
