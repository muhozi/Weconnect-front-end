import React from 'react';
import ReactDOM from 'react-dom';
import 'ionicons/dist/css/ionicons.css';
import './styles/app.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

if (process.env.NODE_ENV === 'development') {
  import('./registerServiceWorker')
    .then(registerServiceWorker => {
      console.log('Happy coding 🙂, Don\'t give up for fixing errors 😅');
      registerServiceWorker.default();
    })
    .catch(error => {
      console.log(error);
    });
}
