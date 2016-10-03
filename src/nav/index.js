import React from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Menu, Button } from 'stardust'

const mapStateToProps = state => ({ title: state.get('title') });

export class Nav extends React.Component {
  render() {
    const token = cookie.load('token');
    const registered = cookie.load('registered');
    const { title } = this.props;
    return (
      <Menu stackable>
        <Menu.Item
          name={title}
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
          {!registered && !token && (
            <Menu.Item
              name="login"
              as={Link}
              to="/login" />
          )}

          {!token && (
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
              }} />
          )}
        </Menu.Menu>
      </Menu>
    )
  }
}

Nav.displayName = 'Nav';

export default connect(mapStateToProps)(Nav);
