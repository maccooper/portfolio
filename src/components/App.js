import React, { Component } from 'react';

import '../styles/App.css';
import Footer from './Footer.js'
import Description from './Description.js'
import Wrapper from './Wrapper.js'



class App extends Component {
  render() {
    return (
      <div classname='App'>

        <div className='Wrapper'>
          <Wrapper/>
        </div>

        <div className="Description">
        <Description/>
        </div>
        
        <div className='footer'>
          <Footer />
        </div>

      </div>
    );

  }
}


export default App;
