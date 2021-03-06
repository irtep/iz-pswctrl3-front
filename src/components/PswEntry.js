import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNew } from '../reducers/detailsReducer';
import { addNotification } from '../reducers/notificationReducer';
import { changeShow } from '../reducers/showAndHideReducer';
import { copyToClipboard } from '../utils';

const PswEntry = ({entry}) => {
  const showing = useSelector(state => state.showAndHide);
  const dispatch = useDispatch();
  const selectEntry = () => {
    if (showing.showMyAccount) {
      dispatch(changeShow('showMyAccount'));
    }
    dispatch(selectNew(entry));
    dispatch(addNotification('password copied to clipboard, control+v to paste it somewhere', 5));
    copyToClipboard(entry.password);
    window.scrollTo(0, 0);
  }
  return(
    <div
      className= "greenButtons"
      onClick= {selectEntry}>
      {entry.page}
    </div>);
};

export default PswEntry;
