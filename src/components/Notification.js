import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notifications);
  const style = {
    color: "red"
  };

  return (
    <div style={style}>
      {notification}
    </div>
  );
};

export default Notification;
