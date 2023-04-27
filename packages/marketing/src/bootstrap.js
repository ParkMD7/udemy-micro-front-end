import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';

import App from './App';

// mount fn to start up the app
// attach microfrontend to passed in element and allow of memory navigation
const mount = (element, { onNavigate, defaultHistory }) => {
  const history = defaultHistory || createMemoryHistory();

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, element);

  return {
    // anytime parent microfe navigates then call this fn to sync navigations
    onParentNavigate({ pathname: nextPathname }) {
      // get current location in our container
      const { pathname } = history.location;

      // if current path does not equal next path then update history
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    }
  };
}

// check if we are running this file in development & in isolation call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root');

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() })
  }
}

// means we are likely running this file in development or prod in HOST microservice
export { mount };