import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNotification } from '../reducers/notificationReducer';
import { deletePsw } from '../reducers/pswsReducer';
import { clearDetails } from '../reducers/detailsReducer';
import { copyToClipboard } from '../utils';
import ModificateForm from './ModificateForm';

const DetailsComponent = () => {
  const dispatch = useDispatch();
  const [ showModPswForm, setShowMpF ] = useState(false);
  const [ showPsw, setShow ] = useState(false);
  const selectedPsw = useSelector(state => state.details);
  let pswField = '';

  const toggleShow = () => {
    setShow(!showPsw);
  };
  const toggleShowModForm = () => {
    setShowMpF(!showModPswForm);
  };
  const copyToCp = () => {
    copyToClipboard(selectedPsw.username)
    dispatch(addNotification('username copied to clipboard', 3));
  }
  const deleteEntry = () => {
    dispatch(clearDetails());
    dispatch(deletePsw(selectedPsw.id));
  };

  const userTools = <div><input
    type= "button"
    className= "blackButtons"
    value= "show/hide password"
    onClick= {toggleShow}/><br/>
    <input
    type= "button"
    className= "blackButtons"
    value= "copy username"
    onClick= {copyToCp}/><br/>
    <input
    type= "button"
    className= "yellowButtons"
    value= "modificate entry"
    onClick= {() => toggleShowModForm()}/><br/>
    <input
    type= "button"
    className= "redButtons"
    value= "delete entry"
    onClick= {deleteEntry}/></div>;

  if (selectedPsw === '') {
      pswField = '';
  };

  if (selectedPsw !== '') {
    if (showPsw) {
      pswField = `password: ${selectedPsw.password}`;
    } else {
      pswField = '';
    }
  }

  return(
    <div>
      page: <span className= "whiteText">{selectedPsw.page}</span><br/>
      username: <span className= "whiteText">{selectedPsw.username}</span><br/>
      {pswField}<br/>
      {selectedPsw !== ''?
      userTools:
      <></>}
      <div>
        {showModPswForm?
        <ModificateForm
          showModPswForm= {toggleShowModForm}
          entryId = {selectedPsw.id}/>:
        <></>}
      </div>
    </div>
  );
};

export default DetailsComponent;
