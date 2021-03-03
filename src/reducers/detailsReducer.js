const detailsReducer = ( state = '', action ) => {
  switch (action.type) {
    case 'SELECTED':
    return action.data;
    default: return state;
  };
};

// action creators
export const selectNew = (selected) => {
  return dispatch => {
    dispatch({
      type: 'SELECTED',
      data: selected
    })
  };
};

export const clearDetails = () => {
  return dispatch => {
    dispatch({
      type: 'SELECTED',
      data: ''
    });
  };
}

export default detailsReducer;
