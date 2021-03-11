import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import LandingPage from './pages/LandingPage/LandingPage';
import store from './redux/store';
import './scss/main.scss';

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" component={LandingPage} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
