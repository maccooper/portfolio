import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../styles/App.css';
import './footer.js'
import gitimg from '../assets/github_cat.png'
import linkedinimg from '../assets/linkedin.png'
import twitterbird from '../assets/twitter_bird.png'


class App extends Component {
  render() {
    return (
      <div className="App">
      HOLLOLOLOLO
              <footer className="footer">
                <img src={gitimg} alt='' className={'gitcatt'}></img>
                <img src={linkedinimg} alt='' className={'gitcatt'}></img>
                <img src={twitterbird} alt='' className={'gitcatt'}></img>
                <img src={gitimg} alt='' className={'gitcatt'}></img>
        </footer>
      
      </div>

    );
      
  }
}

const Base = () => (
  <div>
    <div> what the heck</div>
  </div>
)

const rootDiv = document.getElementById('root');

ReactDOM.render(<Base/>, rootDiv);

export default App;
 