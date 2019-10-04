import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './redux/store/store';
import {BrowserRouter} from 'react-router-dom';
import './index.css';




import * as serviceWorker from './serviceWorker';
import App from './containers/App/App';

ReactDOM.render((
                <Provider store={store}>
                    <BrowserRouter>
                        
                            <App />
                       
                    </BrowserRouter>
                </Provider>),
                 document.getElementById('root'));
serviceWorker.unregister();
