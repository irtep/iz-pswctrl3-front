import loginTools from '../services/login';
import { addNotification } from './notificationReducer';

const usersReducer = ( state = [], action ) => {
  switch (action.type) {
    case 'LOGIN':
    return state.concat([action.data]);
    case 'LOGOUT':
    return state;
    default: return state;
  }
};

/*
// action creators
export const voteThis = (id, content, votes) => {
  return async dispatch => {
    await anecdoteServices.update(id, content, votes + 1)
    dispatch({
      type: 'VOTE',
      data: id
    })
  }
}
*/

export const login = ({username, password}) => {
  //username comes as undefined, can continue from here
  console.log('login attempt at action creator: ', username, password);
  // make logging attempt and if works, do it
  return async dispatch => {
    try {
      const user = await loginTools.login({
        username, password
      });
      dispatch(addNotification(`welcome: ${username}`, 10));
      dispatch({
        type: 'LOGIN',
        data: user
      });
    } catch (e) {
      dispatch(addNotification('wrong credentials', 10));
    }
  }
};

export const logout = () => {

};

export default usersReducer;
/*
// login
const handleLogin = async (event) => {
  event.preventDefault();
  try {
    const user = await loginTools.login({
      username, password,
    });
    setUser(user);
    setUsername('');
    setPassword('');
    blogTools.setToken(user.token);
    window.localStorage.setItem(
      'userDetails', JSON.stringify(user)
    );
  } catch (exception) {
    setErrorMessage({ msg: 'wrong credentials', badNews: true });
    setTimeout(() => {
      setErrorMessage({ msg: null });
    }, 5000);
  }
};
*/
