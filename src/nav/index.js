import React from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Menu, Button } from 'stardust'
import { signInSuccess, signOutSuccess } from '../data/auth'


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
    },
    signOutSuccess: () => {
      dispatch(signOutSuccess())
    }
  }
}

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const token = this.props.token;
    const registered = this.props.userid;
    return (
      <Menu stackable>
        <Menu.Item
          name="semantic todo"
          as={Link}
          to="/"
        />

        <Menu.Item
          name="home"
          as={Link}
          to="/"
        />

        <Menu.Item
          name="todos"
          as={Link}
          to="/todos"
        />

        <Menu.Item
          name="about"
          as={Link}
          to="/about"
        />

        <Menu.Menu position='right'>
          {!token && (
            <Menu.Item
              name="login"
              as={Link}
              to="/login" />
          )}

          {!registered && !token && (
            <Menu.Item>
              <Button primary as={Link} to="/signup">Sign Up</Button>
            </Menu.Item>
          )}

          {token && (
            <Menu.Item
              name="logout"
              onClick={() => {
                cookie.remove('token');
                cookie.remove('userid');
                cookie.remove('registered');
                this.forceUpdate();
                this.props.signOutSuccess();
              }} />
          )}
        </Menu.Menu>
      </Menu>
    )
  }
}

Nav.displayName = 'Nav';

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
