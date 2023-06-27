import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screen/login/LoginScreen';

const AuthStack = createStackNavigator();

export const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="LogIn" component={LoginScreen} />
    </AuthStack.Navigator>
  );
};
