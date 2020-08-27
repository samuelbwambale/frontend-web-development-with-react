import React, { Component } from 'react';
import {BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; /* Wraps the store around the App.js so that child components can access the store*/
import './App.css';
import Main from './components/MainComponent';
import { configureStore } from './redux/configureStore';

const store = configureStore();

class App extends Component {

  render() {
    return (
      <Provider store={store}> 
        <BrowserRouter>
        <div>
          <Main />
        </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
