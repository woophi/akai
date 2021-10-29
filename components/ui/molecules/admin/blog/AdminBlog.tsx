import Box from '@material-ui/core/Box';
import { useAppSelector } from 'core/reducers/rootReducer';
import { getAdminAllBlogs } from 'core/selectors';
import * as React from 'react';
import { Block, BoxWrap, LinkButton } from 'ui/atoms';
import { fetchFiles, getAllBlogs } from '../operations';

type Props = React.PropsWithChildren<{
  withChildren?: boolean;
}>;

export const AdminBlogs = React.memo<Props>(({ children, withChildren = false }) => {
  const blogs = useAppSelector(getAdminAllBlogs);
  React.useEffect(() => {
    getAllBlogs();
    fetchFiles();
  }, []);

  if (withChildren) {
    return <>{children}</>;
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
            marginLeft: 16,
          }}
        />
        <Box mt={2}>
          <BoxWrap>
            {blogs.map((b, i) => (
              <Block key={i} title={b.title} imgSrc={b.coverPhoto} subTitle={'изменить'} href={`edit/${b.id}`} />
            ))}
          </BoxWrap>
        </Box>
      </Box>
    </>
  );
});
