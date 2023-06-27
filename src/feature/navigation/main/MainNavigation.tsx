import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomNavigation';
import CryptoCurrencyDetailScreen from '../../screen/cryptodetail/CryptoCurrencyDetailScreen';
import { AppNavParamList } from '../types';

const MainStack = createStackNavigator<AppNavParamList>();

export const MainStackNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="BottomNav" component={BottomTabNavigator} />
      <MainStack.Screen
        name="CryptoCurrencyDetail"
        component={CryptoCurrencyDetailScreen}
      />
    </MainStack.Navigator>
  );
};
