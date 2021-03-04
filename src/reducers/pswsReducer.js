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
      await pswTools.create(entry);
      const updated = await pswTools.getAll();
      dispatch(addNotification('new entry created', 5));
      dispatch({
        type: 'MODDED_LIST',
        data: updated
      });
    } catch (e) {
      dispatch(addNotification('error: fill all fields, min length 3 on all fields', 10));
    }
  }
};

export const getAll = () => {
  return async dispatch => {
    try {
      const allPsws = await pswTools.getAll();
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
};

export const deletePsw = (id) => {
  return async dispatch => {
    try {
      await pswTools.erase(id);
      const updated = await pswTools.getAll();
      dispatch(addNotification('entry deleted!', 3));
      dispatch({
        type: 'MODDED_LIST',
        data: updated
      });
    } catch (e){
      dispatch(addNotification(`delete failed: ${e}`, 10));
    }
  };
};
/*
// update a certain field for certain blog
const update = (id, field, newValue) => {
  const config = {
    headers: { Authorization: token },
  };
  const data = { field: field, newValue: newValue };
  const req = axios.put(`${baseUrl}/${id}`, data, config);
  return req.then(res => res.data);
};
*/
export const edit = (entry, entryId) => {
  return async dispatch => {
    try {
      // {page: "ssss", username: "", password: ""}
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
      dispatch(addNotification('entry deleted!', 3));
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
