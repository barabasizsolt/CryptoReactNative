import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigationTheme } from '../theme/ThemeContext';
import { ContentColorProvider } from '../theme/ContentColorContext';
import { WindowClassProvider } from '../components/windowsize/windowSizeContext';
import { AuthStackNavigator } from './auth/AuthNavigation';
import { MainStackNavigator } from './main/MainNavigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../core/redux/reducers';
import { useAuthStateChange } from '../../core/repository/AuthenticationRepository';
import LoadingIndicator from '../components/catalog/LoadingIndicator';

export const ThemedNavigationContainer = () => {
  const navigationTheme = useNavigationTheme();
  const { isLoading } = useAuthStateChange();

  if (isLoading) {
    return <LoadingIndicator />;
  } else {
    return (
      <ContentColorProvider contentColor={navigationTheme.colors.text}>
        <WindowClassProvider>
          <SafeAreaProvider>
            <NavigationContainer theme={navigationTheme}>
              <AppNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </WindowClassProvider>
      </ContentColorProvider>
    );
  }
};

const AppNavigator = () => {
  const isLoggedIn: boolean = useSelector(
    (state: RootState) => state.authentication,
  ).isLoggedIn;

  return isLoggedIn ? <MainStackNavigator /> : <AuthStackNavigator />;
};
