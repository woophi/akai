import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { LocaleId, TermsConditionsData } from 'core/models';
import { FORM_ERROR } from 'final-form';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { useTranslation } from 'server/lib/i18n';
import { ButtonsForm, Snakbars } from 'ui/atoms';
import { TabPanel } from 'ui/atoms/TabPanel';
import { QuillText } from 'ui/molecules/quill-editor';
import { updateTermsAndConditions } from './operations';

type Props = {
  initialValues: TermsConditionsData;
};

const validate = (values: TermsConditionsData, t: (s: string) => string) => {
  const errors: TermsConditionsData = { tcText: {} } as TermsConditionsData;

  if (!values.tcText[LocaleId.Ru]) {
    errors.tcText[LocaleId.Ru] = t('common:forms.field.required');
  }
  if (!values.tcText[LocaleId.Cs]) {
    errors.tcText[LocaleId.Cs] = t('common:forms.field.required');
  }
  if (!values.tcText[LocaleId.En]) {
    errors.tcText[LocaleId.En] = t('common:forms.field.required');
  }

  return errors;
};

const onSubmit = async (data: TermsConditionsData) => {
  try {
    await updateTermsAndConditions(data);
  } catch (error) {
    return { [FORM_ERROR]: JSON.stringify(error) };
  }
};

export const TermsConditionsForm = React.memo<Props>(({ initialValues }) => {
  const { t } = useTranslation('common');
  const classes = useStyles();
  const [tabValue, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={v => validate(v, t)}
      initialValues={initialValues}
      render={({ handleSubmit, pristine, submitting, submitError, form }) => (
        <form
          onSubmit={async event => {
            const error = await handleSubmit(event);
            if (error) {
              return error;
            }

            form.setConfig('initialValues', form.getState().values);
          }}
          className={classes.form}
        >
          <Snakbars variant="error" message={submitError} />
          <Box padding="1rem">
            <Paper elevation={4}>
              <Tabs value={tabValue} onChange={handleChange} indicatorColor="secondary" centered>
                <Tab label="Редактор" />
                <Tab label="Предпросмотр" />
              </Tabs>
            </Paper>
          </Box>
          <Field
            name={`tcText.${LocaleId.Cs}`}
            render={({ input: { onChange, value, onBlur, onFocus } }) => (
              <Box margin="0 1rem 1rem">
                <TabPanel value={tabValue} index={0}>
                  <QuillText
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    ownId={'tc-cs'}
                    placeholder={'Описание на чешском'}
                  />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  <Paper>
                    <Box minWidth="50vw" padding="1rem" maxWidth="720px">
                      <Typography component="div" gutterBottom>
                        <div className="quill ">
                          <div className="ql-snow">
                            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: value }} />
                          </div>
                        </div>
                      </Typography>
                    </Box>
                  </Paper>
                </TabPanel>
              </Box>
            )}
          />
          <Field
            name={`tcText.${LocaleId.En}`}
            render={({ input: { onChange, value, onBlur, onFocus } }) => (
              <Box margin="0 1rem 1rem">
                <TabPanel value={tabValue} index={0}>
                  <QuillText
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    ownId={'tc-en'}
                    placeholder={'Описание на английском'}
                  />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  <Paper>
                    <Box minWidth="50vw" padding="1rem" maxWidth="720px">
                      <Typography component="div" gutterBottom>
                        <div className="quill ">
                          <div className="ql-snow">
                            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: value }} />
                          </div>
                        </div>
                      </Typography>
                    </Box>
                  </Paper>
                </TabPanel>
              </Box>
            )}
          />
          <Field
            name={`tcText.${LocaleId.Ru}`}
            render={({ input: { onChange, value, onBlur, onFocus } }) => (
              <Box margin="0 1rem 1rem">
                <TabPanel value={tabValue} index={0}>
                  <QuillText
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    ownId={'bio-ru'}
                    placeholder={'Описание на русском'}
                  />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  <Paper>
                    <Box minWidth="50vw" padding="1rem" maxWidth="720px">
                      <Typography component="div" gutterBottom>
                        <div className="quill ">
                          <div className="ql-snow">
                            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: value }} />
                          </div>
                        </div>
                      </Typography>
                    </Box>
                  </Paper>
                </TabPanel>
              </Box>
            )}
          />
          <ButtonsForm
            pristine={pristine}
            submitting={submitting}
            both
            onCancel={form.reset}
            submitLabel={'common:buttons.save'}
          />
        </form>
      )}
    />
  );
});

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: 320,
    maxWidth: '50vw',
    width: '100%',
    margin: '1rem auto',
  },
}));
