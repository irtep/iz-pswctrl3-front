import React from 'react';
import { useDispatch } from 'react-redux';
import { selectNew } from '../reducers/detailsReducer';
const style= {
  display: "inline-block",
  backgroundColor: "black",
  borderRadius: "5px",
  padding: "3px",
  margin: "3px",
  color: "darkGreen"
};

const PswEntry = ({entry}) => {
  const dispatch = useDispatch();
  const selectEntry = () => {
    dispatch(selectNew(entry));
  }
  return(
    <div
      style= {style}
      className= "blackButtons"
      onClick= {selectEntry}>
      {entry.page}
    </div>);
};

export default PswEntry;
