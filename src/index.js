import App from './app';
import routes from './routes';
import Layout from './layout';

export const reducers = {
  title: state => state
};

export const initialState = {
  title: 'semantic-todo'
};

App({ reducers, initialState, Layout, routes }).render();
