import React from 'react';
import resume from '../assets/Programming_Resume.pdf'

import '../styles/HsContainer.css'

import profpic from '../assets/profpic.png'

const HsContainer = () => {
	return(
			<div className="HsContainer">
            <img src={profpic} alt='' className='profpic'></img>
            <button onClick={() => window.location = resume } className='resbutton'> Resume </button>
        </div>

    )
}

export default HsContainer;
