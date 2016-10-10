import App from './app';
import routes from './routes';
import Layout from './layout';

//ACTION TYPES
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'

// ACTION CREATORS
export function signInSuccess(loggedIn, userid, token) {
  return {
    type: SIGN_IN_SUCCESS,
    loggedIn,
    userid,
    token,
  }
}

export const stateReducers = {
  title: state => state,
  loggedIn: state => state,
  userid: state => state,
  token: state => state,
};


export const initialState = {

};



App({initialState, Layout, routes }).render();
