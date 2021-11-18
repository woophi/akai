import { Box, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import { ProductParameter } from 'core/models';
import React from 'react';
import { useTranslation } from 'server/lib/i18n';
import { TabPanel } from 'ui/atoms/TabPanel';

type Props = {
  description: string;
  params: ProductParameter[];
};

export const ProductDescription = React.memo<Props>(({ description, params }) => {
  const { t } = useTranslation('common');

  const [tabValue, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Paper elevation={4} style={{ marginBottom: '1rem' }}>
      <Tabs value={tabValue} onChange={handleChange} indicatorColor="primary">
        <Tab label={t('shop.desc')} wrapped />
        <Tab label={t('shop.addInfo')} wrapped />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <Box minWidth="50vw" padding="1rem" maxWidth="720px">
          <Typography component="div" gutterBottom>
            <div className="quill ">
              <div className="ql-snow">
                <div className="ql-editor" dangerouslySetInnerHTML={{ __html: description }} />
              </div>
            </div>
          </Typography>
        </Box>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        {params.map((p, i) => (
          <Box key={i}>
            <b>{p.name}: </b>
            <span>{p.value}</span>
          </Box>
        ))}
      </TabPanel>
    </Paper>
  );
});
