import React from 'react';
import { Button, Checkbox, List } from 'stardust'

const Todo = ({ id, index, complete, title, toggleItem, deleteItem }) => {
  return (
    <List.Item>
      <List.Content floated='right'>
        <Button
          color="red"
          onClick={
            () => deleteItem(id, index)
          }
        >
          &times;
        </Button>
      </List.Content>
      <List.Content>
        <Checkbox
          checked={complete}
          label={'\u00a0'}
          onChange={() => toggleItem(id, index)}
        />
        {title}
      </List.Content>
    </List.Item>
  )
}

Todo.displayName = 'Todo'

export default Todo
