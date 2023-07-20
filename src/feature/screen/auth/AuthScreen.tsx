import React, { ReactElement, useRef, useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';
import { useAuthScreenState } from './AuthScreenState.hooks';
import { State } from '../../components/state/state';
import { EdgeToEdgeScrollableContent } from '../../components/catalog/EdgeToEdgeScrollableContent';
import { listItems } from './uiModel';
import { TextInput } from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';
import { HeaderItem } from './catalog/HeaderItem';
import { GoogleButtonItem } from './catalog/GoogleButtonItem';
import { DividerItem } from './catalog/DividerItem';
import { EmailInputItem } from './catalog/EmailInputItem';
import { PasswordInputItem } from './catalog/PasswordInputItem';
import { AuthButtonItem } from './catalog/AuthButtonItem';
import { BottomAuthItem } from './catalog/BottomAuthItem';
import { useWindowWidthClass } from '../../components/windowsize/windowSizeContext';
import { WindowType } from '../../components/windowsize/windowTypes';
import { useAppTheme } from '../../theme/ThemeContext';

const AuthScreen = (): ReactElement => {
  const {
    isLoginScreen,
    screenState,
    doEmailAndPasswordAuth,
    doGoogleAuth,
    email,
    onEmailChange,
    password,
    onPasswordChange,
    isLoginButtonEnabled,
    onBottomAuthButtonClicked,
  } = useAuthScreenState();
  const passwordInputRef = useRef<TextInput>(null);
  const windowWidthClass = useWindowWidthClass();
  const { dimensions } = useAppTheme();

  useEffect(() => {
    if (screenState.state === State.AUTH_ERROR) {
      Snackbar.show({
        text: screenState.message,
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }, [screenState]);

  const [paddingHorizontal, setPaddingHorizontal] = useState<number>(
    windowWidthClass === WindowType.Extended
      ? dimensions.screenPadding * 8
      : dimensions.screenPadding,
  );

  useEffect(() => {
    setPaddingHorizontal(
      windowWidthClass === WindowType.Extended
        ? dimensions.screenPadding * 8
        : dimensions.screenPadding,
    );
  }, [windowWidthClass, dimensions.screenPadding]);

  return (
    <EdgeToEdgeScrollableContent
      isLoading={false}
      isError={false}
      onTryAgain={() => void 0}
      isRefreshing={false}
      onRefresh={() => void 0}
      listItems={listItems}
      renderItem={({ item }) => {
        let renderItem: ReactElement = <></>;
        switch (item.id) {
          case 'headerItem':
            renderItem = <HeaderItem isLoginScreen={isLoginScreen} />;
            break;
          case 'googleLoginButtonItem':
            renderItem = (
              <GoogleButtonItem
                onPress={() => {
                  Platform.OS === 'android' ? doGoogleAuth() : void 0;
                }}
              />
            );
            break;
          case 'dividerItem':
            renderItem = <DividerItem />;
            break;
          case 'emailInputItem':
            renderItem = (
              <EmailInputItem
                email={email}
                onEmailChange={onEmailChange}
                passwordInputRef={passwordInputRef}
              />
            );
            break;
          case 'passwordInputItem':
            renderItem = (
              <PasswordInputItem
                password={password}
                onPasswordChange={onPasswordChange}
                ref={passwordInputRef}
                isLoginEnabled={isLoginButtonEnabled}
                doLogin={() => {
                  Keyboard.dismiss();
                  doEmailAndPasswordAuth();
                }}
              />
            );
            break;
          case 'authButtonItem':
            renderItem = (
              <AuthButtonItem
                doAuth={doEmailAndPasswordAuth}
                isEnabled={isLoginButtonEnabled}
                isLoading={screenState.state === State.LOADING}
                forgotPasswordClicked={() => void 0}
                isLoginScreen={isLoginScreen}
              />
            );
            break;
          case 'bottomAuthItem':
            renderItem = (
              <BottomAuthItem
                isLoginScreen={isLoginScreen}
                onClick={onBottomAuthButtonClicked}
              />
            );
            break;
          default:
            break;
        }
        return renderItem;
      }}
      showPaddingHorizontal={true}
      showExtraBottomPadding={true}
      itemSeparator={'undefined'}
      extraPaddingHorizontal={paddingHorizontal}
    />
  );
};

export default AuthScreen;
