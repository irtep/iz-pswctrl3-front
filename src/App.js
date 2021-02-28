import React, { useEffect } from 'react';
import LoginForm from './components/LoginForm';
import MainScreen from './components/MainScreen';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { autoLogin } from './reducers/usersReducer';
import pswTools from './services/passwords';

const style = {
  backgroundColor: '#1E1B1B',
  color: '#B3A3A3'
};

const App = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.users);

  // when app is loaded
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('uDetails');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(autoLogin(loggedUserJSON));
      pswTools.setToken(user.token);
    }
  // ignoring lint as i need this only when app starts.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <div style= {style}>
      <Notification/>
      {loggedIn.length === 0 ?
        <LoginForm/> :
        <MainScreen/> }
    </div>
  );
};

export default App;
