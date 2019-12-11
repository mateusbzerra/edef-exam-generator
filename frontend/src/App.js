import React, { useEffect } from 'react';
import './style.css';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './store';
import Routes from 'routes';

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
