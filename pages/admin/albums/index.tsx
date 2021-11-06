import * as React from 'react';
import { ensureNotAuthorized } from 'core/operations/auth';
import { AdminLayout, Block, BoxWrap, LinkButton } from 'ui/index';
import { AlbumModel, LocaleId } from 'core/models';
import { getAllAlbums } from 'core/operations';
import Box from '@material-ui/core/Box';

type LocalState = {
  albums: AlbumModel[];
};

class Albums extends React.PureComponent<unknown, LocalState> {
  state: LocalState = {
    albums: [],
  };
  async componentDidMount() {
    try {
      await ensureNotAuthorized();
      const albums = await getAllAlbums(LocaleId.Ru);
      this.setState({ albums });
    } catch (e) {
      console.error('Error in Admin Albums fetch', e);
    }
  }

  render() {
    return (
      <AdminLayout>
        <Box flexDirection="column" flex={1}>
          <LinkButton
            href="/admin/create/album"
            color="primary"
            variant="contained"
            label="Создать новый альбом"
            style={{
              marginLeft: 16,
            }}
          />
          <Box mt={2}>
            <BoxWrap>
              {this.state.albums.map((a, i) => (
                <Block key={i} title={a.title} imgSrc={a.coverPhoto} subTitle={'изменить'} href={`edit/${a.id}`} />
              ))}
            </BoxWrap>
          </Box>
        </Box>
      </AdminLayout>
    );
  }
}

export default Albums;
