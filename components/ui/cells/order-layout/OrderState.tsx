import { StepIconProps, useMediaQuery } from '@material-ui/core';
import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import BlockIcon from '@material-ui/icons/Block';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import clsx from 'clsx';
import { ShopOrderState } from 'core/models';
import React from 'react';
import { useTranslation } from 'server/lib/i18n';

const ColorlibConnectorV = withStyles({
  alternativeLabel: {
    top: 22,
  },

  active: {
    '& $line': {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
  root: {
    width: '3px',
    padding: 0,
    marginLeft: '24px',
  },
})(StepConnector);

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },

  active: {
    '& $line': {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props: StepIconProps) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <ViewModuleIcon />,
    2: <MonetizationOnIcon />,
    3: <LocalShippingIcon />,
    4: <HomeWorkIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}
function ColorlibStepIconRefund(props: StepIconProps) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <BlockIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

const steps = [
  { state: ShopOrderState.Ordered, id: 0 },
  { state: ShopOrderState.Paid, id: 1 },
  { state: ShopOrderState.Shipping, id: 2 },
  { state: ShopOrderState.Shipped, id: 3 },
];

export const OrderState = React.memo<{ orderState: ShopOrderState }>(({ orderState }) => {
  const classes = useStyles();
  const isSmallEnough = useMediaQuery('(max-width:800px)');
  const { t } = useTranslation('common');
  const activeStep = steps.findIndex(s => s.state === orderState);

  return (
    <div className={classes.root}>
      {orderState === ShopOrderState.Refund ? (
        <Stepper activeStep={0} alternativeLabel>
          <Step>
            <StepLabel StepIconComponent={ColorlibStepIconRefund}>{t('order.refund')}</StepLabel>
          </Step>
        </Stepper>
      ) : (
        <Stepper
          orientation={isSmallEnough ? 'vertical' : 'horizontal'}
          alternativeLabel={!isSmallEnough}
          activeStep={activeStep}
          connector={isSmallEnough ? <ColorlibConnectorV /> : <ColorlibConnector />}
        >
          {steps.map(s => (
            <Step key={s.id}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{t(`order.${s.state}`)}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
    </div>
  );
});
