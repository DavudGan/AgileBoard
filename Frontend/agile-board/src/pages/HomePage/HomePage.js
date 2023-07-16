import React from 'react';
import Development from './Development.gif'
import './HomePageCSS.css'

const HomePage = () => {



  return (

    <div className='home'>
      <h1>В разработке</h1>
      <img 
        src={Development} 
        alt='home'
        height={250} width={300}
      />
      
    </div>
    
  )
}

export default HomePage