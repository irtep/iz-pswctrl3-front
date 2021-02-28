import pswTools from '../services/passwords';
import { addNotification } from './notificationReducer';

const pswsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SHOWLIST':
      return action.data
    case 'ADD_NEW':
      return state.concat([action.data]);
    default:
      return state
  }
};

//action creators

// action creators
export const save = (entry) => {
  return async dispatch => {
    try {
      await pswTools.create(entry);
      dispatch(addNotification('new entry created', 5));
      dispatch({
        type: 'ADD_NEW',
        data: entry
      });
    } catch (e) {
      dispatch(addNotification('that did not work, entry not created...', 7));
    }
  }
};

export default pswsReducer;
