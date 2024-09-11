import React, { useMemo } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ActionsIcon from '@mui/icons-material/Settings';
import PurchaseIcon from '@mui/icons-material/ShoppingBag';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { ServiceStatus } from '@demo-A/app-modules';
import { Divider } from '@mui/material';
import Chip from '@mui/material/Chip';

import { ServiceCardProps, ServiceCardPropsPrice } from './service-card.types';
import {
  Button,
  Paper,
  PaperButton,
  StatusLogo,
  Typography,
} from '../../atoms';

const BannerImage = styled('img')({
  height: '100px',
  objectFit: 'cover',
});

const DefaultImage = styled('img')({
  minHeight: '80px',
  width: '80px',
  objectFit: 'cover',
});

const ServiceCardText: React.FC<{ title: string; description: string }> = (
  props,
) => {
  const { title, description } = props;
  return (
    <>
      <Typography variant="body1" fontWeight="bold" align="left">
        {title}
      </Typography>
      <Typography variant="body2" align="left">
        {description}
      </Typography>
    </>
  );
};

const ServiceSettingsButton: React.FC<{
  onClick: () => void;
  status: ServiceStatus;
}> = (props) => {
  const { onClick, status } = props;
  return (
    <Paper
      variant="outlined"
      sx={{ position: 'absolute', top: 4, right: 4, borderRadius: 100000 }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <StatusLogo variant={status} />
        <IconButton size="small" onClick={onClick}>
          <ActionsIcon color="primary" fontSize="small" />
        </IconButton>
      </Stack>
    </Paper>
  );
};

const ServiceBannerPrice: React.FC<ServiceCardPropsPrice> = (props) => {
  const { value, discountValue, unit, amount } = props;

  const valuesStr = useMemo(
    () =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value),
    [value],
  );
  const discountValueStr = useMemo(
    () =>
      discountValue
        ? new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(discountValue)
        : null,
    [discountValue],
  );

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Chip label={discountValueStr || valuesStr} sx={{ fontWeight: 'bold' }} />
      <Chip
        label={discountValueStr || valuesStr}
        variant="outlined"
        size="small"
        sx={{
          position: 'relative',
          '&:before': {
            content: '" "',
            display: 'block',
            width: '100%',
            borderTop: '2px solid',
            borderColor: (theme) => theme.palette.primary.main,
            height: '12px',
            position: 'absolute',
            bottom: 0,
            left: 0,
            transform: 'rotate(-12deg)',
          },
        }}
      />
    </Stack>
  );
};

export const ServiceBannerBottomSection: React.FC<{
  price: ServiceCardPropsPrice | null;
  isPurchaseButtonVisible: boolean;
}> = (props) => {
  const { price, isPurchaseButtonVisible } = props;
  return (
    <Stack
      p={2}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      {price ? (
        <ServiceBannerPrice
          value={price.value}
          discountValue={price.discountValue}
          unit={price.unit}
          amount={price.amount}
        />
      ) : (
        <div />
      )}
      {isPurchaseButtonVisible && (
        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<PurchaseIcon />}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          Purchase
        </Button>
      )}
    </Stack>
  );
};

export const ServiceCard: React.FC<ServiceCardProps> = (props) => {
  const {
    variant,
    title,
    description,
    imageSrc,
    href,
    status,
    isActionsAvailable,
    onActionsClick,
    isPurchaseButtonVisible,
    price,
  } = props;

  return (
    <PaperButton>
      <Stack
        component={NavLink}
        to={href}
        sx={{ textDecoration: 'none', color: 'inherit', position: 'relative' }}
      >
        {variant === 'banner' && (
          <Stack>
            <BannerImage src={imageSrc || ''} alt={title} />
            <Stack p={2}>
              <ServiceCardText title={title} description={description} />
            </Stack>
            {(price || isPurchaseButtonVisible) && (
              <>
                <Divider />
                <ServiceBannerBottomSection
                  price={price}
                  isPurchaseButtonVisible={isPurchaseButtonVisible}
                />
              </>
            )}
          </Stack>
        )}
        {variant === 'default' && (
          <Stack direction="row">
            <DefaultImage src={imageSrc || ''} alt={title} />
            <Stack p={1}>
              <ServiceCardText title={title} description={description} />
            </Stack>
          </Stack>
        )}
        {isActionsAvailable && (
          <ServiceSettingsButton onClick={onActionsClick} status={status} />
        )}
      </Stack>
    </PaperButton>
  );
};
