function userReducer  (state, action)  {
    switch (action.type) {
      case "LOGIN":
        return{
          username: action.username,
          access_token: action.access_token,
        };
      case "LOGOUT":
        return "";
      default:
        return state;
    }
  }

  function todoReducer (state, action)  {

    switch (action.type) {
      case "CREATE_TODO":

        const newTodo = {
          title: action.title,
          content: action.content,
          author: action.author,
        };
        return [newTodo, ...state];
        
      case "FETCH_TODO":
        return action.posts;

      case "DELETE_TODO":

        const index = state.map(t => t.title).indexOf(action.title);
        const stateTemp = [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ];
        return stateTemp;

      default:
        return state;
    }
  }

  export default function appReducer(state, action) {
    return {
      user: userReducer(state.user, action),
      posts: todoReducer(state.posts, action),
    };
  }