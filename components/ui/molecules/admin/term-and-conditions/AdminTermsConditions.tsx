import { Box } from '@material-ui/core';
import { TermsConditionsData } from 'core/models';
import * as React from 'react';
import { TermsConditionsForm } from './Form';
import { getTermsAndConditions } from './operations';

export const AdminTermsConditions = React.memo(() => {
  const [tc, setTc] = React.useState<TermsConditionsData>({ tcText: {}, id: null } as TermsConditionsData);

  React.useEffect(() => {
    getTermsAndConditions().then(setTc).catch(console.error);
  }, []);

  return (
    <Box flexDirection="column" flex={1}>
      <TermsConditionsForm initialValues={tc} />
    </Box>
  );
});
