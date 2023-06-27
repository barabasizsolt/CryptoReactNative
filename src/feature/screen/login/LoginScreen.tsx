import { ReactElement } from 'react';
import { View } from 'react-native';
import { PrimaryButton } from '../../catalog/PrimaryButton';
import { useAppTheme } from '../../theme/ThemeContext';
import { useLoginScreenState } from './LoginScreenState.hooks';
import { State } from '../../components/state/state';
import LoadingIndicator from '../../catalog/LoadingIndicator';

const LoginScreen = (): ReactElement => {
  const { dimensions } = useAppTheme();
  const { screenState, doLogin } = useLoginScreenState();

  if (screenState.state === State.LOADING) {
    return <LoadingIndicator />;
  } else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            width: '100%',
            paddingHorizontal: dimensions.screenPadding,
          }}>
          <PrimaryButton textKey={'login'} onPress={doLogin} />
        </View>
      </View>
    );
  }
};

export default LoginScreen;
