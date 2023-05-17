import { NavigationContainer } from '@react-navigation/native';
import ExploreScreen from './src/feature/screen/CryptoCurrencyScreen';
import { ContentColorProvider } from './src/feature/theme/ContentColorContext';
import { ThemeProvider, useNavigationTheme } from './src/feature/theme/ThemeContext';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = (): JSX.Element => {
    return(
        <ThemeProvider>
            <ThemedNavigationContainer/>
        </ThemeProvider>
    )
}

const ThemedNavigationContainer = () => {
    const navigationTheme = useNavigationTheme()
    return (
        <ContentColorProvider contentColor={navigationTheme.colors.text}>
            <NavigationContainer theme={navigationTheme}>
                {/* <AppRootNavigationStacks /> */}
                <SafeAreaProvider>
                    <ExploreScreen/>
                </SafeAreaProvider>
            </NavigationContainer>
        </ContentColorProvider>
    )
}

export default App
