import React from 'react';
import '../styles/footer.css'

import gitimg from '../assets/github_cat.png'
import linkedinimg from '../assets/linkedin.png'
import twitterbird from '../assets/twitter_bird.png'
import envelope from '../assets/envelope.png'

const Footer = () => {
    return (
        <div classname="App">
                <img src={gitimg} alt='' className={'gitcatt'} ahref = "https://github.com/outofmyelement"></img>
                <img src={linkedinimg} alt='' className={'gitcatt'}></img>
                <img src={twitterbird} alt='' className={'gitcatt'}></img>
                <img src={envelope} alt='' className={'gitcatt'}></img>   
        </div>
    )
}

export default Footer;