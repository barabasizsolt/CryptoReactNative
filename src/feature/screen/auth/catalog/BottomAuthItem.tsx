import { ReactElement, ReactNode } from 'react';
import { useAppTheme } from '../../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import {
  View,
  Pressable,
  Platform,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';

type BottomAuthItemProps = {
  onClick: () => void;
  isLoginScreen: boolean;
};

export const BottomAuthItem = (props: BottomAuthItemProps): ReactElement => {
  return (
    <BottomAuthItemBody onClick={props.onClick}>
      <CTA isLoginScreen={props.isLoginScreen} />
    </BottomAuthItemBody>
  );
};

type BottomAuthItemBodyProps = {
  style?: StyleProp<ViewStyle> | undefined;
  children: ReactNode;
  onClick: () => void;
};

const BottomAuthItemBody = (props: BottomAuthItemBodyProps): ReactElement => {
  const { colors, dimensions, shapes } = useAppTheme();

  return (
    <View
      style={[
        props.style,
        {
          borderRadius: shapes.large,
          //marginHorizontal: dimensions.screenPadding,
          overflow: 'hidden',
        },
      ]}>
      <Pressable
        onPress={props.onClick}
        android_ripple={{ color: colors.rippleColor }}
        style={({ pressed }) => [
          {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:
              Platform.OS === 'ios'
                ? pressed
                  ? colors.rippleColor
                  : colors.background
                : colors.background,
            minHeight: dimensions.touchTargetSize,
          },
        ]}>
        {props.children}
      </Pressable>
    </View>
  );
};

type CTAProps = {
  isLoginScreen: boolean;
};

const CTA = ({ isLoginScreen }: CTAProps): ReactElement => {
  const { typography, colors } = useAppTheme();
  const { t } = useTranslation();

  return (
    <Text style={[typography.inputLabel, { color: colors.onBackground }]}>
      {isLoginScreen ? t('dont_have_account') : t('already_have_account')}
      <Text style={[typography.inputLabel, { color: colors.primary }]}>
        {' '}
        {isLoginScreen ? t('register') : t('login')}
      </Text>
    </Text>
  );
};
