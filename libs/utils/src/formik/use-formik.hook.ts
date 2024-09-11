import {
  useFormik as useFormikOrigin,
  FormikValues,
  FormikConfig,
  FormikErrors,
} from 'formik';
import { useCallback, useMemo } from 'react';
import { get as _get } from 'lodash';

// Utility type to get nested paths, handling optional objects and objects that can be undefined
type NestedPaths<T> = T extends object
  ? {
      [K in keyof T]-?: T[K] extends object | undefined
        ? `${K & string}` | `${K & string}.${NestedPaths<NonNullable<T[K]>>}`
        : `${K & string}`;
    }[keyof T]
  : never;

export const useFormik = <Values extends FormikValues = FormikValues>(
  params: FormikConfig<Values>,
) => {
  const hook = useFormikOrigin<Values>(params);

  const errors = useMemo<FormikErrors<Values>>(
    () => (hook.submitCount > 0 ? hook.errors : {}),
    [hook.errors, hook.submitCount],
  );

  const register = useCallback(
    (fieldKey: NestedPaths<Values>) => ({
      name: fieldKey,
      value: _get(hook.values, fieldKey),
      onChange: hook.handleChange,
      onBlur: hook.handleBlur,
      errorMessage: _get(errors, fieldKey),
    }),
    [errors, hook.handleChange, hook.handleBlur, hook.values],
  );

  return {
    ...hook,
    errors,
    register,
    isDirty: hook.dirty,
    isSubmitAvailable:
      (hook.isValid && hook.submitCount > 0) || hook.submitCount === 0,
  };
};
