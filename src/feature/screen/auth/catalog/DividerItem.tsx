import { ReactElement, ReactNode } from 'react';
import { useAppTheme } from '../../../theme/ThemeContext';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { TranslatedText } from '../../../components/catalog/TranslatedText';
import { Divider } from '../../../components/catalog/EdgeToEdgeScrollableContent';

export const DividerItem = (): ReactElement => {
  return (
    <DividerBody>
      <CTA />
      <Divider />
    </DividerBody>
  );
};

type DividerBodyProps = {
  style?: StyleProp<ViewStyle> | undefined;
  children: ReactNode;
};

const DividerBody = (props: DividerBodyProps): ReactElement => {
  const { dimensions } = useAppTheme();

  return (
    <View
      style={[
        props.style,
        {
          paddingTop: dimensions.screenPadding,
          paddingHorizontal: dimensions.screenPadding,
        },
      ]}>
      <View style={{ alignItems: 'center' }}>{props.children}</View>
    </View>
  );
};

const CTA = (): ReactElement => {
  const { dimensions, colors, typography } = useAppTheme();

  return (
    <TranslatedText
      textKey="or"
      style={[
        typography.section,
        styles.cta,
        {
          backgroundColor: colors.background,
          paddingHorizontal: dimensions.smallPadding,
          color: colors.onBackground,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  cta: {
    position: 'absolute',
    zIndex: 1,
  },
});
