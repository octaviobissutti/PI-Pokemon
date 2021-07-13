import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../Reducer/reducer';
import thunk from 'redux-thunk';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
)) //Thunk: es para manejar el asíncronismo de las actions.

export default store;