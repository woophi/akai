import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { safeTrim } from 'core/lib';
import { getLastChatLiveStreamId, saveChatLiveStreamId } from 'core/operations';
import { checkAuth } from 'core/operations/auth';
import { useAppSelector } from 'core/reducers/rootReducer';
import { isAdmin } from 'core/selectors';
import { FORM_ERROR } from 'final-form';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { ButtonsForm, Snakbars, TextField } from 'ui/atoms';

type ChatIdForm = {
  chatId: string;
};

const validate = (values: ChatIdForm) => {
  const errors: Partial<ChatIdForm> = {};
  if (!safeTrim(values.chatId)) {
    errors.chatId = 'Обязательно к заполнению';
  }
  return errors;
};

const onSubmit = async (data: ChatIdForm) => {
  try {
    await saveChatLiveStreamId(data.chatId);
    await getLastChatLiveStreamId();
  } catch (error) {
    return { [FORM_ERROR]: error.error };
  }
};

export const SaveChatId = React.memo(({}) => {
  const [open, setOpen] = React.useState(false);
  const admin = useAppSelector(isAdmin);

  const handleToggle = () => setOpen(!open);

  if (!admin) {
    return null;
  }

  return (
    <Box display="flex" justifyContent="center" flexWrap="wrap">
      <FormControlLabel
        control={<Switch checked={open} onChange={handleToggle} value="checkedB" color="primary" />}
        label={'Обновить чат ID'}
      />
      <Fade in={open}>
        <div>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit, pristine, submitting, form, submitError }) => (
              <Box
                onSubmit={async (event: any) => {
                  const error = await handleSubmit(event);
                  if (error) {
                    return error;
                  }
                  form.reset();
                }}
                component="form"
                display="flex"
                alignItems="center"
                flexWrap="wrap"
                justifyContent="center"
              >
                <Snakbars variant="error" message={submitError} />
                <Field
                  name="chatId"
                  render={({ input, meta }) => (
                    <TextField
                      label={'Чат ID'}
                      type="text"
                      {...input}
                      name="chatId"
                      required
                      variant="standard"
                      error={Boolean(meta.touched && meta.error)}
                      disabled={submitting}
                    />
                  )}
                />
                <ButtonsForm
                  pristine={pristine}
                  submitting={submitting}
                  both
                  onCancel={form.reset}
                  submitLabel={'common:buttons.save'}
                  noMargin
                />
              </Box>
            )}
          />
        </div>
      </Fade>
    </Box>
  );
});
