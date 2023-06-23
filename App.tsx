import * as React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './src/app/store/index';
import {NavigationContainer} from '@react-navigation/native';
import AppRoutes from './src/pages/AppRoutes';
import {enableLatestRenderer} from 'react-native-maps';
enableLatestRenderer();

function App() {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </ReduxProvider>
  );
}

export default App;
