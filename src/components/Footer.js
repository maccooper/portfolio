import React from 'react';
import '../styles/footer.css'

//import gitimg from '../assets/github_cat.png'
import linkedinimg from '../assets/linkedin.png'
import twitterbird from '../assets/twitter_bird.png'
import envelope from '../assets/envelope.png'
import githubcat from '../assets/github_cat.png'

const Footer = () => {
    return (
        <div classname='footer'>
            <a href="https://github.com/outofmyelement">
                <img src={githubcat} alt='' className='icon' ></img>
            </a>
            <a href='https://www.linkedin.com/in/mackenzie-cooper-54625b163/'>
                <img src={linkedinimg} alt='' className='icon'></img>
            </a>
            <a href='thisiswheretwitterwouldgo'>
                <img src={twitterbird} alt='' className='icon'></img>
            </a>
            <a href='thisiswhereemailgoes'>
            <img src={envelope} alt='' className='icon'></img>
            </a>
        </div>
    )
}
export default Footer;
