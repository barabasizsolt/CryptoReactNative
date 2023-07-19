import * as React from 'react';
import {
  useNavigationBuilder,
  createNavigatorFactory,
  TabRouter,
} from '@react-navigation/native';
import type {
  TabRouterOptions,
  TabActionHelpers,
} from '@react-navigation/native';
import RailsAndBottomTabView from './RailsAndBottomTabView';
import type {
  DefaultNavigatorOptions,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import type {
  BottomTabNavigationConfig,
  BottomTabNavigationOptions,
  BottomTabNavigationEventMap,
} from '@react-navigation/bottom-tabs/src/types';

type Props = DefaultNavigatorOptions<
  ParamListBase,
  TabNavigationState<ParamListBase>,
  BottomTabNavigationOptions,
  BottomTabNavigationEventMap
> &
  TabRouterOptions &
  BottomTabNavigationConfig & {
    useTab: boolean;
  };

// copy of createBottomTabNavigator (react-navigation/bottom-tabs), but using RailsAndBottomTabView
function RailAndBottomTabNavigator({
  useTab,
  id,
  initialRouteName,
  backBehavior,
  children,
  screenListeners,
  screenOptions,
  ...rest
}: Props) {
  const { state, descriptors, navigation, NavigationContent } =
    useNavigationBuilder<
      TabNavigationState<ParamListBase>,
      TabRouterOptions,
      TabActionHelpers<ParamListBase>,
      BottomTabNavigationOptions,
      BottomTabNavigationEventMap
    >(TabRouter, {
      id,
      initialRouteName,
      backBehavior,
      children,
      screenListeners,
      screenOptions,
    });

  return (
    <NavigationContent>
      <RailsAndBottomTabView
        {...rest}
        state={state}
        useTab={useTab}
        navigation={navigation}
        descriptors={descriptors}
      />
    </NavigationContent>
  );
}

export default createNavigatorFactory(RailAndBottomTabNavigator);
