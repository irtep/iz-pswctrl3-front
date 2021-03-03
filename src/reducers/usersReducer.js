import loginTools from '../services/login';
import pswTools from '../services/passwords';
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

export default usersReducer;
