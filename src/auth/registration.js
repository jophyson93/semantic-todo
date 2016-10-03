import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Button, Checkbox, Form, Message } from 'stardust';

export default
class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
  }

  handleSubmit = (e, serializedForm) => {
    e.preventDefault()
    if (!serializedForm.agree) {
      this.setState({ error: 'You must agree to the Terms and Conditions to register' });
      return;
    }
    for (let item in serializedForm) {
      if (!serializedForm[item]) {
        this.setState({error: `${item} cannot be empty!`});
        return;
      }
    }
    axios.post('http://localhost:3030/users', serializedForm)
    .then((response) => {
      cookie.save('registered', true);
      this.setState({ error: false });
      console.log(response);
    })
    .catch((error) => {
      this.setState({ error });
      console.log(error);
    });
  }

  render() {
    const registered = cookie.load('registered');
    const { error } = this.state;
    return (
      <div>
        <h1>Registration</h1>
        {error && (
          <Message color="red">
            {error}
          </Message>
        )}
        {registered ? (
          <Message color="green">
            You have successfully been registered!
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
              <label>Email Address</label>
              <input
                name="email"
                type="email"
                placeholder='Email' />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder='Password' />
            </Form.Field>
            <Form.Field>
              <Checkbox name="agree" label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form>
        )}
      </div>
    )
  }
}
