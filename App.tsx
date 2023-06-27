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

initializeLocalization();

const store = configureStore({ reducer: rootReducer });

const App = (): JSX.Element => {
  const languageCode = useDeviceLanguageCode();

  useEffect(() => {
    onLanguageChange(languageCode);
  }, [languageCode]);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <ThemedNavigationContainer />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
