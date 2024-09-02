import {
  CredentialResponse,
  GoogleLogin,
  GoogleLoginProps,
  GoogleOAuthProvider,
} from '@react-oauth/google';
import React, { useCallback } from 'react';

type GoogleSignUpButtonProps = {
  clientId: string;
  onSuccess?(payload: { token: string }): void;
  useOneTap?: boolean;
  width?: GoogleLoginProps['width'];
  text?: GoogleLoginProps['text'];
  size?: GoogleLoginProps['size'];
  shape?: GoogleLoginProps['shape'];
};

export const GoogleSignUpButton: React.FC<GoogleSignUpButtonProps> = (
  props,
) => {
  const {
    clientId,
    onSuccess,
    useOneTap = false,
    width,
    text = 'signup_with',
    size = 'large',
    shape = 'pill',
  } = props;

  const handleSingedIn = useCallback(
    (credentialResponse: CredentialResponse) => {
      if (!credentialResponse.credential) return;
      onSuccess?.({ token: credentialResponse.credential });
    },
    [onSuccess],
  );

  const handleFailed = useCallback(() => {
    console.log('Google Sign In Error');
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        useOneTap={useOneTap}
        onSuccess={handleSingedIn}
        onError={handleFailed}
        width={width}
        text={text}
        size={size}
        shape={shape}
      />
    </GoogleOAuthProvider>
  );
};
