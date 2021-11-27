import { Box, Button, Step, StepContent, StepLabel, Stepper } from '@material-ui/core';
import { LS } from 'core/LS';
import { shopActions } from 'core/reducers/shop';
import { getActiveStep, getShopBasketValues } from 'core/selectors';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'server/lib/i18n';
import { AddressForm } from './AddressForm';
import { steps } from './constants';
import { FinishedOrder } from './FinishedOrder';
import { PaymentInfo } from './PaymentInfo';
import { ShopBasketPreview } from './ShopBasketPreview';

export const ShopBasket = React.memo(() => {
  const { t } = useTranslation('common');
  const current = useSelector(getActiveStep);
  const allItems = useSelector(getShopBasketValues);
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(steps.findIndex(v => v.state === current));
  const activeStepContent = {
    [0]: <ShopBasketPreview />,
    [1]: <AddressForm setActiveStep={setActiveStep} />,
    [2]: <PaymentInfo />,
    [3]: <FinishedOrder />,
  };

  const handleNext = (clear: boolean) => {
    setActiveStep(prevActiveStep => {
      const nextStep = prevActiveStep + 1;
      dispatch(shopActions.changeSessionState(steps[nextStep].state));
      if (clear) {
        dispatch(shopActions.resetToDefault());
      }
      return nextStep;
    });
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => {
      const prevStep = prevActiveStep - 1;
      dispatch(shopActions.changeSessionState(steps[prevStep].state));
      return prevStep;
    });
  };

  return (
    <Box width="100%">
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((aStep, index) => (
          <Step key={index}>
            <StepLabel>{t(aStep.label)}</StepLabel>
            <StepContent>
              {activeStepContent[aStep.id as keyof typeof activeStepContent]}
              {(activeStep === 0 || activeStep === 2) && (
                <div>
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    {t('buttons.back')}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleNext(activeStep === 2)}
                    disabled={!allItems.length}
                  >
                    {activeStep === 2 ? t('buttons.placeOrder') : t('buttons.next')}
                  </Button>
                </div>
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
});
