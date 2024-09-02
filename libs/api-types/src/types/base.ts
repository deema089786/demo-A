export interface Timestamp {
  createdAt: Date;
  updatedAt: Date;
}

type Distinct<T, DistinctName> = T & { __TYPE__: DistinctName };

export type JWTAccessToken = Distinct<string, 'JWTAccessToken'>;
export type JWTRefreshToken = Distinct<string, 'JWTAccessToken'>;
