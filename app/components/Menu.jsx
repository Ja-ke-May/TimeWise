import React, { useState } from 'react';
import './menu.css';
import MenuIcon from './MenuIcon';

const Menu = ( { scrollToBottom, scrollToLeaderboard, scrollToQuiz, scrollToAbout } ) => {

    const [showMenuList, setShowMenuList] = useState(false);

  
    const handleMenuClick = () => {
        setShowMenuList(prevState => !prevState);
      };      

  return (   
    
    <div>


{showMenuList && (

<section 
id="menu-list" 
className='fixed top-0 left-0 bg-black/80 text-pink-500 font-mono text-xl p-4 pt-20 rounded'
>
        <ul>
            <li className="cursor-pointer" onClick={scrollToQuiz}>Quiz</li>
            <li className="cursor-pointer" onClick={scrollToLeaderboard}>Leaderboard</li>
            <li className="cursor-pointer" onClick={scrollToAbout}>About</li>
            <li className="cursor-pointer" onClick={scrollToBottom}>Contact</li>
        </ul>
    </section>
 )}

<MenuIcon onMenuToggle={handleMenuClick} />
    </div>
  );
};

export default Menu;
