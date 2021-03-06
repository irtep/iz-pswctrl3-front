import pswTools from '../services/passwords';
import { addNotification } from './notificationReducer';
import { clearDetails } from './detailsReducer';

const pswsReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEWLIST':
      let newList = state.concat([]);
      action.data.forEach((item) => {
        newList.push(item);
      });
      return newList;
    case 'MODDED_LIST':
      return action.data;
    case 'CLEAR_LIST':
      return [];
    case 'PSW_DELETE':
      return action.data;
    default: return state;
  }
};

// action creators
export const save = (entry, usersId) => {
  return async dispatch => {
    try {
      dispatch(addNotification('wait. working on it', 6));
      await pswTools.create(entry);
      const updated = await pswTools.getAll();
      dispatch(addNotification('new entry created', 5));
      dispatch({
        type: 'MODDED_LIST',
        data: updated
      });
    } catch (e) {
      dispatch(addNotification(`${e}`, 10));
    }
  }
};

export const getAll = () => {
  return async dispatch => {
    try {
      dispatch(addNotification('wait. getting list', 6));
      const allPsws = await pswTools.getAll();
      dispatch(addNotification('got password list', 3));
      dispatch({
        type: 'NEWLIST',
        data: allPsws
      });
    } catch (e) {
      dispatch(addNotification(`error fetching passwords ${e}`, 7));
    }
  };
};

export const clearPsws = () => {
  return dispatch => {
    dispatch({
      type: 'CLEAR_LIST'
    });
  }
};

export const deletePsw = (id) => {
  return async dispatch => {
    try {
      dispatch(addNotification('wait. working on it', 6));
      await pswTools.erase(id);
      const updated = await pswTools.getAll();
      dispatch(addNotification('entry deleted!', 3));
      dispatch(clearDetails());
      dispatch({
        type: 'MODDED_LIST',
        data: updated
      });
    } catch (e){
      dispatch(addNotification(`delete failed: ${e}`, 10));
    }
  };
};

export const edit = (entry, entryId) => {
  return async dispatch => {
    dispatch(addNotification('wait. working on it', 6));
    try {
      if (entry.page !== '') {
        await pswTools.update(entryId, 'page', entry.page);
      }
      if (entry.username !== '') {
        await pswTools.update(entryId, 'username', entry.username);
      }
      if (entry.password !== '') {
        await pswTools.update(entryId, 'password', entry.password);
      }
      const updated = await pswTools.getAll();
      dispatch(addNotification('edited selected fields.', 3));
      dispatch(clearDetails());
      dispatch({
        type: 'MODDED_LIST',
        data: updated
      });
    } catch (e){
      dispatch(addNotification(`edit failed: ${e}`, 10));
    }
  };
};
export default pswsReducer;
