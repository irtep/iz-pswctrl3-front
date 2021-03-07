const initialState = {
  showModPswForm: false,
  showNewPswForm: false,
  showPsw: false,
  showMyAccount: false,
  adminTools: false
}

const showAndHideReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case 'CHANGE':
      const newState = {...state};
      newState[action.data] = !state[action.data];
      return newState;
    case 'RESET_SHOWS':
      return initialState;
    default: return state;
  };
};

// action creators
export const changeShow = (elem) => {
  return dispatch => {
    dispatch({
      type: 'CHANGE',
      data: elem
    });
  }
};

export const resetShows = () => {
  return dispatch => {
    dispatch({
      type: 'RESET_SHOWS'
    })
  };
};

export default showAndHideReducer;
