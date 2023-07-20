import { ReactElement, ReactNode } from 'react';
import { PrimaryButton } from '../../../components/catalog/PrimaryButton';
import { useAppTheme } from '../../../theme/ThemeContext';
import { StyleProp, View, ViewStyle } from 'react-native';

type AuthButtonItemProps = {
  doAuth: () => void;
  forgotPasswordClicked: () => void;
  isEnabled: boolean;
  isLoading: boolean;
  isLoginScreen: boolean;
};

export const AuthButtonItem = (props: AuthButtonItemProps): ReactElement => {
  return (
    <AuthButtonBody>
      <AuthButton
        onPress={props.doAuth}
        isEnabled={props.isEnabled}
        isLoading={props.isLoading}
        isLoginScreen={props.isLoginScreen}
      />
      <ForgotPasswordButton
        forgotPasswordClicked={props.forgotPasswordClicked}
      />
    </AuthButtonBody>
  );
};

type AuthButtonBodyProps = {
  style?: StyleProp<ViewStyle> | undefined;
  children: ReactNode;
};

const AuthButtonBody = (props: AuthButtonBodyProps): ReactElement => {
  const { dimensions } = useAppTheme();

  return (
    <View
      style={[
        props.style,
        {
          width: '100%',
          flexDirection: 'column',
          gap: dimensions.smallPadding,
          paddingTop: dimensions.screenPadding * 2,
        },
      ]}>
      {props.children}
    </View>
  );
};

type AuthButtonProps = {
  onPress: () => void;
  isEnabled: boolean;
  isLoading: boolean;
  isLoginScreen: boolean;
};

const AuthButton = (props: AuthButtonProps): ReactElement => {
  return (
    <PrimaryButton
      textKey={props.isLoginScreen ? 'login' : 'register'}
      onPress={props.onPress}
      isEnabled={props.isEnabled}
      isLoading={props.isLoading}
      textStyle={{
        fontWeight: 'bold',
        textTransform: 'uppercase',
      }}
    />
  );
};

type ForgotPasswordButtonProps = {
  forgotPasswordClicked: () => void;
};

const ForgotPasswordButton = (
  props: ForgotPasswordButtonProps,
): ReactElement => {
  const { colors } = useAppTheme();

  return (
    <PrimaryButton
      textKey={'forgot_password'}
      onPress={props.forgotPasswordClicked}
      isEnabled={true}
      isLoading={false}
      backgroundColor={colors.background}
      onBackgroundTextColor={colors.primary}
    />
  );
};
