import {
  ReactElement,
  ReactNode,
  RefObject,
  forwardRef,
  useState,
} from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthenticationTextInput from '../../../components/catalog/AuthenticationTextInput';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../../../theme/ThemeContext';
import { StyleProp, ViewStyle } from 'react-native';

type PasswordInputItemProps = {
  password: string;
  onPasswordChange: (password: string) => void;
  isLoginEnabled: boolean;
  doLogin: () => void;
  ref: RefObject<TextInput>;
};

export const PasswordInputItem = forwardRef<TextInput, PasswordInputItemProps>(
  (
    {
      password,
      onPasswordChange,
      isLoginEnabled,
      doLogin,
    }: PasswordInputItemProps,
    ref,
  ): ReactElement => {
    const [visible, setVisible] = useState<boolean>(false);

    return (
      <PasswordItemHolder>
        <PasswordIcon visible={visible} setVisible={setVisible} />
        <Input
          password={password}
          onPasswordChange={onPasswordChange}
          visible={visible}
          isLoginEnabled={isLoginEnabled}
          doLogin={doLogin}
          ref={ref}
        />
      </PasswordItemHolder>
    );
  },
);

type PasswordItemHolderProps = {
  style?: StyleProp<ViewStyle> | undefined;
  children: ReactNode;
};

const PasswordItemHolder = (props: PasswordItemHolderProps): ReactElement => {
  const { dimensions } = useAppTheme();

  return (
    <View
      style={[
        props.style,
        styles.holder,
        { paddingHorizontal: dimensions.screenPadding },
      ]}>
      {props.children}
    </View>
  );
};

type PasswordIconProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
};

const PasswordIcon = (props: PasswordIconProps): ReactElement => {
  const { dimensions, colors } = useAppTheme();

  return (
    <Pressable
      style={[styles.icon, { paddingEnd: dimensions.screenPadding * 2 }]}
      onPress={() => {
        props.setVisible(!props.visible);
      }}>
      <MaterialCommunityIcons
        name={props.visible ? 'eye' : 'eye-off'}
        color={colors.onBackground}
        size={24}
      />
    </Pressable>
  );
};

type TextInputProps = {
  password: string;
  onPasswordChange: (value: string) => void;
  visible: boolean;
  isLoginEnabled: boolean;
  doLogin: () => void;
};

const Input = forwardRef<TextInput, TextInputProps>(
  (
    {
      password,
      onPasswordChange,
      visible,
      isLoginEnabled,
      doLogin,
    }: TextInputProps,
    ref,
  ): ReactElement => {
    const { t } = useTranslation();

    return (
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
    );
  },
);

const styles = StyleSheet.create({
  holder: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon: {
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
  },
});
