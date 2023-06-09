import { ReactElement } from 'react';
import { View } from 'react-native';
import { PrimaryButton } from '../../components/catalog/PrimaryButton';
import { useAppTheme } from '../../theme/ThemeContext';
import { useSettingsScreenState } from './SettingsScreenState.hooks';
import LoadingIndicator from '../../components/catalog/LoadingIndicator';
import { State } from '../../components/state/state';

const SettingsScreen = (): ReactElement => {
  const { dimensions } = useAppTheme();
  const { screenState, doLogout } = useSettingsScreenState();

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
          <PrimaryButton
            textKey={'logout'}
            onPress={doLogout}
            isEnabled={true}
            textStyle={{
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}
          />
        </View>
      </View>
    );
  }
};

export default SettingsScreen;
