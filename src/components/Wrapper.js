import React from 'react';
import '../styles/Wrapper.css'


import profpic from '../assets/profpic.png'

const Wrapper = () => {
    return(
        <div className='Wrapper'>
            <img src={profpic} alt='' className='profpic'></img>
            <button className='button'> uhh </button>
        </div>

    )
}

export default Wrapper;