import * as React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './src/app/store/index';
import {RouterContainer} from './src/app/routes';
import {NavigationContainer} from '@react-navigation/native';

function App() {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <RouterContainer />
      </NavigationContainer>
    </ReduxProvider>
  );
}

export default App;
