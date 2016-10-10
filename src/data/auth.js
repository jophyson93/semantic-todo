
// ACTION TYPES
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE'
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS'

// ACTION CREATORS
export function signInSuccess(loggedIn, userid, token) {
  return {
    type: SIGN_IN_SUCCESS,
    loggedIn,
    userid,
    token,
  }
}

export function signOutSuccess() {
  return {
    type: SIGN_OUT_SUCCESS
  }
}

export function signInFailure(loggedIn, errorMessage) {
  return {
    type: SIGN_IN_FAILURE,
    loggedIn,
    errorMessage
  }
}
/*
// PULLING DATA IN FROM THE COOKIES
const userid = cookie.load('userid')
const token = cookie.load('token')
*/

// INITIAL STORE STATE
const defaultState = {
      loggedIn: false,
      userid: "userid",
      token: "token"

}
// REDUCERS
export default function userInfo(state = defaultState, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:

      return {
        ...state,
        loggedIn: action.loggedIn,
        userid: action.userid,
        token: action.token,
      }
    case SIGN_OUT_SUCCESS:

      return {
        ...state,
        loggedIn: false,
        userid: '',
        token: ''
      }
    case SIGN_IN_FAILURE:

      return {
        loggedIn: false,
        errorMessage: action.errorMessage
      }
    default:

      return state
  }
}
