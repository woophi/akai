import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import Block from '@material-ui/icons/Block';
import ExitToApp from '@material-ui/icons/ExitToApp';
import InsertPhoto from '@material-ui/icons/InsertPhoto';
import PhotoAlbum from '@material-ui/icons/PhotoAlbum';
import PictureInPicture from '@material-ui/icons/PictureInPicture';
// import Files from '@material-ui/icons/PermMedia';
import Slideshow from '@material-ui/icons/Slideshow';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import VideoLibrary from '@material-ui/icons/VideoLibrary';
import Wallpaper from '@material-ui/icons/Wallpaper';
import { logout } from 'core/operations/auth';
import { useAppSelector } from 'core/reducers/rootReducer';
import { hasRoleSuperAdmin } from 'core/selectors';
import * as React from 'react';
import * as constants from 'ui/atoms/constants';
// import { checkFBOnePage } from './facebook/operations';

let fetchedOnce = false;

export const AdminMenu = React.memo(() => {
  const isSuperAdmin = useAppSelector(hasRoleSuperAdmin);
  const classes = useStyles({});

  React.useEffect(() => {
    if (!fetchedOnce) {
      // checkFBOnePage();
      fetchedOnce = true;
    }
  }, []);

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
        {/* <ListItem button onClick={constants.toComments} disabled>
          <ListItemIcon>
            <Comment />
          </ListItemIcon>
          <ListItemText primary={'Комментарии'} />
        </ListItem> */}
        {/* <ListItem button onClick={constants.toFacebook}>
          <ListItemIcon>
            <ThumbUp
              style={{
                color: theme.palette.error.main,
              }}
            />
          </ListItemIcon>
          <ListItemText primary={'Facebook'} />
        </ListItem> */}
        <ListItem button onClick={constants.toInstagram}>
          <ListItemIcon>
            <InsertPhoto />
          </ListItemIcon>
          <ListItemText primary={'Instagram'} />
        </ListItem>

        {/* <ListItem button onClick={constants.toFollowers} disabled>
          <ListItemIcon>
            <Group />
          </ListItemIcon>
          <ListItemText primary={'Подписчики'} />
        </ListItem> */}

        {isSuperAdmin && (
          <ListItem button onClick={constants.toUsers}>
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      ...theme.mixins.toolbar,
      minHeight: '73px !important',
    },
  })
);
