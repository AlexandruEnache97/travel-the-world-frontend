import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => (
  <Provider store={store}>
    <h1>React App</h1>
  </Provider>
);

export default App;
