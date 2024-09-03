import { ClientApiInstance } from '@demo-A/utils';
import {
  AuthSignUpByGoogleTokenPayload,
  AuthSignUpByGoogleTokenResponse,
  AuthSignUpByCredentialsPayload,
  AuthSignUpByCredentialsResponse,
  AuthProfileResponse,
} from '@demo-A/api-types';

class ClientApiBase {
  public static setBaseUrl(params: { baseURL: string }): void {
    ClientApiInstance.axiosInstance.defaults.baseURL = params.baseURL;
  }
  public static setJWTAccessTokenGetter(
    getterFunction: () => Promise<{
      accessToken: string;
    }>,
  ): void {
    ClientApiInstance.setJWTAccessTokenGetter(getterFunction);
  }
}

export class ClientApi extends ClientApiBase {
  static async authSighUpByGoogleToken(
    payload: AuthSignUpByGoogleTokenPayload,
  ): Promise<AuthSignUpByGoogleTokenResponse> {
    const { data } =
      await ClientApiInstance.axiosInstance.request<AuthSignUpByGoogleTokenResponse>(
        {
          url: '/auth/sign-up/google',
          method: 'POST',
          data: payload,
        },
      );
    return data;
  }

  static async authSighUpByCredentials(
    payload: AuthSignUpByCredentialsPayload,
  ): Promise<AuthSignUpByCredentialsResponse> {
    const { data } =
      await ClientApiInstance.axiosInstance.request<AuthSignUpByCredentialsResponse>(
        {
          url: '/auth/sign-up/credentials',
          method: 'POST',
          data: payload,
        },
      );
    return data;
  }

  static async authGetProfile(): Promise<AuthProfileResponse> {
    const { data } =
      await ClientApiInstance.axiosInstance.request<AuthProfileResponse>({
        url: '/auth/profile',
        method: 'GET',
      });
    return data;
  }
}
