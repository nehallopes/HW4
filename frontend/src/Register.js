import React, { useState,useEffect } from 'react';
import { useResource } from "react-request-hook";

export default function Register({dispatch}) {

    const [ status, setStatus ] = useState("");

    const [username, setUsername] = useState("");

    const [ password, setPassword ] = useState("");

    const [ passwordRepeat, setPasswordRepeat ] = useState("");

    const [user, register] = useResource((username, password) => ({
        url: "/auth/register",
        method: "post",
        data: { username, password, passwordConfirmation: password },
      }));
    
      useEffect(() => {
        if (user && user.isLoading === false && (user.data || user.error)) {
          if (user.error) {
            setStatus("Registration failed, please try again.");
          } else {
            setStatus("Registration successful.");
          }
        }
      }, [user]);
      
    function handleUsername (evt) { setUsername(evt.target.value) }
    function handlePassword (evt) { setPassword(evt.target.value) }
    function handlePasswordRepeat (evt) { setPasswordRepeat(evt.target.value) }


    return (
      <div style={{ textAlign: 'center' }}>
      <p>{'Register as a new user'}</p>
      <form onSubmit={(e) => { e.preventDefault(); register(username, password);}}>
      <div style={{ margin: '10px 0' }}>
          <label htmlFor="register-username">Username:</label>
          <input type="text" name="register-username" id="register-username" onChange={handleUsername} value={username} />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label htmlFor="register-password">Password:</label>
          <input type="password" name="register-password" id="register-password" value={password} onChange={handlePassword} />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label htmlFor="register-password-repeat">Repeat password:</label>
          <input type="password" name="register-password-repeat" id="register-password-repeat" value={passwordRepeat} onChange={handlePasswordRepeat} />
        </div>
        <div style={{ margin: '10px 0' }}>
          <input type="submit" value="Register" disabled={username.length === 0 || password.length === 0 || password !== passwordRepeat} />
        </div>
        {status && <p>{status}</p>}
      </form>
      </div>
    )
}
