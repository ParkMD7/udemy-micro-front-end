import React, { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Router, Redirect } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

import Header from './components/Header';
import Progress from './components/Progress';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

// prevent auto-generated css class name collisions between micro-frontends
const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
})

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);

  const handleAuthChange = () => {
    setIsSignedIn(!isSignedIn);
  };

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header isSignedIn={isSignedIn} onAuthChange={handleAuthChange} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onAuthChange={handleAuthChange} />
              </Route>
              {!isSignedIn && <Redirect to="/auth/signin" />}
              <Route path="/dashboard">
                {/* {!isSignedIn && <Redirect to="/" />} */}
                <DashboardLazy />
              </Route>
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
