import React, { memo } from 'react';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import SelectImageIcon from '@mui/icons-material/AddPhotoAlternate';
import Stack from '@mui/material/Stack';

import { ImageSelectorProps } from './image-selector.types';
import { Paper, Button } from '../../atoms';

const HEIGHT = '140px';

// Memo user because of src prop
// src can be large Base64 string which take a long time to re-render
export const ImageSelector: React.FC<ImageSelectorProps> = memo((props) => {
  const { src, defaultSrc, onClearClick, onSelectClick } = props;

  return (
    <Paper
      sx={{
        p: 1,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        backgroundImage:
          src || defaultSrc ? `url(${src || defaultSrc})` : undefined,
        backgroundSize: 'cover',
        height: HEIGHT,
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        component={Paper}
        p={1}
        variant="outlined"
        borderRadius="22px"
      >
        <Button
          startIcon={<DeleteIcon />}
          size="small"
          variant="outlined"
          onClick={onClearClick}
          disabled={!src}
        >
          Clear
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={onSelectClick}
          endIcon={<SelectImageIcon />}
        >
          Select Image
        </Button>
      </Stack>
    </Paper>
  );
});
