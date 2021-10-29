import Box from '@material-ui/core/Box';
import { useAppSelector } from 'core/reducers/rootReducer';
import { getAdminSlides } from 'core/selectors';
import * as React from 'react';
import { fetchFiles } from '../operations';
import { SliderForm } from './Form';
import { getAllSlides } from './operations';

export const AdminSlider = React.memo(() => {
  const slides = useAppSelector(getAdminSlides);
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
