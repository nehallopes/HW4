import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import { useContext } from "react";
import { StateContext } from "./contexts";
import CreateTodo from './CreateTodo'; 

export default function UserBar() {
  const { state, dispatch: dispatchUser } = useContext(StateContext);
  const { user } = state;

  if (user) {
    return (
    <div>
      <Logout />
      <CreateTodo user={user} />
    </div>
    )
  } else {
    return (
      <>
        <Login dispatch={dispatchUser} />
        <Register dispatch={dispatchUser} />
      </>
    );
  }
}
