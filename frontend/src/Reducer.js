function userReducer  (state, action)  {
    switch (action.type) {
      case "LOGIN":
      case "REGISTER":
        return action.username;
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
          dispatch: action.dispatch,
        };
        return [newTodo, ...state];
      case "TOGGLE_TODO":
        if(!action.complete){
          document.getElementById(action.title).innerHTML="Completed on: "+new Date(Date.now()).toString();
        }
        else{
          document.getElementById(action.title).innerHTML="";
        }
        return state;
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