import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// mount fn to start up the app
const mount = (element) => {
  ReactDOM.render(
   <App />,
   element,
  );
}

// check if we are running this file in development & in isolation call mount immediately
if (process.env.NODE_ENV === 'development') {
  console.log('process.env.NODE_ENV', process.env.NODE_ENV)
  const devRoot = document.querySelector('#_marketing-dev-root');

  if (devRoot) {
    mount(devRoot)
  }
}

// means we are likely running this file in development or prod in HOST microservice
export { mount };