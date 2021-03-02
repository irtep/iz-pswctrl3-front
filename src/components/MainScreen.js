import React, { useEffect, useState } from 'react';
import NewPswForm from './NewPswForm';
import PswEntry from './PswEntry';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/usersReducer';
import { getAll, clearPsws } from '../reducers/pswsReducer';
import './mainScreen.css';
const atUp = {
  gridArea: 'atUp',
  backgroundColor: 'black',
  padding: "5px"
};
const atLeft = {gridArea: 'atLeft'};
const atRight = {gridArea: 'atRight'};
const atBottom = {gridArea: 'atBottom'};

const MainScreen = () => {
  const [ showNewPswForm, setShowNPF ] = useState(false);
  const user = useSelector(state => state.users);
  const psws = useSelector(state => state.passes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearPsws());
    dispatch(getAll(user));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const logOutUser = () => {
    dispatch(clearPsws());
    dispatch(logout());
  };

  const toggleShow = () => {
    setShowNPF(!showNewPswForm);
  }

  return (
    <div>
    <div id= "gridContainer">
      <div id= "heads" style= {atUp}>
      logged in as {user[0].name} &nbsp;
      <button className= "blackButtons" onClick= {logOutUser}>log out</button>
      </div>
      <div id= "leftCenter" style= {atLeft}>
        saved passwords:
        <ul>
        {psws.map( psw => {
          if (psw.user.id === user[0].id) {
            return (
              <li key= {psw.id}>
                <PswEntry
                entry= {psw}/>
              </li>
            );
          } else {
            return null;
          }
        })}
        </ul>
      </div>
      <div id= "rightCenter" style= {atRight}>
        right center div
      </div>
      <div id= "foots" style= {atBottom}>
        {showNewPswForm ?
         <NewPswForm
           toggleShow = {toggleShow}/>:
         <input  className= "blackButtons"
           type= "button"
           onClick= {toggleShow}
           value= "save new password"/>}
      </div>
    </div>
    </div>
  );
};

export default MainScreen;
