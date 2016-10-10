import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Button, Form, Message } from 'stardust';
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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
  }

  handleSubmit = (e, serializedForm) => {
    e.preventDefault()
    for (let item in serializedForm) {
      if (!serializedForm[item]) {
        this.setState({error: `${item} cannot be empty!`});
        return;
      }
    }
    axios.post('http://localhost:3030/users/login', serializedForm)
    .then((response) => {
      cookie.save('userid', response.data.userid);
      cookie.save('token', response.data.token);
      this.props.signInSuccess(true, response.data.userid, response.data.token)
      this.setState({ error: false });
    })
    .catch((error) => {
      this.setState({ error });
    });
  }

  render() {
    const token = cookie.load('token');
    const { error } = this.state;
    return (
      <div>
        <h1>Login</h1>
        {error && (
          <Message color="red">
            {error}
          </Message>
        )}
        {token ? (
          <Message color="green">
            You have successfully been logged in!
          </Message>
          ) : (
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Username</label>
              <input
                name="username"
                type="text"
                placeholder='Username' />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder='Password' />
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form>
        )}
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
