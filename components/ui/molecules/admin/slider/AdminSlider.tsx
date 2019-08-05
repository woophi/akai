import * as React from 'react';
import { fetchFiles } from '../operations';
import { connect as redux } from 'react-redux';
import { AppState, SlideItem } from 'core/models';
import { getAdminSlides } from 'core/selectors';
import Box from '@material-ui/core/Box';
import { SliderForm } from './Form';
import { getAllSlides } from './operations';

type Props = {
  slides: SlideItem[];
};
const AdminSliderComponent = React.memo<Props>(({ slides = [] }) => {
  React.useEffect(() => {
    getAllSlides();
    fetchFiles();
  }, []);

  return (
    <>
      <Box flexDirection="column" flex={1}>
        <SliderForm initialValues={{ slides }} />
      </Box>
    </>
  );
});

export const AdminSlider = redux((state: AppState) => ({
  slides: getAdminSlides(state)
}))(AdminSliderComponent);
