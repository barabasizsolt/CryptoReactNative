import React, {
  ReactElement,
  useState,
  useRef,
  RefObject,
  forwardRef,
} from 'react';
import { Text, View, Pressable, Platform, Keyboard } from 'react-native';
import { PrimaryButton } from '../../components/catalog/PrimaryButton';
import { useAppTheme } from '../../theme/ThemeContext';
import { useLoginScreenState } from './LoginScreenState.hooks';
import { State } from '../../components/state/state';
import { EdgeToEdgeScrollableContent } from '../../components/catalog/EdgeToEdgeScrollableContent';
import Bitcoin from './../../../../assets/images/thumbnails/btc.svg';
import { listItems } from './uiModel';
import { Divider as MDivider /*Pressable*/ } from '@react-native-material/core';
import { GoogleLoginButton } from '../../components/catalog/GoogleLoginButton';
import AuthenticationTextInput from '../../components/catalog/AuthenticationTextInput';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native-gesture-handler';
import { TranslatedText } from '../../components/catalog/TranslatedText';

const LoginScreen = (): ReactElement => {
  const {
    screenState,
    doLogin,
    email,
    onEmailChange,
    password,
    onPasswordChange,
    isLoginButtonEnabled,
  } = useLoginScreenState();
  const passwordInputRef = useRef<TextInput>(null);

  return (
    <EdgeToEdgeScrollableContent
      isLoading={screenState.state === State.LOADING}
      isError={false}
      onTryAgain={() => void 0}
      isRefreshing={false}
      onRefresh={() => void 0}
      listItems={listItems}
      renderItem={({ item }) => {
        let renderItem: ReactElement = <></>;
        switch (item.id) {
          case 'headerLogo':
            renderItem = <HeaderLogo />;
            break;
          case 'googleLoginButton':
            renderItem = <GoogleButton onPress={doLogin} />;
            break;
          case 'divider':
            renderItem = <Divider />;
            break;
          case 'emailInput':
            renderItem = (
              <EmailInput
                email={email}
                onEmailChange={onEmailChange}
                passwordInputRef={passwordInputRef}
              />
            );
            break;
          case 'passwordInput':
            renderItem = (
              <PasswordInput
                password={password}
                onPasswordChange={onPasswordChange}
                ref={passwordInputRef}
                isLoginEnabled={isLoginButtonEnabled}
                doLogin={() => {
                  Keyboard.dismiss();
                  doLogin();
                }}
              />
            );
            break;
          case 'loginButton':
            renderItem = (
              <LoginButton
                doLogin={doLogin}
                isEnabled={isLoginButtonEnabled}
                forgotPasswordClicked={() => void 0}
              />
            );
            break;
          case 'signUpArea':
            renderItem = <SignUpArea onSignUpClick={() => void 0} />;
            break;
          default:
            break;
        }
        return renderItem;
      }}
      showPaddingHorizontal={false}
      showExtraBottomPadding={false}
      itemSeparator={'undefined'}
    />
  );
};

const HeaderLogo = (): ReactElement => {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        paddingTop: 120,
      }}>
      <Bitcoin width={120} height={120} />
    </View>
  );
};

type GoogleButtonProps = {
  onPress: () => void;
};

const GoogleButton = (props: GoogleButtonProps): ReactElement => {
  const { dimensions } = useAppTheme();

  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: dimensions.screenPadding,
        paddingTop: dimensions.screenPadding + dimensions.contentPadding,
      }}>
      <GoogleLoginButton onPress={props.onPress} />
    </View>
  );
};

const Divider = (): ReactElement => {
  const { dimensions, colors, typography } = useAppTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: dimensions.screenPadding,
        paddingTop: dimensions.screenPadding + dimensions.contentPadding,
      }}>
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          backgroundColor: colors.background,
        }}>
        <TranslatedText
          textKey="or"
          style={[
            typography.section,
            {
              paddingHorizontal: dimensions.smallPadding,
              paddingTop: dimensions.screenPadding,
              color: colors.disabled,
            },
          ]}
        />
      </View>
      <MDivider
        style={{
          width: '100%',
          height: 2,
          backgroundColor: colors.disabled,
        }}
      />
    </View>
  );
};

type EmailInputProps = {
  email: string;
  onEmailChange: (email: string) => void;
  passwordInputRef: RefObject<TextInput>;
};

const EmailInput = forwardRef<TextInput, EmailInputProps>(
  (
    { email, onEmailChange, passwordInputRef }: EmailInputProps,
    ref,
  ): ReactElement => {
    const { dimensions } = useAppTheme();
    const { t } = useTranslation();

    return (
      <View
        style={{
          paddingHorizontal: dimensions.screenPadding,
          paddingTop: dimensions.screenPadding + dimensions.contentPadding,
          paddingBottom: dimensions.contentPadding,
        }}>
        <AuthenticationTextInput
          textInputProps={{
            value: email,
            onChangeText: onEmailChange,
            placeholder: t('email'),
            returnKeyType: 'next',
            onSubmitEditing: () =>
              (passwordInputRef as RefObject<TextInput>).current?.focus(),
          }}
          textInputRef={ref}
        />
      </View>
    );
  },
);

type PasswordInputProps = {
  password: string;
  onPasswordChange: (password: string) => void;
  isLoginEnabled: boolean;
  doLogin: () => void;
  ref: RefObject<TextInput>;
};

const PasswordInput = forwardRef<TextInput, PasswordInputProps>(
  (
    { password, onPasswordChange, isLoginEnabled, doLogin }: PasswordInputProps,
    ref,
  ): ReactElement => {
    const { dimensions, colors } = useAppTheme();
    const { t } = useTranslation();
    const [visible, setVisible] = useState<boolean>(true);

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingHorizontal: dimensions.screenPadding,
        }}>
        <Pressable
          style={{
            position: 'absolute',
            zIndex: 1,
            alignSelf: 'center',
            paddingEnd: dimensions.screenPadding * 2,
          }}
          onPress={() => {
            setVisible(!visible);
          }}>
          <MaterialCommunityIcons
            name={visible ? 'eye' : 'eye-off'}
            color={colors.disabled}
            size={24}
          />
        </Pressable>
        <AuthenticationTextInput
          textInputProps={{
            value: password,
            onChangeText: onPasswordChange,
            placeholder: t('password'),
            secureTextEntry: !visible,
            returnKeyType: 'done',
            onSubmitEditing: isLoginEnabled ? doLogin : void 0,
          }}
          textInputRef={ref}
        />
      </View>
    );
  },
);

type LoginButtonProps = {
  doLogin: () => void;
  forgotPasswordClicked: () => void;
  isEnabled: boolean;
};

const LoginButton = (props: LoginButtonProps): ReactElement => {
  const { dimensions, colors } = useAppTheme();

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'column',
        gap: dimensions.smallPadding,
        paddingHorizontal: dimensions.screenPadding,
        paddingTop: dimensions.screenPadding * 2,
      }}>
      <PrimaryButton
        textKey={'login'}
        onPress={props.doLogin}
        isEnabled={props.isEnabled}
        textStyle={{
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }}
      />
      <PrimaryButton
        textKey={'forgot_password'}
        onPress={props.forgotPasswordClicked}
        isEnabled={true}
        backgroundColor={colors.background}
        onBackgroundTextColor={colors.primary}
      />
    </View>
  );
};

type SignUpAreaProps = {
  onSignUpClick: () => void;
};

const SignUpArea = (props: SignUpAreaProps): ReactElement => {
  const { typography, colors, dimensions, shapes } = useAppTheme();
  const { t } = useTranslation();

  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: dimensions.screenPadding,
      }}>
      <Pressable
        onPress={props.onSignUpClick}
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
            borderRadius: shapes.small,
          },
        ]}>
        <Text style={[typography.inputLabel, { color: colors.onBackground }]}>
          {t('dont_have_account')}
          <Text style={[typography.inputLabel, { color: colors.primary }]}>
            {t('sign_up')}
          </Text>
        </Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
