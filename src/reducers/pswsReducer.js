import pswTools from '../services/passwords';
import { addNotification } from './notificationReducer';

const pswsReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEWLIST':
      let newList = state.concat([]);
      action.data.forEach((item) => {
        newList.push(item);
      });
      return newList;
    case 'ADD_NEW':
      // should here refresh from db to get fresh stuff
      return state.concat([action.data]);
    case 'CLEAR_LIST':
      return [];
    default:
      return state
  }
};

// action creators
export const save = (entry, usersId) => {
  console.log('entry incoming: ', entry);
  return async dispatch => {
    try {
      await pswTools.create(entry);
      dispatch(addNotification('new entry created', 5));
      // better refresh all the list from db here....
      const forDispatch = {
        user: {id: usersId}, ...entry
      };
      dispatch({
        type: 'ADD_NEW',
        data: forDispatch
      });
    } catch (e) {
      dispatch(addNotification('error: fill all fields, min length 3 on all fields', 10));
    }
  }
};

export const getAll = (user) => {
  return async dispatch => {
    try {
      const allPsws = await pswTools.getAll(user);
      dispatch(addNotification('getting users passwords', 3));
      dispatch({
        type: 'NEWLIST',
        data: allPsws
      });
    } catch (e) {
      dispatch(addNotification('error fetching passwords', 7));
    }
  };
};

export const clearPsws = () => {
  return dispatch => {
    dispatch({
      type: 'CLEAR_LIST'
    });
  }
}

export default pswsReducer;
