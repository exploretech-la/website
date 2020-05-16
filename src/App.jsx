import React, { Component } from 'react';
import logo from './logo.svg';

import Header from './components/Header';
import Splash from './components/Splash';

import './App.scss';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Splash />
        <p>This is in the <a href="https://github.com/exploretech-la/website" target="_blank">exploretech-la/website</a> repo.</p>
      </div>
    );
  }
}

export default App;
