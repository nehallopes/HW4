import React, { useState,useEffect, useContext } from 'react';
import { useResource } from "react-request-hook";
import { StateContext } from './contexts';


export default function Register() {

    const [ username, setUsername ] = useState('')

    const [ password, setPassword ] = useState('')

    const [ passwordRepeat, setPasswordRepeat ] = useState('')

    const [success, setSuccess] = useState(false);
    const { dispatch } = useContext(StateContext);

    const [user, register] = useResource((username, password) => ({
        url: "/users",
        method: "post",
        data: { email: username, password },
      }));
    
      useEffect(() => {
        if (user && user.data) {
          dispatch({ type: "REGISTER", username: user.data.email });
          setSuccess(true);
        }
      }, [user, dispatch]);
      
    function handleUsername (evt) { setUsername(evt.target.value) }
    function handlePassword (evt) { setPassword(evt.target.value) }
    function handlePasswordRepeat (evt) { setPasswordRepeat(evt.target.value) }

    const handleSubmit = (e) => {
      e.preventDefault();
      if (password === passwordRepeat) {
          register(username, password);
      } else {
          alert("Passwords do not match!");
      }
  };

    return (
      <div style={{ textAlign: 'center' }}>
      <p>{'Register as a new user'}</p>
      <form onSubmit={handleSubmit}>
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
      </form>
      </div>
    )
}
