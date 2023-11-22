import React, { useContext, useState, useEffect } from 'react';
import { useResource } from "react-request-hook";
import { StateContext } from "./contexts";
import { TodoList } from './TodoList';

export default function CreateTodo() {
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState([]);

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [post, createPost] = useResource(({ title, content }) => ({
    url: "/post",
    method: "post",
    headers: { Authorization: `${state.user.access_token}` },
    data: { title, content },
  }));

  const [deleteRequest, deletePost] = useResource((todoId) => ({
    url: `/post/${todoId}`,
    method: "delete",
    headers: { Authorization: `${state.user.access_token}` },
  }));

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
    deletePost(todoId);
  
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };
  

  function handleTitle(evt) {
    setTitle(evt.target.value);
  }
  function handleContent(evt) {
    setContent(evt.target.value);
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === '') {
      return;
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    const newTodo = {
      id: Date.now(),
      author: user.username,
      title: title,
      content: content,
      complete: false,
      dateCreated: formattedDate,
      dateCompleted: null,
    };

    handleAddTodo(newTodo);

    const newPost = { title, content };
    createPost(newPost);
  };

  useEffect(() => {
    if (post.isLoading === false && post.data) {
      dispatch({
        type: "CREATE_POST",
        title: post.data.title,
        content: post.data.content,
        id: post.data.id,
        author: user.username,
      });
    }
  }, [post, dispatch, user]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>Author: <b>{user.username}</b></div>
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
