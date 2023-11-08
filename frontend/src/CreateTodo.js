import { useState, useContext } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "./contexts";
import { TodoList } from './TodoList';

export default function CreateTodo({ user }) {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  
  const handleCompleteToggle = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        const updatedTodo = {
          ...todo,
          complete: !todo.complete,
        };

        if (updatedTodo.complete) {
          updatedTodo.dateCompleted = new Date().toLocaleString();
        } else {
          updatedTodo.dateCompleted = null;
        }

        return updatedTodo;
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === '') {
      return;
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    const newTodo = {
      id: Date.now(),
      author: user,
      title: title,
      description: description,
      complete: false,
      dateCreated: formattedDate,
      dateCompleted: null,
    };

    handleAddTodo(newTodo);

    setTitle('');
    setDescription('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>Author: <b>{user}</b></div>
          <label htmlFor="todo-title">Todo Title:</label>
          <input
            type="text"
            id="todo-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="todo-description">Description:</label>
          <textarea
            id="todo-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Add to Todo List</button>
        </div>
      </form>
      <TodoList
        todos={todos}
        handleCompleteToggle={handleCompleteToggle}
        handleDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
}
