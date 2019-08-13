import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { AlbumModel } from 'core/models';
import { styleTruncate } from 'ui/atoms';

type Props = {
  album: AlbumModel
};

export const AlbumField = React.memo<Props>(
  ({ album }) => {
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={album.title} src={album.coverPhoto} />
        </ListItemAvatar>
        <ListItemText
          primary={album.title}
          primaryTypographyProps={{ noWrap: true }}
          style={styleTruncate}
          title={album.title}
        />
      </ListItem>
    );
  }
);
