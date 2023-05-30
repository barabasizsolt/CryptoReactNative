import { ThemeProvider } from './src/feature/theme/ThemeContext';
import React, { useEffect } from 'react';
import { ThemedNavigationContainer } from './src/feature/navigation/AppNavigation';
import {
  initializeLocalization,
  useDeviceLanguageCode,
  onLanguageChange,
} from './src/i18n_init';

initializeLocalization();

const App = (): JSX.Element => {
  const languageCode = useDeviceLanguageCode();
  useEffect(() => {
    onLanguageChange(languageCode);
  }, [languageCode]);

  return (
    <ThemeProvider>
      <ThemedNavigationContainer />
    </ThemeProvider>
  );
};

export default App;
