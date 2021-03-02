import React from 'react';
const style= {
  display: "inline-block",
  backgroundColor: "black",
  borderRadius: "5px",
  padding: "3px",
  margin: "3px",
  color: "darkGreen"
};

const PswEntry = ({entry}) => {
  return(
    <div style= {style} className= "blackButtons">
      {entry.page}
    </div>);
};

export default PswEntry;
