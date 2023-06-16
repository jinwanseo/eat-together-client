import * as React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './src/app/store/index';
import {RouterContainer} from './src/app/routes';

function App() {
  return (
    <ReduxProvider store={store}>
      <RouterContainer />
    </ReduxProvider>
  );
}

export default App;
