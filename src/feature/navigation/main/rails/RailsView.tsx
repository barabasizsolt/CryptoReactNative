import { View, StyleSheet, Platform } from 'react-native';
import { MissingIcon } from '@react-navigation/elements';
import type {
  BottomTabDescriptorMap,
  BottomTabNavigationHelpers,
} from '@react-navigation/bottom-tabs/src/types';
import type {
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import type { EdgeInsets } from 'react-native-safe-area-context';
import {
  CommonActions,
  NavigationContext,
  NavigationRouteContext,
  useLinkBuilder,
  useTheme,
} from '@react-navigation/native';
import BottomTabItem from '@react-navigation/bottom-tabs/lib/module/views/BottomTabItem';

export interface RailsViewProps {
  state: TabNavigationState<ParamListBase>;
  navigation: BottomTabNavigationHelpers;
  descriptors: BottomTabDescriptorMap;
  insets: EdgeInsets;
}

export const RailsView = ({
  state,
  navigation,
  descriptors,
  insets,
}: RailsViewProps) => {
  const { colors } = useTheme();
  const buildLink = useLinkBuilder();

  const focusedRoute = state.routes[state.index];
  const focusedDescriptor = descriptors[focusedRoute.key];
  const focusedOptions = focusedDescriptor.options;
  const {
    tabBarShowLabel,
    tabBarActiveTintColor,
    tabBarInactiveTintColor,
    tabBarActiveBackgroundColor,
    tabBarInactiveBackgroundColor,
  } = focusedOptions;
  const { routes } = state;
  return (
    <View
      style={[
        styles.railBar,
        {
          backgroundColor: colors.background,
          borderRightColor: colors.border,
          paddingLeft: insets.left,
          paddingBottom: insets.bottom,
          paddingTop: insets.top,
        },
      ]}>
      <View accessibilityRole="tablist" style={styles.content}>
        {routes.map((route, index) => {
          const focused = index === state.index;
          const { options } = descriptors[route.key];

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.dispatch({
                ...CommonActions.navigate({ name: route.name, merge: true }),
                target: state.key,
              });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const accessibilityLabel =
            options.tabBarAccessibilityLabel !== undefined
              ? options.tabBarAccessibilityLabel
              : typeof label === 'string' && Platform.OS === 'ios'
              ? `${label}, tab, ${index + 1} of ${routes.length}`
              : undefined;

          return (
            <NavigationContext.Provider
              key={route.key}
              value={descriptors[route.key].navigation}>
              <NavigationRouteContext.Provider value={route}>
                <BottomTabItem
                  route={route}
                  descriptor={descriptors[route.key]}
                  focused={focused}
                  horizontal={false}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  accessibilityLabel={accessibilityLabel}
                  to={buildLink(route.name, route.params)}
                  testID={options.tabBarTestID}
                  allowFontScaling={options.tabBarAllowFontScaling}
                  activeTintColor={tabBarActiveTintColor}
                  inactiveTintColor={tabBarInactiveTintColor}
                  activeBackgroundColor={tabBarActiveBackgroundColor}
                  inactiveBackgroundColor={tabBarInactiveBackgroundColor}
                  button={options.tabBarButton}
                  icon={
                    options.tabBarIcon ??
                    (({ color, size }) => (
                      <MissingIcon color={color} size={size} />
                    ))
                  }
                  badge={options.tabBarBadge}
                  badgeStyle={options.tabBarBadgeStyle}
                  label={label}
                  showLabel={tabBarShowLabel}
                  labelStyle={options.tabBarLabelStyle}
                  iconStyle={options.tabBarIconStyle}
                  style={[styles.itemStyle, options.tabBarItemStyle]}
                />
              </NavigationRouteContext.Provider>
            </NavigationContext.Provider>
          );
        })}
      </View>
    </View>
  );
};

const DEFAULT_TABBAR_HEIGHT = 56;

const styles = StyleSheet.create({
  railBar: {
    left: 0,
    right: 0,
    bottom: 0,
    borderRightWidth: StyleSheet.hairlineWidth,
    elevation: 8,
    flexShrink: 1,
    minWidth: DEFAULT_TABBAR_HEIGHT,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
    gap: 16,
  },
  itemStyle: {
    minHeight: DEFAULT_TABBAR_HEIGHT,
    flexBasis: 1,
    flexGrow: 0,
  },
});
