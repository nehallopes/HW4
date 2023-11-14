import React, { useState,useEffect, useContext } from 'react';
import { useResource } from "react-request-hook";
import { StateContext } from './contexts';


export default function Login() {

    const [username, setUsername] = useState("");
    const [loginFailed, setLoginFailed] = useState(false);

    const [password, setPassword] = useState("");
    const {dispatch} = useContext(StateContext);


    const [user, login] = useResource((username, password) => ({
        url: "/login",
        method: "post",
        data: { email: username, password },
      }));
    
      useEffect(() => {
        if (user) {
          if (user?.data?.user) {
            setLoginFailed(false);
            dispatch({ type: "LOGIN", username: user.data.user.email });
          } else {
            setLoginFailed(true);
          }
        }
      }, [user, dispatch]);
      
    function handleUsername (evt) {setUsername(evt.target.value);}
    function handlePassword (evt) {setPassword(evt.target.value);}

    return (
      <div style={{ textAlign: 'center' }}>
      <p>{'Already have an account?'}</p>
        {loginFailed && (<span style={{ color: "red" }}>Invalid username or password!</span>)}
        <form onSubmit={(e) => { e.preventDefault(); login(username,password);  }}>
        <div style={{ margin: '10px 0' }}>
            <label htmlFor="login-username">Username:</label>
            <input type="text" name="login-username" id="login-username" value={username} onChange={handleUsername} />
          </div>
          <div style={{ margin: '10px 0' }}>
            <label htmlFor="login-password">Password:</label>
            <input type="password" name="login-password" id="login-password" value={password} onChange={handlePassword}/>
          </div>  
          <div style={{ margin: '10px 0' }}>
            <input type="submit" value="Login" disabled={username.length === 0 || password.length === 0} />
          </div>  
        </form>
      </div>
    )
}
    