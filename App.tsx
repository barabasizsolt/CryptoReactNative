import { ThemeProvider } from './src/feature/theme/ThemeContext';
import React, { useEffect } from 'react';
import { ThemedNavigationContainer } from './src/feature/navigation/AppNavigation';
import {
  initializeLocalization,
  useDeviceLanguageCode,
  onLanguageChange,
} from './src/i18n_init';
import rootReducer from './src/core/redux/reducers';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Orientation from 'react-native-orientation-locker';
import DeviceInfo from 'react-native-device-info';

initializeLocalization();
const store = configureStore({ reducer: rootReducer });

const App = (): JSX.Element => {
  const languageCode = useDeviceLanguageCode();

  useEffect(() => {
    onLanguageChange(languageCode);
  }, [languageCode]);

  /* Lock orientation on phones: [Not working on IOS, IOS: disabled from xCode] */
  useEffect(() => {
    if (!DeviceInfo.isTablet()) {
      Orientation.lockToPortrait();
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <ThemedNavigationContainer />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
