import React from 'react';

const Navbar = () => {
  return (
    <div className="relative w-full h-[90px] bg-black/80 text-white text-center text-opacity-60 flex justify-center">
     <img className='h-20 w-20 motion-safe:animate-pulse' src="images/TimeWiseLogo.png" alt="TimeWise Logo" />
    </div>
  );
};

export default Navbar;
