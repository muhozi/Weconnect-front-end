import React from 'react';
import ReactDOM from 'react-dom';
import 'ionicons/dist/css/ionicons.css';
import './styles/app.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
