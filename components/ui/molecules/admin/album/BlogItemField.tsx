import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { FieldInputProps } from 'react-final-form';
import { connect as redux } from 'react-redux';
import { AppState, BlogPreviewItem } from 'core/models';
import { getAdminAllBlogs } from 'core/selectors';

type OwnProps = {
  onRemoveField?: () => void;
  input?: FieldInputProps<any, HTMLButtonElement>;
};

type Props = {
  blogs: BlogPreviewItem[];
} & OwnProps;

const BlogItemFieldComponent = React.memo<Props>(
  ({ onRemoveField, input, blogs }) => {
    const inputValue = input && input.value;
    const blog = blogs.find(b => b.id == inputValue) || ({} as BlogPreviewItem);
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={blog.title} src={blog.coverPhoto} />
        </ListItemAvatar>
        <ListItemText
          primary={blog.title}
          primaryTypographyProps={{ noWrap: true }}
        />
        <ListItemIcon>
          <IconButton onClick={onRemoveField}>
            <DeleteIcon />
          </IconButton>
        </ListItemIcon>
      </ListItem>
    );
  }
);

export const BlogItemField = redux((state: AppState) => ({
  blogs: getAdminAllBlogs(state)
}))(BlogItemFieldComponent);
