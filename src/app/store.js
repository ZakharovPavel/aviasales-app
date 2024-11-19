import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filter/filterSlice';
import sorterReducer from '../features/sorter/sorterSlice';

// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//         // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
//       })
//     : compose;

// const loggerMiddleware = (store) => (next) => (action) => {
//   const result = next(action);
//   console.log('Middleware', store.getState());
//   return result;
// };

export default configureStore(
  {
    reducer: {
      filter: filterReducer,
      sorter: sorterReducer,
    },
  },
  // composeEnhancers(applyMiddleware(loggerMiddleware))
);
