import React from 'react';
import { useField } from '../hooks';
import usersTools from '../services/user';
import { useDispatch } from 'react-redux';
import { addNotification } from '../reducers/notificationReducer';
import { resetShows } from '../reducers/showAndHideReducer';

const AdminTools = () => {
  const dispatch = useDispatch();
  const resetUser = useField('text');
  const resetPsw = useField('text');
  const newName = useField('text');
  const newUsername = useField('text');
  const newPassword = useField('text');

  const resetPassword = async (e) => {
    e.preventDefault();
    const forReset = {
      user: resetUser.value,
      newPsw: resetPsw.value
    }
    dispatch(addNotification('ok, reseting', 5));
    try {
      await usersTools.resetUsersPsw(forReset);
      resetUser.value = '';
      resetPsw.value = '';
      dispatch(addNotification('reseted!', 3));
    } catch (e) {
      dispatch(addNotification(`error: ${e}`, 3));
    }
    dispatch(resetShows());
  };

  const addNewUser = async (e) => {
    e.preventDefault();
    const adminChoose = document.getElementById('isAdmin');
    const newUser = {
      name: newName.value,
      username: newUsername.value,
      password: newPassword.value,
      admin: false
    };

    if (adminChoose.checked) { newUser.admin = true; }
    dispatch(addNotification('adding new user', 5));
    try {
      await usersTools.createNewUser(newUser);
      dispatch(addNotification('added user', 5));
    } catch (e) {
      dispatch(addNotification(`error: ${e}`, 5));
    }
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
          <button className= "blackButtons" >add new user</button>
        </form>
      </div>
    </div>
  );
};

export default AdminTools;
