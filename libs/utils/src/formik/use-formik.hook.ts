import {
  useFormik as useFormikOrigin,
  FormikValues,
  FormikConfig,
  FormikErrors,
} from 'formik';
import { useCallback, useMemo } from 'react';

export const useFormik = <Values extends FormikValues = FormikValues>(
  params: FormikConfig<Values>,
) => {
  const hook = useFormikOrigin<Values>(params);

  const errors = useMemo<FormikErrors<Values>>(
    () => (hook.submitCount > 0 ? hook.errors : {}),
    [hook.errors, hook.submitCount],
  );

  const register = useCallback(
    (fieldKey: keyof Values) => ({
      name: fieldKey,
      value: hook.values[fieldKey],
      onChange: hook.handleChange,
      onBlur: hook.handleBlur,
      errorMessage: errors[fieldKey],
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
