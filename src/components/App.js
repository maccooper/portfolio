import React, { Component } from 'react';

import '../styles/App.css';
import Footer from './Footer.js'
import Description from './Description.js'
import profpic from '../assets/profpic.png'


class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <img src={profpic} alt='' className='profpic'></img>
          <button className='button'> uhh </button>
        </div>      
        <div className="Description">
          <Description className='Description'/>
        </div>
        <div className='footer'>
          <Footer />
        </div>

      </div>
    );

  }
}


export default App;
