import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { BlogPreviewItem } from 'core/models';
import { useAppSelector } from 'core/reducers/rootReducer';
import { getAdminAllBlogs } from 'core/selectors';
import * as React from 'react';
import { FieldInputProps } from 'react-final-form';

type Props = {
  onRemoveField?: () => void;
  input?: FieldInputProps<any, HTMLButtonElement>;
};

export const BlogItemField = React.memo<Props>(({ onRemoveField, input }) => {
  const blogs = useAppSelector(getAdminAllBlogs);
  const inputValue = input && input.value;
  const blog = blogs.find(b => b.id == inputValue) || ({} as BlogPreviewItem);
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt={blog.title} src={blog.coverPhoto} />
      </ListItemAvatar>
      <ListItemText primary={blog.title} primaryTypographyProps={{ noWrap: true }} />
      <ListItemIcon>
        <IconButton onClick={onRemoveField}>
          <DeleteIcon />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
});
