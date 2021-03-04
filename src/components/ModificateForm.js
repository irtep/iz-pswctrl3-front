import React from 'react';
import { useField } from '../hooks';
import { useDispatch } from 'react-redux';
import { edit } from '../reducers/pswsReducer';
const style = {
  margin: "10px",
  padding: "8px",
  border: "solid 2px blue",
  borderRadius: "5px",
  width: "350px"
};

const ModificateForm = ({showModPswForm, entryId}) => {
  const dispatch = useDispatch();
  const page = useField('text');
  const username = useField('text');
  const password = useField('text');

  const modEntry = (e) => {
    e.preventDefault();
    const entry = {
      page: page.value,
      username: username.value,
      password: password.value,
    };
    dispatch(edit(entry, entryId));
    showModPswForm();
  };

  return(
    <div style= {style}>
      <form onSubmit={modEntry}>
        enter new values. <br/>
        <span className= "whiteText">leave empty values you don't want to modificate!</span>
        <br/>
        page:
        <input {...page} />
        <br/>
        username:
        <input {...username} />
        <br/>
        password:
        <input {...password} />
        <br/>
        <button className= "blackButtons" >modificate filled fields</button>
      </form>
    </div>
  );
};

export default ModificateForm;
