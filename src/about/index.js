import React from 'react';
import { connect } from 'react-redux'
import { signInSuccess } from '../data/auth'

const mapStateToProps = (state) => {
  return {
       loggedIn: state._root.entries[0][1].loggedIn,
       userid: state._root.entries[0][1].userid,
       token: state._root.entries[0][1].token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signInSuccess: (loggedIn, userid, token) => {
      dispatch(signInSuccess(loggedIn, userid, token))
    }
  }
}

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
  }

  render() {
    return (
      <h1>About</h1>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(About);
