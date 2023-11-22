import React, { useState,useEffect } from 'react';
import { useResource } from "react-request-hook";


export default function Login({dispatch}) {

    const [username, setUsername] = useState("");
    const [loginFailed, setLoginFailed] = useState(false);

    const [password, setPassword] = useState("");


    const [user, login] = useResource((username, password) => ({
        url: "/auth/login",
        method: "post",
        data: { username, password },
      }));
    
      useEffect(() => {
        if (user && user.isLoading === false && (user.data || user.error)) {
          if (user.error) {
            setLoginFailed(true);
          } else {
            setLoginFailed(false);
          dispatch({
          type: "LOGIN",
          username: "User",
          access_token: user.data.access_token,
          });
          }
        }
      }, [user]);
      
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
    