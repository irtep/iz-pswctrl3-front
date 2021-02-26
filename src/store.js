import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import usersReducer from './reducers/usersReducer';
import pswsReducer from './reducers/pswsReducer';
import notiReducer from './reducers/notificationReducer'
//import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  users: usersReducer,
  passes: pswsReducer,
  notifications: notiReducer,
  //filters: filterReducer
});
const store = createStore(
  reducer, composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;
