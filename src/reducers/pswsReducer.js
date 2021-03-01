import pswTools from '../services/passwords';
import { addNotification } from './notificationReducer';

const pswsReducer = (state = [], action) => {
  console.log('pswsReducer received ', action.type, action.data);
  switch (action.type) {
    case 'SHOWLIST':
      return state.concat([action.data]);
    case 'ADD_NEW':
      return state.concat([action.data]);
    default:
      return state
  }
};

//action creators

// action creators
export const save = (entry) => {
  console.log('action creator received: ', entry);
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

export const getAll = (user) => {
  return async dispatch => {
    try {
      const allPsws = await pswTools.getAll(user);
      console.log('allPsws ', allPsws);
      dispatch(addNotification('getting users passwords', 3));
      dispatch({
        type: 'SHOWLIST',
        data: allPsws
      });
    } catch (e) {
      dispatch(addNotification('error fetching passwords', 7));
    }
  };
};

export default pswsReducer;
