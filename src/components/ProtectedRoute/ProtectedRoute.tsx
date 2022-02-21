import * as React from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';

interface ProtectedRoute {
  component: React.ComponentType<any>,
  path: string,
  auth: {
    accountData: {
      username: string,
      email: string,
      profileImage: string,
      country: string,
      userLocation: {
        lat: number,
        lng: number
      }
    },
    accountId: string,
    isAuthenticated: boolean
  },
}

const ProtectedRoute: React.FC<ProtectedRoute> = ({ component: Component, auth, ...rest }) => {
  const { isAuthenticated } = auth;
  return (
    <Route
      {...rest}
      render={(props) => (isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      ))}
    />
  );
};

export default ProtectedRoute;
