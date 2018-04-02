import React from 'react';
import ReactDOM from 'react-dom';
import AppTodos from './AppTodos.jsx';

let userId = window.location.href.split('/').pop();
ReactDOM.render(<AppTodos userId={userId}></AppTodos>, document.getElementById('todos'));
