import React from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { List, Menu, Button, Modal, Form } from 'stardust';
import Todo from './todo';

export default class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      creatingTodo: false
    }
  }

  componentWillMount() {
    this.refresh();
  }

  refresh = () => {
    const token = cookie.load('token');
    const taxios = axios.create({
      headers: {
        Authorization: `JWT ${token}`
      }
    });
    taxios.get('http://localhost:3030/todos')
    .then((response) => {
      this.setState({ todos: response.data, error: false });
    })
    .catch((error) => {
      this.setState({ error });
    });
  }

  toggleItem = (id, index) => {
    const token = cookie.load('token');
    const taxios = axios.create({
      headers: {
        Authorization: `JWT ${token}`
      }
    });
    const todos = this.state.todos;
    const todoItem = todos[index];
    todoItem.complete = !todoItem.complete;
    taxios.put(`http://localhost:3030/todos/${id}`, {
      complete: todoItem.complete
    })
    .then((response) => {
      this.setState({ todos: todos, error: false });
    })
    .catch((error) => {
      this.setState({ error });
    });
  }

  deleteItem = (id, index) => {
    const token = cookie.load('token');
    const taxios = axios.create({
      headers: {
        Authorization: `JWT ${token}`
      }
    });
    taxios.delete(`http://localhost:3030/todos/${id}`)
    .then((response) => {
      let todos = this.state.todos;
      todos = todos.slice(0, index).concat(todos.slice(index + 1));
      this.setState({ todos: todos, error: false });
    })
    .catch((error) => {
      this.setState({ error });
    });
  }

  createItem = (e, serializedForm) => {
    e.preventDefault();

    const token = cookie.load('token');
    const taxios = axios.create({
      headers: {
        Authorization: `JWT ${token}`
      }
    });
    taxios.post(`http://localhost:3030/todos`, serializedForm)
    .then((response) => {
      let todos = this.state.todos;
      todos.push(response.data)
      this.setState({ todos: todos, error: false });
      this.closeModal();
    })
    .catch((error) => {
      this.setState({ error });
    });
  }

  openModal = () => this.setState({ creatingTodo: true })

  closeModal = () => this.setState({ creatingTodo: false })

  render() {
    return (
      <div>
        <Modal
          open={this.state.creatingTodo}
          onClose={this.closeModal}
        >
          <Modal.Header>Create New Todo</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.createItem}>
              <Form.Field>
                <label>Title</label>
                <input
                  name="title"
                  type="text"
                  placeholder='Title' />
              </Form.Field>
              <Button type='submit'>Submit</Button>
            </Form>
          </Modal.Content>
        </Modal>
        <Menu secondary>
          <Menu.Item>
            <Button primary icon='plus' onClick={this.openModal} />
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Button icon='refresh' onClick={this.refresh} />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <List celled verticalAlign='middle'>
          {(this.state.todos.length > 0)
            ? this.state.todos.map((todo, index) => (
              <Todo
                key={index}
                id={todo.id}
                index={index}
                complete={todo.complete}
                title={todo.title}
                toggleItem={this.toggleItem}
                deleteItem={this.deleteItem}
              />
            ))
            : (<div>You have no todos</div>)
          }
        </List>
      </div>
    )
  }
}
