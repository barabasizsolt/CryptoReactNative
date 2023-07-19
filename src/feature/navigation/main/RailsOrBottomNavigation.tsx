import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NewsScreen } from '../../screen/news/NewsScreen';
import { useAppTheme } from '../../theme/ThemeContext';
import { BottomNavParamList } from '../types';
import CryptoCurrencyScreen from '../../screen/crypto/CryptoCurrencyScreen';
import { TranslatedText } from '../../components/catalog/TranslatedText';
import { ReactElement } from 'react';
import SettingsScreen from '../../screen/settings/SettingsScreen';
import createRailsOrBottomTabNavigator from './rails/RailsOrBottomTabNavigator';
import { useWindowWidthClass } from '../../components/windowsize/windowSizeContext';
import { WindowType } from '../../components/windowsize/windowTypes';

const TabOrRails = createRailsOrBottomTabNavigator<BottomNavParamList>();

const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets();
  const { colors, dimensions } = useAppTheme();
  const windowClassWidth = useWindowWidthClass();

  return (
    <TabOrRails.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.bottomNavSelected,
        tabBarInactiveTintColor: colors.bottomNavNotSelected,
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          height: dimensions.bottomNavBarHeight + insets.bottom,
          paddingVertical: dimensions.smallPadding,
          borderTopWidth: 1,
          borderTopColor: colors.disabled,
          backgroundColor: colors.background,
        },
      }}
      initialRouteName="Market"
      useTab={windowClassWidth <= WindowType.Compact}>
      <TabOrRails.Screen
        name="Market"
        component={CryptoCurrencyScreen}
        options={{
          tabBarLabel: ({ color }: { color: string }) => (
            <TabBarLabel translatedTextKey="label_market" color={color} />
          ),
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Fontisto name="bitcoin" color={color} size={size} />
          ),
        }}
      />
      <TabOrRails.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarLabel: ({ color }: { color: string }) => (
            <TabBarLabel translatedTextKey="label_news" color={color} />
          ),
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialCommunityIcons
              name="newspaper"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <TabOrRails.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: ({ color }: { color: string }) => (
            <TabBarLabel translatedTextKey="label_settings" color={color} />
          ),
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialCommunityIcons
              name="cog-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </TabOrRails.Navigator>
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
