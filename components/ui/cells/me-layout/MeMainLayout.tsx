import { Box, Paper, Tabs, Tab } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'server/lib/i18n';
import { TabPanel } from 'ui/atoms/TabPanel';
import { Profile } from './Profile';

export const MeMainLayout = React.memo(() => {
  const { t } = useTranslation('common');
  const [tabValue, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box padding="1rem">
      <Paper>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="on"
        >
          <Tab label={t('acc.profile')} />
        </Tabs>
      </Paper>
      <Box paddingTop="1rem" paddingX=".25rem">
        <TabPanel value={tabValue} index={0}>
          <Profile />
        </TabPanel>
      </Box>
    </Box>
  );
});
