const initialState = {
  showModPswForm: false,
  showNewPswForm: false,
  showPsw: false,
  showMyAccount: false
}

const showAndHideReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case 'CHANGE':
      const newState = {...state};
      newState[action.data] = !state[action.data];
      return newState;
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

export default showAndHideReducer;
