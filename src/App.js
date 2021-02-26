import React, { useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { useDispatch } from 'react-redux';
import { login } from './reducers/usersReducer';
import pswTools from './services/passwords';

const style = {
  backgroundColor: '#1E1B1B',
  color: '#B3A3A3'
};

const App = () => {
  const dispatch = useDispatch();

  // when app is loaded
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('uDetails');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(login(user));
      pswTools.setToken(user.token);
    }
  // ignoring lint as i need this only when app starts.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <div style= {style}>
      <LoginForm/>
      <Notification/>
    </div>
  );
};

export default App;
