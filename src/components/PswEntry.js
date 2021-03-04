import React from 'react';
import { useDispatch } from 'react-redux';
import { selectNew } from '../reducers/detailsReducer';
import { addNotification } from '../reducers/notificationReducer';
import { copyToClipboard } from '../utils';
/*
const style= {
  display: "inline-block",
  backgroundColor: "black",
  borderRadius: "5px",
  padding: "3px",
  margin: "3px",
  color: "darkGreen"
};
*/
const PswEntry = ({entry}) => {
  const dispatch = useDispatch();
  const selectEntry = () => {
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
