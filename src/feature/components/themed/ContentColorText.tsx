import { Text } from 'react-native';
import type { TextProps } from 'react-native';
import { TextKey, t } from '../../../../assets/i18n/i18n';
import { useContentColor } from '../../theme/ContentColorContext';

interface ContentColorTextProps extends TextProps {
  textKey?: TextKey;
}

export const ContentColorText = ({
  style,
  textKey,
  children,
  ...rest
}: ContentColorTextProps) => {
  const color = useContentColor();
  return (
    <Text style={[{ color: color }, style]} {...rest}>
      {!!textKey && t(textKey)}
      {children}
    </Text>
  );
};
