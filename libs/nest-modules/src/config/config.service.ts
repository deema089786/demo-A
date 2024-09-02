import { Inject, Injectable } from '@nestjs/common';

import { MODULE_CONFIG } from './config.constants';

type FieldWithPossiblyUndefined<T, Key> =
  | GetFieldType<Exclude<T, undefined>, Key>
  | Extract<T, undefined>;

type GetIndexedField<T, K> = K extends keyof T
  ? T[K]
  : K extends `${number}`
    ? '0' extends keyof T // tuples have string keys, return undefined if K is not in tuple
      ? undefined
      : number extends keyof T
        ? T[number]
        : undefined
    : undefined;

export type GetFieldType<T, P> = P extends `${infer Left}.${infer Right}`
  ? Left extends keyof T
    ? FieldWithPossiblyUndefined<T[Left], Right>
    : Left extends `${infer FieldKey}[${infer IndexKey}]`
      ? FieldKey extends keyof T
        ? FieldWithPossiblyUndefined<
            | GetIndexedField<Exclude<T[FieldKey], undefined>, IndexKey>
            | Extract<T[FieldKey], undefined>,
            Right
          >
        : undefined
      : undefined
  : P extends keyof T
    ? T[P]
    : P extends `${infer FieldKey}[${infer IndexKey}]`
      ? FieldKey extends keyof T
        ?
            | GetIndexedField<Exclude<T[FieldKey], undefined>, IndexKey>
            | Extract<T[FieldKey], undefined>
        : undefined
      : undefined;

export function getValue<
  TData,
  TPath extends string,
  TDefault = GetFieldType<TData, TPath>,
>(
  data: TData,
  path: TPath,
  defaultValue?: TDefault,
): GetFieldType<TData, TPath> | TDefault {
  const value = path
    .split(/[.[\]]/)
    .filter(Boolean)
    .reduce<GetFieldType<TData, TPath>>(
      (value, key) => (value as any)?.[key],
      data as any,
    );

  return value !== undefined ? value : (defaultValue as TDefault);
}

@Injectable()
export class ConfigService<T> {
  constructor(@Inject(MODULE_CONFIG) private moduleConfig: T) {}
  getBy<TPath extends string>(path: TPath): GetFieldType<T, TPath> {
    return getValue(this.moduleConfig, path);
  }

  get() {
    return this.moduleConfig;
  }

  // endregion
}
