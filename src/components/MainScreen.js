import React, { useEffect } from 'react';
import NewPswForm from './NewPswForm';
import PswEntry from './PswEntry';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/usersReducer';
import { getAll } from '../reducers/pswsReducer';

const MainScreen = () => {
  const user = useSelector(state => state.users);
  const psws = useSelector(state => state.passes);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('firing use effect at mainScreen');
    dispatch( getAll(user) );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const logOutUser = () => {
    dispatch(logout('x'));
  };
  console.log('all psws: ', psws, typeof(psws));
  return (
    <div>
      <p>
      logged in as {user[0].username} &nbsp;
      <button className= "blackButtons" onClick= {logOutUser}>log out</button>
      </p>
      <div>
        passwords:
        {psws.map( psw =>
          <PswEntry
            entry= {psw}/>
        )}
      </div>
      <div>
        save new:
        <NewPswForm/>
      </div>
    </div>
  );
};

export default MainScreen;
