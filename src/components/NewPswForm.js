import React from 'react';
import { useField } from '../hooks';
import { save } from '../reducers/pswsReducer';
import { useDispatch, useSelector } from 'react-redux';
const style = {
  margin: "10px",
  padding: "8px",
  border: "solid 2px blue",
  borderRadius: "5px",
  width: "350px"
}


const NewPswForm = ({toggleShow}) => {
  const dispatch = useDispatch();
  const page = useField('text');
  const username = useField('text');
  const password = useField('text');
  const loggedIn = useSelector(state => state.users);

  const newEntry = (e) => {
    e.preventDefault();
    const entry = {
      page: page.value,
      username: username.value,
      password: password.value,
    };
    dispatch(save(entry, loggedIn[0].id));
    toggleShow();
  };

  if (loggedIn === []) { return null; }
  return(
    <div style= {style}>
      <form onSubmit={newEntry}>
        page:
        <input {...page} />
        <br/>
        username:
        <input {...username} />
        <br/>
        password:
        <input {...password} />
        <br/>
        <button className= "blackButtons" >save new password</button>
      </form>
    </div>
  );
};

export default NewPswForm;
