import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import store from './store'

const firebaseConfig = {
  apiKey: "AIzaSyAyywBzxEgPesw2EAonRU6Yqg0SRssGyB0",
  authDomain: "web-messenger-bd568.firebaseapp.com",
  projectId: "web-messenger-bd568",
  storageBucket: "web-messenger-bd568.appspot.com",
  messagingSenderId: "932001637876",
  appId: "1:932001637876:web:14dd05259bc101de4045a1",
  measurementId: "G-CC536QB2EC"
};

firebase.initializeApp(firebaseConfig);
window.store=store;


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
