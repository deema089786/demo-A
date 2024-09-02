import axios, { AxiosInstance } from 'axios';

export class ClientApiInstance {
  public static async getJWTAccessToken(): Promise<{
    accessToken: string;
  }> {
    throw new Error('getJWTAccessToken getter not provided');
  }

  public static setJWTAccessTokenGetter(
    getterFunction: () => Promise<{
      accessToken: string;
    }>,
  ): void {
    this.getJWTAccessToken = getterFunction;
  }

  public static axiosInstance: AxiosInstance = axios.create();
}

ClientApiInstance.axiosInstance.interceptors.request.use(async (config) => {
  const { accessToken } = await ClientApiInstance.getJWTAccessToken();
  config.headers.set('Authorization', `Bearer ${accessToken}`);
  return config;
});
