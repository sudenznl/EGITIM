//import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './counter';

import authReducer from './auth';

const store = configureStore({
    reducer: { counter: counterReducer.reducer, auth: authReducer.reducer },
});


/*const counterReducer = (state = initialState, action) => {
  if ( action.type === 'increment' ) 
  {
     return {
        counter: state.counter + 1,
        showCounter: state.showCounter
      };
  }

  if (action.type === 'increase') 
  {
    return {
      counter: state.counter + action.amount,
      showCounter: state.showCounter
    };
  }

  if (action.type === 'decrement') 
  {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter
    };
  }

  if (action.type === 'toggle') 
  {
    return{
        showCounter: !state.showCounter,
        counter:state.counter
    };
  }

  return state;
};

const store = createStore(counterReducer);*/

export const counterActions = counterReducer.actions;
export const authActions = authReducer.actions;

export default store;
