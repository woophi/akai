import * as React from 'react';
import { getAllBlogs, fetchFiles } from '../operations';
import { connect as redux } from 'react-redux';
import { AppState, BlogPreviewItem } from 'core/models';
import { getAdminAllBlogs } from 'core/selectors';
import { Block, LinkButton, BoxWrap } from 'ui/atoms';
import Box from '@material-ui/core/Box';

type OwnProps = {
  withChildren?: boolean;
};

type Props = {
  blogs: BlogPreviewItem[];
} & OwnProps & any;

const AdminBlogsComponent = React.memo<Props>(
  ({ blogs = [], children, withChildren = false }) => {
    React.useEffect(() => {
      getAllBlogs();
      fetchFiles();
    }, []);

    if (withChildren) {
      return children;
    }

    return (
      <>
        <Box flexDirection="column" flex={1}>
          <LinkButton
            href="/admin/create/blog"
            color="primary"
            variant="contained"
            label="Создать новый блог"
            style={{
              marginLeft: 16
            }}
          />
          <Box mt={2}>
            <BoxWrap>
              {blogs.map((b, i) => (
                <Block
                  key={i}
                  title={b.title}
                  imgSrc={b.coverPhoto}
                  subTitle={'изменить'}
                  href={`edit/${b.id}`}
                />
              ))}
            </BoxWrap>
          </Box>
        </Box>
      </>
    );
  }
);

export const AdminBlogs = redux((state: AppState, _: OwnProps) => ({
  blogs: getAdminAllBlogs(state)
}))(AdminBlogsComponent);
