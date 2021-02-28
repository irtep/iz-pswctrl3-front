import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/usersReducer';

const LogoutOption = () => {
  const user = useSelector(state => state.users);
  const dispatch = useDispatch();

  const logOutUser = () => {
    dispatch(logout('x'));
  };

  return (
    <div>
      <p>
      logged in as {user[0].username} &nbsp;
      <button className= "blackButtons" onClick= {logOutUser}>log out</button>
      </p>
      <div>
        passwords:
      </div>
      <div>
        save new:
      </div>
    </div>
  );
};

export default LogoutOption;
