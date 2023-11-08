import React, { useContext } from 'react'
import { ThemeContext } from './contexts'

export function TodoList({ todos, handleCompleteToggle, handleDeleteTodo }) {

  const { secondaryColor } = useContext(ThemeContext);

  return (
    <div>
      <h3 style={{ color: secondaryColor }}>Todo List:</h3>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <strong>Author:</strong> {todo.author}<br />
            <strong>Title:</strong> {todo.title}<br />
            <strong>Description:</strong> {todo.description}<br />
            <strong>Date Created:</strong> {todo.dateCreated}<br />
            <strong>Complete:</strong> {todo.complete ? 'Yes' : 'No'}<br />
            <label>
              Complete:
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => handleCompleteToggle(todo.id)}
              />
            </label>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            {todo.complete && (
              <div>
                <strong>Date Completed:</strong> {todo.dateCompleted}<br />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
