import { useCallback } from 'react';
import { StringMap, TOptions } from 'i18next';
import { KeyPrefix, TFuncKey, useTranslation } from 'react-i18next';

function useTranslationPrefix<TKPrefix extends KeyPrefix<'translation'>>(prefix: TKPrefix) {
  const { t: nativeT, i18n } = useTranslation('translation');

  const t = useCallback(
    <
      TKeys extends TFuncKey<'translation', TKPrefix> | TemplateStringsArray extends infer A ? A : never,
      TInterpolationMap extends object = StringMap,
    >(
      key: TKeys,
      options?: TOptions<TInterpolationMap> | undefined,
    ) => {
      return nativeT(`${prefix}.${key}` as any, options);
    },
    [nativeT, prefix],
  );

  const commonT = useCallback(
    <
      TKeys extends TFuncKey<'translation', 'common'> | TemplateStringsArray extends infer A ? A : never,
      TInterpolationMap extends object = StringMap,
    >(
      key: TKeys,
      options?: TOptions<TInterpolationMap> | undefined,
    ) => {
      return nativeT(`common.${key}` as any, options);
    },
    [nativeT],
  );

  return { t, i18n, commonT };
}

export default useTranslationPrefix;
