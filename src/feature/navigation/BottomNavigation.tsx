import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NewsScreen } from '../screen/news/NewsScreen';
import { useAppTheme } from '../theme/ThemeContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavParamList } from './types';
import CryptoCurrencyScreen from '../screen/crypto/CryptoCurrencyScreen';
import { TranslatedText } from '../catalog/TranslatedText';
import { ReactElement } from 'react';

const Tab = createBottomTabNavigator<BottomNavParamList>();

const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets();
  const { colors, dimensions } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.bottomNavSelected,
        tabBarInactiveTintColor: colors.bottomNavNotSelected,
        tabBarStyle: {
          height: dimensions.bottomNavBarHeight + insets.bottom,
          paddingVertical: dimensions.smallPadding,
          borderTopWidth: 0,
        },
      }}
      initialRouteName="Market">
      <Tab.Screen
        name="Market"
        component={CryptoCurrencyScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <TabBarLabel translatedTextKey="label_market" color={color} />
          ),
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="bitcoin" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <TabBarLabel translatedTextKey="label_news" color={color} />
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="newspaper"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

type TabBarLabelProps = {
  translatedTextKey: string;
  color: string;
};

const TabBarLabel = (props: TabBarLabelProps): ReactElement => {
  const { typography, dimensions } = useAppTheme();
  return (
    <TranslatedText
      style={[
        typography.smallLabel,
        { color: props.color, paddingBottom: dimensions.smallPadding },
      ]}
      textKey={props.translatedTextKey}></TranslatedText>
  );
};

export default BottomTabNavigator;
