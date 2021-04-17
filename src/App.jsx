/* eslint-disable import/no-named-as-default */
import React from 'react';
import {
  HashRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import LandingPage from './pages/LandingPage/ConnectedLandingPage';
import store from './redux/store';
import './scss/main.scss';
import ConnectedLoadingOverlay from './pages/LoadingOverlay/ConnectedLoadingOverlay';
import ProtectedRoute from './components/ProtectedRoute/ConnectedProtectedRoute';
import Dashboard from './pages/Dashboard/ConnectedDashboard';
import MapComponent from './pages/Map/MapComponent';

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/map" component={MapComponent} />
        <Route path="/" component={LandingPage} />
      </Switch>
      <ConnectedLoadingOverlay />
    </HashRouter>
  </Provider>
);

export default App;
