import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigationTheme } from '../theme/ThemeContext';
import { ContentColorProvider } from '../theme/ContentColorContext';
import React from 'react';
import { WindowClassProvider } from '../components/windowsize/windowSizeContext';
import { createStackNavigator } from '@react-navigation/stack';
import CryptoCurrencyDetailScreen from '../screen/cryptodetail/CryptoCurrencyDetailScreen';
import { AppNavParamList } from './types';
import BottomTabNavigator from './BottomNavigation';

export const ThemedNavigationContainer = () => {
  const navigationTheme = useNavigationTheme();
  return (
    <ContentColorProvider contentColor={navigationTheme.colors.text}>
      <WindowClassProvider>
        <SafeAreaProvider>
          <NavigationContainer theme={navigationTheme}>
            <StackNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </WindowClassProvider>
    </ContentColorProvider>
  );
};

const Stack = createStackNavigator<AppNavParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomNav" component={BottomTabNavigator} />
      <Stack.Screen
        name="CryptoCurrencyDetail"
        component={CryptoCurrencyDetailScreen}
      />
    </Stack.Navigator>
  );
};
