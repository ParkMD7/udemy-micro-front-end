import { createApp } from 'vue';
import Dashboard from './components/Dashboard.vue';

// mount fn to start up the app
// attach microfrontend to passed in element and allow of memory navigation
const mount = (element) => {
  const app = createApp(Dashboard);
  app.mount(element);
}

// check if we are running this file in development & in isolation call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_dashboard-dev-root');

  if (devRoot) {
    mount(devRoot)
  }
}

// means we are likely running this file in development or prod in HOST microservice
export { mount };