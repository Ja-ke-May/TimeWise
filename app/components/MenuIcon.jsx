import React, { useState } from 'react';
import './Menu.css';

const MenuIcon = ( { onMenuToggle } ) => {
  const [isClicked, setIsClicked] = useState(false);
  const [showX, setShowX] = useState(false);

  const handleContainerClick = () => {
    onMenuToggle();
    setIsClicked(prevState => !prevState);
    setShowX(false); 
    if (!isClicked) {
      setTimeout(() => {
        setShowX(true); 
      }, 800); 
    }
  };
  

  return (   
    
    <button id='menu-icon'
      className="items-center fixed top-0 left-0 mt-2 ml-2 md:ml-10 font-mono"
      onClick={handleContainerClick}
    >
        <div className="absolute">
        {showX && <div className="text-pink-500 transform translate -translate-x-[-24px] md:-translate-x-[-25px] -translate-y-[-18px] md:-translate-y-[-22px] bold">
            x</div>}
      </div>
      <p 
        className={`w-[5px] md:w-[8px] lg:text-lg h-[1vh] text-pink-500 text-center bold m-2 line-through ${isClicked ? 'time-animation' : 'time-animation-reverse'}`}
      >
        Time
      </p>
      <p className={`w-[5px] md:w-[8px] lg:text-lg h-[1vh] text-pink-500 text-center bold m-2 line-through ${isClicked ? 'wise-animation' : 'wise-animation-reverse'}`}>
        Wise
        </p>
      <p 
        className={`w-[5px] md:w-[8px] lg:text-lg h-[1vh] text-pink-500 text-center bold m-2 line-through ${isClicked ? 'quiz-animation' : 'quiz-animation-reverse'}`}
      >
        Quiz
      </p>
    </button>

  );
};

export default MenuIcon;
