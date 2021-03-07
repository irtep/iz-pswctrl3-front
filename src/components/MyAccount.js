import React from 'react';
import { useField } from '../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from '../reducers/notificationReducer';
import { changeAccountPassword } from '../reducers/usersReducer';

const MyAccount = () => {
  const dispatch = useDispatch();
  const current = useField('password');
  const newPsw = useField('password');
  const newRepeated = useField('password');
  const loggedIn = useSelector(state => state.users);

  const changeAccountPsw = (e) => {
    e.preventDefault();
    if (newPsw.value !== newRepeated.value) {
      dispatch(addNotification('new passwords are now equal', 4));
    } else if (current.value === '' || newPsw.value === ''){
      dispatch(addNotification('empty fields.', 4));
    } else {
      dispatch(changeAccountPassword({
        user: loggedIn[0].id,
        current: current.value,
        newPsw: newPsw.value
      }));
      dispatch(addNotification('Password changed!.', 4));
    }
  };

  return(
    <div>
      <form onSubmit= {changeAccountPsw}>
        <table>
          <tbody>
            <tr>
              <td className= "whiteText">
            change accounts password
              </td>
            </tr>
            <tr>
              <td>current password:</td>
              <td><input {...current}/></td>
            </tr>
            <tr>
              <td>new password: (min 3 characters)</td>
              <td><input {...newPsw}/></td>
            </tr>
            <tr>
              <td>repeat new password</td>
              <td><input {...newRepeated}/></td>
            </tr>
          </tbody>
        </table>
        <button type= "submit" className= "grayButtons">change it.</button>
      </form>
    </div>
  );
};

export default MyAccount;
