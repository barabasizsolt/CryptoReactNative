import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme, useNavigationTheme } from '../theme/ThemeContext';
import { ContentColorProvider } from '../theme/ContentColorContext';
import CryptoCurrencyScreen from '../screen/CryptoCurrencyScreen';
import { NewsScreen } from '../screen/NewsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { Text } from 'react-native';
import { WindowClassProvider } from '../components/windowsize/windowSizeContext';

const Tab = createBottomTabNavigator();

export const ThemedNavigationContainer = () => {
    const navigationTheme = useNavigationTheme()
    return (
        <ContentColorProvider contentColor={navigationTheme.colors.text}>
                <WindowClassProvider>
                    <SafeAreaProvider>
                        <NavigationContainer theme={navigationTheme}>
                                <Tabs/>
                        </NavigationContainer>
                    </SafeAreaProvider>
                </WindowClassProvider>
        </ContentColorProvider>
    )
}

const Tabs = () => {
    const insets = useSafeAreaInsets();
    const { colors, dimensions } = useAppTheme()

    return(
        <Tab.Navigator
            screenOptions={{ 
                headerShown: false,
                tabBarActiveTintColor: colors.bottomNavSelected,
                tabBarInactiveTintColor: colors.bottomNavNotSelected,
                tabBarStyle: { 
                    height: dimensions.bottomNavBarHeight + insets.bottom,
                    paddingVertical: dimensions.smallPadding
                }
            }}
            initialRouteName="CryptoScreen">
            <Tab.Screen 
                name="CryptoScreen"
                component={ CryptoCurrencyScreen }
                options={{
                    tabBarLabel: ({ color }) => <TabBarLabel name="Market" color={color}/>,
                    tabBarIcon: ({ color, size }) => (<Fontisto name="bitcoin" color={color} size={size} />)
                }}
            />
            <Tab.Screen 
                name="NewsScreen"
                component={ NewsScreen }
                options={{
                    tabBarLabel: ({ color }) => <TabBarLabel name="News" color={color}/>,
                    tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="newspaper" color={color} size={size} />)
                }}
            />
        </Tab.Navigator>
    )
}

type TabBarLabelProps = {
    name: string,
    color: string
}

const TabBarLabel = (props: TabBarLabelProps): JSX.Element => {
    const { typography, dimensions } = useAppTheme()
    return ( <Text style={[typography.smallLabel, { color: props.color, paddingBottom: dimensions.smallPadding}]}>{props.name}</Text>)
}