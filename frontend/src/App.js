import React, { useReducer, useEffect, useState } from 'react';
import UserBar from './UserBar';
import NewTodoItem from './NewTodoItem';
import appReducer from './Reducer';
import Header from './Header';
import ChangeTheme from "./ChangeTheme";
import { useResource } from "react-request-hook";
import { ThemeContext, StateContext } from "./contexts";

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    addedTodos: [],
    posts: [],
  });

  const { user } = state;

  const [theme, setTheme] = useState({
    primaryColor: "orange",
    secondaryColor: "purple",
  });

  const addTodo = (newTodo) => {
    dispatch({ type: "CREATE_TODO", newTodo });
  };

  const [postResponse, getPosts] = useResource(() => ({
    url: "/posts",
    method: "get",
  }));

  useEffect(getPosts, []);

  useEffect(() => {
    if (postResponse && postResponse.data) {
      dispatch({ type: "FETCH_POSTS", posts: postResponse.data.reverse() });
    }
  }, [postResponse]);

  useEffect(() => {
    if (user) {
      document.title = `${user}'s Todo`;
    } else {
      document.title = 'Todo';
    }
  }, [user]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: '100vh', padding: '20px' }}>
      <StateContext.Provider value={{ state, dispatch }}>
        <ThemeContext.Provider value={theme}>
          <Header text="Todo" />
          <ChangeTheme theme={theme} setTheme={setTheme} />
          <UserBar />
          <NewTodoItem user={user} />
        </ThemeContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;

