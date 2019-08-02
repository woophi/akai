import * as React from 'react';
import { ensureNotAuthorized } from 'core/operations/auth';
import { AdminLayout, Block, BoxWrap, LinkButton } from 'ui/index';
import { AlbumModel } from 'core/models';
import { getAllAlbums } from 'core/operations';
import Box from '@material-ui/core/Box';
import io from 'socket.io-client';

type LocalState = {
  albums: AlbumModel[];
};

class Admin extends React.PureComponent<unknown, LocalState> {
  state: LocalState = {
    albums: []
  };
  async componentDidMount() {
    try {
      const socket = io('/my-namespace');
      await ensureNotAuthorized();
      const albums = await getAllAlbums('ru');
      this.setState({ albums });
    } catch (e) {
      console.error('Error in Admin Gallery fetch', e);
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
              marginLeft: 16
            }}
          />
          <Box mt={2}>
            <BoxWrap>
              {this.state.albums.map((a, i) => (
                <Block
                  key={i}
                  title={a.title}
                  imgSrc={a.coverPhoto}
                  subTitle={'изменить'}
                  href={`album/${a.id}`}
                />
              ))}
            </BoxWrap>
          </Box>
        </Box>
      </AdminLayout>
    );
  }
}

export default Admin;
