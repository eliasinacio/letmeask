import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './styles/global.scss';

ReactDOM.render( 
  // Strict mode monitora seus componentes filhos 
  <React.StrictMode> 
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);