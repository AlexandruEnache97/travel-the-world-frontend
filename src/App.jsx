import React from 'react';
import { Provider } from 'react-redux';
import LandingPage from './pages/LandingPage/LandingPage';
import store from './redux/store';
import './scss/main.scss';

const App = () => (
  <Provider store={store}>
    <LandingPage />
  </Provider>
);

export default App;
