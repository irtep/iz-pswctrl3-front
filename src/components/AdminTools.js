import React from 'react';
import { useField } from '../hooks';
import usersTools from '../services/user';
import { useDispatch } from 'react-redux';
import { addNotification } from '../reducers/notificationReducer';

const AdminTools = () => {
  const dispatch = useDispatch();
  const resetUser = useField('text');
  const resetPsw = useField('text');
  const newName = useField('text');
  const newUsername = useField('text');
  const newPassword = useField('text');

  const resetPassword = (e) => {
    e.preventDefault();
    const forReset = {
      user: resetUser.value,
      newPsw: resetPsw.value
    }
    dispatch(addNotification('ok, reseting', 5));
    usersTools.resetUsersPsw(forReset);
  };
  const addNewUser = (e) => {
    e.preventDefault();
    const newUser = {
      name: newName.value,
      username: newUsername.value,
      password: newPassword.value,
      admin: false
    };
    const adminChoose = document.getElementById('isAdmin');
    console.log('admin: ', adminChoose.checked);
    if (adminChoose.checked) { newUser.admin = true; }
    dispatch(addNotification('adding new user', 5));
    usersTools.createNewUser(newUser);
  };
  return(
    <div>
      <h4>admin tools</h4>
      <div>
        <span className= "whiteText">Reset password for user:</span>
        <form onSubmit={resetPassword} className= "adminForms">
          username:
          <input {...resetUser} />
          <br/>
          new password:
          <input {...resetPsw} />
          <br/>
          <button className= "blackButtons" >reset users password</button>
        </form>
      </div>
      <div>
        <span className= "whiteText">Create new user:</span>
        <form onSubmit={addNewUser} className= "adminForms">
          enter new values. <br/>
          <span className= "whiteText">leave empty values you don't want to modificate!</span>
          <br/>
          name:
          <input {...newName} />
          <br/>
          username:
          <input {...newUsername} />
          <br/>
          password:
          <input {...newPassword} />
          <br/>
          admin:
          <input id= "isAdmin" type= "radio" name= "rights" value= "yes"/>yes
          <input type= "radio" name= "rights" value= "no"/>no
          <br/>
          <button className= "blackButtons" >modificate filled fields</button>
        </form>
      </div>
    </div>
  );
};

export default AdminTools;
