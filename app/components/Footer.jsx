import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="relative flex flex-col w-full bg-black/80 text-white text-center text-opacity-60 justify-center items-center mt-40 pt-5 pb-5 pr-1 pl-1">
      <img className='h-20 w-20 motion-safe:animate-pulse' src="images/TimeWiseLogo.png" alt="TimeWise Logo" />
      <a href="mailto:Jacob-may@outlook.com" className="hover:text-pink-500 block mt-2">Jacob-may@outlook.com</a>
      <hr className="border-pink-500 w-1/2 m-4" />

      <Link href="http://www.videezy.com/">
        <p className="hover:text-pink-500" alt="Videezy Website">
          Free B Roll by Videezy.com
        </p>
      </Link>

      <Link href="https://www.youtube.com/watch?v=avu3ildd94g">
        <p className="hover:text-pink-500" alt="Inspiring Cinematic Ambient - Aleksey Chistilin">
          Inspiring Cinematic Ambient - Aleksey Chistilin [No Copyright Music]
          Song: Inspiring Cinematic Ambient - Aleksey Chistilin
          Music promoted by Sound Studio
        </p>
      </Link>
    </div>
  );
};

export default Footer;
