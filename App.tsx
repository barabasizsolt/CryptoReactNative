import { ThemeProvider } from './src/feature/theme/ThemeContext';
import React from 'react';
import { ThemedNavigationContainer } from './src/feature/navigation/AppNavigation';

const App = (): JSX.Element => {
  return (
    <ThemeProvider>
      <ThemedNavigationContainer />
    </ThemeProvider>
  );
};

export default App;
