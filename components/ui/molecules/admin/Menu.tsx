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
import { connect as redux } from 'react-redux';
import { AppState } from 'core/models';
import { hasRoleSuperAdmin } from 'core/selectors';
import * as constants from 'ui/atoms/constants';
import { getFacebookActiveStatus } from 'core/selectors/facebook';
import { theme } from 'core/lib';
import { checkFBOnePage } from './facebook/operations';

type Props = {
  isSuperAdmin: boolean;
  facebookActive: boolean;
};

let fetchedOnce = false;

const AdminMenuComponent = React.memo<Props>(({ isSuperAdmin, facebookActive }) => {
  const classes = useStyles({});

  React.useEffect(() => {
    if (!fetchedOnce) {
      checkFBOnePage();
      fetchedOnce = true;
    }
  }, [])

  return (
    <div>
      <div className={classes.toolbar} />
      <List>
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
        {/* <ListItem button onClick={toFiles}>
          <ListItemIcon>
            <Files />
          </ListItemIcon>
          <ListItemText primary={'файлы'} />
        </ListItem> */}
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
        {/* {TODO: add infinity loader} */}
        <ListItem button onClick={constants.toComments} disabled>
          <ListItemIcon>
            <Comment />
          </ListItemIcon>
          <ListItemText primary={'Комментарии'} />
        </ListItem>
        <ListItem button onClick={constants.toFacebook}>
          <ListItemIcon>
            <ThumbUp
              style={{
                color: facebookActive
                  ? theme.palette.primary[100]
                  : theme.palette.error.main
              }}
            />
          </ListItemIcon>
          <ListItemText primary={'Facebook'} />
        </ListItem>

        <ListItem button onClick={constants.toFollowers} disabled>
          <ListItemIcon>
            <Group />
          </ListItemIcon>
          <ListItemText primary={'Подписчики'} />
        </ListItem>

        {isSuperAdmin && (
          <ListItem button onClick={constants.toUsers} disabled>
            <ListItemIcon>
              <SupervisorAccount />
            </ListItemIcon>
            <ListItemText primary={'Пользователи'} />
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

export const AdminMenu = redux((state: AppState) => ({
  isSuperAdmin: hasRoleSuperAdmin(state),
  facebookActive: getFacebookActiveStatus(state)
}))(AdminMenuComponent);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      ...theme.mixins.toolbar,
      minHeight: '73px !important'
    }
  })
);
