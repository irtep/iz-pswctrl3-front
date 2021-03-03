import React from 'react';
import { useSelector } from 'react-redux';

const DetailsComponent = () => {
  const selectedPsw = useSelector(state => state.details);
  return(
    <div>
      {selectedPsw.page}<br/>
      {selectedPsw.username}<br/>
      {selectedPsw.password}<br/>
    </div>
  );
};

export default DetailsComponent;
