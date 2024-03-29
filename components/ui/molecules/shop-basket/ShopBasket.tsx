import { Box, Button, Step, StepContent, StepLabel, Stepper } from '@material-ui/core';
import { getWindow } from 'core/common';
import { ProductInBasket, UpdateShopOrder } from 'core/models';
import { shopActions } from 'core/reducers/shop';
import { getActiveStep, getShopBasketValues, updateShopOrderValues } from 'core/selectors';
import getConfig from 'next/config';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'server/lib/i18n';
import { AddressForm } from './AddressForm';
import { steps } from './constants';
import { FinishedOrder } from './FinishedOrder';
import { updateShopOrder } from './operations';
import { PaymentInfo } from './PaymentInfo';
import { ShopBasketPreview } from './ShopBasketPreview';

const { publicRuntimeConfig } = getConfig();
const { SITE_URL } = publicRuntimeConfig;

const tpSendInvite = (values: UpdateShopOrder, allItems: ProductInBasket[]) => {
  const trustpilot_invitation = {
    recipientEmail: values.billAddress?.email,
    recipientName: values.billAddress?.name + ' ' + values.billAddress?.lastName,
    referenceId: values.orderId,
    source: 'InvitationScript',
    productSkus: allItems.map(a => a.id),
    products: allItems.map(a => ({
      sku: a.id,
      productUrl: SITE_URL + 'product/' + a.href,
      imageUrl: a.file.url,
      name: a.name,
    })),
  };

  getWindow()?.tp?.('createInvitation', trustpilot_invitation);
};

export const ShopBasket = React.memo(() => {
  const { t } = useTranslation('common');
  const current = useSelector(getActiveStep);
  const updateValues = useSelector(updateShopOrderValues);
  const allItems = useSelector(getShopBasketValues);
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(steps.findIndex(v => v.state === current));
  const activeStepContent = {
    [0]: <ShopBasketPreview />,
    [1]: <AddressForm setActiveStep={setActiveStep} />,
    [2]: <PaymentInfo />,
    [3]: <FinishedOrder />,
  };

  const updateAndThenFinish = React.useCallback(async () => {
    try {
      await updateShopOrder(updateValues);
      tpSendInvite(updateValues, allItems);
      setActiveStep(prevActiveStep => {
        const nextStep = prevActiveStep + 1;
        dispatch(shopActions.changeSessionState(steps[nextStep].state));
        dispatch(shopActions.resetToDefault());
        return nextStep;
      });
    } catch (error) {
      console.error(error);
    }
  }, [updateValues, allItems]);

  const handleNext = () => {
    setActiveStep(prevActiveStep => {
      const nextStep = prevActiveStep + 1;
      dispatch(shopActions.changeSessionState(steps[nextStep].state));
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
                    onClick={activeStep === 2 ? updateAndThenFinish : handleNext}
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
