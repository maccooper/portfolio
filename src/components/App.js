import React, { Component } from 'react';

import '../styles/App.css';
import Footer from './Footer.js'
import Description from './Description.js'
import Wrapper from './Wrapper.js'
import Header from './Header.js'


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Wrapper/>
        <Description/>
        <Footer />
      </div>
    );
    
  }
}


export default App;
