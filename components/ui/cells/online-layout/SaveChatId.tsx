import * as React from 'react';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { safeTrim } from 'core/lib';
import { FORM_ERROR } from 'final-form';
import { Form, Field } from 'react-final-form';
import { TextField, ButtonsForm, Snakbars } from 'ui/atoms';
import { saveChatLiveStreamId, getLastChatLiveStreamId } from 'core/operations';
import { connect as redux } from 'react-redux';
import { AppState } from 'core/models';
import { isUserAuthorized } from 'core/selectors';
import { checkAuth } from 'core/operations/auth';

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

type Props = {
  authorized: boolean;
};

const SaveChatIdComponent = React.memo<Props>(({ authorized }) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    checkAuth();
  }, [])

  const handleToggle = () => setOpen(!open);

  if (!authorized) {
    return null;
  }

  return (
    <Box display="flex" justifyContent="center" flexWrap="wrap">
      <FormControlLabel
        control={
          <Switch
            checked={open}
            onChange={handleToggle}
            value="checkedB"
            color="primary"
          />
        }
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
                      name="chatId"
                      required
                      variant="standard"
                      {...input}
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

export const SaveChatId = redux((state: AppState) => ({
  authorized: isUserAuthorized(state)
}))(SaveChatIdComponent);
