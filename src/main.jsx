/* eslint-disable react/react-in-jsx-scope */
import { createRoot } from 'react-dom/client';
import './index.css';
import '../node_modules/normalize.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './app/store';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
