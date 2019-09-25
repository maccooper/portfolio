import React from 'react';
import Pdf from '../assets/Programming_Resume.pdf'
import '../styles/Wrapper.css'


import profpic from '../assets/profpic.png'

const Wrapper = () => {
    return(
        <div className='Wrapper'>
            <img src={profpic} alt='' className='profpic'></img>
            <button className='button'> uhh </button>
            <a href={Pdf} target="_blank">Download Pdf</a>
        </div>

    )
}

export default Wrapper;