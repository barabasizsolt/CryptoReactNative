import { ReactElement, RefObject, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput, View } from 'react-native';
import AuthenticationTextInput from '../../../components/catalog/AuthenticationTextInput';
import { useAppTheme } from '../../../theme/ThemeContext';

type EmailInputItemProps = {
  email: string;
  onEmailChange: (email: string) => void;
  passwordInputRef: RefObject<TextInput>;
};

export const EmailInputItem = forwardRef<TextInput, EmailInputItemProps>(
  (
    { email, onEmailChange, passwordInputRef }: EmailInputItemProps,
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
