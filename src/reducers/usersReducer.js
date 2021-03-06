import loginTools from '../services/login';
import pswTools from '../services/passwords';
import usersTools from '../services/user';
import { addNotification } from './notificationReducer';
import { clearDetails } from './detailsReducer';

const usersReducer = ( state = [], action ) => {
  switch (action.type) {
    case 'LOGIN':
    return state.concat([action.data]);
    case 'LOGOUT':
      let newState = [...state];
      newState = [];
    return newState;
    default: return state;
  }
};

// action creators
export const login = ({username, password}) => {
  return async dispatch => {
    try {
      const userx = await loginTools.login({
        username, password
      });
      // login ok
      pswTools.setToken(userx.token);
      usersTools.setToken(userx.token);
      window.localStorage.setItem(
        'uDetails', JSON.stringify(userx)
      );
      dispatch(addNotification(`welcome: ${username}`, 10));
      dispatch({
        type: 'LOGIN',
        data: userx
      });
    } catch (e) {
      dispatch(addNotification('wrong credentials', 10));
    }
  }
};

export const autoLogin = (user) => {
  user = JSON.parse(user);
  return dispatch => {
    dispatch({
      type: 'LOGIN',
      data: user
    });
  }
};


export const logout = () => {
  return async dispatch => {
    pswTools.setToken('');
    window.localStorage.removeItem('uDetails');
    dispatch(addNotification(`logged out.`, 5));
    dispatch(clearDetails());
    dispatch({
      type: 'LOGOUT',
      data: ''
    });
  }
};

export const changeAccountPassword = (data) => {
  return async dispatch => {
    dispatch(addNotification('working on it. wait.'));
    try {
      await usersTools.changePw(data);
      dispatch(addNotification('ok, changed.'));
    } catch (e) {
      dispatch(addNotification(`${e}`, 5));
    }
  };
};
/*
this comes from backend: so continue from here
new hash:  $2b$10$vc1y.OasWrJC3IBvmxGE2OjjAwMCt9pODDgZ2aK0TXXWC1YHfM0Rm
passwordHash is not defined
ReferenceError: passwordHash is not defined
    at C:\Users\Käyttäjä\github\IZ-Pswctrl3-rest\controllers\users.js:50:49
*/

export default usersReducer;
