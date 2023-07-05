import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../../screen/auth/AuthScreen';

const AuthStack = createStackNavigator();

export const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Auth" component={AuthScreen} />
    </AuthStack.Navigator>
  );
};
