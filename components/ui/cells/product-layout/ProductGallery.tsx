import { Box, makeStyles } from '@material-ui/core';
import { FileItem } from 'core/models';
import React from 'react';
import SimpleReactLightbox, { Callbacks, SRLWrapper } from 'simple-react-lightbox';
import { ZoomImg } from 'ui/atoms';

const options = { buttons: { showDownloadButton: false } };

export const ProductGallery = React.memo<{ files: FileItem[] }>(({ files }) => {
  const [selectedImg, setSelected] = React.useState(files[0]);
  const classes = useStyles();
  const elements = React.useMemo(() => files.map(f => ({ src: f.url })), [files]);

  const cb = React.useMemo<Callbacks>(() => ({ onSlideChange: v => setSelected(files[v.index]) }), [files]);

  return (
    <SimpleReactLightbox>
      <Box width="60%" minWidth="300px" marginRight="1rem">
        <SRLWrapper elements={elements} options={options} callbacks={cb} />
        <ZoomImg
          img={selectedImg.url}
          selectedImgIndex={files.indexOf(selectedImg)}
          height="400px"
          width="100%"
          zoomScale={3}
          transitionTime={0.5}
        />
        <Box marginTop="1rem">
          {files.map(f => (
            <img key={f._id} src={f.url} alt={f.name} className={classes.imgs} onClick={() => setSelected(f)} />
          ))}
        </Box>
      </Box>
    </SimpleReactLightbox>
  );
});

const useStyles = makeStyles(theme => ({
  imgs: {
    width: '110px',
    height: '110px',
    opacity: 0.5,
    transition: '.2s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      opacity: 1,
    },
  },
}));
