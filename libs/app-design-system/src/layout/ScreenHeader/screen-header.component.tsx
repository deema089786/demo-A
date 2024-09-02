import React from 'react';
import { NavLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import SignInIcon from '@mui/icons-material/PermIdentity';

import { ScreenHeaderProps } from './screen-header.types';
import { Button, Logo } from '../../atoms';

const SCREEN_HEADER_HEIGHT = 48;
const LOGO_HEIGHT = 32;
const LOGO_WIDTH = 100;

export const ScreenHeader: React.FC<ScreenHeaderProps> = (props) => {
  const { user } = props;
  return (
    <Container maxWidth="xl" disableGutters>
      <Stack
        direction="row"
        spacing="1"
        justifyContent="space-between"
        alignItems="center"
        sx={{ height: SCREEN_HEADER_HEIGHT }}
      >
        <NavLink to="/">
          <Logo width={LOGO_WIDTH} height={LOGO_HEIGHT} />
        </NavLink>
        <Stack direction="row" alignItems="center" spacing={1}>
          {/*<Button size="small" component="a" href="/catalog">*/}
          {/*  Catalog*/}
          {/*</Button>*/}
          {/*<Button size="small" component="a" href="/home">*/}
          {/*  About Us*/}
          {/*</Button>*/}
          {/*<Button size="small" component="a" href="/home">*/}
          {/*  Guide*/}
          {/*</Button>*/}
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          {user ? (
            <Button
              component={NavLink}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              to="/profile"
              size="small"
              variant="outlined"
              endIcon={
                user.image ? (
                  <Avatar src={user.image} sx={{ width: 18, height: 18 }} />
                ) : (
                  <SignInIcon />
                )
              }
            >
              {user.firstName || 'My Profile'}
            </Button>
          ) : (
            <Button
              component={NavLink}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              to="/sign-up"
              size="small"
              variant="outlined"
              endIcon={<SignInIcon />}
            >
              Sign Up
            </Button>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};
