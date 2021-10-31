import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { safeTrim } from 'core/lib';
import { BioData } from 'core/models';
import { FORM_ERROR } from 'final-form';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { ButtonsForm, Snakbars } from 'ui/atoms';
import { TabPanel } from 'ui/atoms/TabPanel';
import { QuillText } from 'ui/molecules/quill-editor';
import { ModalUpload } from '../uploader';
import { updateBio } from './operations';

type Props = {
  initialValues: BioData;
};

type BioForm = BioData;

const validate = (values: BioForm) => {
  const errors: Partial<BioForm> = {};

  if (!safeTrim(values.bioCs)) {
    errors.bioCs = 'Обязательно к заполнению';
  }
  if (!safeTrim(values.bioEn)) {
    errors.bioEn = 'Обязательно к заполнению';
  }
  if (!safeTrim(values.bioRu)) {
    errors.bioRu = 'Обязательно к заполнению';
  }
  if (!values.photoId) {
    errors.photoId = 'Обязательно к заполнению';
  }

  return errors;
};

const onSubmit = async (data: BioForm) => {
  try {
    await updateBio(data);
  } catch (error) {
    return { [FORM_ERROR]: error.error };
  }
};

export const BioForm = React.memo<Props>(({ initialValues }) => {
  const classes = useStyles({});
  const [tabValue, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
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
          <Snakbars variant="error" message={submitError} className={classes.field} />
          <Box padding="1rem">
            <Paper>
              <Tabs value={tabValue} onChange={handleChange} indicatorColor="secondary" centered>
                <Tab label="Редактор" />
                <Tab label="Предпросмотр" />
              </Tabs>
            </Paper>
          </Box>
          <Field
            name="bioCs"
            render={({ input: { onChange, value, onBlur, onFocus } }) => (
              <Box className={classes.field}>
                <TabPanel value={tabValue} index={0}>
                  <QuillText
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    ownId={'bio-cs'}
                    placeholder={'Описание биографии на чешском'}
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
            name="bioEn"
            render={({ input: { onChange, value, onBlur, onFocus } }) => (
              <Box className={classes.field}>
                <TabPanel value={tabValue} index={0}>
                  <QuillText
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    ownId={'bio-en'}
                    placeholder={'Описание биографии на английском'}
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
            name="bioRu"
            render={({ input: { onChange, value, onBlur, onFocus } }) => (
              <Box className={classes.field}>
                <TabPanel value={tabValue} index={0}>
                  <QuillText
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    ownId={'bio-ru'}
                    placeholder={'Описание биографии на русском'}
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
            name="photoId"
            render={({ input, meta }) => (
              <ModalUpload
                error={meta.touched && meta.error}
                disabled={submitting}
                input={input}
                className={classes.field}
                inputLabel={'Фото для биографии'}
              />
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
  field: {
    margin: '0 1rem 1rem',
  },
}));
