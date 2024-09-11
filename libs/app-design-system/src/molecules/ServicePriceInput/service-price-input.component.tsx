import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import InputAdornment from '@mui/material/InputAdornment';
import AmountIcon from '@mui/icons-material/Dialpad';
import PriceUnitIcon from '@mui/icons-material/Category';
import MoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/AddCircle';
import RemoveIcon from '@mui/icons-material/RemoveCircle';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { ServicePriceInputProps } from './service-price-input..types';
import { Typography } from '../../atoms';
import { TextField } from '../../inputs';

export const ServicePriceInput: React.FC<ServicePriceInputProps> = (props) => {
  const {
    isEnabled,
    onIsEnabledChange,
    priceFieldProps,
    discountPriceFieldProps,
    amountFieldProps,
    unitFieldProps,
  } = props;

  return (
    <Accordion
      expanded={isEnabled}
      onChange={(_, isExpanded) => onIsEnabledChange(isExpanded)}
    >
      <AccordionSummary
        expandIcon={
          isEnabled ? <RemoveIcon color="error" /> : <AddIcon color="primary" />
        }
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography>Add</Typography>
          <Typography>
            <Chip sx={{ fontWeight: 'bold' }} label="Price" />
          </Typography>
          <Typography>Option</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          <TextField
            label="Price"
            helperText="Price of single purchase"
            size="small"
            startAdornment={
              <InputAdornment position="start">
                <MoneyIcon fontSize="small" color="primary" />
              </InputAdornment>
            }
            {...priceFieldProps}
          />
          <TextField
            label="Discount Price (optional)"
            helperText="New/Discount price for this service"
            size="small"
            startAdornment={
              <InputAdornment position="start">
                <MoneyIcon fontSize="small" color="primary" />
              </InputAdornment>
            }
            {...discountPriceFieldProps}
          />
          <TextField
            label="Amount (optional)"
            helperText="How many items includes in purchase"
            size="small"
            startAdornment={
              <InputAdornment position="start">
                <AmountIcon fontSize="small" color="primary" />
              </InputAdornment>
            }
            {...amountFieldProps}
          />
          <FormControl size="small">
            <InputLabel id="service-price-unit-select-label">
              Price unit
            </InputLabel>
            <Select
              labelId="service-price-unit-select-label"
              label="Price unit"
              startAdornment={
                <InputAdornment position="start">
                  <PriceUnitIcon fontSize="small" color="primary" />
                </InputAdornment>
              }
              {...unitFieldProps}
            >
              <MenuItem value="no-unit">Not specified</MenuItem>
              <MenuItem value="item">For 1 item</MenuItem>
              <MenuItem value="butch">For 1 butch</MenuItem>
              <MenuItem value="hour">For 1 hour</MenuItem>
              <MenuItem value="day">For 1 day</MenuItem>
              <MenuItem value="week">For 1 week</MenuItem>
              <MenuItem value="month">For 1 month</MenuItem>
              <MenuItem value="year">For 1 month</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
