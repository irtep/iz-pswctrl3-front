import React from 'react';
import { useField } from '../hooks';
import { login } from '../reducers/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
const style = {
  margin: "10px",
  padding: "8px",
  border: "solid 2px blue",
  borderRadius: "5px",
  width: "350px"
}


const LoginForm = () => {
  const dispatch = useDispatch();
  const username = useField('text');
  const password = useField('password');
  const loggedIn = useSelector(state => state.users);

  const logIn = (e) => {
    e.preventDefault();
    const user = {username: username.value, password: password.value};
    dispatch(login(user));
  };

  if (loggedIn === []) { return null; }
  return(
    <div style= {style}>
      <span className= "whiteText">login:</span>
      <form onSubmit={logIn}>
        username:
        <input {...username} />
        <br/>
        password:
        <input {...password} />
        <br/>
        <button className= "blackButtons" >submit login</button>
      </form>
    </div>
  );
};

export default LoginForm;
