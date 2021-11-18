import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useLightbox } from 'simple-react-lightbox';

type Props = {
  zoomScale: number;
  height: string;
  width: string;
  transitionTime?: number;
  img: string;
  selectedImgIndex: number;
};

type State = {
  zoom: boolean;
  mouseX: number | null;
  mouseY: number | null;
};

export const ZoomImg = React.memo<Props>(props => {
  const { zoomScale, selectedImgIndex } = props;
  const [{ zoom, mouseX, mouseY }, setZoom] = React.useState<State>({
    zoom: false,
    mouseX: null,
    mouseY: null,
  });
  const imgRef = React.useRef<HTMLDivElement | null>(null);
  const { openLightbox } = useLightbox();

  const classes = useStyles(props);

  const handleMouseOver = React.useCallback(() => {
    setZoom(z => ({
      ...z,
      zoom: true,
    }));
  }, []);
  const handleMouseOut = React.useCallback(() => {
    setZoom(z => ({
      ...z,
      zoom: false,
    }));
  }, []);

  const handleMouseMovement = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!imgRef.current) return;
      const { left: offsetLeft, top: offsetTop } = imgRef.current.getBoundingClientRect();

      const x = ((e.pageX - offsetLeft) / imgRef.current.clientWidth) * 100;
      const y = ((e.pageY - offsetTop) / imgRef.current.clientHeight) * 100;

      setZoom(z => ({
        ...z,
        mouseX: x,
        mouseY: y,
      }));
    },
    [imgRef]
  );

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onMouseMove={handleMouseMovement}
      ref={imgRef}
      className={classes.outerDivStyle}
      onClick={() => openLightbox(selectedImgIndex)}
    >
      <div
        className={classes.innerDivStyle}
        style={{ transformOrigin: `${mouseX}% ${mouseY}%`, transform: zoom ? `scale(${zoomScale})` : 'scale(1.0)' }}
      />
    </div>
  );
});

const useStyles = makeStyles(theme => ({
  outerDivStyle: (p: Props) => ({
    height: `${p.height}`,
    width: `${p.width}`,
    overflow: 'hidden',
  }),
  innerDivStyle: (p: Props) => ({
    height: `${p.height}`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'auto 100%',
    transition: `transform ${p.transitionTime ?? 0.1}s ease-out`,
    backgroundImage: `url('${p.img}')`,
    willChange: 'transform',
    cursor: 'pointer',
  }),
}));
