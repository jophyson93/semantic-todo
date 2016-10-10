import ChartMonitor from 'redux-devtools-chart-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import Immutable from 'immutable';
import LogMonitor from 'redux-devtools-log-monitor';
import React from 'react';
import ReactDOM from 'react-dom';
import SliderMonitor from 'redux-slider-monitor';
import createLogger from 'redux-logger';
import { LOCATION_CHANGE, syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { combineReducers } from 'redux-immutable';
import { applyMiddleware, compose, createStore } from 'redux';
import { createDevTools, persistState } from 'redux-devtools';
//import { SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, SIGN_IN_FAILURE } from './data/auth'
import userInfo from './data/auth'

const IS_PROD = process.env.NODE_ENV !== 'development';
const NOOP = () => null;

let DevTools = IS_PROD ? NOOP : createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    changeMonitorKey="ctrl-m"
    defaultIsVisible={false}>
      <LogMonitor />
      <SliderMonitor />
      <ChartMonitor />
  </DockMonitor>
);

const initialEnhancers = IS_PROD ? [] : [
  DevTools.instrument(),
  persistState(location.href.match(/[?&]debug_session=([^&]+)\b/))
];

export default (options) => {
  let {
    initialState = {},
    Layout = NOOP,
    loggerOptions = {},
    middleware = [],
    enhancers = {},
    routes = []
  } = options;

/*
 const defaultState = {
    title: 'semantic-todo',
    loggedIn: false,
    userid: '',
    token: ''
  };
*/
  const frozen = Immutable.fromJS(initialState);

  const routing = (state = frozen, action) => {
    return action.type === LOCATION_CHANGE ?
      state.merge({ locationBeforeTransitions: action.payload }) :
      state;
  };
/*
  // REDUCERS
    function reducers(state = defaultState, action) {
      switch (action.type) {
        case SIGN_IN_SUCCESS:
          return {
            loggedIn: action.loggedIn,
            userid: action.userid,
            token: action.token
          };
        default:
          return state;
      }
    }
*/
  //const userInfo = combineReducers({ reducers, routing })

  const reducers = combineReducers({userInfo, routing})

  const initialMiddleware = [createLogger(loggerOptions)];

  const store = createStore(
    reducers,
    compose(
      applyMiddleware(...initialMiddleware, ...middleware),
      ...initialEnhancers,
      ...enhancers
    )
  );

  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: state => state.has('routing') ? state.get('routing').toJS() : null
  });

  const LayoutWrapper = (props) => (
    <div id="wrapper">
      <Layout {...props} />
      <DevTools />
    </div>
  );

  return {
    history,
    render(rootElement = document.getElementById('root')) {
      ReactDOM.render(
        <Provider store={store}>
          <Router history={history}>
            <Route component={LayoutWrapper}>
              {routes()}
            </Route>
          </Router>
        </Provider>,
        rootElement
      );
    }
  };
};
