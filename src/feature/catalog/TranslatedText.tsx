import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { TextProps } from 'react-native';
import type { Namespace } from 'i18next';

export type TextKey =
  | string
  | TemplateStringsArray
  | (string | TemplateStringsArray)[];
interface TranslatedTextProps extends Omit<TextProps, 'text'> {
  namespace?: Namespace;
  textKey: TextKey;
}

// Note: for plurals / parametrized texts, simply useTranslate directly.
export const TranslatedText = ({
  namespace,
  textKey,
  ...rest
}: TranslatedTextProps) => {
  const { t } = useTranslation(namespace);
  return <Text {...rest}>{t(textKey)}</Text>;
};
