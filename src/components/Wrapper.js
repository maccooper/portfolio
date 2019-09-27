import React from 'react';
import resume from '../assets/Programming_Resume.pdf'
import '../styles/Wrapper.css'


import profpic from '../assets/profpic.png'

const Wrapper = () => {
    return(
        <div className='Wrapper'>
            <img src={profpic} alt='' className='profpic'></img>
            <button onClick={() => window.location = resume } className='resbutton'> uhh </button>
        </div>

    )
}

export default Wrapper;