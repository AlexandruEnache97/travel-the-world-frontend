import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import LandingPage from './pages/LandingPage/ConnectedLandingPage';
import store from './redux/store';
import './scss/main.scss';
import ConnectedLoadingOverlay from './pages/LoadingOverlay/ConnectedLoadingOverlay';
import ProtectedRoute from './components/ProtectedRote/ConnectedProtectedRoute';
import Dashboard from './pages/Dashboard/ConnectedDashboard';

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route path="/" component={LandingPage} />
      </Switch>
      <ConnectedLoadingOverlay />
    </Router>
  </Provider>
);

export default App;
