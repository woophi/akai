import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { styleTruncate } from 'ui/atoms';
import { DragHandler } from 'ui/molecules';

type Props = {
  onRemoveField?: () => void;
  videoId?: string;
  text?: string;
  withDrag?: boolean;
};

export const YoutubeField = React.memo<Props>(
  ({ onRemoveField, videoId, text = '', withDrag = false }) => {
    return (
      <ListItem>
        <DragHandler />
        <ListItemAvatar>
          <Avatar
            src={`https://img.youtube.com/vi/${videoId}/default.jpg`}
            alt={text}
          />
        </ListItemAvatar>
        {text && (
          <ListItemText
            primary={text}
            primaryTypographyProps={{ noWrap: true }}
            style={styleTruncate}
            title={text}
          />
        )}
        {onRemoveField && (
          <ListItemIcon>
            <IconButton onClick={onRemoveField}>
              <DeleteIcon />
            </IconButton>
          </ListItemIcon>
        )}
      </ListItem>
    );
  }
);
